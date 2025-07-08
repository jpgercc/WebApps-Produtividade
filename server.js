const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'diary-data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Erro ao ler entradas:', error);
        res.status(500).json({ error: 'Erro ao carregar entradas' });
    }
});

// Save entries to file
app.post('/api/entries', async (req, res) => {
    try {
        const entries = req.body;
        await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar entradas:', error);
        res.status(500).json({ error: 'Erro ao salvar entradas' });
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
