/**
 * SEO Alerts System
 * Portal Big Data - Automated SEO monitoring and alerting
 */

const SEOAlertsSystem = {
    // Configuration
    config: {
        checkInterval: 60 * 60 * 1000, // 1 hour
        alertRetention: 30 * 24 * 60 * 60 * 1000, // 30 days
        maxAlertsPerType: 10,
        emailEnabled: false, // Would be enabled in production
        slackEnabled: false, // Would be enabled in production
        
        // Alert thresholds
        thresholds: {
            crawlErrors: 5,
            indexingDrop: 10, // percentage
            positionDrop: 5, // positions
            clicksDrop: 20, // percentage
            impressionsDrop: 15, // percentage
            coreWebVitalsPoor: 10, // percentage
            pagespeedScore: 80,
            uptimeThreshold: 99, // percentage
            responseTime: 3000 // milliseconds
        }
    },
    
    // Alert types and their configurations
    alertTypes: {
        indexing_issues: {
            name: 'Problemas de Indexação',
            severity: 'high',
            description: 'Páginas não indexadas ou erros de crawl',
            checkFunction: 'checkIndexingIssues',
            frequency: 'daily'
        },
        
        ranking_drops: {
            name: 'Queda no Ranking',
            severity: 'medium',
            description: 'Quedas significativas nas posições das palavras-chave',
            checkFunction: 'checkRankingDrops',
            frequency: 'daily'
        },
        
        traffic_drops: {
            name: 'Queda no Tráfego',
            severity: 'medium',
            description: 'Redução significativa em cliques ou impressões',
            checkFunction: 'checkTrafficDrops',
            frequency: 'daily'
        },
        
        technical_issues: {
            name: 'Problemas Técnicos',
            severity: 'high',
            description: 'Core Web Vitals ruins ou problemas de performance',
            checkFunction: 'checkTechnicalIssues',
            frequency: 'daily'
        },
        
        content_issues: {
            name: 'Problemas de Conteúdo',
            severity: 'low',
            description: 'Meta tags duplicadas ou conteúdo thin',
            checkFunction: 'checkContentIssues',
            frequency: 'weekly'
        },
        
        sitemap_issues: {
            name: 'Problemas no Sitemap',
            severity: 'medium',
            description: 'Erros no sitemap ou problemas de submissão',
            checkFunction: 'checkSitemapIssues',
            frequency: 'daily'
        },
        
        security_issues: {
            name: 'Problemas de Segurança',
            severity: 'high',
            description: 'Problemas de HTTPS ou certificados',
            checkFunction: 'checkSecurityIssues',
            frequency: 'daily'
        }
    },
    
    // Initialize alerts system
    init: function() {
        this.setupPeriodicChecks();
        this.cleanupOldAlerts();
        console.log('SEO Alerts System initialized');
    },
    
    // Setup periodic alert checks
    setupPeriodicChecks: function() {
        // Run checks every hour
        setInterval(() => {
            this.runAllChecks();
        }, this.config.checkInterval);
        
        // Initial check after 2 minutes
        setTimeout(() => {
            this.runAllChecks();
        }, 2 * 60 * 1000);
    },
    
    // Run all alert checks
    runAllChecks: async function() {
        console.log('Running SEO alert checks...');
        
        for (const [alertType, config] of Object.entries(this.alertTypes)) {
            try {
                if (this.shouldRunCheck(alertType, config.frequency)) {
                    await this.runCheck(alertType, config);
                }
            } catch (error) {
                console.error(`Failed to run check for ${alertType}:`, error);
            }
        }
        
        // Update last check time
        localStorage.setItem('seo_alerts_last_check', new Date().toISOString());
    },
    
    // Check if we should run a specific check
    shouldRunCheck: function(alertType, frequency) {
        const lastCheck = localStorage.getItem(`seo_alert_last_${alertType}`);
        if (!lastCheck) return true;
        
        const lastCheckTime = new Date(lastCheck);
        const now = new Date();
        const timeDiff = now - lastCheckTime;
        
        switch (frequency) {
            case 'daily':
                return timeDiff > 24 * 60 * 60 * 1000;
            case 'weekly':
                return timeDiff > 7 * 24 * 60 * 60 * 1000;
            case 'hourly':
                return timeDiff > 60 * 60 * 1000;
            default:
                return true;
        }
    },
    
    // Run specific check
    runCheck: async function(alertType, config) {
        const checkFunction = this[config.checkFunction];
        if (!checkFunction) {
            console.error(`Check function ${config.checkFunction} not found`);
            return;
        }
        
        try {
            const issues = await checkFunction.call(this);
            
            if (issues && issues.length > 0) {
                issues.forEach(issue => {
                    this.createAlert(alertType, issue, config.severity);
                });
            }
            
            // Update last check time
            localStorage.setItem(`seo_alert_last_${alertType}`, new Date().toISOString());
            
        } catch (error) {
            console.error(`Check ${alertType} failed:`, error);
        }
    },
    
    // Check indexing issues
    checkIndexingIssues: async function() {
        const issues = [];
        
        // Check sitemap accessibility
        try {
            const response = await fetch('/sitemap.xml');
            if (!response.ok) {
                issues.push({
                    type: 'sitemap_inaccessible',
                    message: 'Sitemap não está acessível',
                    details: `Status: ${response.status}`,
                    action: 'Verificar configuração do servidor e arquivo sitemap.xml'
                });
            }
        } catch (error) {
            issues.push({
                type: 'sitemap_error',
                message: 'Erro ao acessar sitemap',
                details: error.message,
                action: 'Verificar conectividade e configuração do sitemap'
            });
        }
        
        // Check robots.txt
        try {
            const response = await fetch('/robots.txt');
            if (!response.ok) {
                issues.push({
                    type: 'robots_inaccessible',
                    message: 'Robots.txt não está acessível',
                    details: `Status: ${response.status}`,
                    action: 'Criar ou corrigir arquivo robots.txt'
                });
            } else {
                const content = await response.text();
                if (!content.includes('Sitemap:')) {
                    issues.push({
                        type: 'robots_missing_sitemap',
                        message: 'Robots.txt não referencia o sitemap',
                        details: 'Sitemap não encontrado no robots.txt',
                        action: 'Adicionar referência ao sitemap no robots.txt'
                    });
                }
            }
        } catch (error) {
            issues.push({
                type: 'robots_error',
                message: 'Erro ao acessar robots.txt',
                details: error.message,
                action: 'Verificar arquivo robots.txt'
            });
        }
        
        return issues;
    },
    
    // Check ranking drops
    checkRankingDrops: async function() {
        const issues = [];
        
        if (!window.KeywordTracker) return issues;
        
        const keywords = window.SEARCH_CONSOLE_CONFIG?.targetKeywords || [];
        
        for (const keywordData of keywords) {
            const trends = window.KeywordTracker.getKeywordTrends(keywordData.keyword, 7);
            
            if (trends.length >= 2) {
                const current = trends[trends.length - 1];
                const previous = trends[trends.length - 2];
                
                const positionChange = current.position - previous.position;
                
                if (positionChange > this.config.thresholds.positionDrop) {
                    issues.push({
                        type: 'keyword_position_drop',
                        message: `Queda na posição da palavra-chave: ${keywordData.keyword}`,
                        details: `Posição anterior: ${previous.position}, Atual: ${current.position}`,
                        action: 'Revisar conteúdo e estratégia SEO para esta palavra-chave',
                        keyword: keywordData.keyword,
                        positionChange: positionChange
                    });
                }
            }
        }
        
        return issues;
    },
    
    // Check traffic drops
    checkTrafficDrops: async function() {
        const issues = [];
        
        // Get historical performance data
        const performanceData = JSON.parse(localStorage.getItem('seo_results_performance') || '[]');
        
        if (performanceData.length >= 2) {
            const current = performanceData[performanceData.length - 1].data;
            const previous = performanceData[performanceData.length - 2].data;
            
            // Check clicks drop
            const clicksChange = this.calculatePercentageChange(current.total_clicks, previous.total_clicks);
            if (clicksChange < -this.config.thresholds.clicksDrop) {
                issues.push({
                    type: 'clicks_drop',
                    message: `Queda significativa nos cliques: ${Math.abs(clicksChange).toFixed(1)}%`,
                    details: `Cliques anteriores: ${previous.total_clicks}, Atuais: ${current.total_clicks}`,
                    action: 'Analisar mudanças no conteúdo e rankings das palavras-chave'
                });
            }
            
            // Check impressions drop
            const impressionsChange = this.calculatePercentageChange(current.total_impressions, previous.total_impressions);
            if (impressionsChange < -this.config.thresholds.impressionsDrop) {
                issues.push({
                    type: 'impressions_drop',
                    message: `Queda significativa nas impressões: ${Math.abs(impressionsChange).toFixed(1)}%`,
                    details: `Impressões anteriores: ${previous.total_impressions}, Atuais: ${current.total_impressions}`,
                    action: 'Verificar indexação e visibilidade do site nos resultados de busca'
                });
            }
        }
        
        return issues;
    },
    
    // Check technical issues
    checkTechnicalIssues: async function() {
        const issues = [];
        
        // Check HTTPS
        if (window.location.protocol !== 'https:') {
            issues.push({
                type: 'https_not_enabled',
                message: 'Site não está usando HTTPS',
                details: 'Protocolo HTTP detectado',
                action: 'Configurar certificado SSL e redirecionar HTTP para HTTPS'
            });
        }
        
        // Check Core Web Vitals (simulated check)
        const vitalsData = JSON.parse(localStorage.getItem('seo_results_technical') || '[]');
        if (vitalsData.length > 0) {
            const latest = vitalsData[vitalsData.length - 1].data;
            
            if (latest.lcp) {
                const total = latest.lcp.good + latest.lcp.needs_improvement + latest.lcp.poor;
                const poorPercent = (latest.lcp.poor / total) * 100;
                
                if (poorPercent > this.config.thresholds.coreWebVitalsPoor) {
                    issues.push({
                        type: 'core_web_vitals_poor',
                        message: `Core Web Vitals ruins: ${poorPercent.toFixed(1)}% das páginas com LCP ruim`,
                        details: 'Largest Contentful Paint precisa ser otimizado',
                        action: 'Otimizar imagens, reduzir tempo de resposta do servidor, eliminar recursos que bloqueiam renderização'
                    });
                }
            }
        }
        
        // Check basic meta tags
        if (!document.title || document.title.length === 0) {
            issues.push({
                type: 'missing_title',
                message: 'Título da página está vazio',
                details: 'Tag <title> não encontrada ou vazia',
                action: 'Adicionar título descritivo à página'
            });
        }
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription || !metaDescription.getAttribute('content')) {
            issues.push({
                type: 'missing_description',
                message: 'Meta description está ausente',
                details: 'Meta tag description não encontrada',
                action: 'Adicionar meta description descritiva'
            });
        }
        
        return issues;
    },
    
    // Check content issues
    checkContentIssues: async function() {
        const issues = [];
        
        // Check for duplicate titles (would need server-side implementation)
        // This is a placeholder for the actual implementation
        
        // Check for thin content
        const contentElements = document.querySelectorAll('main, article, .content');
        let hasThinnContent = false;
        
        contentElements.forEach(element => {
            const textContent = element.textContent.trim();
            if (textContent.length < 300) { // Less than 300 characters
                hasThinnContent = true;
            }
        });
        
        if (hasThinnContent) {
            issues.push({
                type: 'thin_content',
                message: 'Conteúdo insuficiente detectado',
                details: 'Algumas páginas têm menos de 300 caracteres de conteúdo',
                action: 'Expandir conteúdo com informações relevantes e úteis'
            });
        }
        
        return issues;
    },
    
    // Check sitemap issues
    checkSitemapIssues: async function() {
        const issues = [];
        
        // Check sitemap errors from automated updater
        const sitemapErrors = JSON.parse(localStorage.getItem('sitemap_errors') || '[]');
        const recentErrors = sitemapErrors.filter(error => {
            const errorDate = new Date(error.timestamp);
            const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            return errorDate > dayAgo;
        });
        
        if (recentErrors.length > 0) {
            issues.push({
                type: 'sitemap_generation_errors',
                message: `${recentErrors.length} erros recentes na geração do sitemap`,
                details: recentErrors.map(e => e.message).join(', '),
                action: 'Verificar logs do sistema de geração automática de sitemap'
            });
        }
        
        return issues;
    },
    
    // Check security issues
    checkSecurityIssues: async function() {
        const issues = [];
        
        // Check mixed content
        const httpResources = document.querySelectorAll('img[src^="http:"], script[src^="http:"], link[href^="http:"]');
        if (httpResources.length > 0 && window.location.protocol === 'https:') {
            issues.push({
                type: 'mixed_content',
                message: `${httpResources.length} recursos HTTP em página HTTPS`,
                details: 'Recursos não seguros detectados em página segura',
                action: 'Atualizar URLs de recursos para HTTPS'
            });
        }
        
        return issues;
    },
    
    // Create alert
    createAlert: function(alertType, issue, severity) {
        const alert = {
            id: this.generateAlertId(),
            type: alertType,
            severity: severity,
            message: issue.message,
            details: issue.details,
            action: issue.action,
            timestamp: new Date().toISOString(),
            resolved: false,
            ...issue // Include any additional properties
        };
        
        // Store alert
        this.storeAlert(alert);
        
        // Send notifications
        this.sendNotifications(alert);
        
        console.warn(`SEO Alert [${severity}]:`, alert.message);
    },
    
    // Store alert
    storeAlert: function(alert) {
        const alerts = JSON.parse(localStorage.getItem('seo_alerts') || '[]');
        alerts.push(alert);
        
        // Keep only recent alerts and limit per type
        const filteredAlerts = this.filterAlerts(alerts);
        
        localStorage.setItem('seo_alerts', JSON.stringify(filteredAlerts));
    },
    
    // Filter alerts (remove old ones and limit per type)
    filterAlerts: function(alerts) {
        const cutoffDate = new Date(Date.now() - this.config.alertRetention);
        
        // Remove old alerts
        let filteredAlerts = alerts.filter(alert => 
            new Date(alert.timestamp) > cutoffDate
        );
        
        // Limit alerts per type
        const alertsByType = {};
        filteredAlerts.forEach(alert => {
            if (!alertsByType[alert.type]) {
                alertsByType[alert.type] = [];
            }
            alertsByType[alert.type].push(alert);
        });
        
        // Keep only the most recent alerts per type
        filteredAlerts = [];
        Object.values(alertsByType).forEach(typeAlerts => {
            typeAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            filteredAlerts.push(...typeAlerts.slice(0, this.config.maxAlertsPerType));
        });
        
        return filteredAlerts;
    },
    
    // Send notifications
    sendNotifications: function(alert) {
        // Browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`SEO Alert: ${alert.message}`, {
                body: alert.details,
                icon: '/assets/images/favicon.ico'
            });
        }
        
        // Console notification
        console.group(`🚨 SEO Alert - ${alert.severity.toUpperCase()}`);
        console.log('Message:', alert.message);
        console.log('Details:', alert.details);
        console.log('Action:', alert.action);
        console.log('Time:', new Date(alert.timestamp).toLocaleString());
        console.groupEnd();
        
        // In production, this would send email/Slack notifications
        if (this.config.emailEnabled) {
            this.sendEmailAlert(alert);
        }
        
        if (this.config.slackEnabled) {
            this.sendSlackAlert(alert);
        }
    },
    
    // Send email alert (placeholder)
    sendEmailAlert: function(alert) {
        console.log('Email alert would be sent:', alert);
    },
    
    // Send Slack alert (placeholder)
    sendSlackAlert: function(alert) {
        console.log('Slack alert would be sent:', alert);
    },
    
    // Generate unique alert ID
    generateAlertId: function() {
        return 'alert_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Calculate percentage change
    calculatePercentageChange: function(current, previous) {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    },
    
    // Get all alerts
    getAllAlerts: function() {
        return JSON.parse(localStorage.getItem('seo_alerts') || '[]');
    },
    
    // Get alerts by severity
    getAlertsBySeverity: function(severity) {
        const alerts = this.getAllAlerts();
        return alerts.filter(alert => alert.severity === severity && !alert.resolved);
    },
    
    // Get recent alerts
    getRecentAlerts: function(hours = 24) {
        const alerts = this.getAllAlerts();
        const cutoffDate = new Date(Date.now() - hours * 60 * 60 * 1000);
        
        return alerts.filter(alert => 
            new Date(alert.timestamp) > cutoffDate && !alert.resolved
        );
    },
    
    // Resolve alert
    resolveAlert: function(alertId) {
        const alerts = this.getAllAlerts();
        const alert = alerts.find(a => a.id === alertId);
        
        if (alert) {
            alert.resolved = true;
            alert.resolvedAt = new Date().toISOString();
            localStorage.setItem('seo_alerts', JSON.stringify(alerts));
        }
    },
    
    // Clean up old alerts
    cleanupOldAlerts: function() {
        const alerts = this.getAllAlerts();
        const filteredAlerts = this.filterAlerts(alerts);
        localStorage.setItem('seo_alerts', JSON.stringify(filteredAlerts));
    },
    
    // Get alert statistics
    getAlertStatistics: function() {
        const alerts = this.getAllAlerts();
        const recentAlerts = this.getRecentAlerts(24);
        
        return {
            total: alerts.length,
            recent: recentAlerts.length,
            high: alerts.filter(a => a.severity === 'high' && !a.resolved).length,
            medium: alerts.filter(a => a.severity === 'medium' && !a.resolved).length,
            low: alerts.filter(a => a.severity === 'low' && !a.resolved).length,
            resolved: alerts.filter(a => a.resolved).length
        };
    },
    
    // Request notification permission
    requestNotificationPermission: function() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                console.log('Notification permission:', permission);
            });
        }
    }
};

// Export for use
window.SEOAlertsSystem = SEOAlertsSystem;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize in production or when explicitly enabled
    if (window.location.hostname === 'hadoop.com.br' || localStorage.getItem('enable_seo_monitoring') === 'true') {
        SEOAlertsSystem.init();
        SEOAlertsSystem.requestNotificationPermission();
    }
});