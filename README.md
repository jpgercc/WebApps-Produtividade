# 📖 Diario Web

Uma aplicação web moderna e minimalista para escrever e organizar suas reflexões diárias. Desenvolvida com foco na simplicidade e experiência do usuário.

![image](https://github.com/user-attachments/assets/cd7fae71-7fd1-4107-8c94-df94eb0563ae)

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
   
   Abra seu navegador e vá para: `http://localhost:3000`

## 📱 Como Usar

### Escrevendo uma Nova Entrada

1. Clique no botão **"+ Nova Entrada"**
2. Escreva seu título e conteúdo
3. A entrada será salva automaticamente

### Navegação

- **Buscar**: Use a barra de busca para encontrar entradas específicas
- **Tema**: Clique no ícone de tema para alternar entre claro/escuro
- **Editar**: Clique em qualquer entrada para editá-la


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
└── README.md               # Documentação do projeto
```

### Dependências
```json
{
  "express": "^4.21.2",
  "cors": "^2.8.5"
}
```

## 💾 Armazenamento de Dados

- **Arquivo Local**: `diary-data.json` - Todas as entradas são salvas localmente
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

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. Abra uma issue no repositório
2. Descreva o problema detalhadamente
3. Inclua informações do seu ambiente (OS, Node.js version, etc.)

---

*Mantenha suas reflexões organizadas e acessíveis.*
