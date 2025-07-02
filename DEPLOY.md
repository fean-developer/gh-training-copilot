# 🚀 Deploy da API de Clientes

## 📋 Opções de Hospedagem

### 1. **Vercel** (Recomendado - Gratuito)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Fazer login
vercel login

# 3. Deploy
vercel --prod
```

**Vantagens:**
- ✅ Gratuito
- ✅ Deploy automático do GitHub
- ✅ HTTPS automático
- ✅ Serverless functions

### 2. **Railway** (Gratuito com limites)

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login e deploy
railway login
railway deploy
```

### 3. **Render** (Gratuito com limitações)

1. Conecte seu repositório GitHub no [Render](https://render.com)
2. Configure:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node.js

### 4. **GitHub Pages + API Externa**

#### Frontend (GitHub Pages):
1. Ative GitHub Pages nas configurações do repositório
2. Escolha a pasta `/docs` como source
3. Acesse: `https://SEU_USUARIO.github.io/REPO_NAME`

#### Backend (Vercel/Railway):
1. Deploy da API em serviço externo
2. Configure CORS para permitir o domínio do GitHub Pages
3. Atualize a URL da API no frontend

## ⚙️ Configuração para Produção

### Variáveis de Ambiente

Crie um arquivo `.env` (não commitado):

```bash
# .env
PORT=3000
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
NODE_ENV=production
```

### CORS para GitHub Pages

O CORS já está configurado para aceitar:
- `*.github.io`
- `*.vercel.app`
- `*.netlify.app`
- `localhost`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Deploy Vercel
npm run deploy:vercel

# Build e start
npm run deploy:build
```

## 📱 Frontend Otimizado

O arquivo `docs/index.html` está otimizado para:
- ✅ Funcionar com qualquer URL de API
- ✅ Interface moderna e responsiva
- ✅ Configuração dinâmica de endpoints
- ✅ Indicadores de status de conexão
- ✅ Estatísticas em tempo real

### Como usar:

1. **Local**: Abra `docs/index.html` no navegador
2. **GitHub Pages**: Configure nas settings do repo
3. **Atualize a URL da API** na interface

## 🌐 Exemplo de Deployment Completo

### 1. Deploy da API no Vercel:
```bash
vercel --prod
# URL: https://minha-api.vercel.app
```

### 2. Configurar GitHub Pages:
- Settings → Pages → Source: `/docs`
- URL: https://usuario.github.io/repo

### 3. Conectar Frontend à API:
- Abrir GitHub Pages
- Configurar URL: `https://minha-api.vercel.app`
- Testar conexão

## 🔒 Segurança em Produção

### ⚠️ **IMPORTANTE**: 
- Remova o JWT secret do código
- Use variáveis de ambiente
- Configure HTTPS
- Valide todas as entradas
- Implemente rate limiting

### Exemplo de configuração segura:

```typescript
// config/config.ts (produção)
export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret',
  JWT_EXPIRATION: '24h',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};
```

## 📊 Monitoramento

Para produção, considere adicionar:
- Logs estruturados
- Métricas de performance
- Health checks
- Error tracking (Sentry)
- Analytics

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Add nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request
