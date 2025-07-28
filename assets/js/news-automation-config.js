/**
 * News Automation Configuration - Portal Big Data
 * Configuration for automated news feed, trending technologies, and newsletter system
 */

const newsAutomationConfig = {
    // RSS Feed Sources
    rssFeeds: [
        {
            name: 'Apache Foundation',
            url: 'https://blogs.apache.org/foundation/feed/entries/atom',
            logo: 'apache-foundation.png',
            category: 'releases',
            priority: 'high',
            enabled: true
        },
        {
            name: 'Databricks Blog',
            url: 'https://databricks.com/blog/feed',
            logo: 'databricks.png',
            category: 'trends',
            priority: 'medium',
            enabled: true
        },
        {
            name: 'Confluent Blog',
            url: 'https://confluent.io/blog/feed/',
            logo: 'confluent.png',
            category: 'streaming',
            priority: 'medium',
            enabled: true
        },
        {
            name: 'Apache Spark News',
            url: 'https://spark.apache.org/news/index.html',
            logo: 'apache-spark.png',
            category: 'releases',
            priority: 'high',
            enabled: true
        },
        {
            name: 'Apache Kafka Blog',
            url: 'https://kafka.apache.org/blog',
            logo: 'apache-kafka.png',
            category: 'streaming',
            priority: 'medium',
            enabled: true
        }
    ],
    
    // GitHub Repositories to Monitor
    githubRepos: [
        { repo: 'apache/spark', category: 'processing', priority: 'high' },
        { repo: 'apache/flink', category: 'stream-processing', priority: 'high' },
        { repo: 'apache/kafka', category: 'streaming', priority: 'high' },
        { repo: 'delta-io/delta', category: 'table-format', priority: 'medium' },
        { repo: 'apache/iceberg', category: 'table-format', priority: 'medium' },
        { repo: 'dbt-labs/dbt-core', category: 'data-transformation', priority: 'medium' },
        { repo: 'apache/airflow', category: 'orchestration', priority: 'high' },
        { repo: 'ClickHouse/ClickHouse', category: 'analytics-database', priority: 'medium' },
        { repo: 'trinodb/trino', category: 'data-warehousing', priority: 'medium' },
        { repo: 'apache/beam', category: 'processing', priority: 'medium' }
    ],
    
    // Event Sources
    eventSources: [
        {
            name: 'Meetup Big Data',
            url: 'https://api.meetup.com/find/events?topic=big-data',
            type: 'api',
            enabled: true
        },
        {
            name: 'Eventbrite Tech Events',
            url: 'https://www.eventbriteapi.com/v3/events/search/?q=big%20data',
            type: 'api',
            enabled: true
        },
        {
            name: 'Conferences Manual',
            type: 'manual',
            enabled: true
        }
    ],
    
    // Automation Settings
    automation: {
        // News feed refresh intervals (in minutes)
        newsRefreshInterval: 30,
        trendingRefreshInterval: 120, // 2 hours
        eventsRefreshInterval: 360,   // 6 hours
        
        // Newsletter settings
        newsletterGeneration: {
            enabled: true,
            dayOfWeek: 5, // Friday (0 = Sunday)
            hour: 10,     // 10 AM
            timezone: 'America/Sao_Paulo'
        },
        
        // API rate limiting
        rateLimiting: {
            githubApiDelay: 1000,     // 1 second between GitHub API calls
            rssParseDelay: 2000,      // 2 seconds between RSS feed parsing
            maxRetries: 3
        },
        
        // Content filtering
        contentFilters: {
            minTitleLength: 10,
            maxTitleLength: 200,
            minExcerptLength: 50,
            maxExcerptLength: 300,
            excludeKeywords: ['spam', 'advertisement', 'promotion'],
            requiredKeywords: ['data', 'analytics', 'big data', 'spark', 'kafka', 'hadoop']
        }
    },
    
    // Trending Algorithm Configuration
    trendingAlgorithm: {
        weights: {
            githubStars: 0.3,
            jobGrowth: 0.4,
            downloads: 0.2,
            socialMentions: 0.1
        },
        
        thresholds: {
            minStars: 100,
            minJobGrowth: 5,    // 5% minimum growth
            minDownloads: 1000
        },
        
        periods: {
            week: 7,
            month: 30,
            quarter: 90
        }
    },
    
    // Notification Settings
    notifications: {
        enabled: true,
        types: {
            breakingNews: true,
            trendingTech: true,
            newEvents: true,
            systemErrors: true
        },
        
        channels: {
            inApp: true,
            email: false,
            slack: false,
            webhook: false
        }
    },
    
    // Analytics and Monitoring
    analytics: {
        enabled: true,
        trackUserInteractions: true,
        trackPerformance: true,
        trackErrors: true,
        
        metrics: {
            newsViews: true,
            trendingClicks: true,
            eventRegistrations: true,
            newsletterOpens: true,
            newsletterClicks: true
        }
    },
    
    // Development and Debug Settings
    development: {
        debugMode: window.location.hostname === 'localhost',
        mockData: true,
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
        enableTestMode: false
    }
};

// Utility functions for configuration
const configUtils = {
    isEnabled: function(feature) {
        return newsAutomationConfig.automation[feature] !== false;
    },
    
    getRefreshInterval: function(type) {
        const intervals = newsAutomationConfig.automation;
        return intervals[`${type}RefreshInterval`] * 60 * 1000; // Convert to milliseconds
    },
    
    shouldFilterContent: function(title, content) {
        const filters = newsAutomationConfig.automation.contentFilters;
        
        // Check title length
        if (title.length < filters.minTitleLength || title.length > filters.maxTitleLength) {
            return false;
        }
        
        // Check for excluded keywords
        const text = (title + ' ' + content).toLowerCase();
        for (const keyword of filters.excludeKeywords) {
            if (text.includes(keyword)) {
                return false;
            }
        }
        
        // Check for required keywords
        const hasRequiredKeyword = filters.requiredKeywords.some(keyword => 
            text.includes(keyword.toLowerCase())
        );
        
        return hasRequiredKeyword;
    },
    
    getRateLimitDelay: function(apiType) {
        return newsAutomationConfig.automation.rateLimiting[`${apiType}Delay`] || 1000;
    },
    
    log: function(level, message, data = null) {
        const config = newsAutomationConfig.development;
        const levels = ['debug', 'info', 'warn', 'error'];
        const currentLevelIndex = levels.indexOf(config.logLevel);
        const messageLevelIndex = levels.indexOf(level);
        
        if (messageLevelIndex >= currentLevelIndex) {
            const timestamp = new Date().toISOString();
            const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
            
            if (data) {
                console[level](logMessage, data);
            } else {
                console[level](logMessage);
            }
            
            // Store logs for debugging
            if (config.debugMode) {
                const logs = JSON.parse(localStorage.getItem('news-automation-logs') || '[]');
                logs.push({ timestamp, level, message, data });
                
                // Keep only last 100 logs
                if (logs.length > 100) {
                    logs.splice(0, logs.length - 100);
                }
                
                localStorage.setItem('news-automation-logs', JSON.stringify(logs));
            }
        }
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { newsAutomationConfig, configUtils };
}