/**
 * Performance Alerts System
 * Configures alerts for Core Web Vitals and performance degradation
 */

class PerformanceAlertsSystem {
    constructor() {
        this.alertThresholds = {
            lcp: { warning: 2500, critical: 4000 },
            fid: { warning: 100, critical: 300 },
            cls: { warning: 0.1, critical: 0.25 },
            ttfb: { warning: 800, critical: 1800 },
            fcp: { warning: 1800, critical: 3000 },
            uptime: { warning: 99.5, critical: 99.0 }, // percentage
            errorRate: { warning: 1, critical: 5 } // percentage
        };
        
        this.alertsEnabled = {
            visual: false, // Desabilitado por padrão
            notification: false, // Desabilitado por padrão
            console: true, // Apenas console habilitado
            analytics: true, // Analytics mantido para métricas
            overlay: false // Overlay desabilitado
        };
        
        this.alertHistory = [];
        this.alertCallbacks = new Map();
        this.isMonitoring = false;
        
        this.init();
    }
    
    init() {
        this.setupAlertChannels();
        this.startMonitoring();
        this.loadAlertHistory();
    }
    
    setupAlertChannels() {
        // Console alerts (sempre disponível, mas controlado)
        this.registerAlertChannel('console', (alert) => {
            if (this.alertsEnabled.console) {
                const level = alert.severity === 'critical' ? 'error' : 'warn';
                console[level](`🚨 Performance Alert [${alert.severity.toUpperCase()}]:`, alert);
            }
        });
        
        // Browser notification alerts (desabilitado por padrão)
        if ('Notification' in window) {
            this.registerAlertChannel('notification', (alert) => {
                if (this.alertsEnabled.notification && Notification.permission === 'granted') {
                    new Notification(`Performance Alert: ${alert.metric}`, {
                        body: alert.message,
                        icon: '/assets/images/alert-icon.png',
                        tag: `perf-alert-${alert.metric}`,
                        requireInteraction: alert.severity === 'critical'
                    });
                }
            });
        }
        
        // Visual alert overlay (desabilitado por padrão)
        this.registerAlertChannel('overlay', (alert) => {
            if (this.alertsEnabled.overlay) {
                this.showVisualAlert(alert);
            }
        });
        
        // Analytics event tracking (mantido para métricas)
        this.registerAlertChannel('analytics', (alert) => {
            if (this.alertsEnabled.analytics && window.gtag) {
                gtag('event', 'performance_alert', {
                    metric: alert.metric,
                    severity: alert.severity,
                    value: alert.value,
                    threshold: alert.threshold,
                    custom_parameter_1: alert.url
                });
            }
        });
    }
    
    registerAlertChannel(name, callback) {
        this.alertCallbacks.set(name, callback);
    }
    
    startMonitoring() {
        if (this.isMonitoring) return;
        this.isMonitoring = true;
        
        // Monitor Core Web Vitals
        this.monitorCoreWebVitals();
        
        // Monitor JavaScript errors
        this.monitorJavaScriptErrors();
        
        // Monitor network performance
        this.monitorNetworkPerformance();
        
        // Monitor resource loading
        this.monitorResourceLoading();
        
        // Check alerts every 30 seconds
        setInterval(() => {
            this.checkPerformanceThresholds();
        }, 30000);
        
        console.log('Performance Alerts System started');
    }
    
    monitorCoreWebVitals() {
        // Listen to Core Web Vitals updates
        if (window.coreWebVitalsOptimizer) {
            const optimizer = window.coreWebVitalsOptimizer;
            
            // Override reportMetric to capture all metrics
            const originalReportMetric = optimizer.reportMetric?.bind(optimizer);
            if (originalReportMetric) {
                optimizer.reportMetric = (name, value) => {
                    originalReportMetric(name, value);
                    this.checkMetricThreshold(name, value);
                };
            }
        }
        
        // Direct Performance Observer monitoring as fallback
        if ('PerformanceObserver' in window) {
            this.setupDirectCWVMonitoring();
        }
    }
    
    setupDirectCWVMonitoring() {
        // LCP monitoring
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.checkMetricThreshold('lcp', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID monitoring
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.name === 'first-input') {
                    const fid = entry.processingStart - entry.startTime;
                    this.checkMetricThreshold('fid', fid);
                }
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // CLS monitoring
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    this.checkMetricThreshold('cls', clsValue);
                }
            });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
    
    monitorJavaScriptErrors() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleJavaScriptError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error,
                stack: event.error?.stack,
                timestamp: Date.now()
            });
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleJavaScriptError({
                type: 'promise',
                message: event.reason?.message || 'Unhandled Promise Rejection',
                reason: event.reason,
                stack: event.reason?.stack,
                timestamp: Date.now()
            });
        });
        
        // Resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleResourceError({
                    type: 'resource',
                    element: event.target.tagName,
                    source: event.target.src || event.target.href,
                    message: 'Resource failed to load',
                    timestamp: Date.now()
                });
            }
        }, true);
    }
    
    monitorNetworkPerformance() {
        if ('PerformanceObserver' in window) {
            const networkObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    // Monitor slow network requests
                    if (entry.duration > 5000) { // 5 seconds
                        this.triggerAlert({
                            metric: 'network',
                            severity: 'warning',
                            value: entry.duration,
                            threshold: 5000,
                            message: `Slow network request detected: ${entry.name} took ${Math.round(entry.duration)}ms`,
                            url: window.location.href,
                            details: {
                                resource: entry.name,
                                duration: entry.duration,
                                transferSize: entry.transferSize
                            }
                        });
                    }
                    
                    // Monitor failed requests
                    if (entry.transferSize === 0 && entry.duration > 0) {
                        this.triggerAlert({
                            metric: 'network',
                            severity: 'critical',
                            value: 0,
                            threshold: 1,
                            message: `Failed network request: ${entry.name}`,
                            url: window.location.href,
                            details: {
                                resource: entry.name,
                                duration: entry.duration
                            }
                        });
                    }
                });
            });
            
            networkObserver.observe({ entryTypes: ['resource'] });
        }
    }
    
    monitorResourceLoading() {
        // Monitor critical resource loading times
        const criticalResources = [
            'matrix-theme.css',
            'bootstrap.min.css',
            'main.js',
            'morpheus.png'
        ];
        
        if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    const isCritical = criticalResources.some(resource => 
                        entry.name.includes(resource)
                    );
                    
                    if (isCritical && entry.duration > 3000) {
                        this.triggerAlert({
                            metric: 'resource_loading',
                            severity: 'warning',
                            value: entry.duration,
                            threshold: 3000,
                            message: `Critical resource loaded slowly: ${entry.name} took ${Math.round(entry.duration)}ms`,
                            url: window.location.href,
                            details: {
                                resource: entry.name,
                                duration: entry.duration,
                                size: entry.transferSize
                            }
                        });
                    }
                });
            });
            
            resourceObserver.observe({ entryTypes: ['resource'] });
        }
    }
    
    checkMetricThreshold(metric, value) {
        const thresholds = this.alertThresholds[metric];
        if (!thresholds) return;
        
        let severity = null;
        let threshold = null;
        
        if (value >= thresholds.critical) {
            severity = 'critical';
            threshold = thresholds.critical;
        } else if (value >= thresholds.warning) {
            severity = 'warning';
            threshold = thresholds.warning;
        }
        
        if (severity) {
            this.triggerAlert({
                metric,
                severity,
                value,
                threshold,
                message: this.getMetricAlertMessage(metric, value, severity),
                url: window.location.href,
                timestamp: Date.now()
            });
        }
    }
    
    checkPerformanceThresholds() {
        // Check overall performance health
        if (window.coreWebVitalsOptimizer) {
            const metrics = window.coreWebVitalsOptimizer.getMetrics();
            
            Object.entries(metrics).forEach(([metric, value]) => {
                if (value !== null) {
                    this.checkMetricThreshold(metric, value);
                }
            });
        }
        
        // Check error rate
        this.checkErrorRate();
    }
    
    checkErrorRate() {
        const recentErrors = this.getRecentErrors(300000); // Last 5 minutes
        const totalPageViews = this.getPageViews(300000);
        
        if (totalPageViews > 0) {
            const errorRate = (recentErrors.length / totalPageViews) * 100;
            this.checkMetricThreshold('errorRate', errorRate);
        }
    }
    
    handleJavaScriptError(errorInfo) {
        // Store error for rate calculation
        this.storeError(errorInfo);
        
        // Trigger immediate alert for critical errors
        if (this.isCriticalError(errorInfo)) {
            this.triggerAlert({
                metric: 'javascript_error',
                severity: 'critical',
                value: 1,
                threshold: 0,
                message: `Critical JavaScript error: ${errorInfo.message}`,
                url: window.location.href,
                details: errorInfo
            });
        }
        
        // Send error to analytics
        if (window.gtag) {
            gtag('event', 'exception', {
                description: errorInfo.message,
                fatal: this.isCriticalError(errorInfo),
                custom_parameter_1: errorInfo.filename,
                custom_parameter_2: errorInfo.stack
            });
        }
    }
    
    handleResourceError(errorInfo) {
        this.triggerAlert({
            metric: 'resource_error',
            severity: 'warning',
            value: 1,
            threshold: 0,
            message: `Resource loading failed: ${errorInfo.source}`,
            url: window.location.href,
            details: errorInfo
        });
    }
    
    triggerAlert(alert) {
        // Prevent duplicate alerts
        if (this.isDuplicateAlert(alert)) {
            return;
        }
        
        // Add to history
        this.alertHistory.push(alert);
        this.saveAlertHistory();
        
        // Trigger all registered alert channels
        this.alertCallbacks.forEach((callback, channel) => {
            try {
                callback(alert);
            } catch (error) {
                console.error(`Alert channel ${channel} failed:`, error);
            }
        });
        
        // Limit history size
        if (this.alertHistory.length > 1000) {
            this.alertHistory = this.alertHistory.slice(-500);
        }
    }
    
    showVisualAlert(alert) {
        // Create visual alert overlay
        const alertElement = document.createElement('div');
        alertElement.className = `performance-alert alert-${alert.severity}`;
        alertElement.innerHTML = `
            <div class="alert-content">
                <div class="alert-header">
                    <span class="alert-icon">${alert.severity === 'critical' ? '🚨' : '⚠️'}</span>
                    <span class="alert-title">Performance Alert</span>
                    <button class="alert-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="alert-body">
                    <div class="alert-metric">${alert.metric.toUpperCase()}: ${this.formatMetricValue(alert.metric, alert.value)}</div>
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-threshold">Threshold: ${this.formatMetricValue(alert.metric, alert.threshold)}</div>
                </div>
                <div class="alert-actions">
                    <button class="btn btn-sm btn-outline-light" onclick="window.performanceMonitor?.show()">View Details</button>
                    <button class="btn btn-sm btn-outline-light" onclick="this.parentElement.parentElement.parentElement.remove()">Dismiss</button>
                </div>
            </div>
        `;
        
        // Add styles if not already present
        if (!document.getElementById('performance-alert-styles')) {
            const styles = document.createElement('style');
            styles.id = 'performance-alert-styles';
            styles.textContent = `
                .performance-alert {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 400px;
                    z-index: 10000;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    animation: slideInRight 0.3s ease;
                }
                .alert-critical {
                    background: linear-gradient(135deg, #dc3545, #c82333);
                    color: white;
                }
                .alert-warning {
                    background: linear-gradient(135deg, #ffc107, #e0a800);
                    color: #212529;
                }
                .alert-content {
                    padding: 16px;
                }
                .alert-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 12px;
                }
                .alert-icon {
                    font-size: 20px;
                    margin-right: 8px;
                }
                .alert-title {
                    font-weight: bold;
                    flex: 1;
                }
                .alert-close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                }
                .alert-metric {
                    font-weight: bold;
                    margin-bottom: 4px;
                }
                .alert-message {
                    margin-bottom: 8px;
                }
                .alert-threshold {
                    font-size: 0.9em;
                    opacity: 0.8;
                    margin-bottom: 12px;
                }
                .alert-actions {
                    display: flex;
                    gap: 8px;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(alertElement);
        
        // Auto-remove after 10 seconds for warnings, 30 seconds for critical
        const autoRemoveDelay = alert.severity === 'critical' ? 30000 : 10000;
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.remove();
            }
        }, autoRemoveDelay);
    }
    
    getMetricAlertMessage(metric, value, severity) {
        const messages = {
            lcp: `Largest Contentful Paint is ${severity === 'critical' ? 'critically' : ''} slow at ${Math.round(value)}ms`,
            fid: `First Input Delay is ${severity === 'critical' ? 'critically' : ''} high at ${Math.round(value)}ms`,
            cls: `Cumulative Layout Shift is ${severity === 'critical' ? 'critically' : ''} high at ${value.toFixed(3)}`,
            ttfb: `Time to First Byte is ${severity === 'critical' ? 'critically' : ''} slow at ${Math.round(value)}ms`,
            fcp: `First Contentful Paint is ${severity === 'critical' ? 'critically' : ''} slow at ${Math.round(value)}ms`,
            errorRate: `JavaScript error rate is ${severity === 'critical' ? 'critically' : ''} high at ${value.toFixed(1)}%`
        };
        
        return messages[metric] || `${metric} threshold exceeded: ${value}`;
    }
    
    formatMetricValue(metric, value) {
        if (metric === 'cls') {
            return value.toFixed(3);
        } else if (metric === 'errorRate') {
            return value.toFixed(1) + '%';
        } else {
            return Math.round(value) + 'ms';
        }
    }
    
    isDuplicateAlert(alert) {
        const recentAlerts = this.alertHistory.filter(
            a => Date.now() - a.timestamp < 60000 // Last minute
        );
        
        return recentAlerts.some(a => 
            a.metric === alert.metric && 
            a.severity === alert.severity &&
            Math.abs(a.value - alert.value) < (alert.value * 0.1) // Within 10%
        );
    }
    
    isCriticalError(errorInfo) {
        const criticalPatterns = [
            /cannot read property/i,
            /undefined is not a function/i,
            /network error/i,
            /script error/i,
            /syntax error/i
        ];
        
        return criticalPatterns.some(pattern => 
            pattern.test(errorInfo.message)
        );
    }
    
    storeError(errorInfo) {
        const errors = this.getStoredErrors();
        errors.push({
            ...errorInfo,
            timestamp: Date.now()
        });
        
        // Keep only last 100 errors
        if (errors.length > 100) {
            errors.splice(0, errors.length - 100);
        }
        
        localStorage.setItem('performance_errors', JSON.stringify(errors));
    }
    
    getStoredErrors() {
        try {
            return JSON.parse(localStorage.getItem('performance_errors') || '[]');
        } catch {
            return [];
        }
    }
    
    getRecentErrors(timeWindow) {
        const errors = this.getStoredErrors();
        const cutoff = Date.now() - timeWindow;
        return errors.filter(error => error.timestamp > cutoff);
    }
    
    getPageViews(timeWindow) {
        // Simple page view tracking - in production, this would come from analytics
        const pageViews = parseInt(sessionStorage.getItem('page_views') || '1');
        return pageViews;
    }
    
    saveAlertHistory() {
        try {
            const recentAlerts = this.alertHistory.filter(
                alert => Date.now() - alert.timestamp < 86400000 // Last 24 hours
            );
            localStorage.setItem('performance_alert_history', JSON.stringify(recentAlerts));
        } catch (error) {
            console.warn('Failed to save alert history:', error);
        }
    }
    
    loadAlertHistory() {
        try {
            const stored = localStorage.getItem('performance_alert_history');
            if (stored) {
                this.alertHistory = JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Failed to load alert history:', error);
            this.alertHistory = [];
        }
    }
    
    getAlertHistory(timeWindow = 86400000) {
        const cutoff = Date.now() - timeWindow;
        return this.alertHistory.filter(alert => alert.timestamp > cutoff);
    }
    
    getAlertSummary() {
        const last24h = this.getAlertHistory();
        const summary = {
            total: last24h.length,
            critical: last24h.filter(a => a.severity === 'critical').length,
            warning: last24h.filter(a => a.severity === 'warning').length,
            byMetric: {}
        };
        
        last24h.forEach(alert => {
            if (!summary.byMetric[alert.metric]) {
                summary.byMetric[alert.metric] = 0;
            }
            summary.byMetric[alert.metric]++;
        });
        
        return summary;
    }
    
    // Public API methods
    setThreshold(metric, level, value) {
        if (this.alertThresholds[metric] && this.alertThresholds[metric][level]) {
            this.alertThresholds[metric][level] = value;
            console.log(`Alert threshold updated: ${metric}.${level} = ${value}`);
        }
    }
    
    enableAlert(metric) {
        // Implementation for enabling specific metric alerts
        console.log(`Alerts enabled for ${metric}`);
    }
    
    disableAlert(metric) {
        // Implementation for disabling specific metric alerts
        console.log(`Alerts disabled for ${metric}`);
    }
    
    // Métodos para controlar tipos de alertas
    enableVisualAlerts() {
        this.alertsEnabled.visual = true;
        this.alertsEnabled.overlay = true;
        console.log('Visual alerts enabled');
    }
    
    disableVisualAlerts() {
        this.alertsEnabled.visual = false;
        this.alertsEnabled.overlay = false;
        console.log('Visual alerts disabled');
    }
    
    enableNotifications() {
        this.alertsEnabled.notification = true;
        // Request permission if needed
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
        console.log('Browser notifications enabled');
    }
    
    disableNotifications() {
        this.alertsEnabled.notification = false;
        console.log('Browser notifications disabled');
    }
    
    enableAllAlerts() {
        Object.keys(this.alertsEnabled).forEach(key => {
            this.alertsEnabled[key] = true;
        });
        console.log('All alerts enabled');
    }
    
    disableAllAlerts() {
        Object.keys(this.alertsEnabled).forEach(key => {
            this.alertsEnabled[key] = false;
        });
        console.log('All alerts disabled');
    }
    
    getAlertStatus() {
        return { ...this.alertsEnabled };
    }
    
    exportAlerts() {
        const data = {
            history: this.getAlertHistory(),
            summary: this.getAlertSummary(),
            thresholds: this.alertThresholds,
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-alerts-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return data;
    }
}

// Initialize alerts system
document.addEventListener('DOMContentLoaded', () => {
    window.performanceAlertsSystem = new PerformanceAlertsSystem();
    console.log('Performance Alerts System initialized');
});

// Export for external use
window.PerformanceAlertsSystem = PerformanceAlertsSystem;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceAlertsSystem;
}