import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const authController = new AuthController();

// POST /api/auth/login - Fazer login
router.post('/login', authController.login);

// POST /api/auth/register - Registrar novo usuário
router.post('/register', authController.register);

// GET /api/auth/me - Obter dados do usuário autenticado
router.get('/me', authenticateToken, authController.me);

// GET /api/auth/test-tokens - Gerar tokens de teste (apenas para desenvolvimento)
router.get('/test-tokens', authController.generateTestTokens);

export default router;
