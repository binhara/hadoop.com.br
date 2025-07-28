/**
 * Portal Big Data - Global Search System
 * Implements search functionality with autocomplete and filtering
 */

class GlobalSearch {
    constructor() {
        this.searchIndex = window.searchIndex || {};
        this.categoryMappings = window.categoryMappings || {};
        this.currentResults = [];
        this.searchHistory = this.loadSearchHistory();
        this.popularSearches = [
            'apache spark', 'hadoop', 'kafka', 'delta lake', 'snowflake',
            'kubernetes', 'airflow', 'flink', 'clickhouse', 'superset'
        ];
        
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.bindEvents();
        this.loadSearchFromURL();
    }

    createSearchInterface() {
        // Create search overlay if it doesn't exist
        if (!document.querySelector('.search-overlay')) {
            const searchOverlay = document.createElement('div');
            searchOverlay.className = 'search-overlay';
            searchOverlay.innerHTML = this.getSearchOverlayHTML();
            document.body.appendChild(searchOverlay);
        }

        // Create search results page if we're on search page
        if (window.location.pathname.includes('/buscar') || window.location.pathname.includes('/search')) {
            this.createSearchResultsPage();
        }
    }

    getSearchOverlayHTML() {
        return `
            <div class="search-container">
                <div class="search-header">
                    <h3 class="text-success mb-3">
                        <i class="fas fa-search me-2"></i>Buscar no Portal
                    </h3>
                    <button class="btn-close-search" onclick="globalSearch.closeSearch()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="search-input-container position-relative">
                    <input type="text" 
                           class="search-input matrix-input" 
                           placeholder="Digite sua busca... (ex: Apache Spark, Kafka, Hadoop)" 
                           id="globalSearchInput"
                           autocomplete="off">
                    <div class="search-suggestions" id="searchSuggestions"></div>
                </div>

                <div class="search-filters mt-3">
                    <div class="row g-2">
                        <div class="col-md-4">
                            <select class="form-select matrix-input" id="searchCategory">
                                <option value="">Todas as categorias</option>
                                <option value="technology">Tecnologias</option>
                                <option value="course">Cursos</option>
                                <option value="article">Artigos</option>
                                <option value="section">Seções</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <select class="form-select matrix-input" id="searchTechCategory">
                                <option value="">Todas as áreas</option>
                                <option value="sistemas-arquivos">Sistemas de Arquivos</option>
                                <option value="processamento">Processamento</option>
                                <option value="data-warehousing">Data Warehousing</option>
                                <option value="streaming">Streaming</option>
                                <option value="machine-learning">Machine Learning</option>
                                <option value="orquestracao">Orquestração</option>
                                <option value="visualizacao">Visualização</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <select class="form-select matrix-input" id="searchSort">
                                <option value="relevance">Relevância</option>
                                <option value="alphabetical">Alfabética</option>
                                <option value="trending">Trending</option>
                                <option value="category">Categoria</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="search-actions mt-3 text-center">
                    <button class="btn btn-success me-2" onclick="globalSearch.performSearch()">
                        <i class="fas fa-search me-1"></i>Buscar
                    </button>
                    <button class="btn btn-outline-success me-2" onclick="globalSearch.showAdvancedSearch()">
                        <i class="fas fa-sliders-h me-1"></i>Busca Avançada
                    </button>
                    <button class="btn btn-outline-secondary" onclick="globalSearch.closeSearch()">
                        <i class="fas fa-times me-1"></i>Fechar
                    </button>
                </div>

                <div class="search-quick-access mt-4">
                    <h6 class="text-success mb-2">Buscas Populares:</h6>
                    <div class="popular-searches">
                        ${this.popularSearches.map(term => 
                            `<span class="badge bg-outline-success me-1 mb-1 popular-search-tag" 
                                   onclick="globalSearch.searchTerm('${term}')">${term}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    createSearchResultsPage() {
        const mainContent = document.querySelector('main') || document.body;
        mainContent.innerHTML = `
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="search-results-header mb-4">
                            <h1 class="text-success mb-3">
                                <i class="fas fa-search me-2"></i>Resultados da Busca
                            </h1>
                            
                            <div class="search-input-container position-relative mb-3">
                                <input type="text" 
                                       class="form-control matrix-input" 
                                       placeholder="Digite sua busca..." 
                                       id="mainSearchInput"
                                       autocomplete="off">
                                <div class="search-suggestions" id="mainSearchSuggestions"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-3">
                        <div class="search-filters-sidebar">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="fas fa-filter me-2"></i>Filtros
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="mb-3">
                                        <label class="form-label">Tipo de Conteúdo</label>
                                        <select class="form-select matrix-input" id="filterType">
                                            <option value="">Todos</option>
                                            <option value="technology">Tecnologias</option>
                                            <option value="course">Cursos</option>
                                            <option value="article">Artigos</option>
                                            <option value="section">Seções</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Categoria</label>
                                        <select class="form-select matrix-input" id="filterCategory">
                                            <option value="">Todas</option>
                                            ${Object.keys(this.categoryMappings).map(key => 
                                                `<option value="${key}">${this.categoryMappings[key].name}</option>`
                                            ).join('')}
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Características</label>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="filterTrending">
                                            <label class="form-check-label text-light" for="filterTrending">
                                                Trending 2024/2025
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="filterOpenSource">
                                            <label class="form-check-label text-light" for="filterOpenSource">
                                                Open Source
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="filterFreeCourses">
                                            <label class="form-check-label text-light" for="filterFreeCourses">
                                                Cursos Gratuitos
                                            </label>
                                        </div>
                                    </div>

                                    <button class="btn btn-outline-success w-100" onclick="globalSearch.applyFilters()">
                                        <i class="fas fa-filter me-1"></i>Aplicar Filtros
                                    </button>
                                    <button class="btn btn-outline-secondary w-100 mt-2" onclick="globalSearch.clearFilters()">
                                        <i class="fas fa-times me-1"></i>Limpar Filtros
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-9">
                        <div class="search-results-content">
                            <div class="search-results-header d-flex justify-content-between align-items-center mb-3">
                                <div class="results-info">
                                    <span id="resultsCount" class="text-light">0 resultados encontrados</span>
                                    <span id="searchQuery" class="text-success ms-2"></span>
                                </div>
                                <div class="sort-controls">
                                    <div class="btn-group" role="group">
                                        <input type="radio" class="btn-check" name="sortOption" id="sortRelevance" value="relevance" checked>
                                        <label class="btn btn-outline-success btn-sm" for="sortRelevance">Relevância</label>
                                        
                                        <input type="radio" class="btn-check" name="sortOption" id="sortAlpha" value="alphabetical">
                                        <label class="btn btn-outline-success btn-sm" for="sortAlpha">A-Z</label>
                                        
                                        <input type="radio" class="btn-check" name="sortOption" id="sortTrending" value="trending">
                                        <label class="btn btn-outline-success btn-sm" for="sortTrending">Trending</label>
                                    </div>
                                </div>
                            </div>

                            <div id="searchResults" class="search-results-grid">
                                <!-- Results will be populated here -->
                            </div>

                            <div id="noResults" class="alert alert-warning d-none">
                                <h5><i class="fas fa-exclamation-triangle me-2"></i>Nenhum resultado encontrado</h5>
                                <p>Tente ajustar sua busca ou usar termos diferentes. Algumas sugestões:</p>
                                <ul>
                                    <li>Verifique a ortografia dos termos</li>
                                    <li>Use termos mais gerais</li>
                                    <li>Tente sinônimos ou termos relacionados</li>
                                    <li>Remova alguns filtros</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Search input events
        document.addEventListener('input', (e) => {
            if (e.target.id === 'globalSearchInput' || e.target.id === 'mainSearchInput') {
                this.handleSearchInput(e.target);
            }
        });

        // Search form submission
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (e.target.id === 'globalSearchInput' || e.target.id === 'mainSearchInput') {
                    e.preventDefault();
                    this.performSearch();
                }
            }
            if (e.key === 'Escape') {
                this.closeSearch();
            }
        });

        // Filter change events
        document.addEventListener('change', (e) => {
            if (e.target.id.startsWith('filter') || e.target.id.startsWith('search')) {
                this.applyFilters();
            }
        });

        // Sort change events
        document.addEventListener('change', (e) => {
            if (e.target.name === 'sortOption') {
                this.sortResults(e.target.value);
            }
        });

        // Click outside to close suggestions
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-input-container')) {
                this.hideSuggestions();
            }
        });
    }

    handleSearchInput(input) {
        const query = input.value.trim();
        const suggestionsContainer = input.parentNode.querySelector('.search-suggestions');
        
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const suggestions = this.generateSuggestions(query);
        this.showSuggestions(suggestions, suggestionsContainer);
    }

    generateSuggestions(query) {
        const allItems = [
            ...this.searchIndex.technologies || [],
            ...this.searchIndex.courses || [],
            ...this.searchIndex.articles || [],
            ...this.searchIndex.sections || []
        ];

        const suggestions = [];
        const queryLower = query.toLowerCase();

        // Exact title matches (highest priority)
        allItems.forEach(item => {
            if (item.title.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    ...item,
                    matchType: 'title',
                    relevance: item.title.toLowerCase().indexOf(queryLower) === 0 ? 100 : 90
                });
            }
        });

        // Keyword matches
        allItems.forEach(item => {
            if (!suggestions.find(s => s.id === item.id)) {
                const keywordMatch = item.keywords?.some(keyword => 
                    keyword.toLowerCase().includes(queryLower)
                );
                if (keywordMatch) {
                    suggestions.push({
                        ...item,
                        matchType: 'keyword',
                        relevance: 70
                    });
                }
            }
        });

        // Description matches
        allItems.forEach(item => {
            if (!suggestions.find(s => s.id === item.id)) {
                if (item.description?.toLowerCase().includes(queryLower)) {
                    suggestions.push({
                        ...item,
                        matchType: 'description',
                        relevance: 50
                    });
                }
            }
        });

        // Sort by relevance and limit to 8 suggestions
        return suggestions
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 8);
    }

    showSuggestions(suggestions, container) {
        if (!container || suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        container.innerHTML = suggestions.map(item => `
            <div class="suggestion-item" onclick="globalSearch.selectSuggestion('${item.id}', '${item.type}')">
                <div class="suggestion-icon">
                    <i class="${this.getIconForType(item.type, item.category)}"></i>
                </div>
                <div class="suggestion-text">
                    <div class="suggestion-title">${this.highlightMatch(item.title, this.getCurrentQuery())}</div>
                    <div class="suggestion-meta">
                        <span class="suggestion-type">${this.getTypeLabel(item.type)}</span>
                        ${item.category ? `<span class="suggestion-category"> • ${this.getCategoryLabel(item.category)}</span>` : ''}
                        ${item.trending ? '<span class="badge bg-warning ms-1">Trending</span>' : ''}
                    </div>
                </div>
            </div>
        `).join('');

        container.style.display = 'block';
    }

    hideSuggestions() {
        document.querySelectorAll('.search-suggestions').forEach(container => {
            container.style.display = 'none';
        });
    }

    selectSuggestion(itemId, itemType) {
        const allItems = [
            ...this.searchIndex.technologies || [],
            ...this.searchIndex.courses || [],
            ...this.searchIndex.articles || [],
            ...this.searchIndex.sections || []
        ];

        const item = allItems.find(i => i.id === itemId && i.type === itemType);
        if (item) {
            this.addToSearchHistory(item.title);
            window.location.href = item.url;
        }
    }

    performSearch() {
        const query = this.getCurrentQuery();
        if (!query.trim()) return;

        this.addToSearchHistory(query);
        
        if (window.location.pathname.includes('/buscar') || window.location.pathname.includes('/search')) {
            this.executeSearch(query);
        } else {
            window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
        }
    }

    executeSearch(query) {
        const results = this.searchContent(query);
        this.currentResults = results;
        this.displayResults(results, query);
        this.updateURL(query);
    }

    searchContent(query) {
        const allItems = [
            ...this.searchIndex.technologies || [],
            ...this.searchIndex.courses || [],
            ...this.searchIndex.articles || [],
            ...this.searchIndex.sections || []
        ];

        const queryLower = query.toLowerCase();
        const results = [];

        allItems.forEach(item => {
            let relevance = 0;
            let matchedTerms = [];

            // Title match (highest weight)
            if (item.title.toLowerCase().includes(queryLower)) {
                relevance += item.title.toLowerCase().indexOf(queryLower) === 0 ? 100 : 80;
                matchedTerms.push('title');
            }

            // Keyword matches
            const keywordMatches = item.keywords?.filter(keyword => 
                keyword.toLowerCase().includes(queryLower)
            ) || [];
            if (keywordMatches.length > 0) {
                relevance += keywordMatches.length * 60;
                matchedTerms.push('keywords');
            }

            // Description match
            if (item.description?.toLowerCase().includes(queryLower)) {
                relevance += 40;
                matchedTerms.push('description');
            }

            // Category match
            if (item.category?.toLowerCase().includes(queryLower)) {
                relevance += 30;
                matchedTerms.push('category');
            }

            // Trending boost
            if (item.trending) {
                relevance += 10;
            }

            if (relevance > 0) {
                results.push({
                    ...item,
                    relevance,
                    matchedTerms
                });
            }
        });

        return results.sort((a, b) => b.relevance - a.relevance);
    }

    displayResults(results, query) {
        const resultsContainer = document.getElementById('searchResults');
        const resultsCount = document.getElementById('resultsCount');
        const searchQuery = document.getElementById('searchQuery');
        const noResults = document.getElementById('noResults');

        if (!resultsContainer) return;

        // Update header info
        if (resultsCount) {
            resultsCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;
        }
        if (searchQuery) {
            searchQuery.textContent = query ? `para "${query}"` : '';
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = '';
            if (noResults) noResults.classList.remove('d-none');
            return;
        }

        if (noResults) noResults.classList.add('d-none');

        resultsContainer.innerHTML = results.map(item => this.renderResultItem(item, query)).join('');
    }

    renderResultItem(item, query) {
        const categoryInfo = this.categoryMappings[item.category] || {};
        
        return `
            <div class="result-item card mb-3">
                <div class="card-body">
                    <div class="d-flex align-items-start">
                        <div class="result-icon me-3">
                            <i class="${this.getIconForType(item.type, item.category)} fa-2x" style="color: ${categoryInfo.color || '#00ff00'}"></i>
                        </div>
                        <div class="result-content flex-grow-1">
                            <h5 class="result-title">
                                <a href="${item.url}" class="text-success text-decoration-none">
                                    ${this.highlightMatch(item.title, query)}
                                </a>
                                ${item.trending ? '<span class="badge bg-warning ms-2">Trending</span>' : ''}
                                ${item.opensource ? '<span class="badge bg-success ms-1">Open Source</span>' : ''}
                            </h5>
                            
                            <p class="result-description text-light mb-2">
                                ${this.highlightMatch(item.description, query)}
                            </p>
                            
                            <div class="result-meta">
                                <span class="badge bg-outline-success me-2">
                                    <i class="${categoryInfo.icon || 'fas fa-tag'} me-1"></i>
                                    ${this.getTypeLabel(item.type)}
                                </span>
                                ${item.category ? `
                                    <span class="badge bg-outline-info me-2">
                                        ${categoryInfo.name || item.category}
                                    </span>
                                ` : ''}
                                ${item.level ? `<span class="badge bg-outline-warning me-2">Nível: ${item.level}</span>` : ''}
                                ${item.duration ? `<span class="badge bg-outline-secondary me-2">Duração: ${item.duration}</span>` : ''}
                                ${item.price === 'free' ? '<span class="badge bg-success">Gratuito</span>' : ''}
                            </div>
                            
                            ${item.keywords && item.keywords.length > 0 ? `
                                <div class="result-keywords mt-2">
                                    <small class="text-muted">Tags: </small>
                                    ${item.keywords.slice(0, 5).map(keyword => 
                                        `<span class="badge bg-dark me-1">${keyword}</span>`
                                    ).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    applyFilters() {
        if (!this.currentResults.length) return;

        const typeFilter = document.getElementById('filterType')?.value;
        const categoryFilter = document.getElementById('filterCategory')?.value;
        const trendingFilter = document.getElementById('filterTrending')?.checked;
        const openSourceFilter = document.getElementById('filterOpenSource')?.checked;
        const freeCoursesFilter = document.getElementById('filterFreeCourses')?.checked;

        let filteredResults = [...this.currentResults];

        if (typeFilter) {
            filteredResults = filteredResults.filter(item => item.type === typeFilter);
        }

        if (categoryFilter) {
            filteredResults = filteredResults.filter(item => item.category === categoryFilter);
        }

        if (trendingFilter) {
            filteredResults = filteredResults.filter(item => item.trending);
        }

        if (openSourceFilter) {
            filteredResults = filteredResults.filter(item => item.opensource);
        }

        if (freeCoursesFilter) {
            filteredResults = filteredResults.filter(item => item.price === 'free');
        }

        this.displayResults(filteredResults, this.getCurrentQuery());
    }

    clearFilters() {
        document.getElementById('filterType').value = '';
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterTrending').checked = false;
        document.getElementById('filterOpenSource').checked = false;
        document.getElementById('filterFreeCourses').checked = false;
        
        this.displayResults(this.currentResults, this.getCurrentQuery());
    }

    sortResults(sortType) {
        if (!this.currentResults.length) return;

        let sortedResults = [...this.currentResults];

        switch (sortType) {
            case 'alphabetical':
                sortedResults.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'trending':
                sortedResults.sort((a, b) => {
                    if (a.trending && !b.trending) return -1;
                    if (!a.trending && b.trending) return 1;
                    return b.relevance - a.relevance;
                });
                break;
            case 'category':
                sortedResults.sort((a, b) => {
                    const categoryCompare = (a.category || '').localeCompare(b.category || '');
                    return categoryCompare !== 0 ? categoryCompare : a.title.localeCompare(b.title);
                });
                break;
            default: // relevance
                sortedResults.sort((a, b) => b.relevance - a.relevance);
        }

        this.displayResults(sortedResults, this.getCurrentQuery());
    }

    // Utility methods
    getCurrentQuery() {
        const input = document.getElementById('globalSearchInput') || document.getElementById('mainSearchInput');
        return input ? input.value.trim() : '';
    }

    getIconForType(type, category) {
        const typeIcons = {
            'technology': this.categoryMappings[category]?.icon || 'fas fa-cog',
            'course': 'fas fa-graduation-cap',
            'article': 'fas fa-newspaper',
            'section': 'fas fa-folder'
        };
        return typeIcons[type] || 'fas fa-file';
    }

    getTypeLabel(type) {
        const typeLabels = {
            'technology': 'Tecnologia',
            'course': 'Curso',
            'article': 'Artigo',
            'section': 'Seção'
        };
        return typeLabels[type] || type;
    }

    getCategoryLabel(category) {
        return this.categoryMappings[category]?.name || category;
    }

    highlightMatch(text, query) {
        if (!query || !text) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark class="bg-warning text-dark">$1</mark>');
    }

    searchTerm(term) {
        const input = document.getElementById('globalSearchInput') || document.getElementById('mainSearchInput');
        if (input) {
            input.value = term;
            this.performSearch();
        }
    }

    showAdvancedSearch() {
        // Toggle advanced search options
        const advancedOptions = document.querySelector('.search-filters');
        if (advancedOptions) {
            advancedOptions.style.display = advancedOptions.style.display === 'none' ? 'block' : 'none';
        }
    }

    toggleSearch() {
        const overlay = document.querySelector('.search-overlay');
        if (overlay) {
            const isVisible = overlay.style.display === 'flex';
            overlay.style.display = isVisible ? 'none' : 'flex';
            
            if (!isVisible) {
                const input = document.getElementById('globalSearchInput');
                if (input) {
                    setTimeout(() => input.focus(), 100);
                }
            }
        }
    }

    closeSearch() {
        const overlay = document.querySelector('.search-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        this.hideSuggestions();
    }

    loadSearchFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        
        if (query) {
            const input = document.getElementById('mainSearchInput');
            if (input) {
                input.value = query;
                this.executeSearch(query);
            }
        }
    }

    updateURL(query) {
        const newURL = new URL(window.location);
        newURL.searchParams.set('q', query);
        window.history.pushState({}, '', newURL);
    }

    // Search history management
    loadSearchHistory() {
        try {
            return JSON.parse(localStorage.getItem('portalBigDataSearchHistory') || '[]');
        } catch {
            return [];
        }
    }

    addToSearchHistory(query) {
        if (!query.trim()) return;
        
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        this.searchHistory.unshift(query);
        this.searchHistory = this.searchHistory.slice(0, 10); // Keep only last 10 searches
        
        try {
            localStorage.setItem('portalBigDataSearchHistory', JSON.stringify(this.searchHistory));
        } catch (e) {
            console.warn('Could not save search history:', e);
        }
    }
}

// Initialize global search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.globalSearch = new GlobalSearch();
});

// Global functions for backward compatibility
function toggleSearch() {
    if (window.globalSearch) {
        window.globalSearch.toggleSearch();
    }
}

function closeSearch() {
    if (window.globalSearch) {
        window.globalSearch.closeSearch();
    }
}

function performSearch() {
    if (window.globalSearch) {
        window.globalSearch.performSearch();
    }
}