import { Router } from 'express';
import { CustomerController } from '../controllers/customerController';

const router = Router();
const customerController = new CustomerController();

// GET /api/customers - Buscar todos os clientes
router.get('/', customerController.getAllCustomers);

// GET /api/customers/search?q=termo - Buscar clientes por termo
router.get('/search', customerController.searchCustomers);

// GET /api/customers/:id - Buscar cliente por ID
router.get('/:id', customerController.getCustomerById);

// POST /api/customers - Criar novo cliente
router.post('/', customerController.createCustomer);

// PUT /api/customers/:id - Atualizar cliente
router.put('/:id', customerController.updateCustomer);

// DELETE /api/customers/:id - Deletar cliente
router.delete('/:id', customerController.deleteCustomer);

export default router;
