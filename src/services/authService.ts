import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';
import { User, LoginRequest, RegisterRequest, JWTPayload } from '../types/auth';
import { config } from '../config/config';

export class AuthService {
  private usersFilePath: string;

  constructor() {
    this.usersFilePath = path.join(__dirname, '../data/users.json');
  }

  private readUsers(): User[] {
    try {
      const data = fs.readFileSync(this.usersFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao ler arquivo de usuários:', error);
      return [];
    }
  }

  private writeUsers(users: User[]): void {
    try {
      fs.writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Erro ao escrever arquivo de usuários:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  async login(loginData: LoginRequest): Promise<{ token: string; user: Omit<User, 'password'> } | null> {
    const users = this.readUsers();
    const user = users.find(u => u.username === loginData.username || u.email === loginData.username);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = this.generateToken(user);
    const { password, ...userWithoutPassword } = user;
    
    return {
      token,
      user: userWithoutPassword
    };
  }

  async register(registerData: RegisterRequest): Promise<{ token: string; user: Omit<User, 'password'> } | null> {
    const users = this.readUsers();
    
    // Verificar se usuário já existe
    const existingUser = users.find(u => u.username === registerData.username || u.email === registerData.email);
    if (existingUser) {
      throw new Error('Usuário ou email já existe');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    
    const newUser: User = {
      id: uuidv4(),
      username: registerData.username,
      email: registerData.email,
      password: hashedPassword,
      role: registerData.role || 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.writeUsers(users);

    const token = this.generateToken(newUser);
    const { password, ...userWithoutPassword } = newUser;
    
    return {
      token,
      user: userWithoutPassword
    };
  }

  generateToken(user: User): string {
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbi0xMjMiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE0ODc5NTcsImV4cCI6MTc1MTU3NDM1N30.6IgM2KIyQi3Dz84IJaBQJzTlUqES_UtZ7tqaLqHdXlU", { 
      expiresIn: config.JWT_EXPIRATION 
    });
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  getUserById(id: string): Omit<User, 'password'> | null {
    const users = this.readUsers();
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Método para facilitar testes - gera tokens para usuários existentes
  generateTestTokens(): { [key: string]: string } {
    const users = this.readUsers();
    const tokens: { [key: string]: string } = {};
    
    users.forEach(user => {
      tokens[user.username] = this.generateToken(user);
    });
    
    return tokens;
  }
}
