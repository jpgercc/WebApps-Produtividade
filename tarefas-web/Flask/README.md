# Diário Digital - Backend Flask

Este é um backend em Python/Flask para um aplicativo de diário digital.

## Instalação e Execução

### Opção 1: Usando o arquivo batch (Windows)
```bash
start_server.bat
```

### Opção 2: Manual
1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Execute o servidor:
```bash
python app.py
```

## Acesso
- O servidor estará disponível em: http://localhost:5000
- A interface web será servida automaticamente na raiz

## API Endpoints

### Entradas do Diário
- `GET /api/entries` - Listar todas as entradas
- `POST /api/entries` - Salvar todas as entradas
- `GET /api/entries/<id>` - Obter entrada específica
- `PUT /api/entries/<id>` - Atualizar entrada específica
- `DELETE /api/entries/<id>` - Deletar entrada específica

### Busca e Estatísticas
- `GET /api/search?q=<termo>` - Buscar entradas
- `GET /api/stats` - Obter estatísticas do diário
- `GET /api/health` - Verificar status do servidor

## Estrutura dos Dados

As entradas são salvas no arquivo `diary-data.json` com a seguinte estrutura:

```json
[
  {
    "id": "identificador_único",
    "date": "2025-07-12",
    "title": "Título da entrada",
    "content": "Conteúdo da entrada..."
  }
]
```

## Funcionalidades

- ✅ CORS habilitado para desenvolvimento
- ✅ Servir arquivos estáticos (HTML, CSS, JS)
- ✅ API RESTful completa
- ✅ Persistência em arquivo JSON
- ✅ Busca por texto
- ✅ Estatísticas automáticas
- ✅ Tratamento de erros
- ✅ Validação de dados
