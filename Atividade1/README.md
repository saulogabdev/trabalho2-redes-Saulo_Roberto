# Exercício 1 - Sistema de Enquetes via Docker Compose

Este projeto disponibiliza uma aplicação web para criação e votação em enquetes, utilizando **Docker Compose** para orquestrar os serviços de frontend, backend e banco de dados PostgreSQL.

##  Tecnologias Utilizadas

* **Frontend:** HTML + Nginx
* **Backend:** Node.js + Express
* **Banco de Dados:** PostgreSQL
* **Orquestrador:** Docker Compose

##  Como Executar

1. Garanta que o Docker esteja instalado e em execução.
2. Na raiz do projeto, execute:

   ```bash
   docker compose up --build
   ```

3. Acesse a aplicação em:

   ```
   http://localhost:8080
   ```

## 📋 Funcionalidades

- Criar enquetes
- Listar enquetes
- Registrar votos
- Armazenar os dados no PostgreSQL