/**
 * Performance Monitoring Dashboard
 * Unified dashboard for all performance monitoring systems
 */

class PerformanceMonitoringDashboard {
    constructor() {
        this.isVisible = false;
        this.updateInterval = null;
        this.dashboardElement = null;
        
        this.init();
    }
    
    init() {
        this.createDashboard();
        this.bindEvents();
        this.startUpdating();
        this.setupKeyboardShortcuts();
    }
    
    createDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'performance-monitoring-dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h2>Performance Monitoring Dashboard</h2>
                <div class="dashboard-controls">
                    <button class="btn-minimize" title="Minimize">−</button>
                    <button class="btn-close" title="Close">×</button>
                </div>
            </div>
            
            <div class="dashboard-content">
                <div class="dashboard-tabs">
                    <button class="tab-btn active" data-tab="overview">Overview</button>
                    <button class="tab-btn" data-tab="vitals">Core Web Vitals</button>
                    <button class="tab-btn" data-tab="uptime">Uptime</button>
                    <button class="tab-btn" data-tab="errors">Errors</button>
                    <button class="tab-btn" data-tab="reports">Reports</button>
                    <button class="tab-btn" data-tab="alerts">Alerts</button>
                </div>
                
                <div class="dashboard-panels">
                    <div class="panel active" id="panel-overview">
                        <div class="overview-grid">
                            <div class="metric-card">
                                <div class="metric-title">Overall Health</div>
                                <div class="metric-value" id="overall-health">Good</div>
                                <div class="metric-indicator" id="health-indicator"></div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-title">Uptime</div>
                                <div class="metric-value" id="uptime-percentage">99.9%</div>
                                <div class="metric-trend" id="uptime-trend">↗</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-title">Error Rate</div>
                                <div class="metric-value" id="error-rate">0.1%</div>
                                <div class="metric-trend" id="error-trend">↘</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-title">Avg Response</div>
                                <div class="metric-value" id="avg-response">245ms</div>
                                <div class="metric-trend" id="response-trend">→</div>
                            </div>
                        </div>
                        
                        <div class="recent-alerts">
                            <h3>Recent Alerts</h3>
                            <div id="recent-alerts-list">
                                <div class="alert-item">No recent alerts</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="panel" id="panel-vitals">
                        <div class="vitals-grid">
                            <div class="vital-metric" data-metric="lcp">
                                <div class="vital-label">LCP</div>
                                <div class="vital-value">-</div>
                                <div class="vital-status">measuring</div>
                                <div class="vital-bar"><div class="vital-progress"></div></div>
                            </div>
                            <div class="vital-metric" data-metric="fid">
                                <div class="vital-label">FID</div>
                                <div class="vital-value">-</div>
                                <div class="vital-status">measuring</div>
                                <div class="vital-bar"><div class="vital-progress"></div></div>
                            </div>
                            <div class="vital-metric" data-metric="cls">
                                <div class="vital-label">CLS</div>
                                <div class="vital-value">-</div>
                                <div class="vital-status">measuring</div>
                                <div class="vital-bar"><div class="vital-progress"></div></div>
                            </div>
                            <div class="vital-metric" data-metric="ttfb">
                                <div class="vital-label">TTFB</div>
                                <div class="vital-value">-</div>
                                <div class="vital-status">measuring</div>
                                <div class="vital-bar"><div class="vital-progress"></div></div>
                            </div>
                            <div class="vital-metric" data-metric="fcp">
                                <div class="vital-label">FCP</div>
                                <div class="vital-value">-</div>
                                <div class="vital-status">measuring</div>
                                <div class="vital-bar"><div class="vital-progress"></div></div>
                            </div>
                        </div>
                        
                        <div class="vitals-chart">
                            <h3>Performance Trends</h3>
                            <div id="vitals-chart-container">
                                <canvas id="vitals-chart" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="panel" id="panel-uptime">
                        <div class="uptime-summary">
                            <div class="uptime-stat">
                                <div class="stat-label">Current Status</div>
                                <div class="stat-value" id="current-status">Online</div>
                            </div>
                            <div class="uptime-stat">
                                <div class="stat-label">24h Uptime</div>
                                <div class="stat-value" id="uptime-24h">99.9%</div>
                            </div>
                            <div class="uptime-stat">
                                <div class="stat-label">7d Uptime</div>
                                <div class="stat-value" id="uptime-7d">99.8%</div>
                            </div>
                            <div class="uptime-stat">
                                <div class="stat-label">Avg Response</div>
                                <div class="stat-value" id="avg-response-time">245ms</div>
                            </div>
                        </div>
                        
                        <div class="endpoint-status">
                            <h3>Endpoint Status</h3>
                            <div id="endpoint-list">
                                <!-- Populated by JavaScript -->
                            </div>
                        </div>
                        
                        <div class="outage-history">
                            <h3>Recent Outages</h3>
                            <div id="outage-list">
                                <!-- Populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="panel" id="panel-errors">
                        <div class="error-summary">
                            <div class="error-stat">
                                <div class="stat-label">Total Errors (1h)</div>
                                <div class="stat-value" id="total-errors">0</div>
                            </div>
                            <div class="error-stat">
                                <div class="stat-label">Critical Errors</div>
                                <div class="stat-value" id="critical-errors">0</div>
                            </div>
                            <div class="error-stat">
                                <div class="stat-label">Error Rate</div>
                                <div class="stat-value" id="error-rate-detailed">0.0%</div>
                            </div>
                        </div>
                        
                        <div class="error-types">
                            <h3>Error Types</h3>
                            <div id="error-types-chart">
                                <!-- Error types breakdown -->
                            </div>
                        </div>
                        
                        <div class="recent-errors">
                            <h3>Recent Errors</h3>
                            <div id="recent-errors-list">
                                <!-- Recent errors list -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="panel" id="panel-reports">
                        <div class="report-actions">
                            <button class="btn btn-primary" id="generate-report">Generate Report</button>
                            <button class="btn btn-secondary" id="export-data">Export Data</button>
                            <button class="btn btn-secondary" id="schedule-report">Schedule Reports</button>
                        </div>
                        
                        <div class="report-history">
                            <h3>Report History</h3>
                            <div id="report-history-list">
                                <!-- Report history -->
                            </div>
                        </div>
                        
                        <div class="report-preview">
                            <h3>Latest Report Summary</h3>
                            <div id="latest-report-summary">
                                <!-- Latest report summary -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="panel" id="panel-alerts">
                        <div class="alert-settings">
                            <h3>Alert Settings</h3>
                            <div class="alert-thresholds">
                                <div class="threshold-setting">
                                    <label>LCP Warning (ms):</label>
                                    <input type="number" id="lcp-warning" value="2500">
                                </div>
                                <div class="threshold-setting">
                                    <label>LCP Critical (ms):</label>
                                    <input type="number" id="lcp-critical" value="4000">
                                </div>
                                <div class="threshold-setting">
                                    <label>Error Rate Warning (%):</label>
                                    <input type="number" id="error-warning" value="1" step="0.1">
                                </div>
                                <div class="threshold-setting">
                                    <label>Error Rate Critical (%):</label>
                                    <input type="number" id="error-critical" value="5" step="0.1">
                                </div>
                            </div>
                            <button class="btn btn-primary" id="save-thresholds">Save Thresholds</button>
                        </div>
                        
                        <div class="alert-history">
                            <h3>Alert History</h3>
                            <div id="alert-history-list">
                                <!-- Alert history -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        this.addStyles();
        
        document.body.appendChild(dashboard);
        this.dashboardElement = dashboard;
    }
    
    addStyles() {
        if (document.getElementById('performance-dashboard-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'performance-dashboard-styles';
        styles.textContent = `
            #performance-monitoring-dashboard {
                position: fixed;
                top: 50px;
                right: 20px;
                width: 800px;
                max-height: 80vh;
                background: #1a1a1a;
                color: #00ff00;
                border: 2px solid #00ff00;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                z-index: 10000;
                display: none;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 255, 0, 0.3);
            }
            
            #performance-monitoring-dashboard.visible {
                display: block;
            }
            
            #performance-monitoring-dashboard.minimized .dashboard-content {
                display: none;
            }
            
            .dashboard-header {
                background: #2a2a2a;
                padding: 15px 20px;
                border-bottom: 1px solid #00ff00;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
            }
            
            .dashboard-header h2 {
                margin: 0;
                font-size: 18px;
                color: #00ff00;
            }
            
            .dashboard-controls button {
                background: none;
                border: 1px solid #00ff00;
                color: #00ff00;
                padding: 5px 10px;
                margin-left: 5px;
                cursor: pointer;
                border-radius: 3px;
                font-family: inherit;
            }
            
            .dashboard-controls button:hover {
                background: #00ff00;
                color: #1a1a1a;
            }
            
            .dashboard-content {
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .dashboard-tabs {
                display: flex;
                background: #2a2a2a;
                border-bottom: 1px solid #00ff00;
            }
            
            .tab-btn {
                background: none;
                border: none;
                color: #00ff00;
                padding: 12px 20px;
                cursor: pointer;
                font-family: inherit;
                border-right: 1px solid #00ff00;
                transition: background 0.2s;
            }
            
            .tab-btn:hover,
            .tab-btn.active {
                background: #00ff00;
                color: #1a1a1a;
            }
            
            .panel {
                display: none;
                padding: 20px;
            }
            
            .panel.active {
                display: block;
            }
            
            .overview-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .metric-card {
                background: #2a2a2a;
                border: 1px solid #00ff00;
                border-radius: 4px;
                padding: 15px;
                text-align: center;
            }
            
            .metric-title {
                font-size: 12px;
                opacity: 0.8;
                margin-bottom: 8px;
            }
            
            .metric-value {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 5px;
            }
            
            .metric-trend {
                font-size: 18px;
            }
            
            .metric-indicator {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin: 0 auto;
                background: #00ff00;
            }
            
            .metric-indicator.warning {
                background: #ffc107;
            }
            
            .metric-indicator.critical {
                background: #dc3545;
            }
            
            .vitals-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .vital-metric {
                background: #2a2a2a;
                border: 1px solid #00ff00;
                border-radius: 4px;
                padding: 15px;
                text-align: center;
            }
            
            .vital-label {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
            }
            
            .vital-value {
                font-size: 20px;
                margin-bottom: 5px;
            }
            
            .vital-status {
                font-size: 12px;
                opacity: 0.8;
                margin-bottom: 10px;
            }
            
            .vital-bar {
                height: 4px;
                background: #333;
                border-radius: 2px;
                overflow: hidden;
            }
            
            .vital-progress {
                height: 100%;
                background: #00ff00;
                transition: width 0.3s ease;
            }
            
            .vital-progress.warning {
                background: #ffc107;
            }
            
            .vital-progress.critical {
                background: #dc3545;
            }
            
            .uptime-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .uptime-stat,
            .error-stat {
                background: #2a2a2a;
                border: 1px solid #00ff00;
                border-radius: 4px;
                padding: 15px;
                text-align: center;
            }
            
            .stat-label {
                font-size: 12px;
                opacity: 0.8;
                margin-bottom: 8px;
            }
            
            .stat-value {
                font-size: 20px;
                font-weight: bold;
            }
            
            .error-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .recent-alerts,
            .endpoint-status,
            .outage-history,
            .error-types,
            .recent-errors,
            .report-history,
            .report-preview,
            .alert-history {
                background: #2a2a2a;
                border: 1px solid #00ff00;
                border-radius: 4px;
                padding: 15px;
                margin-bottom: 15px;
            }
            
            .recent-alerts h3,
            .endpoint-status h3,
            .outage-history h3,
            .error-types h3,
            .recent-errors h3,
            .report-history h3,
            .report-preview h3,
            .alert-history h3,
            .alert-settings h3 {
                margin: 0 0 15px 0;
                font-size: 16px;
                color: #00ff00;
            }
            
            .alert-item,
            .endpoint-item,
            .outage-item,
            .error-item,
            .report-item,
            .alert-history-item {
                padding: 8px 0;
                border-bottom: 1px solid #333;
                font-size: 14px;
            }
            
            .alert-item:last-child,
            .endpoint-item:last-child,
            .outage-item:last-child,
            .error-item:last-child,
            .report-item:last-child,
            .alert-history-item:last-child {
                border-bottom: none;
            }
            
            .status-online {
                color: #00ff00;
            }
            
            .status-offline {
                color: #dc3545;
            }
            
            .status-warning {
                color: #ffc107;
            }
            
            .report-actions {
                margin-bottom: 20px;
            }
            
            .btn {
                background: #2a2a2a;
                border: 1px solid #00ff00;
                color: #00ff00;
                padding: 8px 16px;
                margin-right: 10px;
                cursor: pointer;
                border-radius: 4px;
                font-family: inherit;
                font-size: 14px;
            }
            
            .btn:hover {
                background: #00ff00;
                color: #1a1a1a;
            }
            
            .btn-primary {
                background: #00ff00;
                color: #1a1a1a;
            }
            
            .btn-primary:hover {
                background: #00cc00;
            }
            
            .alert-thresholds {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .threshold-setting {
                display: flex;
                flex-direction: column;
            }
            
            .threshold-setting label {
                font-size: 12px;
                margin-bottom: 5px;
                opacity: 0.8;
            }
            
            .threshold-setting input {
                background: #1a1a1a;
                border: 1px solid #00ff00;
                color: #00ff00;
                padding: 8px;
                border-radius: 4px;
                font-family: inherit;
            }
            
            .vitals-chart {
                background: #2a2a2a;
                border: 1px solid #00ff00;
                border-radius: 4px;
                padding: 15px;
            }
            
            #vitals-chart {
                width: 100%;
                height: 200px;
                background: #1a1a1a;
                border: 1px solid #333;
            }
            
            /* Scrollbar styling */
            .dashboard-content::-webkit-scrollbar {
                width: 8px;
            }
            
            .dashboard-content::-webkit-scrollbar-track {
                background: #2a2a2a;
            }
            
            .dashboard-content::-webkit-scrollbar-thumb {
                background: #00ff00;
                border-radius: 4px;
            }
            
            .dashboard-content::-webkit-scrollbar-thumb:hover {
                background: #00cc00;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    bindEvents() {
        const dashboard = this.dashboardElement;
        
        // Close button
        dashboard.querySelector('.btn-close').addEventListener('click', () => {
            this.hide();
        });
        
        // Minimize button
        dashboard.querySelector('.btn-minimize').addEventListener('click', () => {
            this.toggleMinimize();
        });
        
        // Tab switching
        dashboard.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });
        
        // Report actions
        dashboard.querySelector('#generate-report').addEventListener('click', () => {
            this.generateReport();
        });
        
        dashboard.querySelector('#export-data').addEventListener('click', () => {
            this.exportData();
        });
        
        dashboard.querySelector('#save-thresholds').addEventListener('click', () => {
            this.saveThresholds();
        });
        
        // Make dashboard draggable
        this.makeDraggable();
    }
    
    makeDraggable() {
        const header = this.dashboardElement.querySelector('.dashboard-header');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        
        header.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === header || header.contains(e.target)) {
                isDragging = true;
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                xOffset = currentX;
                yOffset = currentY;
                
                this.dashboardElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+M to toggle dashboard
            if (e.ctrlKey && e.shiftKey && e.key === 'M') {
                e.preventDefault();
                this.toggle();
            }
            
            // Escape to close dashboard
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }
    
    startUpdating() {
        this.updateInterval = setInterval(() => {
            this.updateDashboard();
        }, 2000); // Update every 2 seconds
    }
    
    updateDashboard() {
        if (!this.isVisible) return;
        
        this.updateOverview();
        this.updateVitals();
        this.updateUptime();
        this.updateErrors();
        this.updateReports();
        this.updateAlerts();
    }
    
    updateOverview() {
        // Overall health
        const health = this.calculateOverallHealth();
        document.getElementById('overall-health').textContent = health.status;
        document.getElementById('health-indicator').className = `metric-indicator ${health.level}`;
        
        // Uptime
        if (window.uptimeMonitor) {
            const status = window.uptimeMonitor.getStatus();
            document.getElementById('uptime-percentage').textContent = status.uptimePercentage.toFixed(1) + '%';
        }
        
        // Error rate
        if (window.errorTrackingSystem) {
            const stats = window.errorTrackingSystem.getErrorStats();
            document.getElementById('error-rate').textContent = (stats.errorRate * 100).toFixed(1) + '%';
        }
        
        // Average response time
        if (window.uptimeMonitor) {
            const avgResponse = window.uptimeMonitor.getAverageResponseTime();
            if (avgResponse) {
                document.getElementById('avg-response').textContent = Math.round(avgResponse) + 'ms';
            }
        }
        
        // Recent alerts
        this.updateRecentAlerts();
    }
    
    updateVitals() {
        if (!window.coreWebVitalsOptimizer) return;
        
        const metrics = window.coreWebVitalsOptimizer.getMetrics();
        
        Object.entries(metrics).forEach(([metric, value]) => {
            const element = document.querySelector(`[data-metric="${metric}"]`);
            if (!element || value === null) return;
            
            const valueElement = element.querySelector('.vital-value');
            const statusElement = element.querySelector('.vital-status');
            const progressElement = element.querySelector('.vital-progress');
            
            // Format value
            let formattedValue;
            if (metric === 'cls') {
                formattedValue = value.toFixed(3);
            } else {
                formattedValue = Math.round(value) + 'ms';
            }
            
            valueElement.textContent = formattedValue;
            
            // Get status
            const status = this.getMetricStatus(metric, value);
            statusElement.textContent = status;
            statusElement.className = `vital-status status-${status}`;
            
            // Update progress bar
            const percentage = this.getMetricPercentage(metric, value);
            progressElement.style.width = percentage + '%';
            progressElement.className = `vital-progress ${status === 'good' ? '' : status === 'needs-improvement' ? 'warning' : 'critical'}`;
        });
    }
    
    updateUptime() {
        if (!window.uptimeMonitor) return;
        
        const status = window.uptimeMonitor.getStatus();
        
        // Current status
        document.getElementById('current-status').textContent = status.isOnline ? 'Online' : 'Offline';
        document.getElementById('current-status').className = status.isOnline ? 'status-online' : 'status-offline';
        
        // Uptime percentages
        const report24h = window.uptimeMonitor.getUptimeReport(86400000);
        const report7d = window.uptimeMonitor.getUptimeReport(7 * 86400000);
        
        document.getElementById('uptime-24h').textContent = report24h.uptimePercentage.toFixed(1) + '%';
        document.getElementById('uptime-7d').textContent = report7d.uptimePercentage.toFixed(1) + '%';
        
        // Average response time
        const avgResponse = window.uptimeMonitor.getAverageResponseTime();
        if (avgResponse) {
            document.getElementById('avg-response-time').textContent = Math.round(avgResponse) + 'ms';
        }
        
        // Endpoint status
        this.updateEndpointStatus(status);
        
        // Outage history
        this.updateOutageHistory();
    }
    
    updateErrors() {
        if (!window.errorTrackingSystem) return;
        
        const stats = window.errorTrackingSystem.getErrorStats();
        
        document.getElementById('total-errors').textContent = stats.totalErrors;
        document.getElementById('critical-errors').textContent = stats.criticalErrors;
        document.getElementById('error-rate-detailed').textContent = (stats.errorRate * 100).toFixed(1) + '%';
        
        // Error types chart
        this.updateErrorTypesChart(stats.errorTypes);
        
        // Recent errors
        this.updateRecentErrors(stats.topErrors);
    }
    
    updateReports() {
        if (!window.performanceReportsGenerator) return;
        
        const history = window.performanceReportsGenerator.getReportHistory(null, 5);
        const historyList = document.getElementById('report-history-list');
        
        if (history.length === 0) {
            historyList.innerHTML = '<div class="report-item">No reports generated yet</div>';
        } else {
            historyList.innerHTML = history.map(report => `
                <div class="report-item">
                    <strong>${report.type}</strong> - ${new Date(report.timestamp).toLocaleString()}
                    <span class="status-${report.analysis?.overall || 'unknown'}">${report.analysis?.overall || 'Unknown'}</span>
                </div>
            `).join('');
        }
        
        // Latest report summary
        const latest = window.performanceReportsGenerator.getLatestReport();
        const summaryElement = document.getElementById('latest-report-summary');
        
        if (latest) {
            summaryElement.innerHTML = `
                <div><strong>Type:</strong> ${latest.type}</div>
                <div><strong>Generated:</strong> ${new Date(latest.timestamp).toLocaleString()}</div>
                <div><strong>Status:</strong> <span class="status-${latest.analysis?.overall || 'unknown'}">${latest.analysis?.overall || 'Unknown'}</span></div>
                <div><strong>Issues:</strong> ${latest.analysis?.issues?.length || 0}</div>
                <div><strong>Recommendations:</strong> ${latest.recommendations?.length || 0}</div>
            `;
        } else {
            summaryElement.innerHTML = '<div>No reports available</div>';
        }
    }
    
    updateAlerts() {
        if (!window.performanceAlertsSystem) return;
        
        const history = window.performanceAlertsSystem.getAlertHistory();
        const historyList = document.getElementById('alert-history-list');
        
        if (history.length === 0) {
            historyList.innerHTML = '<div class="alert-history-item">No alerts in the last 24 hours</div>';
        } else {
            historyList.innerHTML = history.slice(-10).reverse().map(alert => `
                <div class="alert-history-item">
                    <strong>${alert.metric.toUpperCase()}</strong> - ${alert.severity}
                    <div style="font-size: 12px; opacity: 0.8;">${new Date(alert.timestamp).toLocaleString()}</div>
                    <div style="font-size: 12px;">${alert.message}</div>
                </div>
            `).join('');
        }
    }
    
    updateRecentAlerts() {
        const alertsList = document.getElementById('recent-alerts-list');
        
        if (window.performanceAlertsSystem) {
            const recentAlerts = window.performanceAlertsSystem.getAlertHistory(3600000); // Last hour
            
            if (recentAlerts.length === 0) {
                alertsList.innerHTML = '<div class="alert-item">No recent alerts</div>';
            } else {
                alertsList.innerHTML = recentAlerts.slice(-3).reverse().map(alert => `
                    <div class="alert-item status-${alert.severity}">
                        ${alert.metric.toUpperCase()}: ${alert.message}
                    </div>
                `).join('');
            }
        }
    }
    
    updateEndpointStatus(status) {
        const endpointList = document.getElementById('endpoint-list');
        
        if (status.currentOutages && status.currentOutages.length > 0) {
            endpointList.innerHTML = status.currentOutages.map(outage => `
                <div class="endpoint-item status-offline">
                    ${outage.endpoint} - ${outage.error}
                </div>
            `).join('');
        } else {
            endpointList.innerHTML = '<div class="endpoint-item status-online">All endpoints operational</div>';
        }
    }
    
    updateOutageHistory() {
        const outageList = document.getElementById('outage-list');
        
        if (window.uptimeMonitor) {
            const report = window.uptimeMonitor.getUptimeReport(86400000); // Last 24 hours
            
            if (report.downtimeEvents === 0) {
                outageList.innerHTML = '<div class="outage-item">No outages in the last 24 hours</div>';
            } else {
                // This would need to be implemented in the uptime monitor
                outageList.innerHTML = `<div class="outage-item">${report.downtimeEvents} outage(s) in the last 24 hours</div>`;
            }
        }
    }
    
    updateErrorTypesChart(errorTypes) {
        const chartContainer = document.getElementById('error-types-chart');
        
        if (Object.keys(errorTypes).length === 0) {
            chartContainer.innerHTML = '<div>No errors to display</div>';
            return;
        }
        
        const total = Object.values(errorTypes).reduce((sum, count) => sum + count, 0);
        
        chartContainer.innerHTML = Object.entries(errorTypes).map(([type, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            return `
                <div style="margin-bottom: 8px;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>${type}</span>
                        <span>${count} (${percentage}%)</span>
                    </div>
                    <div style="background: #333; height: 4px; border-radius: 2px; overflow: hidden;">
                        <div style="background: #00ff00; height: 100%; width: ${percentage}%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updateRecentErrors(topErrors) {
        const errorsList = document.getElementById('recent-errors-list');
        
        if (topErrors.length === 0) {
            errorsList.innerHTML = '<div class="error-item">No recent errors</div>';
        } else {
            errorsList.innerHTML = topErrors.slice(0, 5).map(error => `
                <div class="error-item">
                    <strong>${error.type}:</strong> ${error.message}
                    <div style="font-size: 12px; opacity: 0.8;">Count: ${error.count}</div>
                </div>
            `).join('');
        }
    }
    
    calculateOverallHealth() {
        let score = 100;
        let level = 'good';
        
        // Check Core Web Vitals
        if (window.coreWebVitalsOptimizer) {
            const metrics = window.coreWebVitalsOptimizer.getMetrics();
            
            Object.entries(metrics).forEach(([metric, value]) => {
                if (value !== null) {
                    const status = this.getMetricStatus(metric, value);
                    if (status === 'poor') {
                        score -= 20;
                        level = 'critical';
                    } else if (status === 'needs-improvement') {
                        score -= 10;
                        if (level === 'good') level = 'warning';
                    }
                }
            });
        }
        
        // Check uptime
        if (window.uptimeMonitor) {
            const status = window.uptimeMonitor.getStatus();
            if (status.uptimePercentage < 99.0) {
                score -= 30;
                level = 'critical';
            } else if (status.uptimePercentage < 99.5) {
                score -= 15;
                if (level === 'good') level = 'warning';
            }
        }
        
        // Check error rate
        if (window.errorTrackingSystem) {
            const stats = window.errorTrackingSystem.getErrorStats();
            if (stats.errorRate > 0.05) { // 5%
                score -= 25;
                level = 'critical';
            } else if (stats.errorRate > 0.01) { // 1%
                score -= 10;
                if (level === 'good') level = 'warning';
            }
        }
        
        score = Math.max(0, score);
        
        let status;
        if (score >= 80) status = 'Excellent';
        else if (score >= 60) status = 'Good';
        else if (score >= 40) status = 'Fair';
        else status = 'Poor';
        
        return { status, level, score };
    }
    
    getMetricStatus(metric, value) {
        const thresholds = {
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 },
            ttfb: { good: 800, poor: 1800 },
            fcp: { good: 1800, poor: 3000 }
        };
        
        const threshold = thresholds[metric];
        if (!threshold) return 'unknown';
        
        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    }
    
    getMetricPercentage(metric, value) {
        const thresholds = {
            lcp: { max: 6000 },
            fid: { max: 500 },
            cls: { max: 0.5 },
            ttfb: { max: 3000 },
            fcp: { max: 5000 }
        };
        
        const threshold = thresholds[metric];
        if (!threshold) return 0;
        
        return Math.min((value / threshold.max) * 100, 100);
    }
    
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update panels
        document.querySelectorAll('.panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`panel-${tabName}`).classList.add('active');
    }
    
    generateReport() {
        if (window.performanceReportsGenerator) {
            window.performanceReportsGenerator.generateCustomReport(3600000) // Last hour
                .then(report => {
                    console.log('Custom report generated:', report);
                    this.updateReports();
                });
        }
    }
    
    exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            coreWebVitals: window.coreWebVitalsOptimizer?.getMetrics() || {},
            uptime: window.uptimeMonitor?.getStatus() || {},
            errors: window.errorTrackingSystem?.getErrorStats() || {},
            alerts: window.performanceAlertsSystem?.getAlertSummary() || {}
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-data-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    saveThresholds() {
        if (window.performanceAlertsSystem) {
            const lcpWarning = document.getElementById('lcp-warning').value;
            const lcpCritical = document.getElementById('lcp-critical').value;
            const errorWarning = document.getElementById('error-warning').value;
            const errorCritical = document.getElementById('error-critical').value;
            
            window.performanceAlertsSystem.setThreshold('lcp', 'warning', parseInt(lcpWarning));
            window.performanceAlertsSystem.setThreshold('lcp', 'critical', parseInt(lcpCritical));
            window.performanceAlertsSystem.setThreshold('errorRate', 'warning', parseFloat(errorWarning));
            window.performanceAlertsSystem.setThreshold('errorRate', 'critical', parseFloat(errorCritical));
            
            console.log('Alert thresholds updated');
        }
    }
    
    show() {
        this.dashboardElement.classList.add('visible');
        this.isVisible = true;
        this.updateDashboard();
    }
    
    hide() {
        this.dashboardElement.classList.remove('visible');
        this.isVisible = false;
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    toggleMinimize() {
        this.dashboardElement.classList.toggle('minimized');
    }
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        if (this.dashboardElement) {
            this.dashboardElement.remove();
        }
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other monitoring systems to initialize
    setTimeout(() => {
        window.performanceMonitoringDashboard = new PerformanceMonitoringDashboard();
        console.log('Performance Monitoring Dashboard initialized. Press Ctrl+Shift+M to toggle.');
    }, 1000);
});

// Export for external use
window.PerformanceMonitoringDashboard = PerformanceMonitoringDashboard;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitoringDashboard;
}