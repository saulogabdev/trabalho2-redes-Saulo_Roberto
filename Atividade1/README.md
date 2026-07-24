# Sistema de Enquetes

## Descrição

Aplicação web para criação e votação em enquetes utilizando Docker.

O projeto é composto por:

- Frontend (Nginx + HTML)
- Backend (Node.js + Express)
- Banco de dados PostgreSQL

---

# Estrutura do projeto

```
.
├── backend
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
│
├── frontend
│   ├── Dockerfile
│   ├── index.html
│   └── nginx.conf
│
├── compose.yaml
├── .env.example
└── README.md
```

---

## Pré-requisitos

- Docker
- Docker Compose

---

## Como executar

1. Baixe o projeto.
2. Na pasta do projeto, execute:

```bash
docker compose up --build
```

3. Acesse a aplicação em:

```
http://localhost:8080
```

---

## Encerrar a aplicação

Para parar os containers:

```bash
docker compose down
```



## Funcionalidades

- Criar enquetes
- Listar enquetes
- Registrar votos
- Armazenar dados no PostgreSQL

---