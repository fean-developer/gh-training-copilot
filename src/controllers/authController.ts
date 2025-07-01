import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import { config } from '../config/config';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const loginData: LoginRequest = req.body;

      if (!loginData.username || !loginData.password) {
        const response: AuthResponse = {
          success: false,
          error: 'Username e password são obrigatórios'
        };
        return res.status(400).json(response);
      }

      const result = await this.authService.login(loginData);
      
      if (!result) {
        const response: AuthResponse = {
          success: false,
          error: 'Credenciais inválidas'
        };
        return res.status(401).json(response);
      }

      const response: AuthResponse = {
        success: true,
        token: result.token,
        user: result.user,
        expiresIn: config.JWT_EXPIRATION,
        message: 'Login realizado com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro no login:', error);
      const response: AuthResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const registerData: RegisterRequest = req.body;

      if (!registerData.username || !registerData.email || !registerData.password) {
        const response: AuthResponse = {
          success: false,
          error: 'Username, email e password são obrigatórios'
        };
        return res.status(400).json(response);
      }

      if (registerData.password.length < 6) {
        const response: AuthResponse = {
          success: false,
          error: 'Password deve ter pelo menos 6 caracteres'
        };
        return res.status(400).json(response);
      }

      const result = await this.authService.register(registerData);
      
      if (!result) {
        const response: AuthResponse = {
          success: false,
          error: 'Erro ao criar usuário'
        };
        return res.status(500).json(response);
      }

      const response: AuthResponse = {
        success: true,
        token: result.token,
        user: result.user,
        expiresIn: config.JWT_EXPIRATION,
        message: 'Usuário criado com sucesso'
      };
      
      res.status(201).json(response);
    } catch (error: any) {
      console.error('Erro no registro:', error);
      const response: AuthResponse = {
        success: false,
        error: error.message || 'Erro interno do servidor'
      };
      res.status(error.message?.includes('já existe') ? 409 : 500).json(response);
    }
  };

  me = (req: Request, res: Response) => {
    try {
      if (!req.user) {
        const response: AuthResponse = {
          success: false,
          error: 'Usuário não autenticado'
        };
        return res.status(401).json(response);
      }

      const response: AuthResponse = {
        success: true,
        user: req.user,
        message: 'Dados do usuário obtidos com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      const response: AuthResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  };

  generateTestTokens = (req: Request, res: Response) => {
    try {
      const tokens = this.authService.generateTestTokens();
      
      res.json({
        success: true,
        message: 'Tokens de teste gerados com sucesso',
        data: {
          tokens,
          usage: 'Use o header: Authorization: Bearer <token>',
          testUsers: config.TEST_USERS,
          note: '⚠️  Apenas para testes! Em produção, use login real.'
        }
      });
    } catch (error) {
      console.error('Erro ao gerar tokens:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  };
}
