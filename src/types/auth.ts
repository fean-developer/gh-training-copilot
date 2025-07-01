export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // Hash da senha
  role: 'admin' | 'user';
  createdAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Omit<User, 'password'>;
  expiresIn?: string;
  message?: string;
  error?: string;
}

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
}

// Estender o tipo Request do Express para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>;
    }
  }
}
