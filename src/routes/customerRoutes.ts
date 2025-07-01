import { Router } from 'express';
import { CustomerController } from '../controllers/customerController';
import { authenticateToken, requireRole, optionalAuth } from '../middleware/auth';

const router = Router();
const customerController = new CustomerController();

// GET /api/customers - Buscar todos os clientes (autenticação opcional - mais dados se autenticado)
router.get('/', optionalAuth, customerController.getAllCustomers);

// GET /api/customers/search?q=termo - Buscar clientes por termo (requer autenticação)
router.get('/search', authenticateToken, customerController.searchCustomers);

// GET /api/customers/:id - Buscar cliente por ID (requer autenticação)
router.get('/:id', authenticateToken, customerController.getCustomerById);

// POST /api/customers - Criar novo cliente (requer autenticação)
router.post('/', authenticateToken, customerController.createCustomer);

// PUT /api/customers/:id - Atualizar cliente (requer autenticação)
router.put('/:id', authenticateToken, customerController.updateCustomer);

// DELETE /api/customers/:id - Deletar cliente (apenas admin)
router.delete('/:id', authenticateToken, requireRole(['admin']), customerController.deleteCustomer);

export default router;
