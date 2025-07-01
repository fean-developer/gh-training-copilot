import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { ApiResponse } from '../types/customer';

const authService = new AuthService();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Token de acesso requerido'
    };
    return res.status(401).json(response);
  }

  const decoded = authService.verifyToken(token);
  if (!decoded) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Token inválido ou expirado'
    };
    return res.status(403).json(response);
  }

  // Buscar dados completos do usuário
  const user = authService.getUserById(decoded.userId);
  if (!user) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Usuário não encontrado'
    };
    return res.status(404).json(response);
  }

  req.user = user;
  next();
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Usuário não autenticado'
      };
      return res.status(401).json(response);
    }

    if (!roles.includes(req.user.role)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Acesso negado: permissões insuficientes'
      };
      return res.status(403).json(response);
    }

    next();
  };
};

// Middleware opcional - não falha se não tiver token
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const decoded = authService.verifyToken(token);
    if (decoded) {
      const user = authService.getUserById(decoded.userId);
      req.user = user || undefined;
    }
  }

  next();
};
