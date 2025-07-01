// ⚠️  ATENÇÃO: Este arquivo contém secrets em texto plano apenas para fins de demonstração/teste
// Em produção, use variáveis de ambiente (.env) e nunca commite secrets no código!

export const config = {
  // JWT Secret - Em produção, use process.env.JWT_SECRET
  JWT_SECRET: 'meu-super-secret-jwt-key-para-testes-123456789',
  
  // Tempo de expiração do token (24 horas)
  JWT_EXPIRATION: '24h',
  
  // Configurações da API
  PORT: process.env.PORT || 3000,
  
  // Usuários de teste (senha: "123456" para todos)
  TEST_USERS: {
    admin: {
      username: 'admin',
      password: '123456', // Hash: $2a$10$N9qo8uLOickgx2ZMRZoMye.l2A8b9W9lKLK9e7sZvEMILqL3j6XAO
      role: 'admin'
    },
    usuario: {
      username: 'usuario', 
      password: '123456',
      role: 'user'
    },
    demo: {
      username: 'demo',
      password: '123456',
      role: 'user'
    }
  }
};

// Exemplo de JWT gerado para testes rápidos (válido por 24h a partir da criação):
export const EXAMPLE_JWT = {
  admin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbi0xMjMiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTk4NjQwMDAsImV4cCI6MTcxOTk1MDQwMH0',
  user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTQ1NiIsInVzZXJuYW1lIjoidXN1YXJpbyIsImVtYWlsIjoidXN1YXJpb0BlbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTg2NDAwMCwiZXhwIjoxNzE5OTUwNDAwfQ'
};
