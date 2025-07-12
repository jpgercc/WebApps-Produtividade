// JavaScript para funcionalidade do diário (modo escuro, navegação, armazenamento em cache, etc.)

const themeToggle = document.getElementById('themeToggle');
const syncStatus = document.getElementById('syncStatus');
const body = document.body;
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');
const addEntryBtnYears = document.getElementById('addEntryBtnYears');
const addEntryBtnMonths = document.getElementById('addEntryBtnMonths');
const addEntryBtnEntries = document.getElementById('addEntryBtnEntries');
const entryModal = document.getElementById('entryModal');
const closeModalBtn = document.getElementById('closeModal');
const saveEntryBtn = document.getElementById('saveEntryBtn');
const deleteEntryBtn = document.getElementById('deleteEntryBtn');
const entryDateInput = document.getElementById('entryDate');
const entryTitleInput = document.getElementById('entryTitle');
const entryContentInput = document.getElementById('entryContent');
const modalTitle = document.getElementById('modalTitle');
const yearsGrid = document.getElementById('yearsGrid');
const monthsGrid = document.getElementById('monthsGrid');
const entriesContainer = document.getElementById('entriesContainer');
const totalEntriesSpan = document.getElementById('totalEntries');
const totalWordsSpan = document.getElementById('totalWords');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const backButtons = document.querySelectorAll('.back-btn');
const monthTitle = document.getElementById('monthTitle');
const entriesTitle = document.getElementById('entriesTitle');

let currentView = 'home';
let currentYear = null;
let currentMonth = null;
let currentEntryId = null;

// Load theme preference and initialize app
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize sync status
    syncStatus.className = 'sync-status offline';
    syncStatus.title = 'Iniciando...';
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
        updateFavicon(savedTheme);
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Modo Escuro';
        updateFavicon('light');
    }
    
    // Load entries from server
    await loadEntriesFromServer();
    updateStats();
    renderYears();
    showView('home');
});

// Toggle theme
themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Modo Escuro';
        updateFavicon('light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Modo Claro';
        updateFavicon('dark');
    }
});

// Navigation
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const viewId = button.dataset.view;
        showView(viewId);
    });
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        const backToView = button.dataset.backTo;
        showView(backToView);
        if (backToView === 'years') {
            currentYear = null;
            renderYears(); // Re-render years to ensure counts are updated if needed
        }
        if (backToView === 'home') {
            currentYear = null;
            currentMonth = null;
            updateStats();
        }
    });
});

function showView(viewId) {
    views.forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');

    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.view === viewId) {
            button.classList.add('active');
        }
    });

    currentView = viewId;
    if (viewId === 'home') {
        updateStats();
    }
}

// --- Entry Management ---

// Detect environment and set API base URL
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : '/api';

async function loadEntriesFromServer() {
    try {
        syncStatus.className = 'sync-status saving';
        syncStatus.title = 'Carregando dados do servidor...';
        
        const response = await fetch(`${API_BASE}/entries`);
        if (!response.ok) throw new Error('Falha ao carregar entradas');
        const entries = await response.json();
        
        // Also save to localStorage as backup
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        
        syncStatus.className = 'sync-status connected';
        syncStatus.title = 'Conectado ao servidor - dados sincronizados';
        
        return entries;
    } catch (error) {
        console.error('Erro ao carregar do servidor, usando localStorage:', error);
        syncStatus.className = 'sync-status offline';
        syncStatus.title = 'Offline - usando dados locais';
        return JSON.parse(localStorage.getItem('diaryEntries')) || [];
    }
}

async function saveEntriesToServer(entries) {
    try {
        syncStatus.className = 'sync-status saving';
        syncStatus.title = 'Salvando no servidor...';
        
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
        
        syncStatus.className = 'sync-status connected';
        syncStatus.title = 'Salvo no servidor com sucesso';
        
        return true;
    } catch (error) {
        console.error('Erro ao salvar no servidor, usando localStorage:', error);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        updateStats();
        
        syncStatus.className = 'sync-status error';
        syncStatus.title = 'Erro ao salvar no servidor - dados salvos localmente';
        
        return false;
    }
}

function getEntries() {
    return JSON.parse(localStorage.getItem('diaryEntries')) || [];
}

function saveEntries(entries) {
    // Save to server asynchronously
    saveEntriesToServer(entries);
}

function updateStats() {
    const entries = getEntries();
    totalEntriesSpan.textContent = entries.length;
    const totalWords = entries.reduce((sum, entry) => sum + (entry.content.split(/\s+/).filter(Boolean).length), 0);
    totalWordsSpan.textContent = totalWords;
}

// Render Years
function renderYears() {
    const entries = getEntries();
    const yearsMap = new Map(); // year -> { count, words }

    entries.forEach(entry => {
        const year = new Date(entry.date).getFullYear();
        if (!yearsMap.has(year)) {
            yearsMap.set(year, { count: 0, words: 0 });
        }
        const yearData = yearsMap.get(year);
        yearData.count++;
        yearData.words += entry.content.split(/\s+/).filter(Boolean).length;
    });

    const sortedYears = Array.from(yearsMap.keys()).sort((a, b) => b - a);

    yearsGrid.innerHTML = '';
    if (sortedYears.length === 0) {
        yearsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Nenhuma entrada ainda. Clique em "Nova Entrada" para começar!</p>';
        return;
    }

    sortedYears.forEach(year => {
        const yearData = yearsMap.get(year);
        const yearCard = document.createElement('div');
        yearCard.classList.add('year-card');
        yearCard.innerHTML = `
            <div class="year-number">${year}</div>
            <div class="year-info">${yearData.count} entradas · ${yearData.words} palavras</div>
        `;
        yearCard.addEventListener('click', () => {
            currentYear = year;
            renderMonths(year);
            showView('months');
        });
        yearsGrid.appendChild(yearCard);
    });
}

// Render Months
function renderMonths(year) {
    const entries = getEntries();
    const monthsMap = new Map(); // monthIndex (0-11) -> { count, words }

    entries.filter(entry => new Date(entry.date).getFullYear() === year)
        .forEach(entry => {
            const month = new Date(entry.date).getMonth();
            if (!monthsMap.has(month)) {
                monthsMap.set(month, { count: 0, words: 0 });
            }
            const monthData = monthsMap.get(month);
            monthData.count++;
            monthData.words += entry.content.split(/\s+/).filter(Boolean).length;
        });

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const sortedMonths = Array.from(monthsMap.keys()).sort((a, b) => a - b); // Sort by month index

    monthsGrid.innerHTML = '';
    monthTitle.textContent = `Entradas de ${year}`;

    if (sortedMonths.length === 0) {
        monthsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Nenhuma entrada para este ano.</p>';
        return;
    }

    sortedMonths.forEach(monthIndex => {
        const monthData = monthsMap.get(monthIndex);
        const monthCard = document.createElement('div');
        monthCard.classList.add('month-card');
        monthCard.innerHTML = `
            <div class="month-name">${monthNames[monthIndex]}</div>
            <div class="month-count">${monthData.count} entradas</div>
        `;
        monthCard.addEventListener('click', () => {
            currentMonth = monthIndex;
            renderEntries(year, monthIndex);
            showView('entries');
        });
        monthsGrid.appendChild(monthCard);
    });
}

// Render Entries
function renderEntries(year, month) {
    const entries = getEntries();
    const filteredEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getFullYear() === year && entryDate.getMonth() === month;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

    entriesContainer.innerHTML = '';
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    entriesTitle.textContent = `Entradas de ${monthNames[month]} de ${year}`;

    if (filteredEntries.length === 0) {
        entriesContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Nenhuma entrada para este mês. Clique em "Nova Entrada" para adicionar uma.</p>';
        return;
    }

    filteredEntries.forEach(entry => {
        const entryCard = document.createElement('div');
        entryCard.classList.add('entry-card');
        entryCard.innerHTML = `
            <div class="entry-date">${new Date(entry.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div class="entry-title">${entry.title || 'Sem título'}</div>
            <div class="entry-preview">${entry.content.substring(0, 150)}${entry.content.length > 150 ? '...' : ''}</div>
        `;
        entryCard.addEventListener('click', () => openEntryModal(entry.id));
        entriesContainer.appendChild(entryCard);
    });
}

// Search Functionality
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const entries = getEntries();
    const filteredResults = entries.filter(entry =>
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query) ||
        new Date(entry.date).toLocaleDateString('pt-BR').includes(query)
    ).sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

    searchResults.innerHTML = '';
    if (query === '') {
        searchResults.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Digite algo para pesquisar suas entradas.</p>';
        return;
    }
    if (filteredResults.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Nenhum resultado encontrado.</p>';
        return;
    }

    filteredResults.forEach(entry => {
        const entryCard = document.createElement('div');
        entryCard.classList.add('entry-card');
        entryCard.innerHTML = `
            <div class="entry-date">${new Date(entry.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div class="entry-title">${entry.title || 'Sem título'}</div>
            <div class="entry-preview">${entry.content.substring(0, 150)}${entry.content.length > 150 ? '...' : ''}</div>
        `;
        entryCard.addEventListener('click', () => openEntryModal(entry.id));
        searchResults.appendChild(entryCard);
    });
});


// Open Entry Modal
function openEntryModal(entryId = null) {
    currentEntryId = entryId;
    if (entryId) {
        modalTitle.textContent = 'Editar Entrada';
        deleteEntryBtn.style.display = 'inline-block';
        const entries = getEntries();
        const entry = entries.find(e => e.id === entryId);
        if (entry) {
            entryDateInput.value = entry.date;
            entryTitleInput.value = entry.title;
            entryContentInput.value = entry.content;
        }
    } else {
        modalTitle.textContent = 'Nova Entrada';
        deleteEntryBtn.style.display = 'none';
        entryDateInput.value = new Date().toISOString().split('T')[0]; // Set default to today
        entryTitleInput.value = '';
        entryContentInput.value = '';
    }
    entryModal.classList.add('active');
}

// Close Entry Modal
closeModalBtn.addEventListener('click', () => {
    entryModal.classList.remove('active');
    currentEntryId = null;
});

// Save Entry
saveEntryBtn.addEventListener('click', () => {
    const date = entryDateInput.value;
    const title = entryTitleInput.value.trim();
    const content = entryContentInput.value.trim();

    if (!date) {
        alert('A data é obrigatória!');
        entryDateInput.focus();
        return;
    }

    if (!content) {
        alert('O conteúdo da entrada é obrigatório!');
        entryContentInput.focus();
        return;
    }

    let entries = getEntries();

    if (currentEntryId) {
        // Update existing entry
        entries = entries.map(entry =>
            entry.id === currentEntryId ? { ...entry, date, title, content } : entry
        );
    } else {
        // Add new entry
        const newEntry = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            date,
            title,
            content
        };
        entries.push(newEntry);
    }
    saveEntries(entries);
    entryModal.classList.remove('active');
    currentEntryId = null;

    // Re-render based on current view
    if (currentView === 'years') {
        renderYears();
    } else if (currentView === 'months' && currentYear !== null) {
        renderMonths(currentYear);
    } else if (currentView === 'entries' && currentYear !== null && currentMonth !== null) {
        renderEntries(currentYear, currentMonth);
    } else if (currentView === 'search') {
        searchInput.dispatchEvent(new Event('input')); // Trigger search update
    } else {
        showView('home'); // Fallback to home
    }
});

// Delete Entry
deleteEntryBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja excluir esta entrada?')) {
        let entries = getEntries();
        entries = entries.filter(entry => entry.id !== currentEntryId);
        saveEntries(entries);
        entryModal.classList.remove('active');
        currentEntryId = null;

        // Re-render based on current view
        if (currentView === 'years') {
            renderYears();
        } else if (currentView === 'months' && currentYear !== null) {
            renderMonths(currentYear);
        } else if (currentView === 'entries' && currentYear !== null && currentMonth !== null) {
            renderEntries(currentYear, currentMonth);
        } else if (currentView === 'search') {
            searchInput.dispatchEvent(new Event('input')); // Trigger search update
        } else {
            showView('home'); // Fallback to home
        }
    }
});

// Event Listeners for "Nova Entrada" buttons
addEntryBtnYears.addEventListener('click', () => openEntryModal());
addEntryBtnMonths.addEventListener('click', () => openEntryModal());
addEntryBtnEntries.addEventListener('click', () => openEntryModal());

// Function to update favicon based on theme
function updateFavicon(theme) {
    const favicon = document.querySelector('link[rel="icon"]');
    const alternateFavicon = document.querySelector('link[rel="alternate icon"]');
    const maskIcon = document.querySelector('link[rel="mask-icon"]');
    
    // Adiciona um timestamp para forçar o recarregamento do favicon
    const timestamp = new Date().getTime();
    
    if (theme === 'dark') {
        if (favicon) favicon.href = `black.svg?t=${timestamp}`;
        if (alternateFavicon) alternateFavicon.href = `black.svg?t=${timestamp}`;
        if (maskIcon) maskIcon.href = `black.svg?t=${timestamp}`;
    } else {
        if (favicon) favicon.href = `favicon.svg?t=${timestamp}`;
        if (alternateFavicon) alternateFavicon.href = `favicon.svg?t=${timestamp}`;
        if (maskIcon) maskIcon.href = `favicon.svg?t=${timestamp}`;
    }
}
