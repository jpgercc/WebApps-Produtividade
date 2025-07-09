# 📖 Diário WebApp

Uma aplicação web moderna e minimalista para escrever e organizar suas reflexões diárias. Desenvolvida com foco na simplicidade e experiência do usuário.

## ✨ Características

- **Interface Limpa**: Design minimalista inspirado em revistas e editores de texto modernos
- **Tema Escuro/Claro**: Alternância fácil entre temas para conforto visual
- **Salvamento Automático**: Suas entradas são salvas automaticamente no arquivo local
- **Busca Inteligente**: Pesquise por palavras-chave em todas as suas entradas
- **Backup Local**: Sistema de backup integrado dos seus dados
- **Responsive**: Funciona perfeitamente em desktop e dispositivos móveis
- **Tipografia Elegante**: Fonte Courier New para uma experiência de escrita autêntica

## 🚀 Início Rápido

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
   
   Abra seu navegador e vá para: `http://localhost:3001`

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
├── /node_modules           # Dependencias do node (criado automaticamente)
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
  "cors": "^2.8.5"
}
```

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento (com nodemon)

## 💾 Armazenamento de Dados

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

- **Dados Locais**: Todos os dados ficam no seu computador
- **Sem Conexão Externa**: Nenhum dado é enviado para servidores externos
- **Backup Local**: Controle total sobre seus backups

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Porta já em uso (EADDRINUSE)**
   
   Se você receber o erro `Error: listen EADDRINUSE: address already in use :::3001`:
   
   **Solução 1: Finalizar processo que usa a porta**
   ```bash
   # 1. Verificar qual processo está usando a porta
   netstat -ano | findstr :3001
   
   # 2. Finalizar o processo (substitua XXXX pelo PID encontrado)
   taskkill /PID XXXX /F
   
   # 3. Tentar iniciar novamente
   npm start
   ```
   
   **Solução 2: Usar uma porta diferente**
   - Edite o arquivo `server.js` e mude a linha da porta:
   ```javascript
   const PORT = process.env.PORT || 3002; // ou outra porta disponível
   ```

2. **Limpar cache do servidor/npm**
   ```bash
   # Limpar cache do npm
   npm cache clean --force
   
   # Remover node_modules e reinstalar
   rmdir /s node_modules
   del package-lock.json
   npm install
   
   # Ou use o comando completo
   npm cache clean --force && rmdir /s node_modules && del package-lock.json && npm install
   ```

3. **Erro ao instalar dependências**
   ```bash
   # Método 1: Limpar cache e reinstalar
   npm cache clean --force
   npm install
   
   # Método 2: Reinstalação completa
   rmdir /s node_modules
   npm install
   
   # Método 3: Usar yarn como alternativa
   npm install -g yarn
   yarn install
   ```

4. **Arquivo de dados não encontrado**
   - O arquivo `diary-data.json` é criado automaticamente na primeira execução
   - Se o arquivo foi corrompido, renomeie-o e um novo será criado:
   ```bash
   ren diary-data.json diary-data.json.backup
   ```

5. **Servidor não responde ou trava**
   ```bash
   # Verificar processos Node.js em execução
   tasklist | findstr node
   
   # Finalizar todos os processos Node.js (se necessário)
   taskkill /IM node.exe /F
   ```

6. **Problema de permissões (Windows)**
   - Execute o terminal como Administrador
   - Ou mude a pasta de instalação para uma pasta sem restrições

### Comandos Úteis para Diagnóstico

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar portas em uso
netstat -ano | findstr :300

# Verificar processos Node.js
tasklist | findstr node

# Limpar completamente e reinstalar
npm cache clean --force && rmdir /s node_modules && del package-lock.json && npm install
```

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
