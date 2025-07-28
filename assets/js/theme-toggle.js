/**
 * Simple Theme Toggle System - TEMPORARIAMENTE DESABILITADO
 * Portal Big Data - hadoop.com.br
 * 
 * NOTA: Toggle desabilitado temporariamente para manter tema Matrix fixo
 * Para reativar: alterar THEME_TOGGLE_ENABLED para true
 * 
 * Simple JavaScript for switching between Matrix (dark) and Light themes
 * Compatible with Bootstrap Studio - uses only native Bootstrap components
 */

// FLAG DE CONTROLE - ALTERAR PARA true PARA REATIVAR
var THEME_TOGGLE_ENABLED = false;

// Forçar tema Matrix como padrão - no complex classes
var currentTheme = 'matrix';
var storageKey = 'portal-big-data-theme';

// Initialize theme system
function initThemeToggle() {
    // Sempre forçar tema Matrix (desabilitado temporariamente)
    currentTheme = 'matrix';
    
    // Só criar botão se habilitado
    if (THEME_TOGGLE_ENABLED) {
        // Load saved theme
        loadSavedTheme();
        // Create toggle button
        createToggleButton();
    }
    
    // Sempre aplicar tema Matrix
    applyTheme('matrix');
}

// Load saved theme from localStorage - DESABILITADO TEMPORARIAMENTE
function loadSavedTheme() {
    // Forçar tema Matrix independente do localStorage
    currentTheme = 'matrix';
    
    // Código original comentado para preservar funcionalidade:
    /*
    var savedTheme = localStorage.getItem(storageKey);
    if (savedTheme && (savedTheme === 'matrix' || savedTheme === 'light')) {
        currentTheme = savedTheme;
    }
    */
}

// Create Bootstrap-compatible toggle button - DESABILITADO TEMPORARIAMENTE
function createToggleButton() {
    // Sair early se toggle estiver desabilitado
    if (!THEME_TOGGLE_ENABLED) {
        console.log('Theme toggle desabilitado temporariamente');
        return;
    }

    // Código original preservado para futura reativação:
    /*
    // Remove existing button if it exists
    var existingButton = document.querySelector('.theme-toggle');
    if (existingButton) {
        existingButton.remove();
    }

    // Create Bootstrap button element
    var toggleButton = document.createElement('button');
    toggleButton.className = 'btn btn-outline-success theme-toggle position-fixed';
    toggleButton.innerHTML = getButtonContent();
    toggleButton.setAttribute('aria-label', 'Alternar tema');
    toggleButton.setAttribute('title', 'Alternar entre tema Matrix e tema claro');
    toggleButton.onclick = toggleTheme;
    
    // Add to body
    document.body.appendChild(toggleButton);
    */
}

// Get button content based on current theme
function getButtonContent() {
    if (currentTheme === 'matrix') {
        return '<i class="fas fa-sun me-1"></i><span class="d-none d-sm-inline">Claro</span>';
    } else {
        return '<i class="fas fa-moon me-1"></i><span class="d-none d-sm-inline">Matrix</span>';
    }
}

// Toggle between themes - DESABILITADO TEMPORARIAMENTE
function toggleTheme() {
    if (!THEME_TOGGLE_ENABLED) {
        console.log('Theme toggle está desabilitado temporariamente');
        return;
    }
    
    // Código original comentado para preservar funcionalidade:
    /*
    currentTheme = currentTheme === 'matrix' ? 'light' : 'matrix';
    applyTheme(currentTheme);
    saveTheme();
    updateButtonContent();
    */
}

// Apply theme using Bootstrap classes
function applyTheme(theme) {
    var body = document.body;
    
    if (theme === 'light') {
        body.classList.remove('matrix-theme');
        body.classList.add('light-theme');
        updateMetaThemeColor('#ffffff');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('matrix-theme');
        updateMetaThemeColor('#000000');
    }
}

// Update button content - DESABILITADO TEMPORARIAMENTE
function updateButtonContent() {
    if (!THEME_TOGGLE_ENABLED) {
        return;
    }
    
    // Código original preservado:
    /*
    var toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
        toggleButton.innerHTML = getButtonContent();
    }
    */
}

// Update meta theme color for mobile browsers
function updateMetaThemeColor(color) {
    var metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = color;
}

// Save theme to localStorage
function saveTheme() {
    localStorage.setItem(storageKey, currentTheme);
}

// Initialize theme toggle when DOM is loaded - Bootstrap Studio compatible
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
});

// Simple global functions for theme management - MODIFICADO TEMPORARIAMENTE
window.switchTheme = function(theme) {
    if (!THEME_TOGGLE_ENABLED) {
        console.log('Theme switching está desabilitado temporariamente');
        return;
    }
    
    // Código original preservado:
    /*
    if (theme === 'matrix' || theme === 'light') {
        currentTheme = theme;
        applyTheme(theme);
        saveTheme();
        updateButtonContent();
    }
    */
};

window.getCurrentTheme = function() {
    return currentTheme;
};

/**
 * INSTRUÇÕES PARA REATIVAÇÃO DO THEME TOGGLE:
 * 
 * 1. Alterar THEME_TOGGLE_ENABLED para true no início do arquivo
 * 2. Descomentar estilos CSS do botão toggle (se necessário)
 * 3. Testar em todas as páginas para garantir funcionamento
 * 4. Verificar se localStorage funciona corretamente
 * 
 * Exemplo de reativação:
 * var THEME_TOGGLE_ENABLED = true; // Alterar para true
 * 
 * NOTA: Esta desabilitação é temporária para manter o tema Matrix
 * como padrão fixo em todas as páginas do portal.
 */