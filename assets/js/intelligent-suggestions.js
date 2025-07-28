/**
 * Portal Big Data - Intelligent Suggestions System
 * Implements content recommendation and learning path suggestions
 */

class IntelligentSuggestions {
    constructor() {
        this.userInteractions = this.loadUserInteractions();
        this.contentRelationships = this.buildContentRelationships();
        this.learningPaths = this.defineLearningPaths();
        this.init();
    }

    /**
     * Initialize the suggestions system
     */
    init() {
        this.trackPageView();
        this.renderSuggestions();
        this.setupEventListeners();
    }

    /**
     * Load user interactions from localStorage
     */
    loadUserInteractions() {
        const stored = localStorage.getItem('portalBigData_userInteractions');
        return stored ? JSON.parse(stored) : {
            viewedPages: [],
            searchQueries: [],
            clickedSuggestions: [],
            enrolledCourses: [],
            preferences: {
                level: null,
                categories: [],
                technologies: []
            }
        };
    }

    /**
     * Save user interactions to localStorage
     */
    saveUserInteractions() {
        localStorage.setItem('portalBigData_userInteractions', JSON.stringify(this.userInteractions));
    }

    /**
     * Track current page view
     */
    trackPageView() {
        const currentPage = {
            url: window.location.pathname,
            timestamp: Date.now(),
            type: this.getPageType(),
            category: this.getPageCategory(),
            technology: this.getPageTechnology()
        };

        // Add to viewed pages (keep last 50)
        this.userInteractions.viewedPages.unshift(currentPage);
        this.userInteractions.viewedPages = this.userInteractions.viewedPages.slice(0, 50);

        // Update user preferences based on viewing patterns
        this.updateUserPreferences(currentPage);
        
        this.saveUserInteractions();
    }

    /**
     * Get page type from URL
     */
    getPageType() {
        const path = window.location.pathname;
        if (path.includes('/tecnologias/')) return 'technology';
        if (path.includes('/cursos/')) return 'course';
        if (path.includes('/blog/')) return 'article';
        if (path.includes('/entrar-hadoop/')) return 'hadoop-entry';
        if (path.includes('/sair-hadoop/')) return 'hadoop-exit';
        return 'other';
    }

    /**
     * Get page category from URL
     */
    getPageCategory() {
        const path = window.location.pathname;
        const categories = [
            'sistemas-arquivos', 'processamento', 'data-warehousing', 
            'streaming', 'machine-learning', 'orquestracao', 'visualizacao'
        ];
        
        for (const category of categories) {
            if (path.includes(category)) return category;
        }
        return null;
    }

    /**
     * Get technology from URL or page content
     */
    getPageTechnology() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s);
        
        if (segments.length >= 3 && segments[0] === 'tecnologias') {
            return segments[2]; // technology slug
        }
        return null;
    }

    /**
     * Update user preferences based on viewing patterns
     */
    updateUserPreferences(currentPage) {
        if (currentPage.category) {
            const categories = this.userInteractions.preferences.categories;
            const existing = categories.find(c => c.name === currentPage.category);
            
            if (existing) {
                existing.count++;
                existing.lastViewed = currentPage.timestamp;
            } else {
                categories.push({
                    name: currentPage.category,
                    count: 1,
                    lastViewed: currentPage.timestamp
                });
            }
        }

        if (currentPage.technology) {
            const technologies = this.userInteractions.preferences.technologies;
            const existing = technologies.find(t => t.name === currentPage.technology);
            
            if (existing) {
                existing.count++;
                existing.lastViewed = currentPage.timestamp;
            } else {
                technologies.push({
                    name: currentPage.technology,
                    count: 1,
                    lastViewed: currentPage.timestamp
                });
            }
        }
    }

    /**
     * Build content relationships matrix
     */
    buildContentRelationships() {
        return {
            // Technology relationships
            'apache-spark': {
                related: ['apache-flink', 'databricks', 'delta-lake', 'apache-kafka'],
                alternatives: ['apache-flink', 'apache-storm', 'ray'],
                complements: ['delta-lake', 'apache-kafka', 'apache-airflow'],
                prerequisites: ['hadoop-fundamentals'],
                nextSteps: ['delta-lake-mastery', 'spark-streaming-advanced']
            },
            'apache-kafka': {
                related: ['apache-flink', 'kafka-streams', 'confluent', 'apache-pulsar'],
                alternatives: ['apache-pulsar', 'amazon-kinesis', 'google-pubsub'],
                complements: ['apache-spark', 'apache-flink', 'apache-storm'],
                prerequisites: ['distributed-systems-basics'],
                nextSteps: ['kafka-streams-mastery', 'event-driven-architecture']
            },
            'delta-lake': {
                related: ['apache-spark', 'apache-iceberg', 'databricks'],
                alternatives: ['apache-iceberg', 'apache-hudi'],
                complements: ['apache-spark', 'trino', 'apache-superset'],
                prerequisites: ['apache-spark-fundamentals'],
                nextSteps: ['lakehouse-architecture', 'data-governance']
            },
            'apache-hadoop': {
                related: ['hdfs', 'mapreduce', 'apache-hive', 'apache-pig'],
                alternatives: ['apache-spark', 'delta-lake', 'kubernetes'],
                complements: ['apache-hive', 'apache-pig', 'apache-oozie'],
                prerequisites: ['distributed-systems-basics'],
                nextSteps: ['hadoop-to-spark-migration', 'modern-data-stack']
            },
            'clickhouse': {
                related: ['apache-superset', 'grafana', 'trino'],
                alternatives: ['apache-druid', 'apache-pinot', 'snowflake'],
                complements: ['apache-kafka', 'apache-superset', 'grafana'],
                prerequisites: ['sql-advanced', 'olap-concepts'],
                nextSteps: ['real-time-analytics', 'data-warehouse-optimization']
            },
            'apache-airflow': {
                related: ['prefect', 'dagster', 'luigi'],
                alternatives: ['prefect', 'dagster', 'apache-oozie'],
                complements: ['apache-spark', 'dbt', 'kubernetes'],
                prerequisites: ['python-intermediate', 'workflow-concepts'],
                nextSteps: ['advanced-orchestration', 'mlops-pipelines']
            }
        };
    }

    /**
     * Define learning paths for different user journeys
     */
    defineLearningPaths() {
        return {
            'hadoop-beginner': {
                name: 'Iniciante em Hadoop',
                description: 'Caminho completo para aprender Hadoop do zero',
                steps: [
                    { id: 'big-data-concepts', title: 'Conceitos de Big Data', type: 'article' },
                    { id: 'hadoop-fundamentals', title: 'Hadoop Fundamentals', type: 'course' },
                    { id: 'hdfs-basics', title: 'HDFS Básico', type: 'technology' },
                    { id: 'mapreduce-intro', title: 'Introdução ao MapReduce', type: 'technology' },
                    { id: 'hadoop-ecosystem-overview', title: 'Hadoop Ecosystem Overview', type: 'course' },
                    { id: 'apache-hive', title: 'Apache Hive', type: 'technology' },
                    { id: 'hadoop-administration', title: 'Administração Hadoop', type: 'course' }
                ]
            },
            'hadoop-to-modern': {
                name: 'Migração para Tecnologias Modernas',
                description: 'Caminho para migrar de Hadoop para stacks modernas',
                steps: [
                    { id: 'modern-alternatives-overview', title: 'Alternativas Modernas ao Hadoop', type: 'course' },
                    { id: 'apache-spark', title: 'Apache Spark', type: 'technology' },
                    { id: 'delta-lake', title: 'Delta Lake', type: 'technology' },
                    { id: 'migration-strategies', title: 'Estratégias de Migração', type: 'course' },
                    { id: 'kubernetes', title: 'Kubernetes para Big Data', type: 'technology' },
                    { id: 'cloud-native-data', title: 'Arquiteturas Cloud-Native', type: 'course' }
                ]
            },
            'streaming-specialist': {
                name: 'Especialista em Streaming',
                description: 'Torne-se especialista em processamento de dados em tempo real',
                steps: [
                    { id: 'streaming-concepts', title: 'Conceitos de Streaming', type: 'article' },
                    { id: 'apache-kafka', title: 'Apache Kafka', type: 'technology' },
                    { id: 'kafka-streams', title: 'Kafka Streams', type: 'technology' },
                    { id: 'apache-flink', title: 'Apache Flink', type: 'technology' },
                    { id: 'real-time-analytics', title: 'Analytics em Tempo Real', type: 'course' },
                    { id: 'event-driven-architecture', title: 'Arquitetura Orientada a Eventos', type: 'course' }
                ]
            },
            'data-engineer': {
                name: 'Engenheiro de Dados Completo',
                description: 'Caminho completo para se tornar engenheiro de dados',
                steps: [
                    { id: 'data-engineering-fundamentals', title: 'Fundamentos de Engenharia de Dados', type: 'course' },
                    { id: 'apache-spark', title: 'Apache Spark', type: 'technology' },
                    { id: 'apache-airflow', title: 'Apache Airflow', type: 'technology' },
                    { id: 'delta-lake', title: 'Delta Lake', type: 'technology' },
                    { id: 'data-quality', title: 'Qualidade de Dados', type: 'course' },
                    { id: 'data-governance', title: 'Governança de Dados', type: 'course' },
                    { id: 'mlops', title: 'MLOps', type: 'course' }
                ]
            }
        };
    }

    /**
     * Generate content recommendations based on current page and user history
     */
    generateRecommendations() {
        const currentPage = this.getCurrentPageInfo();
        const recommendations = [];

        // 1. Related technologies based on current technology
        if (currentPage.type === 'technology' && currentPage.technology) {
            const related = this.getRelatedTechnologies(currentPage.technology);
            recommendations.push(...related.map(tech => ({
                type: 'related-technology',
                title: tech.title,
                description: tech.description,
                url: tech.url,
                category: tech.category,
                reason: 'Tecnologia relacionada',
                score: 0.9
            })));
        }

        // 2. Next steps in learning path
        const nextSteps = this.getNextStepsInLearningPath(currentPage);
        recommendations.push(...nextSteps);

        // 3. Popular content in same category
        if (currentPage.category) {
            const popular = this.getPopularInCategory(currentPage.category);
            recommendations.push(...popular);
        }

        // 4. Personalized recommendations based on user history
        const personalized = this.getPersonalizedRecommendations();
        recommendations.push(...personalized);

        // 5. Course recommendations based on viewed technologies
        const courseRecs = this.getCourseRecommendations();
        recommendations.push(...courseRecs);

        // Sort by score and remove duplicates
        return this.deduplicateAndSort(recommendations);
    }

    /**
     * Get current page information
     */
    getCurrentPageInfo() {
        return {
            type: this.getPageType(),
            category: this.getPageCategory(),
            technology: this.getPageTechnology(),
            url: window.location.pathname
        };
    }

    /**
     * Get related technologies for a given technology
     */
    getRelatedTechnologies(technologyId) {
        const relationships = this.contentRelationships[technologyId];
        if (!relationships) return [];

        const related = [];
        
        // Add related technologies
        if (relationships.related) {
            relationships.related.forEach(relatedId => {
                const tech = this.findTechnologyById(relatedId);
                if (tech) {
                    related.push({
                        ...tech,
                        reason: 'Tecnologia relacionada',
                        score: 0.9
                    });
                }
            });
        }

        // Add alternatives
        if (relationships.alternatives) {
            relationships.alternatives.forEach(altId => {
                const tech = this.findTechnologyById(altId);
                if (tech) {
                    related.push({
                        ...tech,
                        reason: 'Alternativa similar',
                        score: 0.8
                    });
                }
            });
        }

        // Add complements
        if (relationships.complements) {
            relationships.complements.forEach(compId => {
                const tech = this.findTechnologyById(compId);
                if (tech) {
                    related.push({
                        ...tech,
                        reason: 'Tecnologia complementar',
                        score: 0.85
                    });
                }
            });
        }

        return related;
    }

    /**
     * Find technology by ID in search index
     */
    findTechnologyById(id) {
        if (typeof searchIndex !== 'undefined' && searchIndex.technologies) {
            return searchIndex.technologies.find(tech => tech.id === id);
        }
        return null;
    }

    /**
     * Get next steps in learning path
     */
    getNextStepsInLearningPath(currentPage) {
        const nextSteps = [];
        
        // Determine user's likely learning path
        const userPath = this.inferUserLearningPath();
        
        if (userPath) {
            const pathSteps = this.learningPaths[userPath].steps;
            const currentStepIndex = this.findCurrentStepIndex(pathSteps, currentPage);
            
            if (currentStepIndex >= 0 && currentStepIndex < pathSteps.length - 1) {
                const nextStep = pathSteps[currentStepIndex + 1];
                const nextStepContent = this.findContentById(nextStep.id, nextStep.type);
                
                if (nextStepContent) {
                    nextSteps.push({
                        type: 'next-step',
                        title: nextStepContent.title,
                        description: nextStepContent.description,
                        url: nextStepContent.url,
                        reason: 'Próximo passo no aprendizado',
                        score: 0.95,
                        pathName: this.learningPaths[userPath].name
                    });
                }
            }
        }

        return nextSteps;
    }

    /**
     * Infer user's learning path based on viewing history
     */
    inferUserLearningPath() {
        const viewedPages = this.userInteractions.viewedPages;
        const pathScores = {};

        // Score each path based on viewed content
        Object.keys(this.learningPaths).forEach(pathId => {
            pathScores[pathId] = 0;
            const pathSteps = this.learningPaths[pathId].steps;
            
            pathSteps.forEach(step => {
                const viewed = viewedPages.find(page => 
                    page.url.includes(step.id) || 
                    (step.type === 'technology' && page.technology === step.id)
                );
                if (viewed) {
                    pathScores[pathId] += 1;
                }
            });
        });

        // Return path with highest score
        const bestPath = Object.keys(pathScores).reduce((a, b) => 
            pathScores[a] > pathScores[b] ? a : b
        );

        return pathScores[bestPath] > 0 ? bestPath : 'data-engineer'; // default path
    }

    /**
     * Find current step index in learning path
     */
    findCurrentStepIndex(pathSteps, currentPage) {
        return pathSteps.findIndex(step => {
            if (step.type === 'technology' && currentPage.technology === step.id) {
                return true;
            }
            if (currentPage.url.includes(step.id)) {
                return true;
            }
            return false;
        });
    }

    /**
     * Find content by ID and type
     */
    findContentById(id, type) {
        if (typeof searchIndex === 'undefined') return null;

        switch (type) {
            case 'technology':
                return searchIndex.technologies?.find(tech => tech.id === id);
            case 'course':
                return searchIndex.courses?.find(course => course.id === id);
            case 'article':
                return searchIndex.articles?.find(article => article.id === id);
            default:
                return null;
        }
    }

    /**
     * Get popular content in category
     */
    getPopularInCategory(category) {
        if (typeof searchIndex === 'undefined') return [];

        const popular = [];
        
        // Get trending technologies in category
        const categoryTechs = searchIndex.technologies?.filter(tech => 
            tech.category === category && tech.trending
        ) || [];

        categoryTechs.slice(0, 3).forEach(tech => {
            popular.push({
                type: 'popular-in-category',
                title: tech.title,
                description: tech.description,
                url: tech.url,
                category: tech.category,
                reason: 'Popular na categoria',
                score: 0.7
            });
        });

        return popular;
    }

    /**
     * Get personalized recommendations based on user preferences
     */
    getPersonalizedRecommendations() {
        const recommendations = [];
        const preferences = this.userInteractions.preferences;

        // Recommend based on most viewed categories
        const topCategories = preferences.categories
            .sort((a, b) => b.count - a.count)
            .slice(0, 2);

        topCategories.forEach(categoryPref => {
            if (typeof searchIndex !== 'undefined' && searchIndex.technologies) {
                const categoryTechs = searchIndex.technologies
                    .filter(tech => tech.category === categoryPref.name)
                    .filter(tech => !this.hasUserViewed(tech.id))
                    .slice(0, 2);

                categoryTechs.forEach(tech => {
                    recommendations.push({
                        type: 'personalized',
                        title: tech.title,
                        description: tech.description,
                        url: tech.url,
                        category: tech.category,
                        reason: 'Baseado no seu interesse em ' + categoryPref.name,
                        score: 0.75
                    });
                });
            }
        });

        return recommendations;
    }

    /**
     * Check if user has viewed a technology
     */
    hasUserViewed(technologyId) {
        return this.userInteractions.viewedPages.some(page => 
            page.technology === technologyId
        );
    }

    /**
     * Get course recommendations based on viewed technologies
     */
    getCourseRecommendations() {
        const recommendations = [];
        const viewedTechnologies = this.getViewedTechnologies();

        if (typeof searchIndex !== 'undefined' && searchIndex.courses) {
            viewedTechnologies.forEach(tech => {
                // Find courses that mention this technology
                const relatedCourses = searchIndex.courses.filter(course =>
                    course.technologies?.some(courseTech => 
                        courseTech.toLowerCase().includes(tech.toLowerCase()) ||
                        tech.toLowerCase().includes(courseTech.toLowerCase())
                    )
                );

                relatedCourses.slice(0, 1).forEach(course => {
                    if (!this.hasUserEnrolled(course.id)) {
                        recommendations.push({
                            type: 'course-recommendation',
                            title: course.title,
                            description: course.description,
                            url: course.url,
                            category: course.category,
                            reason: `Baseado no seu interesse em ${tech}`,
                            score: 0.8,
                            level: course.level,
                            duration: course.duration
                        });
                    }
                });
            });
        }

        return recommendations;
    }

    /**
     * Get list of technologies user has viewed
     */
    getViewedTechnologies() {
        return this.userInteractions.preferences.technologies
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(tech => tech.name);
    }

    /**
     * Check if user has enrolled in a course
     */
    hasUserEnrolled(courseId) {
        return this.userInteractions.enrolledCourses.includes(courseId);
    }

    /**
     * Remove duplicates and sort recommendations by score
     */
    deduplicateAndSort(recommendations) {
        const seen = new Set();
        const unique = recommendations.filter(rec => {
            const key = rec.url || rec.title;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        return unique
            .sort((a, b) => b.score - a.score)
            .slice(0, 8); // Limit to top 8 recommendations
    }

    /**
     * Render suggestions in the UI
     */
    renderSuggestions() {
        const recommendations = this.generateRecommendations();
        
        // Render in sidebar if exists
        this.renderSidebarSuggestions(recommendations.slice(0, 4));
        
        // Render in dedicated suggestions section if exists
        this.renderMainSuggestions(recommendations);
        
        // Render next steps if exists
        this.renderNextSteps(recommendations.filter(r => r.type === 'next-step'));
    }

    /**
     * Render suggestions in sidebar
     */
    renderSidebarSuggestions(recommendations) {
        const container = document.getElementById('intelligent-suggestions');
        if (!container || recommendations.length === 0) return;

        const html = `
            <div class="card">
                <div class="card-header">
                    <h6 class="mb-0">🎯 Sugestões para Você</h6>
                </div>
                <div class="card-body">
                    ${recommendations.map(rec => `
                        <div class="suggestion-item mb-3" data-suggestion-id="${rec.title}">
                            <a href="${rec.url}" class="text-decoration-none suggestion-link">
                                <h6 class="mb-1 text-success">${rec.title}</h6>
                                <p class="small mb-1 text-muted">${rec.description}</p>
                                <small class="text-info">💡 ${rec.reason}</small>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.attachSuggestionClickHandlers();
    }

    /**
     * Render main suggestions section
     */
    renderMainSuggestions(recommendations) {
        const container = document.getElementById('main-suggestions');
        if (!container || recommendations.length === 0) return;

        const html = `
            <div class="row">
                <div class="col-12">
                    <h4 class="mb-4">🎯 Recomendações Personalizadas</h4>
                </div>
                ${recommendations.map(rec => `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card h-100 suggestion-card" data-suggestion-id="${rec.title}">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <span class="badge bg-info">${this.getTypeLabel(rec.type)}</span>
                                    ${rec.score ? `<small class="text-muted">${Math.round(rec.score * 100)}% match</small>` : ''}
                                </div>
                                <h6 class="card-title">${rec.title}</h6>
                                <p class="card-text small">${rec.description}</p>
                                <div class="mt-auto">
                                    <small class="text-info d-block mb-2">💡 ${rec.reason}</small>
                                    <a href="${rec.url}" class="btn btn-outline-success btn-sm suggestion-link">
                                        Ver ${rec.type === 'course-recommendation' ? 'Curso' : 'Conteúdo'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
        this.attachSuggestionClickHandlers();
    }

    /**
     * Render next steps section
     */
    renderNextSteps(nextSteps) {
        const container = document.getElementById('next-steps');
        if (!container || nextSteps.length === 0) return;

        const html = `
            <div class="alert alert-success">
                <h6 class="alert-heading">🚀 Próximos Passos no seu Aprendizado</h6>
                ${nextSteps.map(step => `
                    <div class="mt-3">
                        <strong>${step.title}</strong>
                        <p class="mb-2">${step.description}</p>
                        <small class="text-muted">Caminho: ${step.pathName}</small>
                        <div class="mt-2">
                            <a href="${step.url}" class="btn btn-success btn-sm suggestion-link" data-suggestion-id="${step.title}">
                                Continuar Aprendizado
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
        this.attachSuggestionClickHandlers();
    }

    /**
     * Get human-readable type label
     */
    getTypeLabel(type) {
        const labels = {
            'related-technology': 'Tecnologia',
            'next-step': 'Próximo Passo',
            'popular-in-category': 'Popular',
            'personalized': 'Para Você',
            'course-recommendation': 'Curso'
        };
        return labels[type] || 'Conteúdo';
    }

    /**
     * Attach click handlers to suggestion links
     */
    attachSuggestionClickHandlers() {
        document.querySelectorAll('.suggestion-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const suggestionId = e.target.closest('[data-suggestion-id]')?.dataset.suggestionId;
                if (suggestionId) {
                    this.trackSuggestionClick(suggestionId, link.href);
                }
            });
        });
    }

    /**
     * Track suggestion clicks for improving recommendations
     */
    trackSuggestionClick(suggestionId, url) {
        this.userInteractions.clickedSuggestions.push({
            suggestionId,
            url,
            timestamp: Date.now()
        });

        // Keep only last 100 clicks
        this.userInteractions.clickedSuggestions = 
            this.userInteractions.clickedSuggestions.slice(-100);

        this.saveUserInteractions();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Track search queries for better recommendations
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (e.target.value.length > 2) {
                    this.trackSearchQuery(e.target.value);
                }
            });
        }

        // Track course enrollment clicks
        document.querySelectorAll('a[href*="curso"]').forEach(link => {
            link.addEventListener('click', () => {
                const courseId = this.extractCourseIdFromUrl(link.href);
                if (courseId) {
                    this.trackCourseInterest(courseId);
                }
            });
        });
    }

    /**
     * Track search queries
     */
    trackSearchQuery(query) {
        this.userInteractions.searchQueries.push({
            query: query.toLowerCase(),
            timestamp: Date.now()
        });

        // Keep only last 50 queries
        this.userInteractions.searchQueries = 
            this.userInteractions.searchQueries.slice(-50);

        this.saveUserInteractions();
    }

    /**
     * Track course interest
     */
    trackCourseInterest(courseId) {
        if (!this.userInteractions.enrolledCourses.includes(courseId)) {
            this.userInteractions.enrolledCourses.push(courseId);
            this.saveUserInteractions();
        }
    }

    /**
     * Extract course ID from URL
     */
    extractCourseIdFromUrl(url) {
        const match = url.match(/\/cursos\/([^\/]+)/);
        return match ? match[1] : null;
    }

    /**
     * Get learning path progress for current user
     */
    getLearningPathProgress() {
        const userPath = this.inferUserLearningPath();
        if (!userPath) return null;

        const pathSteps = this.learningPaths[userPath].steps;
        const completedSteps = pathSteps.filter(step => {
            return this.userInteractions.viewedPages.some(page => 
                page.url.includes(step.id) || 
                (step.type === 'technology' && page.technology === step.id)
            );
        });

        return {
            pathName: this.learningPaths[userPath].name,
            totalSteps: pathSteps.length,
            completedSteps: completedSteps.length,
            progress: Math.round((completedSteps.length / pathSteps.length) * 100),
            nextStep: pathSteps[completedSteps.length]
        };
    }

    /**
     * Render learning path progress
     */
    renderLearningPathProgress() {
        const container = document.getElementById('learning-progress');
        if (!container) return;

        const progress = this.getLearningPathProgress();
        if (!progress) return;

        const html = `
            <div class="card">
                <div class="card-header">
                    <h6 class="mb-0">📈 Seu Progresso</h6>
                </div>
                <div class="card-body">
                    <h6>${progress.pathName}</h6>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-success" style="width: ${progress.progress}%"></div>
                    </div>
                    <small class="text-muted">
                        ${progress.completedSteps} de ${progress.totalSteps} passos concluídos (${progress.progress}%)
                    </small>
                    ${progress.nextStep ? `
                        <div class="mt-3">
                            <strong>Próximo passo:</strong>
                            <p class="mb-0">${progress.nextStep.title}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're not on the search page to avoid conflicts
    if (!window.location.pathname.includes('/buscar')) {
        window.intelligentSuggestions = new IntelligentSuggestions();
        
        // Also render learning path progress
        window.intelligentSuggestions.renderLearningPathProgress();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntelligentSuggestions;
}