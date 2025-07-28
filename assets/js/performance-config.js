/**
 * Performance Monitoring Configuration
 * Configurações centralizadas para o sistema de monitoramento
 */

class PerformanceConfig {
    constructor() {
        this.settings = {
            // Alertas desabilitados por padrão para não incomodar os usuários
            alerts: {
                enabled: false,
                visual: false,
                notifications: false,
                console: true, // Apenas console para desenvolvedores
                analytics: true // Mantém métricas para análise
            },
            
            // Monitoramento ativo mas silencioso
            monitoring: {
                coreWebVitals: true,
                uptime: true,
                errors: true,
                reports: true
            },
            
            // Dashboard disponível mas não intrusivo
            dashboard: {
                autoShow: false,
                keyboardShortcuts: true
            },
            
            // Configurações de desenvolvimento
            development: {
                debug: false,
                verbose: false
            }
        };
        
        this.loadSettings();
    }
    
    loadSettings() {
        try {
            const stored = localStorage.getItem('performance_config');
            if (stored) {
                const storedSettings = JSON.parse(stored);
                this.settings = { ...this.settings, ...storedSettings };
            }
        } catch (error) {
            console.warn('Failed to load performance settings:', error);
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem('performance_config', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('Failed to save performance settings:', error);
        }
    }
    
    // Métodos para habilitar/desabilitar alertas
    enableAlerts() {
        this.settings.alerts.enabled = true;
        this.settings.alerts.visual = true;
        this.settings.alerts.notifications = true;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Performance alerts enabled');
    }
    
    disableAlerts() {
        this.settings.alerts.enabled = false;
        this.settings.alerts.visual = false;
        this.settings.alerts.notifications = false;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Performance alerts disabled');
    }
    
    enableVisualAlerts() {
        this.settings.alerts.visual = true;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Visual alerts enabled');
    }
    
    disableVisualAlerts() {
        this.settings.alerts.visual = false;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Visual alerts disabled');
    }
    
    enableNotifications() {
        this.settings.alerts.notifications = true;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Browser notifications enabled');
    }
    
    disableNotifications() {
        this.settings.alerts.notifications = false;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Browser notifications disabled');
    }
    
    // Aplicar configurações aos sistemas
    applyAlertSettings() {
        if (window.performanceAlertsSystem) {
            window.performanceAlertsSystem.alertsEnabled = {
                visual: this.settings.alerts.visual,
                notification: this.settings.alerts.notifications,
                console: this.settings.alerts.console,
                analytics: this.settings.alerts.analytics,
                overlay: this.settings.alerts.visual
            };
        }
        
        if (window.errorTrackingSystem) {
            window.errorTrackingSystem.config.enableUserFeedback = this.settings.alerts.visual;
        }
    }
    
    // Métodos para configurar monitoramento
    enableMonitoring(type) {
        if (this.settings.monitoring.hasOwnProperty(type)) {
            this.settings.monitoring[type] = true;
            this.saveSettings();
            console.log(`${type} monitoring enabled`);
        }
    }
    
    disableMonitoring(type) {
        if (this.settings.monitoring.hasOwnProperty(type)) {
            this.settings.monitoring[type] = false;
            this.saveSettings();
            console.log(`${type} monitoring disabled`);
        }
    }
    
    // Configurações de desenvolvimento
    enableDebugMode() {
        this.settings.development.debug = true;
        this.settings.development.verbose = true;
        this.settings.alerts.console = true;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Debug mode enabled - all console logging active');
    }
    
    disableDebugMode() {
        this.settings.development.debug = false;
        this.settings.development.verbose = false;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Debug mode disabled');
    }
    
    // Configurações do dashboard
    enableDashboardAutoShow() {
        this.settings.dashboard.autoShow = true;
        this.saveSettings();
        console.log('Dashboard auto-show enabled');
    }
    
    disableDashboardAutoShow() {
        this.settings.dashboard.autoShow = false;
        this.saveSettings();
        console.log('Dashboard auto-show disabled');
    }
    
    // Métodos de conveniência
    enableAllFeatures() {
        this.enableAlerts();
        this.enableVisualAlerts();
        this.enableNotifications();
        this.enableDebugMode();
        this.enableDashboardAutoShow();
        console.log('All performance monitoring features enabled');
    }
    
    disableAllFeatures() {
        this.disableAlerts();
        this.disableVisualAlerts();
        this.disableNotifications();
        this.disableDebugMode();
        this.disableDashboardAutoShow();
        console.log('All performance monitoring features disabled (monitoring continues silently)');
    }
    
    // Configuração silenciosa (padrão)
    setSilentMode() {
        this.settings.alerts.enabled = false;
        this.settings.alerts.visual = false;
        this.settings.alerts.notifications = false;
        this.settings.alerts.console = false; // Até console desabilitado
        this.settings.development.debug = false;
        this.settings.development.verbose = false;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Silent mode enabled - monitoring active but no alerts');
    }
    
    // Configuração para desenvolvedores
    setDeveloperMode() {
        this.settings.alerts.enabled = true;
        this.settings.alerts.console = true;
        this.settings.development.debug = true;
        this.settings.development.verbose = true;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Developer mode enabled - console alerts and debug info active');
    }
    
    // Configuração para produção com alertas visuais
    setProductionMode() {
        this.settings.alerts.enabled = true;
        this.settings.alerts.visual = true;
        this.settings.alerts.notifications = true;
        this.settings.alerts.console = false;
        this.settings.development.debug = false;
        this.applyAlertSettings();
        this.saveSettings();
        console.log('Production mode enabled - visual alerts active');
    }
    
    // Obter configurações atuais
    getSettings() {
        return { ...this.settings };
    }
    
    // Resetar para padrões
    resetToDefaults() {
        localStorage.removeItem('performance_config');
        this.settings = {
            alerts: {
                enabled: false,
                visual: false,
                notifications: false,
                console: true,
                analytics: true
            },
            monitoring: {
                coreWebVitals: true,
                uptime: true,
                errors: true,
                reports: true
            },
            dashboard: {
                autoShow: false,
                keyboardShortcuts: true
            },
            development: {
                debug: false,
                verbose: false
            }
        };
        this.applyAlertSettings();
        console.log('Performance settings reset to defaults');
    }
    
    // Mostrar ajuda
    showHelp() {
        console.log(`
🔧 Performance Monitoring Configuration Help

Métodos disponíveis:
- performanceConfig.enableAlerts() - Habilita todos os alertas
- performanceConfig.disableAlerts() - Desabilita todos os alertas
- performanceConfig.enableVisualAlerts() - Habilita alertas visuais
- performanceConfig.disableVisualAlerts() - Desabilita alertas visuais
- performanceConfig.enableNotifications() - Habilita notificações do browser
- performanceConfig.disableNotifications() - Desabilita notificações do browser

Modos predefinidos:
- performanceConfig.setSilentMode() - Modo silencioso (padrão)
- performanceConfig.setDeveloperMode() - Modo desenvolvedor (console apenas)
- performanceConfig.setProductionMode() - Modo produção (alertas visuais)

Utilitários:
- performanceConfig.enableAllFeatures() - Habilita tudo
- performanceConfig.disableAllFeatures() - Desabilita tudo
- performanceConfig.getSettings() - Ver configurações atuais
- performanceConfig.resetToDefaults() - Resetar configurações

Dashboard:
- Ctrl+Shift+M - Abrir/fechar dashboard
- Ctrl+Shift+P - Abrir monitor de performance

Estado atual: ${this.settings.alerts.enabled ? 'Alertas habilitados' : 'Modo silencioso'}
        `);
    }
}

// Inicializar configuração
document.addEventListener('DOMContentLoaded', () => {
    window.performanceConfig = new PerformanceConfig();
    
    // Aplicar configurações após outros sistemas carregarem
    setTimeout(() => {
        window.performanceConfig.applyAlertSettings();
        
        // Mostrar mensagem discreta sobre disponibilidade
        if (!window.performanceConfig.settings.alerts.enabled) {
            console.log('📊 Performance monitoring ativo (modo silencioso). Digite performanceConfig.showHelp() para opções.');
        }
    }, 2000);
});

// Export for external use
window.PerformanceConfig = PerformanceConfig;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceConfig;
}