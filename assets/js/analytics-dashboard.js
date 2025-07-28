/**
 * Google Analytics 4 Dashboard Configuration
 * Portal Big Data - Custom Metrics and Reports
 */

const DASHBOARD_CONFIG = {
    // Key Performance Indicators (KPIs)
    kpis: {
        user_journey_distribution: {
            name: 'Distribuição de Jornadas do Usuário',
            description: 'Percentual de usuários que escolhem Entrar vs Sair do Hadoop',
            metric: 'pill_selection',
            dimensions: ['pill_type'],
            goal: 'Equilibrar interesse entre as duas jornadas'
        },
        
        technology_engagement: {
            name: 'Engajamento com Tecnologias',
            description: 'Páginas de tecnologia mais visitadas e tempo de permanência',
            metric: 'technology_view',
            dimensions: ['technology_name', 'category'],
            goal: 'Identificar tecnologias de maior interesse'
        },
        
        course_conversion_rate: {
            name: 'Taxa de Conversão de Cursos',
            description: 'Percentual de visualizações que resultam em inscrições',
            metric: 'course_enrollment',
            dimensions: ['course_name', 'course_level'],
            goal: 'Otimizar descrições e ofertas de cursos'
        },
        
        newsletter_signup_rate: {
            name: 'Taxa de Inscrição Newsletter',
            description: 'Conversão de visitantes em assinantes da newsletter',
            metric: 'newsletter_signup_complete',
            dimensions: ['interest_area'],
            goal: 'Aumentar base de assinantes qualificados'
        },
        
        partner_referral_effectiveness: {
            name: 'Efetividade de Referências de Parceiros',
            description: 'Cliques em banners e conteúdo patrocinado por parceiro',
            metric: 'partner_referral',
            dimensions: ['partner_name', 'banner_position'],
            goal: 'Maximizar ROI para parceiros'
        },
        
        search_behavior: {
            name: 'Comportamento de Busca',
            description: 'Termos mais buscados e taxa de sucesso das buscas',
            metric: 'search',
            dimensions: ['search_term'],
            goal: 'Melhorar relevância do conteúdo'
        }
    },
    
    // Custom reports configuration
    reports: {
        user_journey_analysis: {
            name: 'Análise de Jornada do Usuário',
            description: 'Fluxo completo desde a landing page até conversões',
            events: ['page_view', 'pill_selection', 'technology_view', 'course_interest', 'newsletter_signup'],
            segments: ['new_users', 'returning_users'],
            timeframe: '30_days'
        },
        
        content_performance: {
            name: 'Performance de Conteúdo',
            description: 'Análise de engajamento por tipo de conteúdo',
            events: ['page_view', 'scroll', 'technology_view', 'sponsored_content_view'],
            dimensions: ['content_category', 'content_source'],
            metrics: ['engagement_rate', 'bounce_rate', 'session_duration']
        },
        
        partner_roi_report: {
            name: 'ROI de Parceiros',
            description: 'Retorno sobre investimento para conteúdo patrocinado',
            events: ['sponsored_content_view', 'banner_click', 'partner_referral'],
            dimensions: ['partner_name', 'content_type'],
            calculations: ['click_through_rate', 'conversion_rate', 'revenue_attribution']
        },
        
        technology_trends: {
            name: 'Tendências de Tecnologias',
            description: 'Tecnologias em alta e declínio de interesse',
            events: ['technology_view', 'search'],
            dimensions: ['technology_name', 'category'],
            timeComparison: 'month_over_month'
        },
        
        course_funnel_analysis: {
            name: 'Análise de Funil de Cursos',
            description: 'Jornada desde descoberta até inscrição em cursos',
            events: ['course_interest', 'course_enrollment'],
            funnel_steps: ['course_view', 'course_details', 'enrollment_start', 'enrollment_complete'],
            conversion_goals: ['course_enrollment']
        }
    },
    
    // Automated alerts configuration
    alerts: {
        low_engagement: {
            name: 'Baixo Engajamento',
            condition: 'engagement_rate < 0.3',
            frequency: 'daily',
            recipients: ['admin@hadoop.com.br'],
            action: 'Review content strategy'
        },
        
        high_bounce_rate: {
            name: 'Alta Taxa de Rejeição',
            condition: 'bounce_rate > 0.7',
            frequency: 'weekly',
            recipients: ['admin@hadoop.com.br'],
            action: 'Optimize landing pages'
        },
        
        newsletter_conversion_drop: {
            name: 'Queda na Conversão Newsletter',
            condition: 'newsletter_signup_rate < previous_week * 0.8',
            frequency: 'weekly',
            recipients: ['marketing@hadoop.com.br'],
            action: 'Review newsletter offer'
        },
        
        partner_performance_decline: {
            name: 'Declínio Performance Parceiros',
            condition: 'partner_click_rate < previous_month * 0.9',
            frequency: 'monthly',
            recipients: ['partnerships@hadoop.com.br'],
            action: 'Review partner content and placement'
        }
    },
    
    // Data Studio dashboard templates
    dataStudioTemplates: {
        executive_dashboard: {
            name: 'Dashboard Executivo',
            url: 'https://datastudio.google.com/reporting/create?c.reportId=EXECUTIVE_TEMPLATE',
            widgets: [
                'total_users',
                'user_journey_distribution',
                'top_technologies',
                'conversion_rates',
                'partner_performance'
            ],
            updateFrequency: 'real_time'
        },
        
        content_manager_dashboard: {
            name: 'Dashboard Gestor de Conteúdo',
            url: 'https://datastudio.google.com/reporting/create?c.reportId=CONTENT_TEMPLATE',
            widgets: [
                'page_views_by_content',
                'engagement_metrics',
                'search_terms',
                'technology_trends',
                'content_gaps'
            ],
            updateFrequency: 'daily'
        },
        
        marketing_dashboard: {
            name: 'Dashboard Marketing',
            url: 'https://datastudio.google.com/reporting/create?c.reportId=MARKETING_TEMPLATE',
            widgets: [
                'acquisition_channels',
                'conversion_funnels',
                'newsletter_performance',
                'social_sharing',
                'campaign_attribution'
            ],
            updateFrequency: 'hourly'
        },
        
        partner_dashboard: {
            name: 'Dashboard Parceiros',
            url: 'https://datastudio.google.com/reporting/create?c.reportId=PARTNER_TEMPLATE',
            widgets: [
                'sponsored_content_views',
                'banner_performance',
                'referral_traffic',
                'conversion_attribution',
                'roi_metrics'
            ],
            updateFrequency: 'daily'
        }
    }
};

// Dashboard utility functions
const DashboardUtils = {
    // Generate custom report URLs
    generateReportUrl: function(reportType, dateRange = '30daysAgo', dimensions = [], metrics = []) {
        const baseUrl = 'https://analytics.google.com/analytics/web/#/report/';
        const reportId = DASHBOARD_CONFIG.reports[reportType]?.id || 'custom';
        
        const params = new URLSearchParams({
            '_r.drilldown': dimensions.join(','),
            '_r.tabId': reportId,
            '_u.date00': dateRange,
            '_u.date01': 'today'
        });
        
        return `${baseUrl}${reportId}/?${params.toString()}`;
    },
    
    // Create custom segments
    createSegment: function(segmentName, conditions) {
        return {
            name: segmentName,
            definition: conditions,
            type: 'custom',
            created: new Date().toISOString()
        };
    },
    
    // Calculate conversion rates
    calculateConversionRate: function(conversions, totalSessions) {
        return totalSessions > 0 ? (conversions / totalSessions * 100).toFixed(2) : 0;
    },
    
    // Generate automated insights
    generateInsights: function(data) {
        const insights = [];
        
        // User journey insights
        if (data.pill_selections) {
            const redPillPercent = (data.pill_selections.red / data.pill_selections.total * 100).toFixed(1);
            const bluePillPercent = (data.pill_selections.blue / data.pill_selections.total * 100).toFixed(1);
            
            insights.push({
                type: 'user_journey',
                title: 'Distribuição de Jornadas',
                description: `${redPillPercent}% escolhem "Entrar no Hadoop", ${bluePillPercent}% escolhem "Sair do Hadoop"`,
                recommendation: redPillPercent > 70 ? 'Considere promover mais conteúdo sobre alternativas' : 
                               bluePillPercent > 70 ? 'Considere promover mais conteúdo introdutório sobre Hadoop' : 
                               'Distribuição equilibrada - mantenha estratégia atual'
            });
        }
        
        // Technology trends insights
        if (data.technology_views) {
            const topTech = Object.keys(data.technology_views).sort((a, b) => 
                data.technology_views[b] - data.technology_views[a]
            )[0];
            
            insights.push({
                type: 'technology_trends',
                title: 'Tecnologia Mais Popular',
                description: `${topTech} é a tecnologia mais visualizada`,
                recommendation: `Considere criar mais conteúdo sobre ${topTech} e tecnologias relacionadas`
            });
        }
        
        return insights;
    }
};

// Export dashboard configuration
window.PortalDashboard = {
    config: DASHBOARD_CONFIG,
    utils: DashboardUtils
};