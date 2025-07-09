# Deploy no Vercel - Instruções

## Pré-requisitos
1. Conta gratuita na Vercel (vercel.com)
2. CLI da Vercel instalada: `npm i -g vercel`

## Passos para Deploy

### 1. Instalar CLI da Vercel
```bash
npm install -g vercel
```

### 2. Login na Vercel
```bash
vercel login
```

### 3. Deploy do projeto
Na pasta do projeto, execute:
```bash
vercel
```

### 4. Configurar Vercel KV (Banco de Dados)
1. Acesse o dashboard da Vercel
2. Vá em seu projeto > Storage
3. Crie um novo "KV Database" (gratuito)
4. O banco será automaticamente conectado ao projeto

## Recursos Gratuitos Utilizados
- ✅ **Vercel Functions**: 100GB execução/mês
- ✅ **Vercel KV**: 30,000 comandos/mês  
- ✅ **Bandwidth**: 100GB/mês
- ✅ **Hosting**: Ilimitado

## Funcionalidades Mantidas
- ✅ Salvamento de entradas do diário
- ✅ Sistema de backup
- ✅ Todas as funcionalidades do frontend
- ✅ API completa funcionando

## Ambiente Local vs Produção
O código detecta automaticamente o ambiente:
- **Local**: Usa Express server (http://localhost:3001)
- **Vercel**: Usa Serverless Functions (/api)

## URLs após Deploy
- **Site**: https://seu-projeto.vercel.app
- **API**: https://seu-projeto.vercel.app/api/entries
- **Backup**: https://seu-projeto.vercel.app/api/backup

## Comandos Úteis
```bash
# Deploy de desenvolvimento
vercel dev

# Deploy de produção  
vercel --prod

# Ver logs
vercel logs
```
