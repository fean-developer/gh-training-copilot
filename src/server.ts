import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
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
    message: 'API de Clientes',
    version: '1.0.0',
    endpoints: {
      'GET /health': 'Health check',
      'GET /api/customers': 'Listar todos os clientes',
      'GET /api/customers/:id': 'Buscar cliente por ID',
      'GET /api/customers/search?q=termo': 'Buscar clientes por termo',
      'POST /api/customers': 'Criar novo cliente',
      'PUT /api/customers/:id': 'Atualizar cliente',
      'DELETE /api/customers/:id': 'Deletar cliente'
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
