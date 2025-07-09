// Versão modificada das funções de entrada para usar o servidor
// Adicione este código ao final do script no index.html

// --- API Functions for Server Communication ---

const API_BASE = 'http://localhost:3050/api';

async function loadEntriesFromServer() {
    try {
        const response = await fetch(`${API_BASE}/entries`);
        if (!response.ok) throw new Error('Falha ao carregar entradas');
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar do servidor, usando localStorage:', error);
        return JSON.parse(localStorage.getItem('diaryEntries')) || [];
    }
}

async function saveEntriesToServer(entries) {
    try {
        const response = await fetch(`${API_BASE}/entries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entries)
        });
        
        if (!response.ok) throw new Error('Falha ao salvar entradas');
        
        // Also save to localStorage as backup
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        updateStats();
        return true;
    } catch (error) {
        console.error('Erro ao salvar no servidor, usando localStorage:', error);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        updateStats();
        return false;
    }
}

// Modified functions to use server
async function getEntriesAsync() {
    return await loadEntriesFromServer();
}

async function saveEntriesAsync(entries) {
    return await saveEntriesToServer(entries);
}

// Initialize app with server data
async function initializeApp() {
    const entries = await loadEntriesFromServer();
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    updateStats();
    renderYears();
    showView('home');
}

// Replace the DOMContentLoaded event listener with this:
/*
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Modo Escuro';
    }
    initializeApp(); // Use this instead of the current initialization
});
*/
