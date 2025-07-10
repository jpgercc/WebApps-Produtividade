# ✅ Lista de Tarefas WebApp

Uma aplicação web moderna e eficiente para gerenciar suas tarefas diárias. Desenvolvida com foco na produtividade e simplicidade de uso.

## ✨ Características

- **Interface Intuitiva**: Design limpo e moderno para máxima produtividade
- **Tema Escuro/Claro**: Alternância fácil entre temas para conforto visual
- **Categorização**: Organize suas tarefas por categorias (Trabalho, Pessoal, Estudos, etc.)
- **Prioridades**: Defina prioridades (Alta, Média, Baixa) para suas tarefas
- **Datas de Vencimento**: Acompanhe prazos com sistema de notificação visual
- **Busca Inteligente**: Pesquise tarefas por título, descrição ou categoria
- **Adição Rápida**: Campo de entrada rápida na página inicial
- **Filtros Avançados**: Filtre por prioridade e categoria
- **Backup Local**: Sistema de backup integrado dos seus dados
- **Responsive**: Funciona perfeitamente em desktop e dispositivos móveis
- **Salvamento Automático**: Suas tarefas são salvas automaticamente

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone ou baixe o projeto**
   ```bash
   git clone <url-do-repositorio>
   cd lista-tarefas
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
   
   Abra seu navegador e vá para: `http://localhost:3002`

## 📱 Como Usar

### Adicionando uma Nova Tarefa

1. **Método 1 - Adição Rápida**: Digite no campo "Adicionar tarefa rapidamente..." na página inicial
2. **Método 2 - Formulário Completo**: 
   - Clique no botão **"Nova Tarefa"**
   - Preencha título, descrição (opcional), prioridade, categoria e data de vencimento
   - Clique em **"Salvar"**

### Gerenciando Tarefas

- **Marcar como Concluída**: Clique no checkbox ao lado da tarefa
- **Editar**: Clique no ícone de lápis ou na própria tarefa
- **Excluir**: Clique no ícone de lixeira
- **Filtrar**: Use os filtros de prioridade e categoria
- **Buscar**: Use a barra de busca para encontrar tarefas específicas

### Navegação

- **Início**: Visão geral com estatísticas e adição rápida
- **Tarefas**: Lista de tarefas pendentes com filtros
- **Concluídas**: Histórico de tarefas concluídas
- **Pesquisar**: Busca avançada por todas as tarefas
- **Tema**: Alternar entre tema claro e escuro

### Categorias Disponíveis

- 🏢 **Trabalho**: Tarefas profissionais
- 👤 **Pessoal**: Tarefas pessoais
- 📚 **Estudos**: Atividades acadêmicas
- 🏥 **Saúde**: Compromissos médicos e cuidados pessoais
- 🛒 **Compras**: Lista de compras
- 📋 **Outros**: Tarefas diversas

## 🛠️ Estrutura do Projeto

```
lista-tarefas/
├── index.html              # Interface principal da aplicação
├── styles.css              # Estilos CSS da aplicação
├── script.js               # Lógica JavaScript da aplicação
├── server.js               # Servidor Express principal
├── server-integration.js   # Integração do servidor com frontend
├── tasks-data.json         # Arquivo de dados (criado automaticamente)
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

- **Arquivo Local**: `tasks-data.json` - Todas as tarefas são salvas localmente
- **Backup Automático**: Sistema de backup integrado
- **Formato JSON**: Dados estruturados para fácil migração

### Estrutura dos Dados
```json
[
  {
    "id": "unique-id",
    "title": "Título da Tarefa",
    "description": "Descrição da tarefa (opcional)",
    "priority": "high|medium|low",
    "category": "work|personal|study|health|shopping|other",
    "dueDate": "2025-07-10",
    "completed": false,
    "createdAt": "2025-07-09T10:00:00.000Z",
    "updatedAt": "2025-07-09T10:00:00.000Z",
    "completedAt": null
  }
]
```

## 🎨 Personalização

### Temas
A aplicação suporta temas claro e escuro. As cores podem ser personalizadas editando as variáveis CSS em `styles.css`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --accent-color: #000000;
  /* ... outras variáveis */
}
```

### Categorias
Para adicionar novas categorias, edite as opções no arquivo `index.html` e adicione os estilos correspondentes no arquivo `styles.css`.

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
