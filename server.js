const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001; // Porta alternativa para evitar conflitos

// const PORT = 3000; // Usada geralmente para desenvolvimento (Express)
// cons PORT = 7000; // Usada para aplicações Node.js
// const PORT = 5000; // Usada para aplicações web
// const PORT = 4000; // Usada para aplicações de teste
// const PORT = 6000; // Usada para aplicações de produção
const DATA_FILE = path.join(__dirname, 'diary-data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Favicon routes
app.get('/favicon.ico', (req, res) => {
    res.redirect('/favicon.svg');
});

app.get('/favicon.svg', (req, res) => {
    const faviconPath = path.join(__dirname, 'favicon.svg');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(faviconPath);
});

app.get('/black.svg', (req, res) => {
    const blackFaviconPath = path.join(__dirname, 'black.svg');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(blackFaviconPath);
});

// Initialize data file if it doesn't exist
async function initDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    }
}

// Read entries from file
app.get('/api/entries', async (req, res) => {
    try {
        console.log('Tentando ler arquivo:', DATA_FILE);
        const data = await fs.readFile(DATA_FILE, 'utf8');
        console.log('Arquivo lido com sucesso, tamanho:', data.length);
        const entries = JSON.parse(data);
        console.log('Entradas carregadas:', entries.length);
        res.json(entries);
    } catch (error) {
        console.error('Erro ao ler entradas:', error);
        res.status(500).json({ error: 'Erro ao carregar entradas', details: error.message });
    }
});

// Save entries to file
app.post('/api/entries', async (req, res) => {
    try {
        const entries = req.body;
        console.log('Recebendo dados para salvar:', entries.length, 'entradas');
        console.log('Salvando em:', DATA_FILE);
        
        // Primeiro tenta ler o arquivo para verificar se está acessível
        try {
            await fs.access(DATA_FILE, fs.constants.W_OK);
        } catch (accessError) {
            console.error('Arquivo não tem permissão de escrita:', accessError);
            throw new Error('Arquivo sem permissão de escrita');
        }
        
        // Cria um backup antes de salvar
        const backupPath = DATA_FILE + '.backup';
        try {
            const currentData = await fs.readFile(DATA_FILE, 'utf8');
            await fs.writeFile(backupPath, currentData);
        } catch (backupError) {
            console.warn('Não foi possível criar backup:', backupError.message);
        }
        
        // Salva os novos dados
        const dataToSave = JSON.stringify(entries, null, 2);
        await fs.writeFile(DATA_FILE, dataToSave);
        console.log('Dados salvos com sucesso!');
        
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar entradas:', error);
        res.status(500).json({ error: 'Erro ao salvar entradas', details: error.message });
    }
});

// Backup endpoint
app.get('/api/backup', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const backup = {
            entries: JSON.parse(data),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        res.setHeader('Content-Disposition', `attachment; filename=diario-backup-${new Date().toISOString().split('T')[0]}.json`);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(backup, null, 2));
    } catch (error) {
        console.error('Erro ao criar backup:', error);
        res.status(500).json({ error: 'Erro ao criar backup' });
    }
});

async function startServer() {
    await initDataFile();
    app.listen(PORT, () => {
        console.log(`Servidor do diário rodando em http://localhost:${PORT}`);
        console.log(`Dados salvos em: ${DATA_FILE}`);
    });
}

startServer().catch(console.error);
