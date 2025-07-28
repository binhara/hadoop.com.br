/**
 * News and Trends System - Portal Big Data
 * Automated news feed, trending technologies, events, and newsletter system
 * Bootstrap Studio Compatible - Simple JavaScript
 */

// News and trends data structure
const newsTrendsData = {
    breakingNews: [
        {
            id: 'apache-spark-4-0-announcement',
            title: 'Apache Spark 4.0 Anunciado com Suporte Nativo para Python 3.12',
            excerpt: 'A Apache Software Foundation anuncia o Apache Spark 4.0 com melhorias significativas de performance e suporte completo para Python 3.12.',
            content: 'Conteúdo completo da notícia...',
            source: 'Apache Foundation',
            sourceUrl: 'https://spark.apache.org',
            sourceLogo: 'apache-foundation.png',
            publishedDate: '2024-12-20T10:00:00Z',
            category: 'releases',
            tags: ['apache-spark', 'python', 'release', 'performance'],
            priority: 'high',
            trending: true,
            image: 'spark-4-0-announcement.jpg'
        },
        {
            id: 'databricks-lakehouse-summit-2025',
            title: 'Databricks Anuncia Data + AI Summit 2025 em São Paulo',
            excerpt: 'Primeira edição brasileira do maior evento de dados e IA da Databricks acontecerá em março de 2025.',
            content: 'Conteúdo completo da notícia...',
            source: 'Databricks',
            sourceUrl: 'https://databricks.com',
            sourceLogo: 'databricks.png',
            publishedDate: '2024-12-19T14:30:00Z',
            category: 'events',
            tags: ['databricks', 'event', 'brazil', 'ai'],
            priority: 'medium',
            trending: false,
            image: 'databricks-summit-2025.jpg'
        },
        {
            id: 'confluent-kafka-3-7-release',
            title: 'Confluent Kafka 3.7 Lançado com Melhorias de Segurança',
            excerpt: 'Nova versão do Apache Kafka inclui recursos avançados de segurança e otimizações de performance.',
            content: 'Conteúdo completo da notícia...',
            source: 'Confluent',
            sourceUrl: 'https://confluent.io',
            sourceLogo: 'confluent.png',
            publishedDate: '2024-12-18T09:15:00Z',
            category: 'releases',
            tags: ['kafka', 'security', 'confluent', 'streaming'],
            priority: 'medium',
            trending: true,
            image: 'kafka-3-7-release.jpg'
        }
    ],
    
    trendingTechnologies: [
        {
            id: 'apache-iceberg',
            name: 'Apache Iceberg',
            category: 'table-format',
            logo: 'apache-iceberg.png',
            description: 'Table format aberto para grandes datasets analíticos com suporte ACID.',
            trendingScore: 95,
            metrics: {
                githubStars: '5.2k',
                weeklyDownloads: '2.1M',
                jobPostings: '+45%'
            },
            tags: ['table-format', 'analytics', 'acid', 'open-source'],
            reason: 'Crescimento de 45% em vagas de emprego esta semana',
            changePercent: '+12%',
            period: 'week'
        },
        {
            id: 'delta-lake',
            name: 'Delta Lake',
            category: 'table-format',
            logo: 'delta-lake.png',
            description: 'Storage layer que traz confiabilidade para data lakes.',
            trendingScore: 92,
            metrics: {
                githubStars: '6.8k',
                weeklyDownloads: '3.5M',
                jobPostings: '+38%'
            },
            tags: ['lakehouse', 'acid', 'databricks', 'spark'],
            reason: 'Integração com múltiplas engines de processamento',
            changePercent: '+8%',
            period: 'week'
        },
        {
            id: 'apache-flink',
            name: 'Apache Flink',
            category: 'stream-processing',
            logo: 'apache-flink.png',
            description: 'Framework para processamento de streams distribuído.',
            trendingScore: 88,
            metrics: {
                githubStars: '22.1k',
                weeklyDownloads: '1.8M',
                jobPostings: '+28%'
            },
            tags: ['streaming', 'real-time', 'distributed', 'apache'],
            reason: 'Adoção crescente em casos de uso real-time',
            changePercent: '+15%',
            period: 'week'
        },
        {
            id: 'dbt',
            name: 'dbt (data build tool)',
            category: 'data-transformation',
            logo: 'dbt.png',
            description: 'Ferramenta de transformação de dados que permite analytics engineering.',
            trendingScore: 85,
            metrics: {
                githubStars: '8.4k',
                weeklyDownloads: '890k',
                jobPostings: '+52%'
            },
            tags: ['transformation', 'sql', 'analytics-engineering', 'modern-stack'],
            reason: 'Explosão de vagas para Analytics Engineers',
            changePercent: '+22%',
            period: 'week'
        },
        {
            id: 'apache-airflow',
            name: 'Apache Airflow',
            category: 'orchestration',
            logo: 'apache-airflow.png',
            description: 'Plataforma para desenvolver, agendar e monitorar workflows.',
            trendingScore: 82,
            metrics: {
                githubStars: '33.2k',
                weeklyDownloads: '2.7M',
                jobPostings: '+31%'
            },
            tags: ['orchestration', 'workflow', 'python', 'scheduling'],
            reason: 'Padrão de facto para orquestração de dados',
            changePercent: '+5%',
            period: 'week'
        },
        {
            id: 'clickhouse',
            name: 'ClickHouse',
            category: 'analytics-database',
            logo: 'clickhouse.png',
            description: 'DBMS colunar para analytics online (OLAP).',
            trendingScore: 79,
            metrics: {
                githubStars: '33.8k',
                weeklyDownloads: '450k',
                jobPostings: '+67%'
            },
            tags: ['olap', 'analytics', 'columnar', 'performance'],
            reason: 'Performance excepcional em queries analíticas',
            changePercent: '+18%',
            period: 'week'
        }
    ],
    
    upcomingEvents: [
        {
            id: 'strata-data-conference-2025',
            title: 'Strata Data Conference 2025',
            type: 'conference',
            description: 'A maior conferência de dados e IA do mundo, com foco em tecnologias emergentes e casos de uso práticos.',
            date: '2025-03-15',
            endDate: '2025-03-17',
            time: '09:00',
            location: 'São Paulo, Brasil',
            venue: 'Centro de Convenções Frei Caneca',
            isOnline: false,
            isHybrid: true,
            price: 'R$ 1.200',
            registrationUrl: 'https://strataconf.com/strata-sao-paulo',
            organizer: 'O\'Reilly Media',
            speakers: ['Martin Fowler', 'Cassie Kozyrkov', 'DJ Patil'],
            topics: ['Machine Learning', 'Data Engineering', 'AI Ethics'],
            capacity: 2000,
            registered: 1450,
            status: 'upcoming'
        },
        {
            id: 'apache-kafka-meetup-sp',
            title: 'Apache Kafka Meetup São Paulo',
            type: 'meetup',
            description: 'Meetup mensal sobre Apache Kafka com apresentações técnicas e networking.',
            date: '2025-01-25',
            time: '19:00',
            location: 'São Paulo, Brasil',
            venue: 'iFood Headquarters',
            isOnline: false,
            isHybrid: false,
            price: 'Gratuito',
            registrationUrl: 'https://meetup.com/kafka-sp',
            organizer: 'Kafka Community São Paulo',
            speakers: ['Ricardo Silva', 'Ana Costa'],
            topics: ['Kafka Streams', 'Schema Registry', 'Monitoring'],
            capacity: 100,
            registered: 85,
            status: 'upcoming'
        },
        {
            id: 'databricks-webinar-lakehouse',
            title: 'Webinar: Implementando Data Lakehouse com Databricks',
            type: 'webinar',
            description: 'Webinar técnico sobre implementação de arquitetura Data Lakehouse usando Databricks.',
            date: '2025-01-10',
            time: '14:00',
            location: 'Online',
            venue: 'Zoom',
            isOnline: true,
            isHybrid: false,
            price: 'Gratuito',
            registrationUrl: 'https://databricks.com/webinar-lakehouse',
            organizer: 'Databricks Brasil',
            speakers: ['João Santos', 'Maria Oliveira'],
            topics: ['Delta Lake', 'Unity Catalog', 'MLflow'],
            capacity: 500,
            registered: 320,
            status: 'upcoming'
        },
        {
            id: 'big-data-workshop-rio',
            title: 'Workshop: Apache Spark para Iniciantes',
            type: 'workshop',
            description: 'Workshop hands-on de Apache Spark para profissionais iniciantes em Big Data.',
            date: '2025-02-08',
            time: '09:00',
            location: 'Rio de Janeiro, Brasil',
            venue: 'PUC-Rio',
            isOnline: false,
            isHybrid: false,
            price: 'R$ 350',
            registrationUrl: 'https://workshop-spark-rio.com',
            organizer: 'Big Data Academy',
            speakers: ['Carlos Lima', 'Patricia Santos'],
            topics: ['Spark Core', 'DataFrames', 'Spark SQL'],
            capacity: 50,
            registered: 42,
            status: 'upcoming'
        }
    ],
    
    techReleases: [
        {
            id: 'apache-spark-3-5-1',
            name: 'Apache Spark',
            version: '3.5.1',
            releaseType: 'patch',
            category: 'processing',
            logo: 'apache-spark.png',
            releaseDate: '2024-12-18',
            description: 'Patch release com correções de bugs e melhorias de estabilidade.',
            highlights: [
                'Correção de memory leak em Spark Streaming',
                'Melhorias de performance em joins',
                'Suporte aprimorado para Python 3.11',
                'Correções de segurança importantes'
            ],
            downloadUrl: 'https://spark.apache.org/downloads.html',
            changelogUrl: 'https://spark.apache.org/releases/spark-release-3-5-1.html',
            githubUrl: 'https://github.com/apache/spark',
            impactLevel: 'medium'
        },
        {
            id: 'confluent-platform-7-6',
            name: 'Confluent Platform',
            version: '7.6.0',
            releaseType: 'minor',
            category: 'streaming',
            logo: 'confluent.png',
            releaseDate: '2024-12-15',
            description: 'Nova versão com recursos avançados de governança e monitoramento.',
            highlights: [
                'Schema Registry com versionamento aprimorado',
                'Novos conectores para cloud providers',
                'Dashboard de monitoramento redesenhado',
                'Melhorias de performance em Kafka Streams'
            ],
            downloadUrl: 'https://confluent.io/download',
            changelogUrl: 'https://docs.confluent.io/platform/7.6/release-notes.html',
            githubUrl: 'https://github.com/confluentinc/confluent-kafka-python',
            impactLevel: 'high'
        },
        {
            id: 'apache-airflow-2-8-2',
            name: 'Apache Airflow',
            version: '2.8.2',
            releaseType: 'patch',
            category: 'orchestration',
            logo: 'apache-airflow.png',
            releaseDate: '2024-12-12',
            description: 'Patch release com correções importantes e melhorias de UI.',
            highlights: [
                'Correção de bug crítico no scheduler',
                'Melhorias na interface web',
                'Novos operadores para cloud services',
                'Otimizações de performance'
            ],
            downloadUrl: 'https://airflow.apache.org/docs/apache-airflow/stable/installation/',
            changelogUrl: 'https://airflow.apache.org/docs/apache-airflow/stable/release_notes.html',
            githubUrl: 'https://github.com/apache/airflow',
            impactLevel: 'medium'
        }
    ]
};

// System state
let currentTrendingPeriod = 'week';
let currentEventFilter = 'all';
let currentReleaseFilter = 'all';
let newsPage = 1;
const itemsPerPage = 10;

// Initialize news and trends system
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsTrendsSystem();
});

function initializeNewsTrendsSystem() {
    updateHeroStats();
    loadBreakingNews();
    loadTrendingTechnologies();
    loadUpcomingEvents();
    loadTechReleases();
    loadTrendingTopics();
    loadQuickStats();
    loadRecentActivity();
    setupEventListeners();
    
    // Start automated refresh system
    startAutomatedRefresh();
    
    // Initial fetch of real data (optional, can be enabled in production)
    if (window.location.hostname !== 'localhost') {
        fetchLatestNews().then(news => {
            if (news.length > 0) {
                newsTrendsData.breakingNews = news;
                loadBreakingNews();
                updateHeroStats();
            }
        });
        
        fetchTrendingTechnologies().then(trending => {
            if (trending.length > 0) {
                newsTrendsData.trendingTechnologies = trending;
                loadTrendingTechnologies();
            }
        });
    }
}

function setupEventListeners() {
    // Newsletter form
    const newsletterForm = document.getElementById('weekly-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', subscribeWeeklyNewsletter);
    }
}

function updateHeroStats() {
    document.getElementById('total-news').textContent = newsTrendsData.breakingNews.length;
    document.getElementById('trending-techs').textContent = newsTrendsData.trendingTechnologies.length;
    document.getElementById('upcoming-events').textContent = newsTrendsData.upcomingEvents.length;
}

function loadBreakingNews() {
    const container = document.getElementById('breaking-news-feed');
    if (!container) return;
    
    const sortedNews = newsTrendsData.breakingNews
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
        .slice(0, itemsPerPage);
    
    container.innerHTML = sortedNews.map(news => createNewsItem(news)).join('');
}

function createNewsItem(news) {
    const publishedDate = new Date(news.publishedDate);
    const timeAgo = getTimeAgo(publishedDate);
    const priorityClass = news.priority === 'high' ? 'breaking' : news.trending ? 'trending' : '';
    
    return `
        <div class="news-item ${priorityClass} fade-in">
            <div class="news-item-header">
                <div class="news-item-meta">
                    ${news.priority === 'high' ? '<span class="badge bg-danger"><i class="fas fa-bolt me-1"></i>Breaking</span>' : ''}
                    ${news.trending ? '<span class="badge bg-warning text-dark"><i class="fas fa-fire me-1"></i>Trending</span>' : ''}
                    <span class="badge bg-secondary">${getCategoryName(news.category)}</span>
                </div>
            </div>
            
            <h4 class="news-item-title">
                <a href="${news.sourceUrl}" target="_blank" rel="noopener">${news.title}</a>
            </h4>
            
            <p class="news-item-excerpt">${news.excerpt}</p>
            
            <div class="news-item-footer">
                <div class="news-source">
                    <img src="../../assets/images/sources/${news.sourceLogo}" alt="${news.source}" onerror="this.style.display='none'">
                    <span>${news.source}</span>
                </div>
                <div class="news-time">
                    <i class="fas fa-clock me-1"></i>${timeAgo}
                </div>
            </div>
            
            <div class="news-tags mt-2">
                ${news.tags.map(tag => `<span class="badge bg-outline-secondary me-1">#${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

function loadTrendingTechnologies() {
    const container = document.getElementById('trending-technologies');
    if (!container) return;
    
    const filteredTechs = newsTrendsData.trendingTechnologies
        .filter(tech => tech.period === currentTrendingPeriod)
        .sort((a, b) => b.trendingScore - a.trendingScore);
    
    container.innerHTML = filteredTechs.map(tech => createTrendingTechCard(tech)).join('');
}

function createTrendingTechCard(tech) {
    return `
        <div class="trending-tech-card fade-in">
            <div class="trending-tech-header">
                <img src="../../assets/images/technologies/${tech.logo}" alt="${tech.name}" class="trending-tech-logo" onerror="this.style.display='none'">
                <div>
                    <h5 class="trending-tech-name">${tech.name}</h5>
                    <small class="text-muted">${getCategoryName(tech.category)}</small>
                </div>
                <div class="trending-score">${tech.trendingScore}</div>
            </div>
            
            <div class="trending-metrics">
                <div class="trending-metric">
                    <span class="trending-metric-value">${tech.metrics.githubStars}</span>
                    <small class="trending-metric-label">GitHub Stars</small>
                </div>
                <div class="trending-metric">
                    <span class="trending-metric-value">${tech.metrics.weeklyDownloads}</span>
                    <small class="trending-metric-label">Downloads</small>
                </div>
                <div class="trending-metric">
                    <span class="trending-metric-value">${tech.metrics.jobPostings}</span>
                    <small class="trending-metric-label">Vagas</small>
                </div>
            </div>
            
            <p class="trending-tech-description">${tech.description}</p>
            
            <div class="trending-reason mb-3">
                <small class="text-success">
                    <i class="fas fa-arrow-up me-1"></i>${tech.reason}
                </small>
            </div>
            
            <div class="trending-tech-tags">
                ${tech.tags.map(tag => `<span class="trending-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

function loadUpcomingEvents() {
    const container = document.getElementById('events-list');
    if (!container) return;
    
    const filteredEvents = newsTrendsData.upcomingEvents
        .filter(event => currentEventFilter === 'all' || event.type === currentEventFilter)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    container.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');
}

function createEventCard(event) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const isUpcoming = eventDate > new Date();
    const registrationPercentage = Math.round((event.registered / event.capacity) * 100);
    
    return `
        <div class="event-card ${isUpcoming ? 'upcoming' : ''} fade-in">
            <div class="event-header">
                <div>
                    <h5 class="event-title">${event.title}</h5>
                    <span class="event-type">${getEventTypeName(event.type)}</span>
                </div>
            </div>
            
            <div class="event-details">
                <div class="event-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formattedDate}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-clock"></i>
                    <span>${event.time}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-tag"></i>
                    <span>${event.price}</span>
                </div>
            </div>
            
            <p class="event-description">${event.description}</p>
            
            <div class="event-progress mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <small class="text-muted">Inscrições</small>
                    <small class="text-muted">${event.registered}/${event.capacity}</small>
                </div>
                <div class="progress" style="height: 6px;">
                    <div class="progress-bar bg-success" style="width: ${registrationPercentage}%"></div>
                </div>
            </div>
            
            <div class="event-topics mb-3">
                <small class="text-muted">Tópicos: </small>
                ${event.topics.map(topic => `<span class="badge bg-outline-info me-1">${topic}</span>`).join('')}
            </div>
            
            <div class="event-actions">
                <a href="${event.registrationUrl}" target="_blank" class="btn btn-primary btn-sm">
                    <i class="fas fa-external-link-alt me-1"></i>Inscrever-se
                </a>
                <button class="btn btn-outline-secondary btn-sm" onclick="shareEvent('${event.id}')">
                    <i class="fas fa-share me-1"></i>Compartilhar
                </button>
            </div>
        </div>
    `;
}

function loadTechReleases() {
    const container = document.getElementById('tech-releases-list');
    if (!container) return;
    
    const filteredReleases = newsTrendsData.techReleases
        .filter(release => currentReleaseFilter === 'all' || release.category === currentReleaseFilter)
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    
    container.innerHTML = filteredReleases.map(release => createReleaseCard(release)).join('');
}

function createReleaseCard(release) {
    const releaseDate = new Date(release.releaseDate);
    const formattedDate = releaseDate.toLocaleDateString('pt-BR');
    const timeAgo = getTimeAgo(releaseDate);
    
    return `
        <div class="release-card ${release.releaseType} fade-in">
            <div class="release-header">
                <img src="../../assets/images/technologies/${release.logo}" alt="${release.name}" class="release-logo" onerror="this.style.display='none'">
                <div>
                    <h5 class="release-title">${release.name}</h5>
                    <small class="text-muted">${getCategoryName(release.category)}</small>
                </div>
                <div class="release-version">${release.version}</div>
            </div>
            
            <p class="release-description">${release.description}</p>
            
            <div class="release-highlights">
                <h6>Principais melhorias:</h6>
                <ul>
                    ${release.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            
            <div class="release-footer">
                <div class="release-date">
                    <i class="fas fa-calendar me-1"></i>${formattedDate} (${timeAgo})
                </div>
                <div class="release-actions">
                    <a href="${release.downloadUrl}" target="_blank" class="btn btn-success btn-sm me-2">
                        <i class="fas fa-download me-1"></i>Download
                    </a>
                    <a href="${release.changelogUrl}" target="_blank" class="btn btn-outline-info btn-sm">
                        <i class="fas fa-list me-1"></i>Changelog
                    </a>
                </div>
            </div>
        </div>
    `;
}

function loadTrendingTopics() {
    const container = document.getElementById('trending-topics');
    if (!container) return;
    
    // Extract and count topics from all data
    const topicCounts = {};
    
    // From news tags
    newsTrendsData.breakingNews.forEach(news => {
        news.tags.forEach(tag => {
            topicCounts[tag] = (topicCounts[tag] || 0) + 3; // Higher weight for news
        });
    });
    
    // From trending tech tags
    newsTrendsData.trendingTechnologies.forEach(tech => {
        tech.tags.forEach(tag => {
            topicCounts[tag] = (topicCounts[tag] || 0) + 2; // Medium weight for trending tech
        });
    });
    
    // From event topics
    newsTrendsData.upcomingEvents.forEach(event => {
        event.topics.forEach(topic => {
            const normalizedTopic = topic.toLowerCase().replace(/\s+/g, '-');
            topicCounts[normalizedTopic] = (topicCounts[normalizedTopic] || 0) + 1;
        });
    });
    
    const sortedTopics = Object.entries(topicCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 12);
    
    container.innerHTML = sortedTopics.map(([topic, count]) => `
        <a href="#" class="trending-topic" onclick="searchByTopic('${topic}')">
            ${topic}
            <span class="topic-count">${count}</span>
        </a>
    `).join('');
}

function loadQuickStats() {
    const container = document.getElementById('quick-stats');
    if (!container) return;
    
    const stats = [
        {
            label: 'Notícias hoje',
            value: '12',
            change: '+3',
            positive: true
        },
        {
            label: 'Tecnologias trending',
            value: newsTrendsData.trendingTechnologies.length,
            change: '+2',
            positive: true
        },
        {
            label: 'Eventos esta semana',
            value: '8',
            change: '+1',
            positive: true
        },
        {
            label: 'Novos releases',
            value: newsTrendsData.techReleases.length,
            change: '+5',
            positive: true
        }
    ];
    
    container.innerHTML = stats.map(stat => `
        <div class="stat-item">
            <span class="stat-label">${stat.label}</span>
            <div>
                <span class="stat-value">${stat.value}</span>
                <span class="stat-change ${stat.positive ? 'positive' : 'negative'}">
                    <i class="fas fa-arrow-${stat.positive ? 'up' : 'down'}"></i>${stat.change}
                </span>
            </div>
        </div>
    `).join('');
}

function loadRecentActivity() {
    const container = document.getElementById('recent-activity');
    if (!container) return;
    
    const activities = [
        {
            text: 'Nova versão do <span class="activity-highlight">Apache Spark 4.0</span> anunciada',
            time: '2h atrás'
        },
        {
            text: '<span class="activity-highlight">Delta Lake</span> subiu 12% no trending',
            time: '4h atrás'
        },
        {
            text: 'Evento <span class="activity-highlight">Strata Data Conference</span> adicionado',
            time: '6h atrás'
        },
        {
            text: '<span class="activity-highlight">ClickHouse</span> teve 67% mais vagas esta semana',
            time: '8h atrás'
        },
        {
            text: 'Novo release do <span class="activity-highlight">Confluent Platform 7.6</span>',
            time: '1d atrás'
        }
    ];
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-time">${activity.time}</div>
            <div class="activity-text">${activity.text}</div>
        </div>
    `).join('');
}

// Event handlers
function updateTrendingPeriod() {
    const select = document.getElementById('trending-period');
    currentTrendingPeriod = select.value;
    loadTrendingTechnologies();
}

// Enhanced automated news feed system
async function fetchLatestNews() {
    try {
        configUtils.log('info', 'Fetching latest news from RSS feeds');
        
        const newsPromises = newsAutomationConfig.rssFeeds
            .filter(feed => feed.enabled)
            .map(async (feed) => {
                try {
                    // In a real implementation, this would parse RSS feeds
                    // For now, return mock data with realistic structure
                    await new Promise(resolve => setTimeout(resolve, configUtils.getRateLimitDelay('rss')));
                    
                    return {
                        id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        title: `Nova atualização em ${feed.name}`,
                        excerpt: `Últimas novidades e atualizações importantes de ${feed.name}.`,
                        content: 'Conteúdo completo da notícia...',
                        source: feed.name,
                        sourceUrl: feed.url,
                        sourceLogo: feed.logo,
                        publishedDate: new Date().toISOString(),
                        category: feed.category,
                        tags: ['news', 'update', feed.category],
                        priority: feed.priority,
                        trending: Math.random() > 0.7
                    };
                } catch (error) {
                    configUtils.log('error', `Error fetching from ${feed.name}`, error);
                    return null;
                }
            });
        
        const newsResults = await Promise.all(newsPromises);
        const validNews = newsResults.filter(news => news !== null);
        
        configUtils.log('info', `Fetched ${validNews.length} news items`);
        return validNews;
        
    } catch (error) {
        configUtils.log('error', 'Error in fetchLatestNews', error);
        return [];
    }
}

// Enhanced trending technologies fetching
async function fetchTrendingTechnologies() {
    try {
        configUtils.log('info', 'Fetching trending technologies from GitHub');
        
        const trendingPromises = newsAutomationConfig.githubRepos.map(async (repoConfig) => {
            try {
                await new Promise(resolve => setTimeout(resolve, configUtils.getRateLimitDelay('githubApi')));
                
                // Mock GitHub API response - in real implementation, use GitHub API
                const mockMetrics = {
                    stars: Math.floor(Math.random() * 50000) + 1000,
                    forks: Math.floor(Math.random() * 10000) + 100,
                    issues: Math.floor(Math.random() * 500) + 10,
                    weeklyDownloads: Math.floor(Math.random() * 1000000) + 10000,
                    jobGrowth: Math.floor(Math.random() * 50) + 5
                };
                
                const trendingScore = calculateTrendingScore(mockMetrics);
                
                if (trendingScore >= 70) { // Only include if trending score is high enough
                    return {
                        id: repoConfig.repo.replace('/', '-'),
                        name: repoConfig.repo.split('/')[1],
                        category: repoConfig.category,
                        logo: `${repoConfig.repo.split('/')[1]}.png`,
                        description: `Advanced ${repoConfig.category} technology`,
                        trendingScore: trendingScore,
                        metrics: {
                            githubStars: formatNumber(mockMetrics.stars),
                            weeklyDownloads: formatNumber(mockMetrics.weeklyDownloads),
                            jobPostings: `+${mockMetrics.jobGrowth}%`
                        },
                        tags: [repoConfig.category, 'open-source', 'trending'],
                        reason: `${mockMetrics.jobGrowth}% crescimento em vagas`,
                        changePercent: `+${Math.floor(Math.random() * 20) + 5}%`,
                        period: 'week'
                    };
                }
                return null;
            } catch (error) {
                configUtils.log('error', `Error fetching ${repoConfig.repo}`, error);
                return null;
            }
        });
        
        const trendingResults = await Promise.all(trendingPromises);
        const validTrending = trendingResults.filter(tech => tech !== null);
        
        configUtils.log('info', `Found ${validTrending.length} trending technologies`);
        return validTrending;
        
    } catch (error) {
        configUtils.log('error', 'Error in fetchTrendingTechnologies', error);
        return [];
    }
}

// Calculate trending score based on multiple metrics
function calculateTrendingScore(metrics) {
    const weights = newsAutomationConfig.trendingAlgorithm.weights;
    const normalizedStars = Math.min(metrics.stars / 10000, 1) * 100;
    const normalizedDownloads = Math.min(metrics.weeklyDownloads / 1000000, 1) * 100;
    
    return Math.round(
        (normalizedStars * weights.githubStars) +
        (metrics.jobGrowth * weights.jobGrowth) +
        (normalizedDownloads * weights.downloads) +
        (50 * weights.socialMentions) // Mock social mentions
    );
}

// Enhanced event fetching system
async function fetchUpcomingEvents() {
    try {
        configUtils.log('info', 'Fetching upcoming events');
        
        // Mock event fetching - in real implementation, integrate with Meetup/Eventbrite APIs
        const mockEvents = [
            {
                id: `event-${Date.now()}-1`,
                title: 'Big Data Summit 2025',
                type: 'conference',
                description: 'Maior evento de Big Data do Brasil com palestrantes internacionais.',
                date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                time: '09:00',
                location: 'São Paulo, Brasil',
                venue: 'Centro de Convenções',
                isOnline: false,
                isHybrid: true,
                price: 'R$ 800',
                registrationUrl: 'https://bigdatasummit.com.br',
                organizer: 'Big Data Community',
                speakers: ['Expert 1', 'Expert 2'],
                topics: ['Machine Learning', 'Data Engineering'],
                capacity: 1000,
                registered: Math.floor(Math.random() * 800) + 100,
                status: 'upcoming'
            },
            {
                id: `event-${Date.now()}-2`,
                title: 'Apache Kafka Workshop Online',
                type: 'workshop',
                description: 'Workshop prático sobre Apache Kafka para iniciantes e intermediários.',
                date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                time: '14:00',
                location: 'Online',
                venue: 'Zoom',
                isOnline: true,
                isHybrid: false,
                price: 'Gratuito',
                registrationUrl: 'https://kafka-workshop.com',
                organizer: 'Apache Community',
                speakers: ['Kafka Expert'],
                topics: ['Streaming', 'Real-time Processing'],
                capacity: 200,
                registered: Math.floor(Math.random() * 150) + 50,
                status: 'upcoming'
            }
        ];
        
        configUtils.log('info', `Fetched ${mockEvents.length} upcoming events`);
        return mockEvents;
        
    } catch (error) {
        configUtils.log('error', 'Error in fetchUpcomingEvents', error);
        return [];
    }
}

// Newsletter subscription handler
function subscribeWeeklyNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const preferences = {
        breakingNews: form.querySelector('#breaking-news-alerts')?.checked || false,
        trendingTech: form.querySelector('#trending-tech-alerts')?.checked || false,
        eventReminders: form.querySelector('#event-reminders')?.checked || false
    };
    
    // Mock subscription - in real implementation, save to database
    const subscription = {
        email: email,
        preferences: preferences,
        subscribedAt: new Date().toISOString(),
        status: 'active'
    };
    
    // Save to localStorage for demo
    const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
    subscribers.push(subscription);
    localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
    
    // Show success message
    showNotification('Inscrição realizada com sucesso! Você receberá nossa newsletter semanal.', 'success');
    
    // Reset form
    form.reset();
    
    configUtils.log('info', 'New newsletter subscription', { email, preferences });
}

// Manual newsletter generation
function generateNewsletterManually() {
    const button = document.getElementById('generate-newsletter-btn');
    if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Gerando...';
        button.disabled = true;
        
        try {
            const newsletter = newsletterGenerator.generateWeeklyNewsletter();
            const html = newsletterGenerator.generateNewsletterHTML(newsletter);
            
            // Show preview in modal or new window
            showNewsletterPreview(newsletter, html);
            
            showNotification('Newsletter gerada com sucesso!', 'success');
            configUtils.log('info', 'Manual newsletter generation completed', newsletter.title);
            
        } catch (error) {
            showNotification('Erro ao gerar newsletter. Tente novamente.', 'error');
            configUtils.log('error', 'Error in manual newsletter generation', error);
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }
}

// Show newsletter preview
function showNewsletterPreview(newsletter, html) {
    // Create modal or open in new window
    const previewWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview: ${newsletter.title}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="../../assets/css/matrix-theme.css" rel="stylesheet">
        </head>
        <body class="matrix-theme">
            <div class="container mt-4">
                <div class="alert alert-info">
                    <strong>Preview da Newsletter:</strong> ${newsletter.title}
                </div>
                ${html}
            </div>
        </body>
        </html>
    `);
    previewWindow.document.close();
}

// Automated refresh system
function startAutomatedRefresh() {
    if (!newsAutomationConfig.automation.newsRefreshInterval) return;
    
    // Refresh news feed
    setInterval(async () => {
        try {
            const latestNews = await fetchLatestNews();
            if (latestNews.length > 0) {
                // Merge with existing news, avoiding duplicates
                const existingIds = new Set(newsTrendsData.breakingNews.map(news => news.id));
                const newNews = latestNews.filter(news => !existingIds.has(news.id));
                
                if (newNews.length > 0) {
                    newsTrendsData.breakingNews = [...newNews, ...newsTrendsData.breakingNews].slice(0, 50);
                    loadBreakingNews();
                    updateHeroStats();
                    
                    if (newsAutomationConfig.notifications.enabled) {
                        showNotification(`${newNews.length} novas notícias adicionadas!`, 'info');
                    }
                }
            }
        } catch (error) {
            configUtils.log('error', 'Error in automated news refresh', error);
        }
    }, configUtils.getRefreshInterval('news'));
    
    // Refresh trending technologies
    setInterval(async () => {
        try {
            const latestTrending = await fetchTrendingTechnologies();
            if (latestTrending.length > 0) {
                newsTrendsData.trendingTechnologies = latestTrending;
                loadTrendingTechnologies();
            }
        } catch (error) {
            configUtils.log('error', 'Error in automated trending refresh', error);
        }
    }, configUtils.getRefreshInterval('trending'));
    
    // Refresh events
    setInterval(async () => {
        try {
            const latestEvents = await fetchUpcomingEvents();
            if (latestEvents.length > 0) {
                newsTrendsData.upcomingEvents = latestEvents;
                loadUpcomingEvents();
                updateHeroStats();
            }
        } catch (error) {
            configUtils.log('error', 'Error in automated events refresh', error);
        }
    }, configUtils.getRefreshInterval('events'));
    
    configUtils.log('info', 'Automated refresh system started');
}

// Utility functions
function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'agora mesmo';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min atrás`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
}

function getCategoryName(category) {
    const categories = {
        'releases': 'Releases',
        'events': 'Eventos',
        'trends': 'Tendências',
        'processing': 'Processamento',
        'streaming': 'Streaming',
        'table-format': 'Table Format',
        'data-transformation': 'Transformação',
        'orchestration': 'Orquestração',
        'analytics-database': 'Analytics DB',
        'data-warehousing': 'Data Warehouse',
        'lakehouse': 'Lakehouse',
        'stream-processing': 'Stream Processing'
    };
    return categories[category] || category;
}

function getEventTypeName(type) {
    const types = {
        'conference': 'Conferência',
        'webinar': 'Webinar',
        'workshop': 'Workshop',
        'meetup': 'Meetup'
    };
    return types[type] || type;
}

function formatNumber(num) {
    if (typeof num === 'string') return num;
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function shareEvent(eventId) {
    const event = newsTrendsData.upcomingEvents.find(e => e.id === eventId);
    if (!event) return;
    
    const shareText = `Confira este evento: ${event.title} - ${event.date}`;
    const shareUrl = `${window.location.origin}/blog/novidades/#event-${eventId}`;
    
    if (navigator.share) {
        navigator.share({
            title: event.title,
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            showNotification('Link copiado para a área de transferência!', 'success');
        });
    }
}

function searchByTopic(topic) {
    // Redirect to search with topic filter
    const searchUrl = `${window.location.origin}/buscar.html?q=${encodeURIComponent(topic)}`;
    window.location.href = searchUrl;
}

function loadMoreContent() {
    newsPage++;
    const container = document.querySelector('.tab-pane.show.active .news-feed, .tab-pane.show.active .trending-grid, .tab-pane.show.active .events-container, .tab-pane.show.active .releases-container');
    
    if (container) {
        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'text-center p-3';
        loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Carregando mais conteúdo...';
        container.appendChild(loadingDiv);
        
        // Simulate loading delay
        setTimeout(() => {
            loadingDiv.remove();
            
            // Load more content based on active tab
            const activeTab = document.querySelector('.nav-link.active').id;
            switch (activeTab) {
                case 'breaking-tab':
                    loadMoreNews();
                    break;
                case 'trending-tab':
                    loadMoreTrending();
                    break;
                case 'events-tab':
                    loadMoreEvents();
                    break;
                case 'releases-tab':
                    loadMoreReleases();
                    break;
            }
        }, 1000);
    }
}

function loadMoreNews() {
    // Mock loading more news
    const additionalNews = [
        {
            id: `news-more-${Date.now()}`,
            title: 'Apache Hadoop 4.0 em Desenvolvimento',
            excerpt: 'Nova versão major do Hadoop está sendo desenvolvida com foco em cloud-native.',
            source: 'Apache Foundation',
            sourceUrl: 'https://hadoop.apache.org',
            sourceLogo: 'apache-hadoop.png',
            publishedDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            category: 'releases',
            tags: ['hadoop', 'development', 'cloud-native'],
            priority: 'medium',
            trending: false
        }
    ];
    
    newsTrendsData.breakingNews.push(...additionalNews);
    loadBreakingNews();
}

function loadMoreTrending() {
    // Mock loading more trending technologies
    const additionalTrending = [
        {
            id: 'trino',
            name: 'Trino',
            category: 'data-warehousing',
            logo: 'trino.png',
            description: 'Fast distributed SQL query engine for big data analytics.',
            trendingScore: 75,
            metrics: {
                githubStars: '8.2k',
                weeklyDownloads: '450k',
                jobPostings: '+25%'
            },
            tags: ['sql', 'analytics', 'distributed'],
            reason: 'Crescimento em adoção empresarial',
            changePercent: '+10%',
            period: 'week'
        }
    ];
    
    newsTrendsData.trendingTechnologies.push(...additionalTrending);
    loadTrendingTechnologies();
}

function loadMoreEvents() {
    // Mock loading more events
    const additionalEvents = [
        {
            id: `event-more-${Date.now()}`,
            title: 'Data Engineering Meetup Online',
            type: 'meetup',
            description: 'Meetup mensal sobre Data Engineering com foco em ferramentas modernas.',
            date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            time: '19:00',
            location: 'Online',
            venue: 'Google Meet',
            isOnline: true,
            isHybrid: false,
            price: 'Gratuito',
            registrationUrl: 'https://meetup.com/data-engineering',
            organizer: 'Data Engineering Community',
            speakers: ['Data Expert'],
            topics: ['Data Engineering', 'Modern Stack'],
            capacity: 300,
            registered: 150,
            status: 'upcoming'
        }
    ];
    
    newsTrendsData.upcomingEvents.push(...additionalEvents);
    loadUpcomingEvents();
}

function loadMoreReleases() {
    // Mock loading more releases
    const additionalReleases = [
        {
            id: 'apache-beam-2-53',
            name: 'Apache Beam',
            version: '2.53.0',
            releaseType: 'minor',
            category: 'processing',
            logo: 'apache-beam.png',
            releaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: 'Nova versão com melhorias de performance e novos conectores.',
            highlights: [
                'Novos conectores para cloud databases',
                'Melhorias de performance em batch processing',
                'Suporte aprimorado para Python 3.11'
            ],
            downloadUrl: 'https://beam.apache.org/get-started/downloads/',
            changelogUrl: 'https://beam.apache.org/releases/',
            githubUrl: 'https://github.com/apache/beam',
            impactLevel: 'medium'
        }
    ];
    
    newsTrendsData.techReleases.push(...additionalReleases);
    loadTechReleases();
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize enhanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize newsletter scheduling if enabled
    if (typeof scheduleAutomatedNewsletter === 'function' && 
        newsAutomationConfig.automation.newsletterGeneration.enabled) {
        scheduleAutomatedNewsletter();
    }
    
    // Set up real-time updates
    if (newsAutomationConfig.automation.enabled !== false) {
        startAutomatedRefresh();
    }
    
    // Initialize analytics tracking
    if (newsAutomationConfig.analytics.enabled) {
        initializeAnalyticsTracking();
    }
});

// Analytics tracking initialization
function initializeAnalyticsTracking() {
    // Track page views
    if (newsAutomationConfig.analytics.metrics.newsViews) {
        trackPageView('news-trends');
    }
    
    // Track user interactions
    if (newsAutomationConfig.analytics.trackUserInteractions) {
        setupInteractionTracking();
    }
}

function trackPageView(page) {
    const analytics = {
        page: page,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    // Save to localStorage (in production, send to analytics service)
    const pageViews = JSON.parse(localStorage.getItem('page-views') || '[]');
    pageViews.unshift(analytics);
    
    if (pageViews.length > 1000) {
        pageViews.splice(1000);
    }
    
    localStorage.setItem('page-views', JSON.stringify(pageViews));
}

function setupInteractionTracking() {
    // Track clicks on news items
    document.addEventListener('click', function(event) {
        const newsItem = event.target.closest('.news-item');
        if (newsItem) {
            trackInteraction('news-click', {
                newsId: newsItem.dataset.newsId || 'unknown',
                timestamp: new Date().toISOString()
            });
        }
        
        // Track clicks on trending tech cards
        const trendingCard = event.target.closest('.trending-tech-card');
        if (trendingCard) {
            trackInteraction('trending-click', {
                techId: trendingCard.dataset.techId || 'unknown',
                timestamp: new Date().toISOString()
            });
        }
        
        // Track event registration clicks
        const eventButton = event.target.closest('.event-actions .btn-primary');
        if (eventButton) {
            trackInteraction('event-registration-click', {
                eventId: eventButton.closest('.event-card').dataset.eventId || 'unknown',
                timestamp: new Date().toISOString()
            });
        }
    });
}

function trackInteraction(type, data) {
    const interactions = JSON.parse(localStorage.getItem('user-interactions') || '[]');
    interactions.unshift({ type, ...data });
    
    if (interactions.length > 500) {
        interactions.splice(500);
    }
    
    localStorage.setItem('user-interactions', JSON.stringify(interactions));
    
    if (newsAutomationConfig.development.debugMode) {
        configUtils.log('debug', `Interaction tracked: ${type}`, data);
    }
}

function filterEvents() {
    const select = document.getElementById('event-type-filter');
    currentEventFilter = select.value;
    loadUpcomingEvents();
}

function filterReleases() {
    const select = document.getElementById('release-category');
    currentReleaseFilter = select.value;
    loadTechReleases();
}

function refreshNewsFeed() {
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Atualizando...';
    button.disabled = true;
    
    // Fetch real news data from multiple sources
    fetchLatestNews().then(newsData => {
        if (newsData && newsData.length > 0) {
            // Update news data with fresh content
            newsTrendsData.breakingNews = newsData;
            loadBreakingNews();
            updateHeroStats();
            
            button.innerHTML = originalText;
            button.disabled = false;
            
            showNotification(`${newsData.length} novas notícias carregadas!`, 'success');
        } else {
            button.innerHTML = originalText;
            button.disabled = false;
            showNotification('Nenhuma nova notícia encontrada.', 'info');
        }
    }).catch(error => {
        console.error('Error fetching news:', error);
        button.innerHTML = originalText;
        button.disabled = false;
        showNotification('Erro ao atualizar feed. Tente novamente.', 'error');
    });
}

function loadMoreContent() {
    const button = document.getElementById('load-more-btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Carregando...';
    button.disabled = true;
    
    // Simulate loading more content
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        showNotification('Mais conteúdo carregado!', 'info');
    }, 1000);
}

function subscribeWeeklyNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const breakingNews = form.querySelector('#breaking-news-alerts').checked;
    const trendingTech = form.querySelector('#trending-tech-alerts').checked;
    const eventReminders = form.querySelector('#event-reminders').checked;
    
    // Simple validation
    if (!email || !email.includes('@')) {
        showNotification('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Inscrevendo...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Newsletter subscription:', {
            email,
            preferences: {
                breakingNews,
                trendingTech,
                eventReminders
            }
        });
        
        button.innerHTML = '<i class="fas fa-check me-2"></i>Inscrito!';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        
        showNotification('Inscrição realizada com sucesso! Você receberá um e-mail de confirmação.', 'success');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.classList.remove('btn-success');
            button.classList.add('btn-primary');
            form.reset();
        }, 3000);
    }, 2000);
}

function shareEvent(eventId) {
    const event = newsTrendsData.upcomingEvents.find(e => e.id === eventId);
    if (!event) return;
    
    const url = event.registrationUrl;
    const text = `${event.title} - ${event.description}`;
    
    if (navigator.share) {
        navigator.share({
            title: event.title,
            text: text,
            url: url
        });
    } else {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link do evento copiado!', 'success');
        });
    }
}

function searchByTopic(topic) {
    // Redirect to main blog with topic filter
    window.location.href = `../index.html?tag=${encodeURIComponent(topic)}`;
}

// Automated News Feed Functions
async function fetchLatestNews() {
    try {
        const newsFeeds = [
            {
                name: 'Apache Foundation',
                url: 'https://blogs.apache.org/foundation/feed/entries/atom',
                logo: 'apache-foundation.png',
                category: 'releases'
            },
            {
                name: 'Databricks Blog',
                url: 'https://databricks.com/blog/feed',
                logo: 'databricks.png',
                category: 'trends'
            },
            {
                name: 'Confluent Blog',
                url: 'https://confluent.io/blog/feed/',
                logo: 'confluent.png',
                category: 'streaming'
            }
        ];
        
        const allNews = [];
        
        for (const feed of newsFeeds) {
            try {
                const feedNews = await fetchRSSFeed(feed);
                allNews.push(...feedNews);
            } catch (error) {
                console.warn(`Failed to fetch from ${feed.name}:`, error);
            }
        }
        
        // Sort by date and return latest 20 items
        return allNews
            .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
            .slice(0, 20);
            
    } catch (error) {
        console.error('Error fetching latest news:', error);
        return [];
    }
}

async function fetchRSSFeed(feedConfig) {
    try {
        // Use RSS2JSON service for CORS-free RSS parsing
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedConfig.url)}&api_key=YOUR_API_KEY&count=10`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.status !== 'ok') {
            throw new Error(`RSS feed error: ${data.message}`);
        }
        
        return data.items.map(item => ({
            id: generateNewsId(item.title),
            title: item.title,
            excerpt: stripHtml(item.description).substring(0, 200) + '...',
            content: item.description,
            source: feedConfig.name,
            sourceUrl: item.link,
            sourceLogo: feedConfig.logo,
            publishedDate: new Date(item.pubDate).toISOString(),
            category: feedConfig.category,
            tags: extractTags(item.title + ' ' + item.description),
            priority: determinePriority(item.title, item.description),
            trending: isTrending(item.title, item.description),
            image: extractImageFromContent(item.description) || 'default-news.jpg'
        }));
        
    } catch (error) {
        console.error(`Error fetching RSS feed ${feedConfig.name}:`, error);
        return [];
    }
}

async function fetchTrendingTechnologies() {
    try {
        const technologies = [
            'apache/spark',
            'apache/flink',
            'apache/kafka',
            'delta-io/delta',
            'apache/iceberg',
            'dbt-labs/dbt-core',
            'apache/airflow',
            'ClickHouse/ClickHouse'
        ];
        
        const trendingData = [];
        
        for (const repo of technologies) {
            try {
                const repoData = await fetchGitHubMetrics(repo);
                const jobData = await fetchJobTrends(repo.split('/')[1]);
                const downloadData = await fetchDownloadMetrics(repo.split('/')[1]);
                
                trendingData.push({
                    id: repo.split('/')[1].toLowerCase(),
                    name: formatTechName(repo.split('/')[1]),
                    category: determineTechCategory(repo.split('/')[1]),
                    logo: `${repo.split('/')[1].toLowerCase()}.png`,
                    description: repoData.description || 'No description available',
                    trendingScore: calculateTrendingScore(repoData, jobData, downloadData),
                    metrics: {
                        githubStars: formatNumber(repoData.stars),
                        weeklyDownloads: formatNumber(downloadData.weekly),
                        jobPostings: `${jobData.changePercent > 0 ? '+' : ''}${jobData.changePercent}%`
                    },
                    tags: extractTechTags(repoData.topics || []),
                    reason: generateTrendingReason(repoData, jobData, downloadData),
                    changePercent: `${jobData.changePercent > 0 ? '+' : ''}${jobData.changePercent}%`,
                    period: 'week'
                });
                
            } catch (error) {
                console.warn(`Failed to fetch data for ${repo}:`, error);
            }
        }
        
        return trendingData.sort((a, b) => b.trendingScore - a.trendingScore);
        
    } catch (error) {
        console.error('Error fetching trending technologies:', error);
        return newsTrendsData.trendingTechnologies; // Fallback to static data
    }
}

async function fetchGitHubMetrics(repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        const data = await response.json();
        
        return {
            stars: data.stargazers_count,
            forks: data.forks_count,
            issues: data.open_issues_count,
            description: data.description,
            topics: data.topics || [],
            language: data.language,
            updatedAt: data.updated_at
        };
    } catch (error) {
        console.error(`Error fetching GitHub metrics for ${repo}:`, error);
        return { stars: 0, forks: 0, issues: 0 };
    }
}

async function fetchJobTrends(technology) {
    // Mock implementation - in production, integrate with job APIs like Indeed, LinkedIn
    const mockTrends = {
        'spark': { changePercent: 12, totalJobs: 1250 },
        'flink': { changePercent: 15, totalJobs: 890 },
        'kafka': { changePercent: 8, totalJobs: 2100 },
        'delta': { changePercent: 22, totalJobs: 650 },
        'iceberg': { changePercent: 45, totalJobs: 320 },
        'dbt-core': { changePercent: 52, totalJobs: 1800 },
        'airflow': { changePercent: 5, totalJobs: 3200 },
        'ClickHouse': { changePercent: 18, totalJobs: 450 }
    };
    
    return mockTrends[technology] || { changePercent: 0, totalJobs: 0 };
}

async function fetchDownloadMetrics(technology) {
    // Mock implementation - in production, integrate with NPM, PyPI, Maven Central APIs
    const mockDownloads = {
        'spark': { weekly: 2100000, monthly: 8500000 },
        'flink': { weekly: 1800000, monthly: 7200000 },
        'kafka': { weekly: 3500000, monthly: 14000000 },
        'delta': { weekly: 890000, monthly: 3600000 },
        'iceberg': { weekly: 650000, monthly: 2600000 },
        'dbt-core': { weekly: 890000, monthly: 3600000 },
        'airflow': { weekly: 2700000, monthly: 10800000 },
        'ClickHouse': { weekly: 450000, monthly: 1800000 }
    };
    
    return mockDownloads[technology] || { weekly: 0, monthly: 0 };
}

async function fetchUpcomingEvents() {
    try {
        // In production, integrate with event APIs like Eventbrite, Meetup, etc.
        const eventSources = [
            'https://www.meetup.com/api/events?category=tech&topic=big-data',
            'https://eventbrite.com/api/v3/events/search/?q=big%20data',
            'https://conferences.oreilly.com/api/events?topic=data'
        ];
        
        // For now, return enhanced static data with real-time updates
        const events = newsTrendsData.upcomingEvents.map(event => ({
            ...event,
            registered: event.registered + Math.floor(Math.random() * 10), // Simulate registration updates
            lastUpdated: new Date().toISOString()
        }));
        
        return events.sort((a, b) => new Date(a.date) - new Date(b.date));
        
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        return newsTrendsData.upcomingEvents;
    }
}

// Utility functions for automated feeds
function generateNewsId(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
}

function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

function extractTags(text) {
    const keywords = [
        'apache', 'spark', 'flink', 'kafka', 'hadoop', 'delta', 'iceberg',
        'databricks', 'confluent', 'airflow', 'python', 'scala', 'java',
        'streaming', 'batch', 'ml', 'ai', 'analytics', 'cloud', 'aws',
        'azure', 'gcp', 'kubernetes', 'docker'
    ];
    
    const foundTags = [];
    const lowerText = text.toLowerCase();
    
    keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
            foundTags.push(keyword);
        }
    });
    
    return foundTags.slice(0, 5); // Limit to 5 tags
}

function determinePriority(title, description) {
    const highPriorityKeywords = ['release', 'announcement', 'breaking', 'major', 'security'];
    const text = (title + ' ' + description).toLowerCase();
    
    for (const keyword of highPriorityKeywords) {
        if (text.includes(keyword)) {
            return 'high';
        }
    }
    
    return 'medium';
}

function isTrending(title, description) {
    const trendingKeywords = ['trending', 'popular', 'growing', 'adoption', 'new'];
    const text = (title + ' ' + description).toLowerCase();
    
    return trendingKeywords.some(keyword => text.includes(keyword));
}

function extractImageFromContent(content) {
    const imgRegex = /<img[^>]+src="([^">]+)"/i;
    const match = content.match(imgRegex);
    return match ? match[1] : null;
}

function formatTechName(name) {
    const nameMap = {
        'spark': 'Apache Spark',
        'flink': 'Apache Flink',
        'kafka': 'Apache Kafka',
        'delta': 'Delta Lake',
        'iceberg': 'Apache Iceberg',
        'dbt-core': 'dbt (data build tool)',
        'airflow': 'Apache Airflow',
        'ClickHouse': 'ClickHouse'
    };
    
    return nameMap[name] || name;
}

function determineTechCategory(name) {
    const categoryMap = {
        'spark': 'processing',
        'flink': 'stream-processing',
        'kafka': 'streaming',
        'delta': 'table-format',
        'iceberg': 'table-format',
        'dbt-core': 'data-transformation',
        'airflow': 'orchestration',
        'ClickHouse': 'analytics-database'
    };
    
    return categoryMap[name] || 'processing';
}

function calculateTrendingScore(repoData, jobData, downloadData) {
    const starScore = Math.min(repoData.stars / 1000, 50); // Max 50 points for stars
    const jobScore = Math.max(jobData.changePercent, 0); // Job growth percentage
    const downloadScore = Math.min(downloadData.weekly / 100000, 30); // Max 30 points for downloads
    
    return Math.round(starScore + jobScore + downloadScore);
}

function extractTechTags(topics) {
    return topics.slice(0, 4); // Limit to 4 tags
}

function generateTrendingReason(repoData, jobData, downloadData) {
    if (jobData.changePercent > 30) {
        return `+${jobData.changePercent}% em vagas de emprego`;
    } else if (downloadData.weekly > 2000000) {
        return 'Alto volume de downloads semanais';
    } else if (repoData.stars > 20000) {
        return 'Projeto muito popular no GitHub';
    } else {
        return 'Crescimento consistente na comunidade';
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Automated refresh system
function startAutomatedRefresh() {
    // Refresh news every 30 minutes
    setInterval(async () => {
        try {
            const latestNews = await fetchLatestNews();
            if (latestNews.length > 0) {
                newsTrendsData.breakingNews = latestNews;
                loadBreakingNews();
                updateHeroStats();
                console.log('News feed automatically updated');
            }
        } catch (error) {
            console.error('Automated news refresh failed:', error);
        }
    }, 30 * 60 * 1000); // 30 minutes
    
    // Refresh trending technologies every 2 hours
    setInterval(async () => {
        try {
            const trendingTech = await fetchTrendingTechnologies();
            if (trendingTech.length > 0) {
                newsTrendsData.trendingTechnologies = trendingTech;
                loadTrendingTechnologies();
                console.log('Trending technologies automatically updated');
            }
        } catch (error) {
            console.error('Automated trending refresh failed:', error);
        }
    }, 2 * 60 * 60 * 1000); // 2 hours
    
    // Refresh events every 6 hours
    setInterval(async () => {
        try {
            const events = await fetchUpcomingEvents();
            if (events.length > 0) {
                newsTrendsData.upcomingEvents = events;
                loadUpcomingEvents();
                console.log('Events automatically updated');
            }
        } catch (error) {
            console.error('Automated events refresh failed:', error);
        }
    }, 6 * 60 * 60 * 1000); // 6 hours
}

// Utility functions
function getTimeAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    
    if (diffMinutes < 60) {
        return `${diffMinutes} min atrás`;
    } else if (diffHours < 24) {
        return `${diffHours}h atrás`;
    } else if (diffDays === 1) {
        return 'ontem';
    } else if (diffDays < 7) {
        return `${diffDays} dias atrás`;
    } else {
        return date.toLocaleDateString('pt-BR');
    }
}

function getCategoryName(category) {
    const categories = {
        'releases': 'Releases',
        'events': 'Eventos',
        'table-format': 'Table Format',
        'stream-processing': 'Stream Processing',
        'data-transformation': 'Transformação',
        'orchestration': 'Orquestração',
        'analytics-database': 'Analytics DB',
        'processing': 'Processamento',
        'streaming': 'Streaming',
        'storage': 'Armazenamento',
        'ml': 'Machine Learning'
    };
    return categories[category] || category;
}

function getEventTypeName(type) {
    const types = {
        'conference': 'Conferência',
        'webinar': 'Webinar',
        'workshop': 'Workshop',
        'meetup': 'Meetup'
    };
    return types[type] || type;
}

function generateNewsletterManually() {
    const button = document.getElementById('generate-newsletter-btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Gerando...';
    button.disabled = true;
    
    try {
        // Generate newsletter using the newsletter generator
        if (typeof newsletterGenerator !== 'undefined') {
            const newsletter = newsletterGenerator.generateWeeklyNewsletter();
            const html = newsletterGenerator.generateNewsletterHTML(newsletter);
            
            // Create a modal or new window to show the newsletter
            showNewsletterPreview(newsletter, html);
            
            button.innerHTML = originalText;
            button.disabled = false;
            
            showNotification('Newsletter gerada com sucesso!', 'success');
        } else {
            throw new Error('Newsletter generator not available');
        }
    } catch (error) {
        console.error('Error generating newsletter:', error);
        button.innerHTML = originalText;
        button.disabled = false;
        showNotification('Erro ao gerar newsletter. Tente novamente.', 'error');
    }
}

function showNewsletterPreview(newsletter, html) {
    // Create modal to show newsletter preview
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'newsletter-preview-modal';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h5 class="modal-title text-success">
                        <i class="fas fa-envelope me-2"></i>Preview da Newsletter
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <strong>Título:</strong> ${newsletter.title}<br>
                        <strong>Período:</strong> ${newsletter.weekStart.toLocaleDateString('pt-BR')} - ${newsletter.weekEnd.toLocaleDateString('pt-BR')}<br>
                        <strong>Gerada em:</strong> ${newsletter.generatedAt.toLocaleString('pt-BR')}
                    </div>
                    <div class="newsletter-preview-content" style="max-height: 500px; overflow-y: auto;">
                        ${html}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="downloadNewsletter()">
                        <i class="fas fa-download me-1"></i>Download HTML
                    </button>
                    <button type="button" class="btn btn-success" onclick="sendNewsletterTest()">
                        <i class="fas fa-paper-plane me-1"></i>Enviar Teste
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Remove modal when hidden
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function downloadNewsletter() {
    if (typeof newsletterGenerator !== 'undefined') {
        const newsletter = newsletterGenerator.generateWeeklyNewsletter();
        const html = newsletterGenerator.generateNewsletterHTML(newsletter);
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-${newsletter.id}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Newsletter baixada com sucesso!', 'success');
    }
}

function sendNewsletterTest() {
    // Mock test email sending
    showNotification('Função de teste de email será implementada em produção.', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}