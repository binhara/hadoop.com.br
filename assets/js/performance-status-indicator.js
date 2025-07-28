/**
 * Performance Status Indicator
 * Indicador discreto do status do monitoramento de performance
 */

class PerformanceStatusIndicator {
    constructor() {
        this.indicator = null;
        this.isVisible = false;
        this.status = 'initializing';
        
        this.init();
    }
    
    init() {
        this.createIndicator();
        this.bindEvents();
        
        // Aguardar sistemas carregarem
        setTimeout(() => {
            this.updateStatus();
            this.startStatusUpdates();
        }, 3000);
    }
    
    createIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'performance-status-indicator';
        indicator.innerHTML = `
            <div class="indicator-dot"></div>
            <div class="indicator-tooltip">
                <div class="tooltip-title">Performance Monitor</div>
                <div class="tooltip-status">Inicializando...</div>
                <div class="tooltip-actions">
                    <small>Ctrl+Shift+M para dashboard</small>
                </div>
            </div>
        `;
        
        // Adicionar estilos
        this.addStyles();
        
        document.body.appendChild(indicator);
        this.indicator = indicator;
        
        // Mostrar por 3 segundos e depois esconder
        setTimeout(() => {
            this.show();
            setTimeout(() => {
                this.hide();
            }, 3000);
        }, 1000);
    }
    
    addStyles() {
        if (document.getElementById('performance-indicator-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'performance-indicator-styles';
        styles.textContent = `
            #performance-status-indicator {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }
            
            #performance-status-indicator.visible {
                opacity: 1;
                pointer-events: auto;
            }
            
            .indicator-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #00ff00;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
                animation: pulse 2s infinite;
                cursor: pointer;
                position: relative;
            }
            
            .indicator-dot.warning {
                background: #ffc107;
                box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
            }
            
            .indicator-dot.critical {
                background: #dc3545;
                box-shadow: 0 0 10px rgba(220, 53, 69, 0.5);
            }
            
            .indicator-dot.offline {
                background: #6c757d;
                box-shadow: 0 0 10px rgba(108, 117, 125, 0.5);
                animation: none;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .indicator-tooltip {
                position: absolute;
                bottom: 20px;
                right: 0;
                background: #1a1a1a;
                color: #00ff00;
                padding: 10px;
                border-radius: 6px;
                border: 1px solid #00ff00;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                pointer-events: none;
                min-width: 180px;
            }
            
            #performance-status-indicator:hover .indicator-tooltip {
                opacity: 1;
                transform: translateY(0);
            }
            
            .tooltip-title {
                font-weight: bold;
                margin-bottom: 4px;
                color: #00ff00;
            }
            
            .tooltip-status {
                margin-bottom: 6px;
                color: #ccc;
            }
            
            .tooltip-actions {
                border-top: 1px solid #333;
                padding-top: 6px;
                color: #888;
            }
            
            .status-good { color: #00ff00; }
            .status-warning { color: #ffc107; }
            .status-critical { color: #dc3545; }
            .status-offline { color: #6c757d; }
        `;
        
        document.head.appendChild(styles);
    }
    
    bindEvents() {
        // Click no indicador para mostrar/esconder dashboard
        this.indicator.addEventListener('click', () => {
            if (window.performanceMonitoringDashboard) {
                window.performanceMonitoringDashboard.toggle();
            }
        });
        
        // Mostrar indicador quando houver problemas
        if (window.performanceAlertsSystem) {
            // Override do sistema de alertas para mostrar indicador
            const originalTriggerAlert = window.performanceAlertsSystem.triggerAlert?.bind(window.performanceAlertsSystem);
            if (originalTriggerAlert) {
                window.performanceAlertsSystem.triggerAlert = (alert) => {
                    originalTriggerAlert(alert);
                    
                    // Mostrar indicador temporariamente quando houver alerta
                    if (alert.severity === 'critical') {
                        this.showTemporarily(5000); // 5 segundos
                    }
                };
            }
        }
    }
    
    updateStatus() {
        let overallStatus = 'good';
        let statusText = 'Tudo funcionando bem';
        let issues = [];
        
        // Verificar Core Web Vitals
        if (window.coreWebVitalsOptimizer) {
            const metrics = window.coreWebVitalsOptimizer.getMetrics();
            const poorMetrics = Object.entries(metrics).filter(([key, value]) => {
                if (value === null) return false;
                return this.getMetricStatus(key, value) === 'poor';
            });
            
            if (poorMetrics.length > 0) {
                overallStatus = 'critical';
                issues.push(`${poorMetrics.length} métricas críticas`);
            }
        }
        
        // Verificar uptime
        if (window.uptimeMonitor) {
            const status = window.uptimeMonitor.getStatus();
            if (!status.isOnline) {
                overallStatus = 'offline';
                issues.push('Serviço offline');
            } else if (status.uptimePercentage < 99.5) {
                if (overallStatus === 'good') overallStatus = 'warning';
                issues.push('Uptime baixo');
            }
        }
        
        // Verificar erros
        if (window.errorTrackingSystem) {
            const stats = window.errorTrackingSystem.getErrorStats();
            if (stats.criticalErrors > 0) {
                overallStatus = 'critical';
                issues.push(`${stats.criticalErrors} erros críticos`);
            } else if (stats.totalErrors > 5) {
                if (overallStatus === 'good') overallStatus = 'warning';
                issues.push('Muitos erros');
            }
        }
        
        // Atualizar interface
        this.status = overallStatus;
        
        const dot = this.indicator.querySelector('.indicator-dot');
        const statusElement = this.indicator.querySelector('.tooltip-status');
        
        // Remover classes anteriores
        dot.className = 'indicator-dot';
        
        // Adicionar nova classe
        if (overallStatus !== 'good') {
            dot.classList.add(overallStatus);
        }
        
        // Atualizar texto
        if (issues.length > 0) {
            statusText = issues.join(', ');
        }
        
        statusElement.textContent = statusText;
        statusElement.className = `tooltip-status status-${overallStatus}`;
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
        if (!threshold) return 'good';
        
        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    }
    
    startStatusUpdates() {
        // Atualizar status a cada 30 segundos
        setInterval(() => {
            this.updateStatus();
        }, 30000);
    }
    
    show() {
        this.indicator.classList.add('visible');
        this.isVisible = true;
    }
    
    hide() {
        this.indicator.classList.remove('visible');
        this.isVisible = false;
    }
    
    showTemporarily(duration = 3000) {
        this.show();
        setTimeout(() => {
            this.hide();
        }, duration);
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    destroy() {
        if (this.indicator) {
            this.indicator.remove();
        }
    }
}

// Inicializar apenas se não estivermos em modo silencioso total
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Verificar se o usuário quer o indicador
        const config = window.performanceConfig?.getSettings();
        const showIndicator = config?.alerts?.enabled || config?.development?.debug;
        
        // Sempre mostrar o indicador discretamente, mas apenas por alguns segundos
        window.performanceStatusIndicator = new PerformanceStatusIndicator();
        
        console.log('📊 Performance Status Indicator initialized (discrete mode)');
    }, 2000);
});

// Export for external use
window.PerformanceStatusIndicator = PerformanceStatusIndicator;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceStatusIndicator;
}