import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: true, // Permite qualquer origem durante desenvolvimento
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static('public'));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: 'API de Clientes com Autenticação JWT',
    version: '1.0.0',
    endpoints: {
      'GET /health': 'Health check',
      'POST /api/auth/login': 'Fazer login',
      'POST /api/auth/register': 'Registrar usuário',
      'GET /api/auth/me': 'Dados do usuário autenticado',
      'GET /api/auth/test-tokens': 'Gerar tokens de teste',
      'GET /api/customers': 'Listar clientes (dados básicos sem auth)',
      'GET /api/customers/:id': 'Buscar cliente por ID (requer auth)',
      'GET /api/customers/search?q=termo': 'Buscar clientes (requer auth)',
      'POST /api/customers': 'Criar cliente (requer auth)',
      'PUT /api/customers/:id': 'Atualizar cliente (requer auth)',
      'DELETE /api/customers/:id': 'Deletar cliente (requer admin)'
    },
    authentication: {
      type: 'Bearer JWT',
      header: 'Authorization: Bearer <token>',
      testUsers: {
        admin: 'username: admin, password: 123456',
        user: 'username: usuario, password: 123456',
        demo: 'username: demo, password: 123456'
      }
    }
  });
});

// Middleware de tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint não encontrado'
  });
});

// Middleware de tratamento de erros globais
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}`);
  console.log(`🏥 Health check em: http://localhost:${PORT}/health`);
});

export default app;
