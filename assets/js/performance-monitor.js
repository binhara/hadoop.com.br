/**
 * Performance Monitoring Dashboard
 * Real-time monitoring and reporting of Core Web Vitals
 */

class PerformanceMonitor {
    constructor() {
        this.isVisible = false;
        this.updateInterval = null;
        this.metrics = {};
        
        this.init();
    }
    
    init() {
        this.createMonitorUI();
        this.bindEvents();
        this.startMonitoring();
    }
    
    createMonitorUI() {
        // Create monitor container
        const monitor = document.createElement('div');
        monitor.id = 'performance-monitor';
        monitor.innerHTML = `
            <div class="monitor-header">
                <h3>Core Web Vitals Monitor</h3>
                <button class="monitor-toggle" title="Toggle Monitor">📊</button>
                <button class="monitor-close" title="Close Monitor">✕</button>
            </div>
            <div class="monitor-content">
                <div class="metric-group">
                    <div class="metric-item" data-metric="lcp">
                        <div class="metric-label">LCP</div>
                        <div class="metric-value">-</div>
                        <div class="metric-status">measuring</div>
                        <div class="metric-bar"><div class="metric-progress"></div></div>
                    </div>
                    <div class="metric-item" data-metric="fid">
                        <div class="metric-label">FID</div>
                        <div class="metric-value">-</div>
                        <div class="metric-status">measuring</div>
                        <div class="metric-bar"><div class="metric-progress"></div></div>
                    </div>
                    <div class="metric-item" data-metric="cls">
                        <div class="metric-label">CLS</div>
                        <div class="metric-value">-</div>
                        <div class="metric-status">measuring</div>
                        <div class="metric-bar"><div class="metric-progress"></div></div>
                    </div>
                </div>
                <div class="metric-group">
                    <div class="metric-item" data-metric="ttfb">
                        <div class="metric-label">TTFB</div>
                        <div class="metric-value">-</div>
                        <div class="metric-status">measuring</div>
                        <div class="metric-bar"><div class="metric-progress"></div></div>
                    </div>
                    <div class="metric-item" data-metric="fcp">
                        <div class="metric-label">FCP</div>
                        <div class="metric-value">-</div>
                        <div class="metric-status">measuring</div>
                        <div class="metric-bar"><div class="metric-progress"></div></div>
                    </div>
                </div>
                <div class="monitor-actions">
                    <button class="btn-export">Export Report</button>
                    <button class="btn-clear">Clear Data</button>
                    <button class="btn-refresh">Refresh</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(monitor);
        this.monitorElement = monitor;
    }
    
    bindEvents() {
        const monitor = this.monitorElement;
        
        // Toggle visibility
        monitor.querySelector('.monitor-toggle').addEventListener('click', () => {
            this.toggle();
        });
        
        // Close monitor
        monitor.querySelector('.monitor-close').addEventListener('click', () => {
            this.hide();
        });
        
        // Export report
        monitor.querySelector('.btn-export').addEventListener('click', () => {
            this.exportReport();
        });
        
        // Clear data
        monitor.querySelector('.btn-clear').addEventListener('click', () => {
            this.clearData();
        });
        
        // Refresh metrics
        monitor.querySelector('.btn-refresh').addEventListener('click', () => {
            this.refreshMetrics();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                this.toggle();
            }
        });
    }
    
    startMonitoring() {
        // Update metrics every 2 seconds
        this.updateInterval = setInterval(() => {
            this.updateMetrics();
        }, 2000);
        
        // Listen for Core Web Vitals updates
        if (window.coreWebVitalsOptimizer) {
            this.listenToOptimizer();
        }
    }
    
    listenToOptimizer() {
        const optimizer = window.coreWebVitalsOptimizer;
        
        // Override reportMetric to capture updates
        const originalReportMetric = optimizer.reportMetric.bind(optimizer);
        optimizer.reportMetric = (name, value) => {
            originalReportMetric(name, value);
            this.updateMetric(name, value);
        };
    }
    
    updateMetrics() {
        if (!window.coreWebVitalsOptimizer) return;
        
        const metrics = window.coreWebVitalsOptimizer.getMetrics();
        
        Object.entries(metrics).forEach(([name, value]) => {
            if (value !== null) {
                this.updateMetric(name, value);
            }
        });
    }
    
    updateMetric(name, value) {
        const metricElement = this.monitorElement.querySelector(`[data-metric="${name}"]`);
        if (!metricElement) return;
        
        this.metrics[name] = value;
        
        const valueElement = metricElement.querySelector('.metric-value');
        const statusElement = metricElement.querySelector('.metric-status');
        const progressElement = metricElement.querySelector('.metric-progress');
        
        // Format value based on metric type
        let formattedValue;
        if (name === 'cls') {
            formattedValue = value.toFixed(3);
        } else {
            formattedValue = Math.round(value) + 'ms';
        }
        
        valueElement.textContent = formattedValue;
        
        // Get status and update UI
        const status = this.getMetricStatus(name, value);
        statusElement.textContent = status;
        statusElement.className = `metric-status status-${status}`;
        
        // Update progress bar
        const percentage = this.getMetricPercentage(name, value);
        progressElement.style.width = percentage + '%';
        progressElement.className = `metric-progress progress-${status}`;
        
        // Update metric item class
        metricElement.className = `metric-item metric-${status}`;
    }
    
    getMetricStatus(name, value) {
        const thresholds = {
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 },
            ttfb: { good: 800, poor: 1800 },
            fcp: { good: 1800, poor: 3000 }
        };
        
        const threshold = thresholds[name];
        if (!threshold) return 'unknown';
        
        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    }
    
    getMetricPercentage(name, value) {
        const thresholds = {
            lcp: { max: 6000 },
            fid: { max: 500 },
            cls: { max: 0.5 },
            ttfb: { max: 3000 },
            fcp: { max: 5000 }
        };
        
        const threshold = thresholds[name];
        if (!threshold) return 0;
        
        return Math.min((value / threshold.max) * 100, 100);
    }
    
    show() {
        this.monitorElement.classList.add('monitor-visible');
        this.isVisible = true;
    }
    
    hide() {
        this.monitorElement.classList.remove('monitor-visible');
        this.isVisible = false;
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            metrics: { ...this.metrics },
            thresholds: {
                lcp: { good: 2500, poor: 4000 },
                fid: { good: 100, poor: 300 },
                cls: { good: 0.1, poor: 0.25 },
                ttfb: { good: 800, poor: 1800 },
                fcp: { good: 1800, poor: 3000 }
            },
            status: this.getOverallStatus()
        };
        
        // Create and download JSON file
        const blob = new Blob([JSON.stringify(report, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `core-web-vitals-report-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('Core Web Vitals report exported:', report);
    }
    
    clearData() {
        this.metrics = {};
        
        // Clear localStorage
        localStorage.removeItem('cwv_metrics');
        
        // Reset UI
        const metricItems = this.monitorElement.querySelectorAll('.metric-item');
        metricItems.forEach(item => {
            item.querySelector('.metric-value').textContent = '-';
            item.querySelector('.metric-status').textContent = 'measuring';
            item.querySelector('.metric-status').className = 'metric-status';
            item.querySelector('.metric-progress').style.width = '0%';
            item.querySelector('.metric-progress').className = 'metric-progress';
            item.className = 'metric-item';
        });
        
        console.log('Performance data cleared');
    }
    
    refreshMetrics() {
        this.updateMetrics();
        console.log('Metrics refreshed');
    }
    
    getOverallStatus() {
        const statuses = Object.entries(this.metrics).map(([name, value]) => {
            return this.getMetricStatus(name, value);
        });
        
        if (statuses.includes('poor')) return 'poor';
        if (statuses.includes('needs-improvement')) return 'needs-improvement';
        if (statuses.length > 0) return 'good';
        return 'measuring';
    }
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        if (this.monitorElement) {
            this.monitorElement.remove();
        }
    }
}

// Auto-initialize in development mode
if (window.OptimizationConfig?.development?.debug) {
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceMonitor = new PerformanceMonitor();
        console.log('Performance Monitor initialized. Press Ctrl+Shift+P to toggle.');
    });
}

// Export for manual initialization
window.PerformanceMonitor = PerformanceMonitor;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}