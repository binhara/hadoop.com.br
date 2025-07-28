/**
 * JavaScript Error Tracking System
 * Comprehensive error tracking, reporting, and analysis
 */

class ErrorTrackingSystem {
    constructor() {
        this.config = {
            maxErrors: 1000,
            reportingEndpoint: null, // Set to your error reporting service
            enableConsoleLogging: true,
            enableLocalStorage: true,
            enableAnalytics: true,
            enableUserFeedback: false, // Desabilitado por padrão
            ignoredErrors: [
                'Script error.',
                'Non-Error promise rejection captured',
                'ResizeObserver loop limit exceeded',
                'Network request failed'
            ],
            ignoredUrls: [
                'chrome-extension://',
                'moz-extension://',
                'safari-extension://'
            ]
        };
        
        this.errors = [];
        this.errorCounts = new Map();
        this.userSessions = new Map();
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.loadStoredErrors();
        this.setupErrorHandlers();
        this.setupPerformanceMonitoring();
        this.setupUserSessionTracking();
        this.startPeriodicReporting();
        
        this.isInitialized = true;
        console.log('Error Tracking System initialized');
    }
    
    loadStoredErrors() {
        if (!this.config.enableLocalStorage) return;
        
        try {
            const stored = localStorage.getItem('error_tracking_data');
            if (stored) {
                const data = JSON.parse(stored);
                this.errors = data.errors || [];
                
                // Clean old errors (keep last 7 days)
                const cutoff = Date.now() - (7 * 24 * 60 * 60 * 1000);
                this.errors = this.errors.filter(error => error.timestamp > cutoff);
                
                // Rebuild error counts
                this.rebuildErrorCounts();
            }
        } catch (error) {
            console.warn('Failed to load stored errors:', error);
        }
    }
    
    saveErrors() {
        if (!this.config.enableLocalStorage) return;
        
        try {
            const data = {
                errors: this.errors.slice(-this.config.maxErrors),
                lastSaved: Date.now()
            };
            localStorage.setItem('error_tracking_data', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save errors:', error);
        }
    }
    
    rebuildErrorCounts() {
        this.errorCounts.clear();
        this.errors.forEach(error => {
            const key = this.getErrorKey(error);
            this.errorCounts.set(key, (this.errorCounts.get(key) || 0) + 1);
        });
    }
    
    setupErrorHandlers() {
        // Global JavaScript errors
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error,
                stack: event.error?.stack,
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'promise',
                message: event.reason?.message || 'Unhandled Promise Rejection',
                reason: event.reason,
                stack: event.reason?.stack,
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
        });
        
        // Resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleError({
                    type: 'resource',
                    element: event.target.tagName,
                    source: event.target.src || event.target.href,
                    message: 'Resource failed to load',
                    timestamp: Date.now(),
                    url: window.location.href,
                    userAgent: navigator.userAgent
                });
            }
        }, true);
        
        // Network errors (fetch failures)
        this.interceptFetch();
        
        // Console errors (optional)
        if (this.config.enableConsoleLogging) {
            this.interceptConsoleErrors();
        }
    }
    
    interceptFetch() {
        const originalFetch = window.fetch;
        
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                
                // Track failed HTTP requests
                if (!response.ok) {
                    this.handleError({
                        type: 'network',
                        message: `HTTP ${response.status}: ${response.statusText}`,
                        url: args[0],
                        status: response.status,
                        statusText: response.statusText,
                        timestamp: Date.now(),
                        requestUrl: window.location.href,
                        userAgent: navigator.userAgent
                    });
                }
                
                return response;
            } catch (error) {
                // Track network failures
                this.handleError({
                    type: 'network',
                    message: error.message,
                    url: args[0],
                    error: error,
                    stack: error.stack,
                    timestamp: Date.now(),
                    requestUrl: window.location.href,
                    userAgent: navigator.userAgent
                });
                
                throw error;
            }
        };
    }
    
    interceptConsoleErrors() {
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.error = (...args) => {
            this.handleError({
                type: 'console',
                level: 'error',
                message: args.join(' '),
                args: args,
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
            
            originalError.apply(console, args);
        };
        
        console.warn = (...args) => {
            this.handleError({
                type: 'console',
                level: 'warn',
                message: args.join(' '),
                args: args,
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
            
            originalWarn.apply(console, args);
        };
    }
    
    setupPerformanceMonitoring() {
        // Monitor long tasks that might cause errors
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.duration > 50) { // Tasks longer than 50ms
                        this.handleError({
                            type: 'performance',
                            message: `Long task detected: ${entry.duration.toFixed(2)}ms`,
                            duration: entry.duration,
                            startTime: entry.startTime,
                            timestamp: Date.now(),
                            url: window.location.href,
                            userAgent: navigator.userAgent
                        });
                    }
                });
            });
            
            observer.observe({ entryTypes: ['longtask'] });
        }
        
        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
                
                if (usageRatio > 0.9) { // 90% memory usage
                    this.handleError({
                        type: 'memory',
                        message: `High memory usage: ${(usageRatio * 100).toFixed(1)}%`,
                        usedJSHeapSize: memory.usedJSHeapSize,
                        totalJSHeapSize: memory.totalJSHeapSize,
                        jsHeapSizeLimit: memory.jsHeapSizeLimit,
                        timestamp: Date.now(),
                        url: window.location.href,
                        userAgent: navigator.userAgent
                    });
                }
            }, 30000); // Check every 30 seconds
        }
    }
    
    setupUserSessionTracking() {
        // Generate session ID
        const sessionId = this.generateSessionId();
        this.currentSession = {
            id: sessionId,
            startTime: Date.now(),
            pageViews: 1,
            errors: 0,
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            connection: this.getConnectionInfo()
        };
        
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.currentSession.pageViews++;
            }
        });
        
        // Track viewport changes
        window.addEventListener('resize', () => {
            this.currentSession.viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        });
    }
    
    handleError(errorInfo) {
        // Filter out ignored errors
        if (this.shouldIgnoreError(errorInfo)) {
            return;
        }
        
        // Enhance error with additional context
        const enhancedError = this.enhanceError(errorInfo);
        
        // Add to errors array
        this.errors.push(enhancedError);
        
        // Update error counts
        const errorKey = this.getErrorKey(enhancedError);
        this.errorCounts.set(errorKey, (this.errorCounts.get(errorKey) || 0) + 1);
        
        // Update session error count
        if (this.currentSession) {
            this.currentSession.errors++;
        }
        
        // Limit array size
        if (this.errors.length > this.config.maxErrors) {
            this.errors = this.errors.slice(-this.config.maxErrors);
        }
        
        // Log to console if enabled
        if (this.config.enableConsoleLogging) {
            console.error('Error tracked:', enhancedError);
        }
        
        // Send to analytics if enabled
        if (this.config.enableAnalytics && window.gtag) {
            gtag('event', 'exception', {
                description: enhancedError.message,
                fatal: this.isCriticalError(enhancedError),
                custom_parameter_1: enhancedError.type,
                custom_parameter_2: enhancedError.filename || enhancedError.source
            });
        }
        
        // Trigger performance alerts if available (modo silencioso)
        if (window.performanceAlertsSystem && this.isCriticalError(enhancedError)) {
            // Apenas log no console por padrão
            console.error(`Critical error detected: ${enhancedError.message}`);
            
            // Só dispara alerta se os alertas estiverem habilitados
            if (window.performanceAlertsSystem.alertsEnabled?.console) {
                window.performanceAlertsSystem.triggerAlert({
                    metric: 'javascript_error',
                    severity: 'critical',
                    value: 1,
                    threshold: 0,
                    message: `Critical error: ${enhancedError.message}`,
                    url: window.location.href,
                    details: enhancedError
                });
            }
        }
        
        // Save to localStorage
        this.saveErrors();
        
        // Report to external service
        this.reportError(enhancedError);
        
        // Show user feedback option for critical errors
        if (this.config.enableUserFeedback && this.isCriticalError(enhancedError)) {
            this.showUserFeedbackOption(enhancedError);
        }
    }
    
    shouldIgnoreError(errorInfo) {
        // Check ignored error messages
        if (this.config.ignoredErrors.some(ignored => 
            errorInfo.message && errorInfo.message.includes(ignored)
        )) {
            return true;
        }
        
        // Check ignored URLs
        if (this.config.ignoredUrls.some(ignored => 
            (errorInfo.filename && errorInfo.filename.includes(ignored)) ||
            (errorInfo.source && errorInfo.source.includes(ignored))
        )) {
            return true;
        }
        
        // Ignore duplicate errors (same error within 1 second)
        const recentErrors = this.errors.filter(
            error => Date.now() - error.timestamp < 1000
        );
        
        const isDuplicate = recentErrors.some(error => 
            error.message === errorInfo.message &&
            error.filename === errorInfo.filename &&
            error.lineno === errorInfo.lineno
        );
        
        return isDuplicate;
    }
    
    enhanceError(errorInfo) {
        return {
            ...errorInfo,
            id: this.generateErrorId(),
            sessionId: this.currentSession?.id,
            count: 1,
            severity: this.calculateSeverity(errorInfo),
            context: this.gatherContext(),
            breadcrumbs: this.getBreadcrumbs(),
            tags: this.generateTags(errorInfo)
        };
    }
    
    calculateSeverity(errorInfo) {
        // Critical errors
        if (errorInfo.type === 'javascript' && (
            errorInfo.message.includes('Cannot read property') ||
            errorInfo.message.includes('undefined is not a function') ||
            errorInfo.message.includes('null is not an object')
        )) {
            return 'critical';
        }
        
        // Network errors
        if (errorInfo.type === 'network' && errorInfo.status >= 500) {
            return 'critical';
        }
        
        // Resource loading errors for critical assets
        if (errorInfo.type === 'resource' && (
            errorInfo.source?.includes('main.js') ||
            errorInfo.source?.includes('bootstrap') ||
            errorInfo.source?.includes('matrix-theme')
        )) {
            return 'high';
        }
        
        // Promise rejections
        if (errorInfo.type === 'promise') {
            return 'medium';
        }
        
        // Performance issues
        if (errorInfo.type === 'performance' || errorInfo.type === 'memory') {
            return 'medium';
        }
        
        // Console errors
        if (errorInfo.type === 'console') {
            return errorInfo.level === 'error' ? 'medium' : 'low';
        }
        
        return 'low';
    }
    
    gatherContext() {
        return {
            url: window.location.href,
            referrer: document.referrer,
            timestamp: Date.now(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth
            },
            connection: this.getConnectionInfo(),
            performance: this.getPerformanceContext(),
            dom: {
                readyState: document.readyState,
                activeElement: document.activeElement?.tagName,
                visibilityState: document.visibilityState
            }
        };
    }
    
    getConnectionInfo() {
        if ('connection' in navigator) {
            const conn = navigator.connection;
            return {
                effectiveType: conn.effectiveType,
                downlink: conn.downlink,
                rtt: conn.rtt,
                saveData: conn.saveData
            };
        }
        return null;
    }
    
    getPerformanceContext() {
        if ('performance' in window) {
            const perf = performance;
            const timing = perf.timing;
            
            return {
                loadTime: timing.loadEventEnd - timing.navigationStart,
                domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
                memory: perf.memory ? {
                    used: perf.memory.usedJSHeapSize,
                    total: perf.memory.totalJSHeapSize,
                    limit: perf.memory.jsHeapSizeLimit
                } : null
            };
        }
        return null;
    }
    
    getBreadcrumbs() {
        // Simple breadcrumb tracking - in production, this would be more sophisticated
        const breadcrumbs = [];
        
        // Add current page info
        breadcrumbs.push({
            type: 'navigation',
            message: `Navigated to ${window.location.pathname}`,
            timestamp: Date.now(),
            data: {
                url: window.location.href,
                referrer: document.referrer
            }
        });
        
        return breadcrumbs;
    }
    
    generateTags(errorInfo) {
        const tags = [];
        
        // Add type tag
        tags.push(`type:${errorInfo.type}`);
        
        // Add severity tag
        tags.push(`severity:${this.calculateSeverity(errorInfo)}`);
        
        // Add browser tag
        const browser = this.getBrowserInfo();
        if (browser) {
            tags.push(`browser:${browser.name}`);
            tags.push(`browser_version:${browser.version}`);
        }
        
        // Add device type tag
        const deviceType = this.getDeviceType();
        tags.push(`device:${deviceType}`);
        
        // Add page tag
        const page = window.location.pathname.split('/')[1] || 'home';
        tags.push(`page:${page}`);
        
        return tags;
    }
    
    getBrowserInfo() {
        const ua = navigator.userAgent;
        
        if (ua.includes('Chrome')) {
            const match = ua.match(/Chrome\/(\d+)/);
            return { name: 'Chrome', version: match ? match[1] : 'unknown' };
        } else if (ua.includes('Firefox')) {
            const match = ua.match(/Firefox\/(\d+)/);
            return { name: 'Firefox', version: match ? match[1] : 'unknown' };
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
            const match = ua.match(/Version\/(\d+)/);
            return { name: 'Safari', version: match ? match[1] : 'unknown' };
        } else if (ua.includes('Edge')) {
            const match = ua.match(/Edge\/(\d+)/);
            return { name: 'Edge', version: match ? match[1] : 'unknown' };
        }
        
        return { name: 'Unknown', version: 'unknown' };
    }
    
    getDeviceType() {
        const ua = navigator.userAgent;
        
        if (/tablet|ipad|playbook|silk/i.test(ua)) {
            return 'tablet';
        } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
            return 'mobile';
        } else {
            return 'desktop';
        }
    }
    
    isCriticalError(errorInfo) {
        return errorInfo.severity === 'critical' || 
               (errorInfo.type === 'javascript' && errorInfo.message.includes('Cannot read property'));
    }
    
    getErrorKey(errorInfo) {
        return `${errorInfo.type}:${errorInfo.message}:${errorInfo.filename || errorInfo.source}`;
    }
    
    generateErrorId() {
        return 'err_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    async reportError(errorInfo) {
        if (!this.config.reportingEndpoint) return;
        
        try {
            await fetch(this.config.reportingEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    error: errorInfo,
                    session: this.currentSession
                })
            });
        } catch (error) {
            console.warn('Failed to report error to external service:', error);
        }
    }
    
    showUserFeedbackOption(errorInfo) {
        // Create feedback modal
        const modal = document.createElement('div');
        modal.className = 'error-feedback-modal';
        modal.innerHTML = `
            <div class="error-feedback-content">
                <div class="error-feedback-header">
                    <h3>Oops! Something went wrong</h3>
                    <button class="error-feedback-close">×</button>
                </div>
                <div class="error-feedback-body">
                    <p>We encountered an error and would appreciate your feedback to help us fix it.</p>
                    <textarea class="error-feedback-text" placeholder="What were you trying to do when this error occurred? (optional)"></textarea>
                    <div class="error-feedback-details">
                        <small>Error ID: ${errorInfo.id}</small>
                    </div>
                </div>
                <div class="error-feedback-actions">
                    <button class="btn btn-secondary error-feedback-skip">Skip</button>
                    <button class="btn btn-primary error-feedback-send">Send Feedback</button>
                </div>
            </div>
        `;
        
        // Add styles
        if (!document.getElementById('error-feedback-styles')) {
            const styles = document.createElement('style');
            styles.id = 'error-feedback-styles';
            styles.textContent = `
                .error-feedback-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10001;
                }
                .error-feedback-content {
                    background: white;
                    border-radius: 8px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                .error-feedback-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #eee;
                }
                .error-feedback-header h3 {
                    margin: 0;
                    color: #dc3545;
                }
                .error-feedback-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                }
                .error-feedback-body {
                    padding: 20px;
                }
                .error-feedback-text {
                    width: 100%;
                    min-height: 100px;
                    margin: 10px 0;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    resize: vertical;
                }
                .error-feedback-details {
                    margin-top: 10px;
                    color: #666;
                }
                .error-feedback-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    padding: 20px;
                    border-top: 1px solid #eee;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Event handlers
        const closeModal = () => modal.remove();
        
        modal.querySelector('.error-feedback-close').addEventListener('click', closeModal);
        modal.querySelector('.error-feedback-skip').addEventListener('click', closeModal);
        
        modal.querySelector('.error-feedback-send').addEventListener('click', () => {
            const feedback = modal.querySelector('.error-feedback-text').value;
            this.submitUserFeedback(errorInfo, feedback);
            closeModal();
        });
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        document.body.appendChild(modal);
        
        // Auto-close after 30 seconds
        setTimeout(closeModal, 30000);
    }
    
    submitUserFeedback(errorInfo, feedback) {
        const feedbackData = {
            errorId: errorInfo.id,
            feedback: feedback,
            timestamp: Date.now(),
            sessionId: this.currentSession?.id
        };
        
        // Store locally
        const existingFeedback = JSON.parse(localStorage.getItem('error_feedback') || '[]');
        existingFeedback.push(feedbackData);
        localStorage.setItem('error_feedback', JSON.stringify(existingFeedback.slice(-50)));
        
        // Send to analytics
        if (window.gtag) {
            gtag('event', 'error_feedback', {
                error_id: errorInfo.id,
                has_feedback: feedback.length > 0,
                custom_parameter_1: errorInfo.type
            });
        }
        
        console.log('User feedback submitted:', feedbackData);
    }
    
    startPeriodicReporting() {
        // Send error summary every 5 minutes
        setInterval(() => {
            this.sendErrorSummary();
        }, 300000);
        
        // Send on page unload
        window.addEventListener('beforeunload', () => {
            this.sendErrorSummary(true);
        });
    }
    
    sendErrorSummary(useBeacon = false) {
        const recentErrors = this.errors.filter(
            error => Date.now() - error.timestamp < 300000 // Last 5 minutes
        );
        
        if (recentErrors.length === 0) return;
        
        const summary = {
            timestamp: Date.now(),
            sessionId: this.currentSession?.id,
            errorCount: recentErrors.length,
            criticalErrors: recentErrors.filter(e => e.severity === 'critical').length,
            errorTypes: this.getErrorTypeSummary(recentErrors),
            topErrors: this.getTopErrors(recentErrors, 5),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        // Send to analytics
        if (window.gtag) {
            gtag('event', 'error_summary', {
                error_count: summary.errorCount,
                critical_count: summary.criticalErrors,
                session_id: summary.sessionId
            });
        }
        
        // Send to external service
        if (this.config.reportingEndpoint) {
            const data = JSON.stringify(summary);
            
            if (useBeacon && 'sendBeacon' in navigator) {
                navigator.sendBeacon(this.config.reportingEndpoint + '/summary', data);
            } else {
                fetch(this.config.reportingEndpoint + '/summary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: data
                }).catch(error => {
                    console.warn('Failed to send error summary:', error);
                });
            }
        }
    }
    
    getErrorTypeSummary(errors) {
        const types = {};
        errors.forEach(error => {
            types[error.type] = (types[error.type] || 0) + 1;
        });
        return types;
    }
    
    getTopErrors(errors, limit = 10) {
        const errorMap = new Map();
        
        errors.forEach(error => {
            const key = this.getErrorKey(error);
            if (!errorMap.has(key)) {
                errorMap.set(key, { ...error, count: 0 });
            }
            errorMap.get(key).count++;
        });
        
        return Array.from(errorMap.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }
    
    // Public API methods
    getErrorStats(timeWindow = 3600000) { // Last hour
        const cutoff = Date.now() - timeWindow;
        const recentErrors = this.errors.filter(error => error.timestamp > cutoff);
        
        return {
            totalErrors: recentErrors.length,
            criticalErrors: recentErrors.filter(e => e.severity === 'critical').length,
            errorRate: this.currentSession ? (recentErrors.length / this.currentSession.pageViews) : 0,
            topErrors: this.getTopErrors(recentErrors, 5),
            errorTypes: this.getErrorTypeSummary(recentErrors),
            timeWindow: timeWindow
        };
    }
    
    getErrorDetails(errorId) {
        return this.errors.find(error => error.id === errorId);
    }
    
    exportErrors() {
        const data = {
            errors: this.errors,
            session: this.currentSession,
            stats: this.getErrorStats(),
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `error-report-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return data;
    }
    
    clearErrors() {
        this.errors = [];
        this.errorCounts.clear();
        this.saveErrors();
        console.log('Error tracking data cleared');
    }
    
    // Configuration methods
    setReportingEndpoint(endpoint) {
        this.config.reportingEndpoint = endpoint;
    }
    
    addIgnoredError(pattern) {
        this.config.ignoredErrors.push(pattern);
    }
    
    removeIgnoredError(pattern) {
        const index = this.config.ignoredErrors.indexOf(pattern);
        if (index > -1) {
            this.config.ignoredErrors.splice(index, 1);
        }
    }
    
    // Manual error reporting
    reportCustomError(message, details = {}) {
        this.handleError({
            type: 'custom',
            message: message,
            details: details,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent
        });
    }
}

// Initialize error tracking system
document.addEventListener('DOMContentLoaded', () => {
    window.errorTrackingSystem = new ErrorTrackingSystem();
    console.log('Error Tracking System initialized');
});

// Export for external use
window.ErrorTrackingSystem = ErrorTrackingSystem;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorTrackingSystem;
}