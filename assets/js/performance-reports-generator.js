/**
 * Performance Reports Generator
 * Automated performance reporting and analysis system
 */

class PerformanceReportsGenerator {
    constructor() {
        this.config = {
            reportInterval: 3600000, // 1 hour
            dailyReportTime: '09:00', // 9 AM
            weeklyReportDay: 1, // Monday
            monthlyReportDate: 1, // 1st of month
            enableAutomatedReports: true,
            enableEmailReports: false, // Would require backend integration
            reportFormats: ['json', 'html', 'csv'],
            metricsToTrack: [
                'lcp', 'fid', 'cls', 'ttfb', 'fcp',
                'uptime', 'errorRate', 'responseTime',
                'pageViews', 'bounceRate', 'loadTime'
            ]
        };
        
        this.reportHistory = [];
        this.scheduledReports = new Map();
        this.isGenerating = false;
        
        this.init();
    }
    
    init() {
        this.loadReportHistory();
        this.scheduleAutomatedReports();
        this.setupReportTriggers();
        console.log('Performance Reports Generator initialized');
    }
    
    loadReportHistory() {
        try {
            const stored = localStorage.getItem('performance_report_history');
            if (stored) {
                this.reportHistory = JSON.parse(stored);
                
                // Clean old reports (keep last 30 days)
                const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
                this.reportHistory = this.reportHistory.filter(
                    report => report.timestamp > cutoff
                );
            }
        } catch (error) {
            console.warn('Failed to load report history:', error);
        }
    }
    
    saveReportHistory() {
        try {
            localStorage.setItem('performance_report_history', 
                JSON.stringify(this.reportHistory.slice(-100))
            );
        } catch (error) {
            console.warn('Failed to save report history:', error);
        }
    }
    
    scheduleAutomatedReports() {
        if (!this.config.enableAutomatedReports) return;
        
        // Schedule hourly reports
        this.scheduleReport('hourly', this.config.reportInterval, () => {
            this.generateHourlyReport();
        });
        
        // Schedule daily reports
        this.scheduleDailyReport();
        
        // Schedule weekly reports
        this.scheduleWeeklyReport();
        
        // Schedule monthly reports
        this.scheduleMonthlyReport();
    }
    
    scheduleReport(type, interval, callback) {
        if (this.scheduledReports.has(type)) {
            clearInterval(this.scheduledReports.get(type));
        }
        
        const intervalId = setInterval(callback, interval);
        this.scheduledReports.set(type, intervalId);
    }
    
    scheduleDailyReport() {
        const [hour, minute] = this.config.dailyReportTime.split(':').map(Number);
        const now = new Date();
        const scheduledTime = new Date();
        scheduledTime.setHours(hour, minute, 0, 0);
        
        // If scheduled time has passed today, schedule for tomorrow
        if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }
        
        const timeUntilReport = scheduledTime.getTime() - now.getTime();
        
        setTimeout(() => {
            this.generateDailyReport();
            
            // Schedule recurring daily reports
            this.scheduleReport('daily', 24 * 60 * 60 * 1000, () => {
                this.generateDailyReport();
            });
        }, timeUntilReport);
    }
    
    scheduleWeeklyReport() {
        const now = new Date();
        const currentDay = now.getDay();
        const targetDay = this.config.weeklyReportDay;
        
        let daysUntilReport = targetDay - currentDay;
        if (daysUntilReport <= 0) {
            daysUntilReport += 7;
        }
        
        const scheduledTime = new Date();
        scheduledTime.setDate(now.getDate() + daysUntilReport);
        scheduledTime.setHours(9, 0, 0, 0); // 9 AM
        
        const timeUntilReport = scheduledTime.getTime() - now.getTime();
        
        setTimeout(() => {
            this.generateWeeklyReport();
            
            // Schedule recurring weekly reports
            this.scheduleReport('weekly', 7 * 24 * 60 * 60 * 1000, () => {
                this.generateWeeklyReport();
            });
        }, timeUntilReport);
    }
    
    scheduleMonthlyReport() {
        const now = new Date();
        const targetDate = this.config.monthlyReportDate;
        
        const scheduledTime = new Date();
        scheduledTime.setDate(targetDate);
        scheduledTime.setHours(9, 0, 0, 0); // 9 AM
        
        // If target date has passed this month, schedule for next month
        if (scheduledTime <= now) {
            scheduledTime.setMonth(scheduledTime.getMonth() + 1);
        }
        
        const timeUntilReport = scheduledTime.getTime() - now.getTime();
        
        setTimeout(() => {
            this.generateMonthlyReport();
            
            // Schedule next monthly report
            this.scheduleMonthlyReport();
        }, timeUntilReport);
    }
    
    setupReportTriggers() {
        // Generate report on page unload
        window.addEventListener('beforeunload', () => {
            this.generateSessionReport(true);
        });
        
        // Generate report on visibility change (when leaving page)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.generateSessionReport();
            }
        });
        
        // Generate report on critical performance issues
        if (window.performanceAlertsSystem) {
            window.performanceAlertsSystem.on?.('critical_alert', () => {
                this.generateIncidentReport();
            });
        }
    }
    
    async generateHourlyReport() {
        if (this.isGenerating) return;
        this.isGenerating = true;
        
        try {
            const report = await this.createPerformanceReport('hourly', 3600000); // Last hour
            this.saveReport(report);
            console.log('Hourly performance report generated');
        } catch (error) {
            console.error('Failed to generate hourly report:', error);
        } finally {
            this.isGenerating = false;
        }
    }
    
    async generateDailyReport() {
        if (this.isGenerating) return;
        this.isGenerating = true;
        
        try {
            const report = await this.createPerformanceReport('daily', 86400000); // Last 24 hours
            this.saveReport(report);
            this.notifyReportGenerated(report);
            console.log('Daily performance report generated');
        } catch (error) {
            console.error('Failed to generate daily report:', error);
        } finally {
            this.isGenerating = false;
        }
    }
    
    async generateWeeklyReport() {
        if (this.isGenerating) return;
        this.isGenerating = true;
        
        try {
            const report = await this.createPerformanceReport('weekly', 7 * 86400000); // Last 7 days
            this.saveReport(report);
            this.notifyReportGenerated(report);
            console.log('Weekly performance report generated');
        } catch (error) {
            console.error('Failed to generate weekly report:', error);
        } finally {
            this.isGenerating = false;
        }
    }
    
    async generateMonthlyReport() {
        if (this.isGenerating) return;
        this.isGenerating = true;
        
        try {
            const report = await this.createPerformanceReport('monthly', 30 * 86400000); // Last 30 days
            this.saveReport(report);
            this.notifyReportGenerated(report);
            console.log('Monthly performance report generated');
        } catch (error) {
            console.error('Failed to generate monthly report:', error);
        } finally {
            this.isGenerating = false;
        }
    }
    
    async generateSessionReport(useBeacon = false) {
        try {
            const report = await this.createSessionReport();
            
            if (useBeacon && 'sendBeacon' in navigator) {
                // Send via beacon for reliability on page unload
                const data = JSON.stringify(report);
                navigator.sendBeacon('/api/performance-reports', data);
            } else {
                this.saveReport(report);
            }
        } catch (error) {
            console.error('Failed to generate session report:', error);
        }
    }
    
    async generateIncidentReport() {
        try {
            const report = await this.createIncidentReport();
            this.saveReport(report);
            this.notifyIncident(report);
            console.log('Incident report generated');
        } catch (error) {
            console.error('Failed to generate incident report:', error);
        }
    }
    
    async createPerformanceReport(type, timeWindow) {
        const endTime = Date.now();
        const startTime = endTime - timeWindow;
        
        const report = {
            id: this.generateReportId(),
            type: type,
            timestamp: endTime,
            timeWindow: {
                start: startTime,
                end: endTime,
                duration: timeWindow
            },
            metadata: {
                url: window.location.href,
                userAgent: navigator.userAgent,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                connection: this.getConnectionInfo()
            },
            metrics: await this.collectMetrics(timeWindow),
            analysis: {},
            recommendations: []
        };
        
        // Add analysis and recommendations
        report.analysis = this.analyzeMetrics(report.metrics);
        report.recommendations = this.generateRecommendations(report.analysis);
        
        return report;
    }
    
    async createSessionReport() {
        const sessionStart = window.performance?.timing?.navigationStart || Date.now();
        const sessionDuration = Date.now() - sessionStart;
        
        return {
            id: this.generateReportId(),
            type: 'session',
            timestamp: Date.now(),
            sessionDuration: sessionDuration,
            metadata: {
                url: window.location.href,
                userAgent: navigator.userAgent,
                sessionId: window.errorTrackingSystem?.currentSession?.id
            },
            metrics: await this.collectSessionMetrics(),
            events: this.collectSessionEvents()
        };
    }
    
    async createIncidentReport() {
        return {
            id: this.generateReportId(),
            type: 'incident',
            timestamp: Date.now(),
            metadata: {
                url: window.location.href,
                userAgent: navigator.userAgent
            },
            incident: {
                severity: 'critical',
                description: 'Critical performance issue detected',
                metrics: await this.collectMetrics(300000), // Last 5 minutes
                alerts: window.performanceAlertsSystem?.getAlertHistory?.(300000) || []
            }
        };
    }
    
    async collectMetrics(timeWindow) {
        const metrics = {};
        
        // Core Web Vitals
        if (window.coreWebVitalsOptimizer) {
            const cwvMetrics = window.coreWebVitalsOptimizer.getMetrics();
            Object.assign(metrics, cwvMetrics);
        }
        
        // Uptime metrics
        if (window.uptimeMonitor) {
            const uptimeReport = window.uptimeMonitor.getUptimeReport(timeWindow);
            metrics.uptime = uptimeReport.uptimePercentage;
            metrics.averageResponseTime = uptimeReport.averageResponseTime;
            metrics.downtimeEvents = uptimeReport.downtimeEvents;
        }
        
        // Error metrics
        if (window.errorTrackingSystem) {
            const errorStats = window.errorTrackingSystem.getErrorStats(timeWindow);
            metrics.errorRate = errorStats.errorRate;
            metrics.totalErrors = errorStats.totalErrors;
            metrics.criticalErrors = errorStats.criticalErrors;
        }
        
        // Performance metrics
        if ('performance' in window) {
            const perfMetrics = this.getPerformanceMetrics();
            Object.assign(metrics, perfMetrics);
        }
        
        // Resource metrics
        metrics.resources = this.getResourceMetrics();
        
        // Memory metrics
        if ('memory' in performance) {
            metrics.memory = {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit,
                usage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
            };
        }
        
        return metrics;
    }
    
    async collectSessionMetrics() {
        const metrics = {};
        
        // Navigation timing
        if (window.performance?.timing) {
            const timing = window.performance.timing;
            metrics.navigationTiming = {
                loadTime: timing.loadEventEnd - timing.navigationStart,
                domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
                firstByte: timing.responseStart - timing.navigationStart,
                domInteractive: timing.domInteractive - timing.navigationStart
            };
        }
        
        // Resource timing
        if (window.performance?.getEntriesByType) {
            const resources = window.performance.getEntriesByType('resource');
            metrics.resourceTiming = {
                totalResources: resources.length,
                totalSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
                slowestResource: resources.reduce((slowest, r) => 
                    r.duration > (slowest?.duration || 0) ? r : slowest, null
                )
            };
        }
        
        // Paint timing
        if (window.performance?.getEntriesByType) {
            const paints = window.performance.getEntriesByType('paint');
            paints.forEach(paint => {
                metrics[paint.name.replace('-', '_')] = paint.startTime;
            });
        }
        
        return metrics;
    }
    
    collectSessionEvents() {
        const events = [];
        
        // Page visibility changes
        if (document.visibilityState) {
            events.push({
                type: 'visibility',
                state: document.visibilityState,
                timestamp: Date.now()
            });
        }
        
        // Connection changes
        if ('connection' in navigator) {
            events.push({
                type: 'connection',
                info: this.getConnectionInfo(),
                timestamp: Date.now()
            });
        }
        
        return events;
    }
    
    getPerformanceMetrics() {
        const metrics = {};
        
        if ('performance' in window && performance.timing) {
            const timing = performance.timing;
            
            metrics.loadTime = timing.loadEventEnd - timing.navigationStart;
            metrics.domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
            metrics.firstByte = timing.responseStart - timing.navigationStart;
            metrics.domInteractive = timing.domInteractive - timing.navigationStart;
            metrics.domComplete = timing.domComplete - timing.navigationStart;
        }
        
        return metrics;
    }
    
    getResourceMetrics() {
        if (!('performance' in window) || !performance.getEntriesByType) {
            return {};
        }
        
        const resources = performance.getEntriesByType('resource');
        const metrics = {
            totalResources: resources.length,
            totalSize: 0,
            totalDuration: 0,
            resourceTypes: {},
            slowResources: []
        };
        
        resources.forEach(resource => {
            // Total size and duration
            metrics.totalSize += resource.transferSize || 0;
            metrics.totalDuration += resource.duration || 0;
            
            // Resource types
            const type = this.getResourceType(resource.name);
            metrics.resourceTypes[type] = (metrics.resourceTypes[type] || 0) + 1;
            
            // Slow resources (>2 seconds)
            if (resource.duration > 2000) {
                metrics.slowResources.push({
                    name: resource.name,
                    duration: resource.duration,
                    size: resource.transferSize
                });
            }
        });
        
        return metrics;
    }
    
    getResourceType(url) {
        if (url.includes('.css')) return 'css';
        if (url.includes('.js')) return 'javascript';
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
        if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'font';
        return 'other';
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
    
    analyzeMetrics(metrics) {
        const analysis = {
            overall: 'good',
            issues: [],
            improvements: [],
            trends: {}
        };
        
        // Analyze Core Web Vitals
        if (metrics.lcp > 4000) {
            analysis.overall = 'poor';
            analysis.issues.push('LCP is critically slow');
        } else if (metrics.lcp > 2500) {
            analysis.overall = 'needs-improvement';
            analysis.issues.push('LCP needs improvement');
        }
        
        if (metrics.fid > 300) {
            analysis.overall = 'poor';
            analysis.issues.push('FID is critically high');
        } else if (metrics.fid > 100) {
            analysis.overall = 'needs-improvement';
            analysis.issues.push('FID needs improvement');
        }
        
        if (metrics.cls > 0.25) {
            analysis.overall = 'poor';
            analysis.issues.push('CLS is critically high');
        } else if (metrics.cls > 0.1) {
            analysis.overall = 'needs-improvement';
            analysis.issues.push('CLS needs improvement');
        }
        
        // Analyze uptime
        if (metrics.uptime < 99.0) {
            analysis.overall = 'poor';
            analysis.issues.push('Uptime is below acceptable threshold');
        } else if (metrics.uptime < 99.5) {
            analysis.overall = 'needs-improvement';
            analysis.issues.push('Uptime could be improved');
        }
        
        // Analyze error rate
        if (metrics.errorRate > 5) {
            analysis.overall = 'poor';
            analysis.issues.push('Error rate is critically high');
        } else if (metrics.errorRate > 1) {
            analysis.overall = 'needs-improvement';
            analysis.issues.push('Error rate is elevated');
        }
        
        // Analyze memory usage
        if (metrics.memory?.usage > 90) {
            analysis.issues.push('Memory usage is critically high');
        } else if (metrics.memory?.usage > 70) {
            analysis.improvements.push('Monitor memory usage');
        }
        
        return analysis;
    }
    
    generateRecommendations(analysis) {
        const recommendations = [];
        
        analysis.issues.forEach(issue => {
            if (issue.includes('LCP')) {
                recommendations.push({
                    priority: 'high',
                    category: 'performance',
                    title: 'Optimize Largest Contentful Paint',
                    description: 'Optimize images, preload critical resources, and minimize render-blocking resources',
                    actions: [
                        'Compress and optimize images',
                        'Preload critical resources',
                        'Minimize CSS and JavaScript',
                        'Use a CDN for static assets'
                    ]
                });
            }
            
            if (issue.includes('FID')) {
                recommendations.push({
                    priority: 'high',
                    category: 'performance',
                    title: 'Improve First Input Delay',
                    description: 'Reduce JavaScript execution time and optimize event handlers',
                    actions: [
                        'Break up long tasks',
                        'Use web workers for heavy computations',
                        'Optimize event handlers',
                        'Defer non-critical JavaScript'
                    ]
                });
            }
            
            if (issue.includes('CLS')) {
                recommendations.push({
                    priority: 'high',
                    category: 'performance',
                    title: 'Reduce Cumulative Layout Shift',
                    description: 'Prevent unexpected layout shifts',
                    actions: [
                        'Set dimensions for images and videos',
                        'Reserve space for dynamic content',
                        'Use font-display: swap',
                        'Avoid inserting content above existing content'
                    ]
                });
            }
            
            if (issue.includes('uptime')) {
                recommendations.push({
                    priority: 'critical',
                    category: 'reliability',
                    title: 'Improve Service Uptime',
                    description: 'Address service availability issues',
                    actions: [
                        'Investigate recent outages',
                        'Implement redundancy',
                        'Set up monitoring alerts',
                        'Review infrastructure capacity'
                    ]
                });
            }
            
            if (issue.includes('error rate')) {
                recommendations.push({
                    priority: 'high',
                    category: 'reliability',
                    title: 'Reduce Error Rate',
                    description: 'Fix JavaScript errors and improve error handling',
                    actions: [
                        'Review and fix JavaScript errors',
                        'Implement better error handling',
                        'Add input validation',
                        'Test across different browsers'
                    ]
                });
            }
        });
        
        return recommendations;
    }
    
    saveReport(report) {
        // Add to history
        this.reportHistory.push(report);
        
        // Limit history size
        if (this.reportHistory.length > 100) {
            this.reportHistory = this.reportHistory.slice(-100);
        }
        
        // Save to localStorage
        this.saveReportHistory();
        
        // Send to analytics
        if (window.gtag) {
            gtag('event', 'performance_report_generated', {
                report_type: report.type,
                report_id: report.id,
                overall_score: report.analysis?.overall || 'unknown'
            });
        }
    }
    
    notifyReportGenerated(report) {
        // Show notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Performance Report Generated', {
                body: `${report.type} report is ready. Overall status: ${report.analysis.overall}`,
                icon: '/assets/images/report-icon.png',
                tag: 'performance-report'
            });
        }
        
        // Log to console
        console.log(`📊 ${report.type} performance report generated:`, report);
    }
    
    notifyIncident(report) {
        // Critical incident notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Performance Incident Detected', {
                body: 'Critical performance issue detected. Check the incident report.',
                icon: '/assets/images/alert-icon.png',
                tag: 'performance-incident',
                requireInteraction: true
            });
        }
        
        console.error('🚨 Performance incident detected:', report);
    }
    
    generateReportId() {
        return 'report_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Public API methods
    async generateCustomReport(timeWindow, includeRecommendations = true) {
        const report = await this.createPerformanceReport('custom', timeWindow);
        
        if (!includeRecommendations) {
            delete report.recommendations;
        }
        
        this.saveReport(report);
        return report;
    }
    
    getReportHistory(type = null, limit = 10) {
        let reports = this.reportHistory;
        
        if (type) {
            reports = reports.filter(report => report.type === type);
        }
        
        return reports.slice(-limit).reverse();
    }
    
    getLatestReport(type = null) {
        const reports = this.getReportHistory(type, 1);
        return reports.length > 0 ? reports[0] : null;
    }
    
    exportReport(reportId, format = 'json') {
        const report = this.reportHistory.find(r => r.id === reportId);
        if (!report) {
            throw new Error('Report not found');
        }
        
        let content, mimeType, filename;
        
        switch (format.toLowerCase()) {
            case 'json':
                content = JSON.stringify(report, null, 2);
                mimeType = 'application/json';
                filename = `performance-report-${reportId}.json`;
                break;
                
            case 'html':
                content = this.generateHTMLReport(report);
                mimeType = 'text/html';
                filename = `performance-report-${reportId}.html`;
                break;
                
            case 'csv':
                content = this.generateCSVReport(report);
                mimeType = 'text/csv';
                filename = `performance-report-${reportId}.csv`;
                break;
                
            default:
                throw new Error('Unsupported format');
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return { content, filename };
    }
    
    generateHTMLReport(report) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Report - ${report.type}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .metric { display: inline-block; margin: 10px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
        .good { border-color: #28a745; }
        .warning { border-color: #ffc107; }
        .critical { border-color: #dc3545; }
        .recommendations { background: #e9ecef; padding: 15px; border-radius: 4px; margin-top: 20px; }
        .recommendation { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Performance Report</h1>
        <p><strong>Type:</strong> ${report.type}</p>
        <p><strong>Generated:</strong> ${new Date(report.timestamp).toLocaleString()}</p>
        <p><strong>Overall Status:</strong> ${report.analysis?.overall || 'Unknown'}</p>
    </div>
    
    <h2>Core Web Vitals</h2>
    <div class="metrics">
        ${Object.entries(report.metrics).map(([key, value]) => {
            if (['lcp', 'fid', 'cls', 'ttfb', 'fcp'].includes(key)) {
                const status = this.getMetricStatus(key, value);
                return `<div class="metric ${status}">
                    <strong>${key.toUpperCase()}:</strong> ${this.formatMetricValue(key, value)}
                </div>`;
            }
            return '';
        }).join('')}
    </div>
    
    <h2>Other Metrics</h2>
    <div class="metrics">
        ${Object.entries(report.metrics).map(([key, value]) => {
            if (!['lcp', 'fid', 'cls', 'ttfb', 'fcp'].includes(key)) {
                return `<div class="metric">
                    <strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value) : value}
                </div>`;
            }
            return '';
        }).join('')}
    </div>
    
    ${report.recommendations && report.recommendations.length > 0 ? `
    <div class="recommendations">
        <h2>Recommendations</h2>
        ${report.recommendations.map(rec => `
            <div class="recommendation">
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <ul>
                    ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
    </div>
    ` : ''}
</body>
</html>`;
    }
    
    generateCSVReport(report) {
        const rows = [
            ['Metric', 'Value', 'Status'],
            ...Object.entries(report.metrics).map(([key, value]) => [
                key,
                typeof value === 'object' ? JSON.stringify(value) : value,
                this.getMetricStatus(key, value)
            ])
        ];
        
        return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
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
        if (value <= threshold.poor) return 'warning';
        return 'critical';
    }
    
    formatMetricValue(metric, value) {
        if (metric === 'cls') {
            return value.toFixed(3);
        } else if (typeof value === 'number') {
            return Math.round(value) + 'ms';
        }
        return value;
    }
    
    // Configuration methods
    setReportInterval(interval) {
        this.config.reportInterval = interval;
        this.scheduleAutomatedReports();
    }
    
    enableAutomatedReports(enabled) {
        this.config.enableAutomatedReports = enabled;
        if (enabled) {
            this.scheduleAutomatedReports();
        } else {
            this.scheduledReports.forEach((intervalId, type) => {
                clearInterval(intervalId);
            });
            this.scheduledReports.clear();
        }
    }
    
    // Cleanup
    destroy() {
        this.scheduledReports.forEach((intervalId) => {
            clearInterval(intervalId);
        });
        this.scheduledReports.clear();
        this.saveReportHistory();
    }
}

// Initialize performance reports generator
document.addEventListener('DOMContentLoaded', () => {
    window.performanceReportsGenerator = new PerformanceReportsGenerator();
    console.log('Performance Reports Generator initialized');
});

// Export for external use
window.PerformanceReportsGenerator = PerformanceReportsGenerator;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceReportsGenerator;
}