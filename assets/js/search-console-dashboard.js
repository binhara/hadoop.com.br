/**
 * Google Search Console Dashboard
 * Portal Big Data - SEO Monitoring Dashboard
 */

const SearchConsoleDashboard = {
    // Dashboard configuration
    config: {
        refreshInterval: 300000, // 5 minutes
        chartColors: {
            primary: '#00ff00',
            secondary: '#0066cc',
            warning: '#ff9900',
            danger: '#ff0000',
            success: '#00cc00'
        }
    },
    
    // Initialize dashboard
    init: function() {
        this.createDashboardHTML();
        this.setupEventListeners();
        this.loadDashboardData();
        this.setupAutoRefresh();
        console.log('Search Console Dashboard initialized');
    },
    
    // Create dashboard HTML structure
    createDashboardHTML: function() {
        const dashboardHTML = `
            <div id="search-console-dashboard" class="seo-dashboard" style="display: none;">
                <div class="dashboard-header">
                    <h2 class="text-success">
                        <i class="fas fa-search me-2"></i>
                        Google Search Console Dashboard
                    </h2>
                    <div class="dashboard-controls">
                        <button id="refresh-dashboard" class="btn btn-outline-success btn-sm">
                            <i class="fas fa-sync-alt"></i> Atualizar
                        </button>
                        <button id="export-report" class="btn btn-outline-info btn-sm">
                            <i class="fas fa-download"></i> Exportar
                        </button>
                        <button id="close-dashboard" class="btn btn-outline-secondary btn-sm">
                            <i class="fas fa-times"></i> Fechar
                        </button>
                    </div>
                </div>
                
                <div class="dashboard-content">
                    <!-- Status Overview -->
                    <div class="row mb-4">
                        <div class="col-md-3">
                            <div class="card matrix-card">
                                <div class="card-body text-center">
                                    <i class="fas fa-list-alt fa-2x text-success mb-2"></i>
                                    <h5 class="card-title">Páginas Indexadas</h5>
                                    <h3 id="indexed-pages" class="text-success">-</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card matrix-card">
                                <div class="card-body text-center">
                                    <i class="fas fa-exclamation-triangle fa-2x text-warning mb-2"></i>
                                    <h5 class="card-title">Erros de Crawl</h5>
                                    <h3 id="crawl-errors" class="text-warning">-</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card matrix-card">
                                <div class="card-body text-center">
                                    <i class="fas fa-mouse-pointer fa-2x text-info mb-2"></i>
                                    <h5 class="card-title">Cliques (30d)</h5>
                                    <h3 id="total-clicks" class="text-info">-</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card matrix-card">
                                <div class="card-body text-center">
                                    <i class="fas fa-eye fa-2x text-primary mb-2"></i>
                                    <h5 class="card-title">Impressões (30d)</h5>
                                    <h3 id="total-impressions" class="text-primary">-</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Keyword Rankings -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="card matrix-card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="fas fa-chart-line me-2"></i>
                                        Rankings de Palavras-chave
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table id="keyword-rankings-table" class="table table-dark table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Palavra-chave</th>
                                                    <th>Posição</th>
                                                    <th>Cliques</th>
                                                    <th>Impressões</th>
                                                    <th>CTR</th>
                                                    <th>Tendência</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <!-- Populated by JavaScript -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Core Web Vitals -->
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="card matrix-card">
                                <div class="card-header">
                                    <h6 class="mb-0">Largest Contentful Paint</h6>
                                </div>
                                <div class="card-body">
                                    <div id="lcp-chart" class="vitals-chart"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card matrix-card">
                                <div class="card-header">
                                    <h6 class="mb-0">First Input Delay</h6>
                                </div>
                                <div class="card-body">
                                    <div id="fid-chart" class="vitals-chart"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card matrix-card">
                                <div class="card-header">
                                    <h6 class="mb-0">Cumulative Layout Shift</h6>
                                </div>
                                <div class="card-body">
                                    <div id="cls-chart" class="vitals-chart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Recent Alerts -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="card matrix-card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="fas fa-bell me-2"></i>
                                        Alertas Recentes
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div id="recent-alerts">
                                        <!-- Populated by JavaScript -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sitemap Status -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="card matrix-card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="fas fa-sitemap me-2"></i>
                                        Status do Sitemap
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div id="sitemap-status">
                                        <!-- Populated by JavaScript -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add dashboard to page
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
        
        // Add dashboard styles
        this.addDashboardStyles();
    },
    
    // Add dashboard CSS styles
    addDashboardStyles: function() {
        const styles = `
            <style id="dashboard-styles">
                .seo-dashboard {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    z-index: 9999;
                    overflow-y: auto;
                    padding: 20px;
                }
                
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #00ff00;
                }
                
                .dashboard-controls {
                    display: flex;
                    gap: 10px;
                }
                
                .vitals-chart {
                    height: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: bold;
                }
                
                .vitals-good { color: #00cc00; }
                .vitals-needs-improvement { color: #ff9900; }
                .vitals-poor { color: #ff0000; }
                
                .alert-item {
                    padding: 10px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    border-left: 4px solid;
                }
                
                .alert-high { border-left-color: #ff0000; background: rgba(255, 0, 0, 0.1); }
                .alert-medium { border-left-color: #ff9900; background: rgba(255, 153, 0, 0.1); }
                .alert-low { border-left-color: #0066cc; background: rgba(0, 102, 204, 0.1); }
                
                .trend-up { color: #00cc00; }
                .trend-down { color: #ff0000; }
                .trend-stable { color: #999; }
                
                .sitemap-status-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    margin-bottom: 5px;
                    background: rgba(0, 255, 0, 0.05);
                    border-radius: 5px;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    },
    
    // Setup event listeners
    setupEventListeners: function() {
        // Refresh dashboard
        document.getElementById('refresh-dashboard').addEventListener('click', () => {
            this.loadDashboardData();
        });
        
        // Export report
        document.getElementById('export-report').addEventListener('click', () => {
            this.exportReport();
        });
        
        // Close dashboard
        document.getElementById('close-dashboard').addEventListener('click', () => {
            this.hide();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible()) {
                this.hide();
            }
        });
    },
    
    // Load dashboard data
    loadDashboardData: async function() {
        try {
            // Load SEO monitoring data
            if (window.SearchConsoleMonitor) {
                const report = window.SearchConsoleMonitor.generateComprehensiveReport();
                this.updateDashboard(report);
            }
            
            // Load keyword rankings
            if (window.KeywordTracker) {
                await this.updateKeywordRankings();
            }
            
            // Load sitemap status
            if (window.SitemapManager) {
                this.updateSitemapStatus();
            }
            
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        }
    },
    
    // Update dashboard with report data
    updateDashboard: function(report) {
        // Update overview metrics
        const healthChecks = report.health_checks;
        
        if (healthChecks.indexing) {
            document.getElementById('indexed-pages').textContent = 
                healthChecks.indexing.data.indexed_pages || '0';
            document.getElementById('crawl-errors').textContent = 
                healthChecks.indexing.data.crawl_errors || '0';
        }
        
        if (healthChecks.performance) {
            document.getElementById('total-clicks').textContent = 
                this.formatNumber(healthChecks.performance.data.total_clicks || 0);
            document.getElementById('total-impressions').textContent = 
                this.formatNumber(healthChecks.performance.data.total_impressions || 0);
        }
        
        // Update Core Web Vitals
        if (healthChecks.technical && healthChecks.technical.data) {
            this.updateCoreWebVitals(healthChecks.technical.data);
        }
        
        // Update alerts
        this.updateRecentAlerts(report);
    },
    
    // Update keyword rankings table
    updateKeywordRankings: async function() {
        const tbody = document.querySelector('#keyword-rankings-table tbody');
        tbody.innerHTML = '';
        
        if (!window.SEARCH_CONSOLE_CONFIG) return;
        
        const keywords = window.SEARCH_CONSOLE_CONFIG.targetKeywords;
        
        for (const keywordData of keywords) {
            const trends = window.KeywordTracker.getKeywordTrends(keywordData.keyword, 7);
            const currentData = trends.length > 0 ? trends[trends.length - 1] : null;
            const previousData = trends.length > 1 ? trends[trends.length - 2] : null;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <span class="badge bg-${this.getPriorityColor(keywordData.priority)} me-2">
                        ${keywordData.priority}
                    </span>
                    ${keywordData.keyword}
                </td>
                <td>${currentData ? currentData.position : '-'}</td>
                <td>${currentData ? this.formatNumber(currentData.clicks) : '-'}</td>
                <td>${currentData ? this.formatNumber(currentData.impressions) : '-'}</td>
                <td>${currentData ? (currentData.ctr * 100).toFixed(2) + '%' : '-'}</td>
                <td>${this.getTrendIcon(currentData, previousData)}</td>
            `;
            
            tbody.appendChild(row);
        }
    },
    
    // Update Core Web Vitals charts
    updateCoreWebVitals: function(vitalsData) {
        const vitals = ['lcp', 'fid', 'cls'];
        
        vitals.forEach(vital => {
            const chartElement = document.getElementById(`${vital}-chart`);
            if (chartElement && vitalsData[vital]) {
                const data = vitalsData[vital];
                const total = data.good + data.needs_improvement + data.poor;
                
                if (total > 0) {
                    const goodPercent = (data.good / total * 100).toFixed(1);
                    chartElement.innerHTML = `
                        <div class="vitals-good">${goodPercent}%</div>
                        <small class="text-muted d-block">Good</small>
                    `;
                    
                    // Add color class based on performance
                    chartElement.className = 'vitals-chart ' + 
                        (goodPercent >= 75 ? 'vitals-good' : 
                         goodPercent >= 50 ? 'vitals-needs-improvement' : 'vitals-poor');
                }
            }
        });
    },
    
    // Update recent alerts
    updateRecentAlerts: function(report) {
        const alertsContainer = document.getElementById('recent-alerts');
        alertsContainer.innerHTML = '';
        
        // Get recent alerts from localStorage
        const recentAlerts = this.getRecentAlerts();
        
        if (recentAlerts.length === 0) {
            alertsContainer.innerHTML = '<p class="text-muted">Nenhum alerta recente</p>';
            return;
        }
        
        recentAlerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `alert-item alert-${alert.severity}`;
            alertElement.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <strong>${alert.type}</strong>
                        <p class="mb-1">${alert.message}</p>
                        <small class="text-muted">${alert.action}</small>
                    </div>
                    <small class="text-muted">${this.formatDate(alert.timestamp)}</small>
                </div>
            `;
            alertsContainer.appendChild(alertElement);
        });
    },
    
    // Update sitemap status
    updateSitemapStatus: function() {
        const statusContainer = document.getElementById('sitemap-status');
        const submissions = JSON.parse(localStorage.getItem('sitemap_submissions') || '[]');
        
        if (submissions.length === 0) {
            statusContainer.innerHTML = '<p class="text-muted">Nenhum sitemap submetido</p>';
            return;
        }
        
        const lastSubmission = submissions[submissions.length - 1];
        statusContainer.innerHTML = `
            <div class="sitemap-status-item">
                <div>
                    <strong>Último Sitemap Submetido</strong>
                    <br>
                    <small class="text-muted">${lastSubmission.url}</small>
                </div>
                <div class="text-end">
                    <span class="badge bg-success">Submetido</span>
                    <br>
                    <small class="text-muted">${this.formatDate(lastSubmission.timestamp)}</small>
                </div>
            </div>
            <div class="mt-2">
                <button id="resubmit-sitemap" class="btn btn-outline-success btn-sm">
                    <i class="fas fa-sync-alt"></i> Reenviar Sitemap
                </button>
                <button id="validate-sitemap" class="btn btn-outline-info btn-sm">
                    <i class="fas fa-check"></i> Validar Sitemap
                </button>
            </div>
        `;
        
        // Add event listeners for sitemap actions
        document.getElementById('resubmit-sitemap').addEventListener('click', () => {
            window.SitemapManager.submitSitemap('/sitemap.xml');
            this.loadDashboardData();
        });
        
        document.getElementById('validate-sitemap').addEventListener('click', async () => {
            const isValid = await window.SitemapManager.validateSitemap('/sitemap.xml');
            alert(isValid ? 'Sitemap válido!' : 'Sitemap inválido ou inacessível');
        });
    },
    
    // Setup auto-refresh
    setupAutoRefresh: function() {
        setInterval(() => {
            if (this.isVisible()) {
                this.loadDashboardData();
            }
        }, this.config.refreshInterval);
    },
    
    // Show dashboard
    show: function() {
        document.getElementById('search-console-dashboard').style.display = 'block';
        this.loadDashboardData();
    },
    
    // Hide dashboard
    hide: function() {
        document.getElementById('search-console-dashboard').style.display = 'none';
    },
    
    // Check if dashboard is visible
    isVisible: function() {
        const dashboard = document.getElementById('search-console-dashboard');
        return dashboard && dashboard.style.display !== 'none';
    },
    
    // Export report
    exportReport: function() {
        if (!window.SearchConsoleMonitor) return;
        
        const report = window.SearchConsoleMonitor.generateComprehensiveReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `search-console-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    // Helper functions
    formatNumber: function(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },
    
    formatDate: function(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    getPriorityColor: function(priority) {
        switch (priority) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            case 'low': return 'info';
            default: return 'secondary';
        }
    },
    
    getTrendIcon: function(current, previous) {
        if (!current || !previous) return '<i class="fas fa-minus text-muted"></i>';
        
        const positionChange = previous.position - current.position; // Lower position is better
        
        if (positionChange > 0) {
            return `<i class="fas fa-arrow-up trend-up"></i> +${positionChange}`;
        } else if (positionChange < 0) {
            return `<i class="fas fa-arrow-down trend-down"></i> ${positionChange}`;
        } else {
            return '<i class="fas fa-minus trend-stable"></i>';
        }
    },
    
    getRecentAlerts: function() {
        // Get alerts from the last 7 days
        const alerts = JSON.parse(localStorage.getItem('seo_alerts') || '[]');
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 7);
        
        return alerts
            .filter(alert => new Date(alert.timestamp) >= cutoffDate)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 10); // Show only last 10 alerts
    }
};

// Add dashboard toggle button to page
function addDashboardToggle() {
    const toggleButton = document.createElement('div');
    toggleButton.id = 'seo-dashboard-toggle';
    toggleButton.innerHTML = `
        <button class="btn btn-success btn-sm" title="Abrir Dashboard SEO">
            <i class="fas fa-chart-bar"></i>
        </button>
    `;
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        opacity: 0.8;
    `;
    
    toggleButton.addEventListener('click', () => {
        SearchConsoleDashboard.show();
    });
    
    document.body.appendChild(toggleButton);
}

// Export for use
window.SearchConsoleDashboard = SearchConsoleDashboard;

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize in production or when explicitly enabled
    if (window.location.hostname === 'hadoop.com.br' || localStorage.getItem('enable_seo_monitoring') === 'true') {
        SearchConsoleDashboard.init();
        addDashboardToggle();
    }
});