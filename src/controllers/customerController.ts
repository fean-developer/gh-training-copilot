import { Request, Response } from 'express';
import { CustomerDataService } from '../services/customerDataService';
import { CreateCustomerRequest, UpdateCustomerRequest, ApiResponse } from '../types/customer';

export class CustomerController {
  private customerService: CustomerDataService;

  constructor() {
    this.customerService = new CustomerDataService();
  }

  getAllCustomers = (req: Request, res: Response) => {
    try {
      const customers = this.customerService.getAllCustomers();
      const response: ApiResponse<typeof customers> = {
        success: true,
        data: customers,
        message: `${customers.length} clientes encontrados`
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  };

  getCustomerById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const customer = this.customerService.getCustomerById(id);
      
      if (!customer) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Cliente não encontrado'
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<typeof customer> = {
        success: true,
        data: customer,
        message: 'Cliente encontrado com sucesso'
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  };

  createCustomer = (req: Request, res: Response) => {
    try {
      const customerData: CreateCustomerRequest = req.body;
      
      // Validação básica
      if (!customerData.name || !customerData.email || !customerData.phone) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Nome, email e telefone são obrigatórios'
        };
        return res.status(400).json(response);
      }

      const newCustomer = this.customerService.createCustomer(customerData);
      const response: ApiResponse<typeof newCustomer> = {
        success: true,
        data: newCustomer,
        message: 'Cliente criado com sucesso'
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  };

  updateCustomer = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData: UpdateCustomerRequest = req.body;
      
      const updatedCustomer = this.customerService.updateCustomer(id, updateData);
      
      if (!updatedCustomer) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Cliente não encontrado'
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<typeof updatedCustomer> = {
        success: true,
        data: updatedCustomer,
        message: 'Cliente atualizado com sucesso'
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  };

  deleteCustomer = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = this.customerService.deleteCustomer(id);
      
      if (!deleted) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Cliente não encontrado'
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse<null> = {
        success: true,
        message: 'Cliente deletado com sucesso'
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  };

  searchCustomers = (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Parâmetro de busca (q) é obrigatório'
        };
        return res.status(400).json(response);
      }

      const customers = this.customerService.searchCustomers(q);
      const response: ApiResponse<typeof customers> = {
        success: true,
        data: customers,
        message: `${customers.length} clientes encontrados para "${q}"`
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  };
}
