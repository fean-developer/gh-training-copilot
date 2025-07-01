# API de Clientes com Autenticação JWT - TypeScript

Uma API REST com autenticação JWT para gerenciar dados de clientes usando TypeScript, Express.js e arquivo JSON como mock de banco de dados.

## 🚀 Funcionalidades

- ✅ **Autenticação JWT** completa (login, registro, verificação)
- ✅ **Autorização baseada em roles** (admin/user)
- ✅ Criar cliente (requer autenticação)
- ✅ Buscar todos os clientes (dados básicos públicos, completos com auth)
- ✅ Buscar cliente por ID (requer autenticação)
- ✅ Atualizar cliente (requer autenticação)
- ✅ Deletar cliente (apenas admin)
- ✅ Buscar clientes por termo (requer autenticação)
- ✅ Health check
- ✅ **Tokens de teste expostos** para facilitar desenvolvimento

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

### 🔐 Autenticação

### 1. Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

### 2. Registro
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "novoUsuario",
  "email": "novo@email.com",
  "password": "senhaSegura",
  "role": "user"
}
```

### 3. Dados do usuário autenticado
```
GET /api/auth/me
Authorization: Bearer <token>
```

### 4. 🧪 Tokens de teste (apenas desenvolvimento)
```
GET /api/auth/test-tokens
```

### 📋 Clientes

### 5. Health Check
```
GET /health
```

### 6. Documentação
```
GET /
```

### 7. Listar todos os clientes
```
GET /api/customers
# Sem autenticação: dados básicos (nome, cidade, estado)
# Com autenticação: dados completos
Authorization: Bearer <token> (opcional)
```

### 8. Buscar cliente por ID
```
GET /api/customers/:id
Authorization: Bearer <token> (obrigatório)
```

### 9. Buscar clientes por termo
```
GET /api/customers/search?q=termo
Authorization: Bearer <token> (obrigatório)
```

### 10. Criar novo cliente
```
POST /api/customers
Authorization: Bearer <token> (obrigatório)
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

### 11. Atualizar cliente
```
PUT /api/customers/:id
Authorization: Bearer <token> (obrigatório)
Content-Type: application/json

{
  "name": "João Silva Santos",
  "phone": "+55 11 88888-5678"
}
```

### 12. Deletar cliente
```
DELETE /api/customers/:id
Authorization: Bearer <token> (apenas admin)
```

## � Autenticação e Autorização

### Usuários de Teste
A API vem com usuários pré-configurados para facilitar os testes:

| Username | Password | Role  | Permissões |
|----------|----------|-------|------------|
| `admin`  | `123456` | admin | Todas as operações |
| `usuario`| `123456` | user  | CRUD exceto deletar |
| `demo`   | `123456` | user  | CRUD exceto deletar |

### JWT Token
- **Validade**: 24 horas
- **Header**: `Authorization: Bearer <token>`
- **Secret exposto**: `meu-super-secret-jwt-key-para-testes-123456789` ⚠️ **Apenas para testes!**

### Níveis de Acesso
- **Público**: `GET /api/customers` (dados básicos)
- **Autenticado**: Todas as operações CRUD
- **Admin apenas**: `DELETE /api/customers/:id`

## 🧪 Tokens de Teste Prontos

Para facilitar os testes, você pode obter tokens válidos em:
```bash
curl http://localhost:3000/api/auth/test-tokens
```

Ou usar diretamente nos headers:
```bash
# Token de Admin
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Token de User  
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📝 Exemplos de uso com curl

### Login e obtenção de token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "123456"
  }'
```

### Obter tokens de teste
```bash
curl http://localhost:3000/api/auth/test-tokens
```

### Criar um cliente (com autenticação)
```bash
# Primeiro, faça login e copie o token
TOKEN="SEU_TOKEN_AQUI"

curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
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

### Buscar todos os clientes (sem autenticação - dados básicos)
```bash
curl http://localhost:3000/api/customers
```

### Buscar todos os clientes (com autenticação - dados completos)
```bash
curl http://localhost:3000/api/customers \
  -H "Authorization: Bearer $TOKEN"
```

## 🗂️ Estrutura do Projeto

```
src/
├── config/                  # Configurações
│   └── config.ts           # JWT secret e configs (⚠️ expostos para teste)
├── controllers/            # Controladores da API
│   ├── authController.ts   # Autenticação
│   └── customerController.ts
├── data/                   # Dados mock (arquivos JSON)
│   ├── customers.json      # Dados dos clientes
│   └── users.json         # Dados dos usuários
├── middleware/             # Middlewares
│   └── auth.ts            # Autenticação e autorização JWT
├── routes/                 # Definição das rotas
│   ├── authRoutes.ts      # Rotas de autenticação
│   └── customerRoutes.ts  # Rotas de clientes
├── services/               # Lógica de negócio
│   ├── authService.ts     # Serviço de autenticação
│   └── customerDataService.ts
├── types/                  # Tipos e interfaces TypeScript
│   ├── auth.ts            # Tipos de autenticação
│   └── customer.ts        # Tipos de cliente
└── server.ts              # Servidor principal
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
- **jsonwebtoken** - Geração e verificação de JWT
- **bcryptjs** - Hash de senhas
- **UUID** - Geração de IDs únicos
- **CORS** - Política de CORS
- **ts-node-dev** - Desenvolvimento com hot reload

## 📄 Licença

Este projeto está sob a licença MIT.
