# API de Clientes - TypeScript

Uma API REST simples para gerenciar dados de clientes usando TypeScript, Express.js e arquivo JSON como mock de banco de dados.

## 🚀 Funcionalidades

- ✅ Criar cliente
- ✅ Buscar todos os clientes
- ✅ Buscar cliente por ID
- ✅ Atualizar cliente
- ✅ Deletar cliente
- ✅ Buscar clientes por termo (nome, email ou telefone)
- ✅ Health check

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório ou baixe os arquivos
2. Instale as dependências:

```bash
npm install
```

## 🏃‍♂️ Como executar

### Modo desenvolvimento (com hot reload)
```bash
npm run dev
```

### Modo produção
```bash
npm run build
npm start
```

A API estará disponível em: `http://localhost:3000`

## 📖 Endpoints da API

### 1. Health Check
```
GET /health
```

### 2. Documentação
```
GET /
```

### 3. Listar todos os clientes
```
GET /api/customers
```

### 4. Buscar cliente por ID
```
GET /api/customers/:id
```

### 5. Buscar clientes por termo
```
GET /api/customers/search?q=termo
```

### 6. Criar novo cliente
```
POST /api/customers
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+55 11 99999-1234",
  "address": {
    "street": "Rua das Flores, 123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "country": "Brasil"
  }
}
```

### 7. Atualizar cliente
```
PUT /api/customers/:id
Content-Type: application/json

{
  "name": "João Silva Santos",
  "phone": "+55 11 88888-5678"
}
```

### 8. Deletar cliente
```
DELETE /api/customers/:id
```

## 📝 Exemplos de uso com curl

### Criar um cliente
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Costa",
    "email": "ana.costa@email.com",
    "phone": "+55 11 77777-8888",
    "address": {
      "street": "Av. Paulista, 1000",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01310-100",
      "country": "Brasil"
    }
  }'
```

### Buscar todos os clientes
```bash
curl http://localhost:3000/api/customers
```

### Buscar cliente por ID
```bash
curl http://localhost:3000/api/customers/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p
```

### Buscar clientes por termo
```bash
curl "http://localhost:3000/api/customers/search?q=João"
```

### Atualizar cliente
```bash
curl -X PUT http://localhost:3000/api/customers/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+55 11 55555-9999"
  }'
```

### Deletar cliente
```bash
curl -X DELETE http://localhost:3000/api/customers/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p
```

## 🗂️ Estrutura do Projeto

```
src/
├── controllers/          # Controladores da API
│   └── customerController.ts
├── data/                # Dados mock (arquivo JSON)
│   └── customers.json
├── routes/              # Definição das rotas
│   └── customerRoutes.ts
├── services/            # Lógica de negócio
│   └── customerDataService.ts
├── types/               # Tipos e interfaces TypeScript
│   └── customer.ts
└── server.ts            # Servidor principal
```

## 🧪 Formato dos Dados

### Cliente
```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

### Resposta da API
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## 🔍 Scripts disponíveis

- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa a versão compilada
- `npm run dev` - Executa em modo desenvolvimento com hot reload
- `npm run watch` - Compila TypeScript em modo watch

## 🛠️ Tecnologias utilizadas

- **TypeScript** - Linguagem principal
- **Express.js** - Framework web
- **Node.js** - Runtime
- **UUID** - Geração de IDs únicos
- **CORS** - Política de CORS
- **ts-node-dev** - Desenvolvimento com hot reload

## 📄 Licença

Este projeto está sob a licença MIT.
