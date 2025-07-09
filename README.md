# 📖 Diário WebApp

Uma aplicação web moderna e minimalista para escrever e organizar suas reflexões diárias. Desenvolvida com foco na simplicidade e experiência do usuário.

**🌐 Deploy na Vercel com banco de dados gratuito incluído!**

## ✨ Características

- **Interface Limpa**: Design minimalista inspirado em revistas e editores de texto modernos
- **Tema Escuro/Claro**: Alternância fácil entre temas para conforto visual
- **Salvamento na Nuvem**: Dados salvos automaticamente no Vercel KV (Redis)
- **Busca Inteligente**: Pesquise por palavras-chave em todas as suas entradas
- **Backup Online**: Sistema de backup integrado acessível de qualquer lugar
- **Responsive**: Funciona perfeitamente em desktop e dispositivos móveis
- **Tipografia Elegante**: Fonte Courier New para uma experiência de escrita autêntica
- **Deploy Gratuito**: Hospedagem gratuita na Vercel com banco de dados incluído

## 🚀 Opções de Uso

### Opção 1: Deploy na Vercel (Recomendado)
**Completamente GRATUITO** - Acesse de qualquer lugar!

Veja as instruções completas em: [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)

**Resumo rápido:**
```bash
# 1. Instale a CLI da Vercel
npm install -g vercel

# 2. Faça login
vercel login

# 3. Deploy o projeto
vercel
```

### Opção 2: Execução Local

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone ou baixe o projeto**
   ```bash
   git clone <url-do-repositorio>
   cd diario
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   
   **Opção 1: Via npm**
   ```bash
   npm start
   ```
   
   **Opção 2: Via arquivo batch (Windows)**
   ```bash
   start-diario.bat
   ```

4. **Acesse a aplicação**
   
   Abra seu navegador e vá para: `http://localhost:8000`

## 📱 Como Usar

### Escrevendo uma Nova Entrada

1. Clique no botão **"+ Nova Entrada"**
2. Escreva seu título e conteúdo
3. A entrada será salva automaticamente
4. Use **Ctrl+S** para salvar manualmente a qualquer momento

### Navegação

- **Buscar**: Use a barra de busca para encontrar entradas específicas
- **Tema**: Clique no ícone de tema para alternar entre claro/escuro
- **Editar**: Clique em qualquer entrada para editá-la
- **Backup**: Use o botão de backup para baixar suas entradas

### Atalhos de Teclado

- `Ctrl + S` - Salvar entrada atual
- `Ctrl + N` - Nova entrada
- `Esc` - Sair do modo de edição

## 🛠️ Estrutura do Projeto

```
diario/
├── index.html              # Interface principal da aplicação
├── styles.css              # Estilos CSS da aplicação
├── script.js               # Lógica JavaScript da aplicação
├── server.js               # Servidor Express principal
├── server-integration.js   # Integração do servidor com frontend
├── diary-data.json         # Arquivo de dados (criado automaticamente)
├── package.json            # Dependências e scripts npm
├── package-lock.json       # Lock das dependências
├── start-diario.bat        # Script de inicialização (Windows)
├── node_modules/           # Dependências instaladas (criado automaticamente)
├── backup/                 # Pasta de backup e arquivos auxiliares
│   ├── off_diurnalis.html  # Versão offline do diário
│   ├── script.js           # Scripts auxiliares de backup
│   ├── styles.css          # Estilos auxiliares de backup
│   └── assets/             # Imagens e recursos do projeto
│       ├── proj_cntrl_estoque.png
│       ├── proj_freeway.png
│       ├── proj_pass_man.png
│       ├── unique.png
│       ├── zeo.png
│       └── zeoses.png
└── README.md               # Documentação do projeto
```

## 🔧 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com CSS Grid e Flexbox
- **JavaScript (ES6+)** - Lógica da aplicação e interatividade

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para requisições cross-origin

### Dependências
```json
{
  "express": "^4.21.2",
  "cors": "^2.8.5",
  "@vercel/kv": "^1.0.1"
}
```

## 🌐 Ambientes Suportados

### Vercel (Produção)
- **Frontend**: Hospedagem estática global
- **Backend**: Serverless Functions
- **Banco**: Vercel KV (Redis)
- **URL**: https://seu-projeto.vercel.app

### Local (Desenvolvimento)
- **Frontend**: Servido pelo Express
- **Backend**: Express.js server
- **Banco**: arquivo JSON local

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento (com nodemon)

## 💾 Armazenamento de Dados

### Vercel (Produção)
- **Banco de Dados**: Vercel KV (Redis) - Gratuito até 30,000 comandos/mês
- **Backup**: Disponível via API `/api/backup`
- **Sincronização**: Automática entre dispositivos

### Local (Desenvolvimento)  
- **Arquivo Local**: `diary-data.json` - Todas as entradas são salvas localmente
- **Backup Automático**: Sistema de backup integrado
- **Formato JSON**: Dados estruturados para fácil migração

### Estrutura dos Dados
```json
[
  {
    "id": "unique-id",
    "title": "Título da Entrada",
    "content": "Conteúdo da entrada...",
    "date": "2025-07-08",
    "timestamp": 1720425600000
  }
]
```

## 🎨 Personalização

### Temas
A aplicação suporta temas claro e escuro. As cores podem ser personalizadas editando as variáveis CSS em `index.html`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --accent-color: #000000;
  /* ... outras variáveis */
}
```

### Fontes
Por padrão, usa `Courier New` para uma experiência de escrita autêntica. Pode ser alterado no CSS.

## 🔒 Privacidade e Segurança

### Versão Vercel
- **Dados na Nuvem**: Armazenados no Vercel KV (criptografados)
- **Acesso Privado**: Apenas você tem acesso aos seus dados
- **HTTPS**: Conexão segura sempre
- **Backup**: Disponível para download a qualquer momento

### Versão Local
- **Dados Locais**: Todos os dados ficam no seu computador
- **Sem Conexão Externa**: Nenhum dado é enviado para servidores externos
- **Backup Local**: Controle total sobre seus backups

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Porta 3000 já em uso**
   ```bash
   # Mude a porta no server.js
   const PORT = 3001; // ou outra porta disponível
   ```

2. **Erro ao instalar dependências**
   ```bash
   # Limpe o cache e reinstale
   npm cache clean --force
   npm install
   ```

3. **Arquivo de dados não encontrado**
   - O arquivo `diary-data.json` é criado automaticamente na primeira execução

## 📈 Roadmap

- [ ] Sistema de categorias/tags
- [ ] Exportação para PDF/Word
- [ ] Modo de visualização de calendário
- [ ] Busca avançada com filtros
- [ ] Sincronização em nuvem (opcional)
- [ ] Aplicativo desktop (Electron)

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. Abra uma issue no repositório
2. Descreva o problema detalhadamente
3. Inclua informações do seu ambiente (OS, Node.js version, etc.)

---

**Desenvolvido com ❤️ para escritores e pensadores**

*Mantenha suas reflexões organizadas e acessíveis com esta ferramenta simples e poderosa.*
