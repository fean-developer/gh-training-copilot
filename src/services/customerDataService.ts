import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../types/customer';

export class CustomerDataService {
  private dataFilePath: string;

  constructor() {
    this.dataFilePath = path.join(__dirname, '../data/customers.json');
  }

  private readCustomers(): Customer[] {
    try {
      const data = fs.readFileSync(this.dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao ler arquivo de clientes:', error);
      return [];
    }
  }

  private writeCustomers(customers: Customer[]): void {
    try {
      fs.writeFileSync(this.dataFilePath, JSON.stringify(customers, null, 2));
    } catch (error) {
      console.error('Erro ao escrever arquivo de clientes:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  getAllCustomers(): Customer[] {
    return this.readCustomers();
  }

  getCustomerById(id: string): Customer | null {
    const customers = this.readCustomers();
    return customers.find(customer => customer.id === id) || null;
  }

  createCustomer(customerData: CreateCustomerRequest): Customer {
    const customers = this.readCustomers();
    const now = new Date().toISOString();
    
    const newCustomer: Customer = {
      id: uuidv4(),
      ...customerData,
      createdAt: now,
      updatedAt: now
    };

    customers.push(newCustomer);
    this.writeCustomers(customers);
    
    return newCustomer;
  }

  updateCustomer(id: string, updateData: UpdateCustomerRequest): Customer | null {
    const customers = this.readCustomers();
    const customerIndex = customers.findIndex(customer => customer.id === id);
    
    if (customerIndex === -1) {
      return null;
    }

    const updatedCustomer: Customer = {
      ...customers[customerIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    customers[customerIndex] = updatedCustomer;
    this.writeCustomers(customers);
    
    return updatedCustomer;
  }

  deleteCustomer(id: string): boolean {
    const customers = this.readCustomers();
    const initialLength = customers.length;
    const filteredCustomers = customers.filter(customer => customer.id !== id);
    
    if (filteredCustomers.length === initialLength) {
      return false; // Cliente não encontrado
    }

    this.writeCustomers(filteredCustomers);
    return true;
  }

  searchCustomers(query: string): Customer[] {
    const customers = this.readCustomers();
    const searchTerm = query.toLowerCase();
    
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm)
    );
  }
}
