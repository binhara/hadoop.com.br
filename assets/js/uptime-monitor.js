/**
 * Uptime Monitoring System
 * Monitors site availability and performance from client-side
 */

class UptimeMonitor {
    constructor() {
        this.config = {
            checkInterval: 60000, // 1 minute
            timeoutDuration: 10000, // 10 seconds
            maxRetries: 3,
            endpoints: [
                { url: '/', name: 'Homepage', critical: true },
                { url: '/tecnologias/', name: 'Technologies', critical: true },
                { url: '/cursos/', name: 'Courses', critical: false },
                { url: '/blog/', name: 'Blog', critical: false },
                { url: '/assets/css/matrix-theme.css', name: 'CSS Assets', critical: true },
                { url: '/assets/js/main.js', name: 'JS Assets', critical: true }
            ]
        };
        
        this.status = {
            isOnline: navigator.onLine,
            lastCheck: null,
            uptime: 100,
            downtimeEvents: [],
            responseTimeHistory: [],
            currentOutages: new Map()
        };
        
        this.callbacks = new Map();
        this.isMonitoring = false;
        this.checkInterval = null;
        
        this.init();
    }
    
    init() {
        this.loadStoredData();
        this.setupNetworkListeners();
        this.startMonitoring();
        this.setupVisibilityHandling();
    }
    
    loadStoredData() {
        try {
            const stored = localStorage.getItem('uptime_monitor_data');
            if (stored) {
                const data = JSON.parse(stored);
                this.status.uptime = data.uptime || 100;
                this.status.downtimeEvents = data.downtimeEvents || [];
                this.status.responseTimeHistory = data.responseTimeHistory || [];
                
                // Clean old data (keep last 7 days)
                const cutoff = Date.now() - (7 * 24 * 60 * 60 * 1000);
                this.status.downtimeEvents = this.status.downtimeEvents.filter(
                    event => event.timestamp > cutoff
                );
                this.status.responseTimeHistory = this.status.responseTimeHistory.filter(
                    entry => entry.timestamp > cutoff
                );
            }
        } catch (error) {
            console.warn('Failed to load uptime monitor data:', error);
        }
    }
    
    saveData() {
        try {
            const data = {
                uptime: this.status.uptime,
                downtimeEvents: this.status.downtimeEvents,
                responseTimeHistory: this.status.responseTimeHistory,
                lastSaved: Date.now()
            };
            localStorage.setItem('uptime_monitor_data', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save uptime monitor data:', error);
        }
    }
    
    setupNetworkListeners() {
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.handleNetworkChange(true);
        });
        
        window.addEventListener('offline', () => {
            this.handleNetworkChange(false);
        });
        
        // Listen for connection changes
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', () => {
                this.handleConnectionChange();
            });
        }
    }
    
    setupVisibilityHandling() {
        // Pause monitoring when page is hidden to save resources
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.resumeMonitoring();
            } else {
                this.pauseMonitoring();
            }
        });
    }
    
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        
        // Initial check
        this.performUptimeCheck();
        
        // Set up regular checks
        this.checkInterval = setInterval(() => {
            this.performUptimeCheck();
        }, this.config.checkInterval);
        
        console.log('Uptime monitoring started');
    }
    
    pauseMonitoring() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
        console.log('Uptime monitoring paused');
    }
    
    resumeMonitoring() {
        if (!this.checkInterval && this.isMonitoring) {
            this.checkInterval = setInterval(() => {
                this.performUptimeCheck();
            }, this.config.checkInterval);
            
            // Immediate check on resume
            this.performUptimeCheck();
            console.log('Uptime monitoring resumed');
        }
    }
    
    stopMonitoring() {
        this.isMonitoring = false;
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
        console.log('Uptime monitoring stopped');
    }
    
    async performUptimeCheck() {
        if (!navigator.onLine) {
            this.handleOfflineState();
            return;
        }
        
        const checkResults = [];
        
        // Check all endpoints
        for (const endpoint of this.config.endpoints) {
            try {
                const result = await this.checkEndpoint(endpoint);
                checkResults.push(result);
                
                // Handle individual endpoint results
                this.handleEndpointResult(endpoint, result);
                
            } catch (error) {
                const errorResult = {
                    endpoint: endpoint.name,
                    url: endpoint.url,
                    success: false,
                    responseTime: null,
                    error: error.message,
                    timestamp: Date.now(),
                    critical: endpoint.critical
                };
                
                checkResults.push(errorResult);
                this.handleEndpointResult(endpoint, errorResult);
            }
        }
        
        // Update overall status
        this.updateOverallStatus(checkResults);
        this.status.lastCheck = Date.now();
        
        // Save data
        this.saveData();
        
        // Trigger callbacks
        this.triggerCallbacks('check_complete', {
            results: checkResults,
            status: this.status
        });
    }
    
    async checkEndpoint(endpoint) {
        const startTime = performance.now();
        
        try {
            // Use fetch with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutDuration);
            
            const response = await fetch(endpoint.url, {
                method: 'HEAD', // Use HEAD to minimize data transfer
                signal: controller.signal,
                cache: 'no-cache',
                mode: 'cors'
            });
            
            clearTimeout(timeoutId);
            const endTime = performance.now();
            const responseTime = endTime - startTime;
            
            // Record response time
            this.recordResponseTime(endpoint.name, responseTime);
            
            const result = {
                endpoint: endpoint.name,
                url: endpoint.url,
                success: response.ok,
                status: response.status,
                responseTime: responseTime,
                timestamp: Date.now(),
                critical: endpoint.critical
            };
            
            return result;
            
        } catch (error) {
            const endTime = performance.now();
            const responseTime = endTime - startTime;
            
            throw new Error(`${error.name}: ${error.message}`);
        }
    }
    
    recordResponseTime(endpointName, responseTime) {
        this.status.responseTimeHistory.push({
            endpoint: endpointName,
            responseTime: responseTime,
            timestamp: Date.now()
        });
        
        // Keep only last 1000 entries per endpoint
        const endpointHistory = this.status.responseTimeHistory.filter(
            entry => entry.endpoint === endpointName
        );
        
        if (endpointHistory.length > 1000) {
            // Remove oldest entries for this endpoint
            const toRemove = endpointHistory.slice(0, endpointHistory.length - 1000);
            toRemove.forEach(entry => {
                const index = this.status.responseTimeHistory.indexOf(entry);
                if (index > -1) {
                    this.status.responseTimeHistory.splice(index, 1);
                }
            });
        }
    }
    
    handleEndpointResult(endpoint, result) {
        const endpointKey = endpoint.name;
        
        if (result.success) {
            // Endpoint is up
            if (this.status.currentOutages.has(endpointKey)) {
                // Endpoint recovered
                const outage = this.status.currentOutages.get(endpointKey);
                outage.endTime = Date.now();
                outage.duration = outage.endTime - outage.startTime;
                
                // Move to downtime events
                this.status.downtimeEvents.push(outage);
                this.status.currentOutages.delete(endpointKey);
                
                // Trigger recovery callback
                this.triggerCallbacks('endpoint_recovered', {
                    endpoint: endpoint,
                    outage: outage
                });
                
                console.log(`✅ Endpoint recovered: ${endpoint.name}`);
            }
        } else {
            // Endpoint is down
            if (!this.status.currentOutages.has(endpointKey)) {
                // New outage
                const outage = {
                    endpoint: endpoint.name,
                    url: endpoint.url,
                    startTime: Date.now(),
                    endTime: null,
                    duration: null,
                    critical: endpoint.critical,
                    error: result.error || `HTTP ${result.status}`,
                    retryCount: 0
                };
                
                this.status.currentOutages.set(endpointKey, outage);
                
                // Trigger outage callback
                this.triggerCallbacks('endpoint_down', {
                    endpoint: endpoint,
                    outage: outage
                });
                
                console.warn(`❌ Endpoint down: ${endpoint.name} - ${outage.error}`);
                
                // Retry critical endpoints
                if (endpoint.critical) {
                    this.retryEndpoint(endpoint, outage);
                }
            } else {
                // Ongoing outage
                const outage = this.status.currentOutages.get(endpointKey);
                outage.retryCount++;
            }
        }
    }
    
    async retryEndpoint(endpoint, outage) {
        if (outage.retryCount >= this.config.maxRetries) {
            return;
        }
        
        // Wait before retry (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, outage.retryCount), 30000);
        
        setTimeout(async () => {
            try {
                const result = await this.checkEndpoint(endpoint);
                this.handleEndpointResult(endpoint, result);
            } catch (error) {
                console.warn(`Retry failed for ${endpoint.name}:`, error);
            }
        }, delay);
    }
    
    updateOverallStatus(checkResults) {
        const totalEndpoints = checkResults.length;
        const successfulEndpoints = checkResults.filter(r => r.success).length;
        const criticalEndpoints = checkResults.filter(r => r.critical);
        const criticalSuccessful = criticalEndpoints.filter(r => r.success).length;
        
        // Calculate uptime percentage
        const currentUptime = (successfulEndpoints / totalEndpoints) * 100;
        
        // Update rolling uptime average (weighted)
        this.status.uptime = (this.status.uptime * 0.95) + (currentUptime * 0.05);
        
        // Check if we have critical outages
        const hasCriticalOutages = criticalSuccessful < criticalEndpoints.length;
        
        if (hasCriticalOutages) {
            this.triggerCallbacks('critical_outage', {
                uptime: this.status.uptime,
                criticalOutages: criticalEndpoints.filter(r => !r.success)
            });
        }
        
        // Update online status
        this.status.isOnline = successfulEndpoints > 0;
    }
    
    handleNetworkChange(isOnline) {
        this.status.isOnline = isOnline;
        
        if (isOnline) {
            console.log('🌐 Network connection restored');
            this.triggerCallbacks('network_online', { timestamp: Date.now() });
            
            // Immediate check after coming online
            setTimeout(() => this.performUptimeCheck(), 1000);
        } else {
            console.warn('🚫 Network connection lost');
            this.handleOfflineState();
            this.triggerCallbacks('network_offline', { timestamp: Date.now() });
        }
    }
    
    handleConnectionChange() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const connectionInfo = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
            
            this.triggerCallbacks('connection_change', connectionInfo);
            
            // Adjust check frequency based on connection quality
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Reduce check frequency on slow connections
                this.adjustCheckInterval(120000); // 2 minutes
            } else {
                // Normal check frequency
                this.adjustCheckInterval(60000); // 1 minute
            }
        }
    }
    
    handleOfflineState() {
        // Mark all endpoints as potentially down due to network issues
        this.config.endpoints.forEach(endpoint => {
            if (!this.status.currentOutages.has(endpoint.name)) {
                const outage = {
                    endpoint: endpoint.name,
                    url: endpoint.url,
                    startTime: Date.now(),
                    endTime: null,
                    duration: null,
                    critical: endpoint.critical,
                    error: 'Network offline',
                    retryCount: 0
                };
                
                this.status.currentOutages.set(endpoint.name, outage);
            }
        });
    }
    
    adjustCheckInterval(newInterval) {
        if (this.config.checkInterval === newInterval) return;
        
        this.config.checkInterval = newInterval;
        
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = setInterval(() => {
                this.performUptimeCheck();
            }, newInterval);
        }
        
        console.log(`Check interval adjusted to ${newInterval}ms`);
    }
    
    // Callback system
    on(event, callback) {
        if (!this.callbacks.has(event)) {
            this.callbacks.set(event, []);
        }
        this.callbacks.get(event).push(callback);
    }
    
    off(event, callback) {
        if (this.callbacks.has(event)) {
            const callbacks = this.callbacks.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
    
    triggerCallbacks(event, data) {
        if (this.callbacks.has(event)) {
            this.callbacks.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Uptime monitor callback error for ${event}:`, error);
                }
            });
        }
    }
    
    // Public API methods
    getStatus() {
        return {
            ...this.status,
            currentOutages: Array.from(this.status.currentOutages.values()),
            averageResponseTime: this.getAverageResponseTime(),
            uptimePercentage: this.status.uptime
        };
    }
    
    getAverageResponseTime(endpoint = null, timeWindow = 3600000) { // Last hour
        const cutoff = Date.now() - timeWindow;
        let relevantEntries = this.status.responseTimeHistory.filter(
            entry => entry.timestamp > cutoff
        );
        
        if (endpoint) {
            relevantEntries = relevantEntries.filter(
                entry => entry.endpoint === endpoint
            );
        }
        
        if (relevantEntries.length === 0) return null;
        
        const sum = relevantEntries.reduce((acc, entry) => acc + entry.responseTime, 0);
        return sum / relevantEntries.length;
    }
    
    getUptimeReport(timeWindow = 86400000) { // Last 24 hours
        const cutoff = Date.now() - timeWindow;
        const relevantEvents = this.status.downtimeEvents.filter(
            event => event.startTime > cutoff
        );
        
        const totalDowntime = relevantEvents.reduce((acc, event) => {
            return acc + (event.duration || 0);
        }, 0);
        
        const uptimePercentage = ((timeWindow - totalDowntime) / timeWindow) * 100;
        
        return {
            timeWindow: timeWindow,
            uptimePercentage: Math.max(0, uptimePercentage),
            totalDowntime: totalDowntime,
            downtimeEvents: relevantEvents.length,
            criticalOutages: relevantEvents.filter(e => e.critical).length,
            averageResponseTime: this.getAverageResponseTime(null, timeWindow)
        };
    }
    
    exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            status: this.getStatus(),
            report24h: this.getUptimeReport(86400000),
            report7d: this.getUptimeReport(7 * 86400000),
            config: this.config,
            responseTimeHistory: this.status.responseTimeHistory.slice(-100) // Last 100 entries
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `uptime-report-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return report;
    }
    
    // Configuration methods
    addEndpoint(endpoint) {
        this.config.endpoints.push(endpoint);
        console.log(`Endpoint added: ${endpoint.name}`);
    }
    
    removeEndpoint(name) {
        const index = this.config.endpoints.findIndex(e => e.name === name);
        if (index > -1) {
            this.config.endpoints.splice(index, 1);
            console.log(`Endpoint removed: ${name}`);
        }
    }
    
    setCheckInterval(interval) {
        this.adjustCheckInterval(interval);
    }
    
    // Cleanup
    destroy() {
        this.stopMonitoring();
        this.callbacks.clear();
        this.saveData();
    }
}

// Initialize uptime monitor
document.addEventListener('DOMContentLoaded', () => {
    window.uptimeMonitor = new UptimeMonitor();
    
    // Set up integration with performance alerts (modo silencioso)
    if (window.performanceAlertsSystem) {
        window.uptimeMonitor.on('critical_outage', (data) => {
            // Apenas log no console por padrão
            console.warn(`Critical service outage detected. Uptime: ${data.uptime.toFixed(2)}%`);
            
            // Só dispara alerta se os alertas estiverem habilitados
            if (window.performanceAlertsSystem.alertsEnabled?.console) {
                window.performanceAlertsSystem.triggerAlert({
                    metric: 'uptime',
                    severity: 'critical',
                    value: data.uptime,
                    threshold: 99.0,
                    message: `Critical service outage detected. Uptime: ${data.uptime.toFixed(2)}%`,
                    url: window.location.href,
                    details: data.criticalOutages
                });
            }
        });
        
        window.uptimeMonitor.on('endpoint_down', (data) => {
            if (data.endpoint.critical) {
                // Apenas log no console por padrão
                console.warn(`Critical endpoint down: ${data.endpoint.name}`);
                
                // Só dispara alerta se os alertas estiverem habilitados
                if (window.performanceAlertsSystem.alertsEnabled?.console) {
                    window.performanceAlertsSystem.triggerAlert({
                        metric: 'endpoint_availability',
                        severity: 'critical',
                        value: 0,
                        threshold: 1,
                        message: `Critical endpoint down: ${data.endpoint.name}`,
                        url: window.location.href,
                        details: data.outage
                    });
                }
            }
        });
    }
    
    console.log('Uptime Monitor initialized');
});

// Export for external use
window.UptimeMonitor = UptimeMonitor;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UptimeMonitor;
}