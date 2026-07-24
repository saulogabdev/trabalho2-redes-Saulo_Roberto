const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
});

// Criação automática da tabela
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enquetes (
        id SERIAL PRIMARY KEY,
        pergunta VARCHAR(255) NOT NULL,
        opcao_a VARCHAR(100) NOT NULL,
        votos_a INT DEFAULT 0,
        opcao_b VARCHAR(100) NOT NULL,
        votos_b INT DEFAULT 0
      );
    `);
    console.log("Tabela 'enquetes' pronta!");
  } catch (err) {
    console.error("Erro ao conectar no banco, tentando em 3s...", err.message);
    setTimeout(initDb, 3000);
  }
};
initDb();

// Listar enquetes (READ)
app.get('/enquetes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM enquetes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar nova enquete (CREATE)
app.post('/enquetes', async (req, res) => {
  const { pergunta, opcao_a, opcao_b } = req.body;
  if (!pergunta || !opcao_a || !opcao_b) {
    return res.status(400).json({ error: 'Preencha todos os campos!' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO enquetes (pergunta, opcao_a, opcao_b) VALUES ($1, $2, $3) RETURNING *',
      [pergunta, opcao_a, opcao_b]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Votar em uma opção (UPDATE)
app.post('/enquetes/:id/votar', async (req, res) => {
  const { id } = req.params;
  const { opcao } = req.body; // 'a' ou 'b'

  const coluna = opcao === 'a' ? 'votos_a' : 'votos_b';
  try {
    await pool.query(`UPDATE enquetes SET ${coluna} = ${coluna} + 1 WHERE id = $1`, [id]);
    res.json({ message: 'Voto computado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para EXCLUIR uma enquete
app.delete('/enquetes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM enquetes WHERE id = $1', [id]);
    res.json({ message: 'Enquete excluída com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir enquete' });
  }
});

app.listen(3000, () => console.log('Backend de enquetes rodando na porta 3000'));
