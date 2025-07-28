/**
 * Blog System - Portal Big Data
 * Handles blog categorization, search, filtering, and content management
 * Bootstrap Studio Compatible - Simple JavaScript
 */

// Blog data structure
const blogData = {
    posts: [
        {
            id: 'hadoop-2025-trends',
            title: 'Tendências do Hadoop em 2025: O que Esperar',
            excerpt: 'Análise das principais tendências e desenvolvimentos esperados para o ecossistema Hadoop em 2025.',
            content: 'Conteúdo completo do artigo...',
            category: 'articles',
            tags: ['hadoop', 'trends', '2025', 'big-data'],
            author: 'João Silva',
            authorId: 'joao-silva',
            publishedDate: '2024-12-15',
            readingTime: 8,
            featured: true,
            popular: true,
            sponsored: false,
            image: 'hadoop-2025-trends.jpg',
            slug: 'hadoop-2025-trends'
        },
        {
            id: 'spark-performance-tutorial',
            title: 'Otimização de Performance no Apache Spark: Guia Completo',
            excerpt: 'Tutorial passo-a-passo para otimizar a performance de aplicações Apache Spark.',
            content: 'Conteúdo completo do tutorial...',
            category: 'tutorials',
            tags: ['spark', 'performance', 'optimization', 'tutorial'],
            author: 'Maria Santos',
            authorId: 'maria-santos',
            publishedDate: '2024-12-10',
            readingTime: 15,
            featured: false,
            popular: true,
            sponsored: false,
            image: 'spark-performance-tutorial.jpg',
            slug: 'spark-performance-tutorial'
        },
        {
            id: 'netflix-data-migration',
            title: 'Como a Netflix Migrou do Hadoop para Arquitetura Moderna',
            excerpt: 'Estudo de caso detalhado sobre a migração da Netflix de Hadoop para uma arquitetura de dados moderna.',
            content: 'Conteúdo completo do estudo de caso...',
            category: 'case-studies',
            tags: ['migration', 'netflix', 'case-study', 'modern-architecture'],
            author: 'Carlos Oliveira',
            authorId: 'carlos-oliveira',
            publishedDate: '2024-12-08',
            readingTime: 12,
            featured: false,
            popular: true,
            sponsored: false,
            image: 'netflix-data-migration.jpg',
            slug: 'netflix-data-migration'
        },
        {
            id: 'apache-iceberg-release',
            title: 'Apache Iceberg 1.5 Lançado com Novas Funcionalidades',
            excerpt: 'Novidades e melhorias da versão 1.5 do Apache Iceberg para table formats.',
            content: 'Conteúdo completo da notícia...',
            category: 'news',
            tags: ['iceberg', 'release', 'table-format', 'apache'],
            author: 'Ana Costa',
            authorId: 'ana-costa',
            publishedDate: '2024-12-12',
            readingTime: 5,
            featured: false,
            popular: false,
            sponsored: false,
            image: 'apache-iceberg-release.jpg',
            slug: 'apache-iceberg-release'
        },
        {
            id: 'hadoop-2025-trends-summary',
            title: 'Resumo das Principais Tendências Big Data em 2025',
            excerpt: 'Compilação das principais tendências e tecnologias que estão moldando o futuro do Big Data.',
            content: 'Conteúdo completo da notícia...',
            category: 'news',
            tags: ['trends', '2025', 'big-data', 'summary'],
            author: 'Equipe Portal Big Data',
            authorId: 'equipe-portal',
            publishedDate: '2024-12-20',
            readingTime: 6,
            featured: true,
            popular: true,
            sponsored: false,
            image: 'trends-2025-summary.jpg',
            slug: 'novidades/hadoop-2025-trends-summary'
        },
        {
            id: 'weekly-newsletter-december-2024',
            title: 'Newsletter Semanal: Destaques da Semana em Big Data',
            excerpt: 'Resumo semanal com as principais notícias, releases e eventos do mundo Big Data.',
            content: 'Conteúdo completo da newsletter...',
            category: 'news',
            tags: ['newsletter', 'weekly', 'summary', 'big-data'],
            author: 'Equipe Portal Big Data',
            authorId: 'equipe-portal',
            publishedDate: '2024-12-18',
            readingTime: 4,
            featured: false,
            popular: true,
            sponsored: false,
            image: 'weekly-newsletter-dec-2024.jpg',
            slug: 'novidades/weekly-newsletter-december-2024'
        },
        {
            id: 'kafka-streams-tutorial',
            title: 'Processamento de Streams com Kafka Streams: Do Básico ao Avançado',
            excerpt: 'Tutorial completo sobre Kafka Streams, desde conceitos básicos até implementações avançadas.',
            content: 'Conteúdo completo do tutorial...',
            category: 'tutorials',
            tags: ['kafka', 'streams', 'real-time', 'processing'],
            author: 'Pedro Lima',
            authorId: 'pedro-lima',
            publishedDate: '2024-12-05',
            readingTime: 20,
            featured: false,
            popular: true,
            sponsored: false,
            image: 'kafka-streams-tutorial.jpg',
            slug: 'kafka-streams-tutorial'
        },
        {
            id: 'data-lakehouse-comparison',
            title: 'Data Lakehouse: Comparando Databricks, Snowflake e Delta Lake',
            excerpt: 'Análise comparativa das principais plataformas de Data Lakehouse disponíveis no mercado.',
            content: 'Conteúdo completo do artigo...',
            category: 'articles',
            tags: ['lakehouse', 'databricks', 'snowflake', 'delta-lake'],
            author: 'Lucia Ferreira',
            authorId: 'lucia-ferreira',
            publishedDate: '2024-12-03',
            readingTime: 18,
            featured: false,
            popular: true,
            sponsored: false,
            image: 'data-lakehouse-comparison.jpg',
            slug: 'data-lakehouse-comparison'
        }
    ],
    
    categories: {
        'articles': {
            name: 'Artigos',
            icon: 'fas fa-newspaper',
            description: 'Artigos técnicos e análises sobre Big Data'
        },
        'tutorials': {
            name: 'Tutoriais',
            icon: 'fas fa-book',
            description: 'Guias passo-a-passo e tutoriais práticos'
        },
        'case-studies': {
            name: 'Estudos de Caso',
            icon: 'fas fa-chart-line',
            description: 'Casos reais de implementação e migração'
        },
        'news': {
            name: 'Novidades',
            icon: 'fas fa-rss',
            description: 'Últimas notícias e atualizações do setor'
        }
    },
    
    authors: {
        'joao-silva': {
            name: 'João Silva',
            title: 'Data Engineer Senior',
            bio: 'Especialista em Hadoop e Apache Spark com 8 anos de experiência.',
            avatar: 'joao-silva.jpg'
        },
        'maria-santos': {
            name: 'Maria Santos',
            title: 'Arquiteta de Dados',
            bio: 'Especialista em otimização de performance e arquiteturas de dados.',
            avatar: 'maria-santos.jpg'
        },
        'carlos-oliveira': {
            name: 'Carlos Oliveira',
            title: 'Consultor Big Data',
            bio: 'Consultor especializado em migrações e modernização de infraestrutura.',
            avatar: 'carlos-oliveira.jpg'
        },
        'ana-costa': {
            name: 'Ana Costa',
            title: 'Tech Writer',
            bio: 'Jornalista especializada em tecnologia e Big Data.',
            avatar: 'ana-costa.jpg'
        },
        'pedro-lima': {
            name: 'Pedro Lima',
            title: 'Stream Processing Expert',
            bio: 'Especialista em processamento de streams e arquiteturas real-time.',
            avatar: 'pedro-lima.jpg'
        },
        'lucia-ferreira': {
            name: 'Lucia Ferreira',
            title: 'Data Platform Architect',
            bio: 'Arquiteta de plataformas de dados com foco em soluções cloud.',
            avatar: 'lucia-ferreira.jpg'
        },
        'equipe-portal': {
            name: 'Equipe Portal Big Data',
            title: 'Editores',
            bio: 'Equipe editorial especializada em curadoria de conteúdo sobre Big Data.',
            avatar: 'equipe-portal.jpg'
        }
    }
};

// Blog system state
let currentFilter = {
    category: 'all',
    tag: '',
    search: '',
    sort: 'newest'
};

let currentPage = 1;
const postsPerPage = 6;

// Comments system data
const commentsData = {
    'hadoop-2025-trends': [
        {
            id: 'c1',
            author: 'Roberto Silva',
            email: 'roberto@email.com',
            content: 'Excelente artigo sobre as tendências do Hadoop! Muito esclarecedor sobre o futuro da tecnologia.',
            timestamp: '2024-12-16T10:30:00Z',
            replies: [
                {
                    id: 'r1',
                    author: 'João Silva',
                    content: 'Obrigado pelo feedback, Roberto! Fico feliz que tenha gostado.',
                    timestamp: '2024-12-16T11:00:00Z'
                }
            ]
        },
        {
            id: 'c2',
            author: 'Ana Costa',
            email: 'ana@email.com',
            content: 'Quando teremos mais conteúdo sobre as novas distribuições mencionadas?',
            timestamp: '2024-12-16T14:20:00Z',
            replies: []
        }
    ],
    'spark-performance-tutorial': [
        {
            id: 'c3',
            author: 'Carlos Oliveira',
            email: 'carlos@email.com',
            content: 'Tutorial muito detalhado! As dicas de otimização foram muito úteis no meu projeto.',
            timestamp: '2024-12-11T09:15:00Z',
            replies: []
        }
    ],
    'netflix-data-migration': [
        {
            id: 'c4',
            author: 'Maria Santos',
            email: 'maria@email.com',
            content: 'O caso da Netflix é realmente inspirador. Vocês têm mais estudos de caso similares?',
            timestamp: '2024-12-09T16:45:00Z',
            replies: []
        }
    ]
};

// Initialize blog system
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogSystem();
});

function initializeBlogSystem() {
    setupEventListeners();
    loadFeaturedPost();
    loadPopularTags();
    loadRecentComments();
    loadBlogArchive();
    loadBlogPosts();
}

function setupEventListeners() {
    // Category tabs
    const categoryTabs = document.querySelectorAll('#blog-categories button');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.id.replace('-tab', '').replace('all', 'all');
            currentFilter.category = category;
            currentPage = 1;
            loadBlogPosts();
        });
    });
    
    // Search input with enhanced functionality
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            currentFilter.search = this.value.toLowerCase();
            currentPage = 1;
            loadBlogPosts();
            
            // Show search suggestions if query is not empty
            if (this.value.trim().length > 2) {
                showSearchSuggestions(this.value.trim());
            } else {
                hideSearchSuggestions();
            }
        }, 300));
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target)) {
                hideSearchSuggestions();
            }
        });
    }
    
    // Tag filter
    const tagFilter = document.getElementById('tag-filter');
    if (tagFilter) {
        tagFilter.addEventListener('change', function() {
            currentFilter.tag = this.value;
            currentPage = 1;
            loadBlogPosts();
        });
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            currentFilter.sort = this.value;
            currentPage = 1;
            loadBlogPosts();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function loadBlogPosts() {
    const filteredPosts = filterPosts();
    const sortedPosts = sortPosts(filteredPosts);
    const paginatedPosts = paginatePosts(sortedPosts);
    
    renderPosts(paginatedPosts);
    renderPagination(sortedPosts.length);
}

function filterPosts() {
    return blogData.posts.filter(post => {
        // Category filter
        if (currentFilter.category !== 'all' && post.category !== currentFilter.category) {
            return false;
        }
        
        // Tag filter
        if (currentFilter.tag && !post.tags.includes(currentFilter.tag)) {
            return false;
        }
        
        // Search filter
        if (currentFilter.search) {
            const searchTerm = currentFilter.search.toLowerCase();
            return post.title.toLowerCase().includes(searchTerm) ||
                   post.excerpt.toLowerCase().includes(searchTerm) ||
                   post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        }
        
        return true;
    });
}

function sortPosts(posts) {
    return posts.sort((a, b) => {
        switch (currentFilter.sort) {
            case 'newest':
                return new Date(b.publishedDate) - new Date(a.publishedDate);
            case 'oldest':
                return new Date(a.publishedDate) - new Date(b.publishedDate);
            case 'popular':
                return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
            case 'trending':
                // Simple trending logic based on recent + popular
                const aScore = (a.popular ? 1 : 0) + (isRecent(a.publishedDate) ? 1 : 0);
                const bScore = (b.popular ? 1 : 0) + (isRecent(b.publishedDate) ? 1 : 0);
                return bScore - aScore;
            default:
                return new Date(b.publishedDate) - new Date(a.publishedDate);
        }
    });
}

function paginatePosts(posts) {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
}

function renderPosts(posts) {
    const containers = {
        'all': document.getElementById('all-posts'),
        'articles': document.getElementById('articles-posts'),
        'tutorials': document.getElementById('tutorials-posts'),
        'case-studies': document.getElementById('case-studies-posts'),
        'news': document.getElementById('news-posts')
    };
    
    const activeContainer = currentFilter.category === 'all' ? 
        containers.all : containers[currentFilter.category];
    
    if (!activeContainer) return;
    
    if (posts.length === 0) {
        activeContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>Nenhum post encontrado</h4>
                <p class="text-muted">Tente ajustar os filtros ou termos de busca.</p>
            </div>
        `;
        return;
    }
    
    activeContainer.innerHTML = posts.map(post => createPostCard(post)).join('');
}

function createPostCard(post) {
    const author = blogData.authors[post.authorId];
    const category = blogData.categories[post.category];
    const formattedDate = formatDate(post.publishedDate);
    
    return `
        <div class="card mb-4 blog-post-card">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="../assets/images/blog/${post.image}" class="img-fluid rounded-start h-100 object-cover" alt="${post.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div class="post-meta">
                                <span class="badge bg-primary me-2">
                                    <i class="${category.icon} me-1"></i>${category.name}
                                </span>
                                ${post.featured ? '<span class="badge bg-warning text-dark me-2"><i class="fas fa-star me-1"></i>Destaque</span>' : ''}
                                ${post.sponsored ? '<span class="badge bg-info me-2"><i class="fas fa-ad me-1"></i>Patrocinado</span>' : ''}
                            </div>
                            <small class="text-muted">${formattedDate}</small>
                        </div>
                        
                        <h5 class="card-title">
                            <a href="${post.sponsored ? 'patrocinado/' : ''}${post.slug}/" class="text-decoration-none">
                                ${post.title}
                            </a>
                        </h5>
                        
                        <p class="card-text">${post.excerpt}</p>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="author-info d-flex align-items-center">
                                <img src="../assets/images/authors/${author.avatar}" alt="${author.name}" class="rounded-circle me-2" width="30" height="30">
                                <small class="text-muted">
                                    <strong>${author.name}</strong><br>
                                    ${post.readingTime} min de leitura
                                </small>
                            </div>
                            
                            <div class="post-tags">
                                ${post.tags.slice(0, 3).map(tag => 
                                    `<span class="badge bg-secondary me-1">${tag}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div class="mt-3">
                            <a href="${post.sponsored ? 'patrocinado/' : ''}${post.slug}/" class="btn btn-outline-primary btn-sm">
                                <i class="fas fa-arrow-right me-1"></i>Ler mais
                            </a>
                            <div class="btn-group ms-2" role="group">
                                <button class="btn btn-outline-secondary btn-sm" onclick="enhancedSharePost('${post.id}')">
                                    <i class="fas fa-share me-1"></i>Compartilhar
                                </button>
                                <button class="btn btn-outline-secondary btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onclick="shareToSpecificPlatform('twitter', '${window.location.origin}/blog/${post.sponsored ? 'patrocinado/' : ''}${post.slug}/', '${post.title}', '${post.excerpt}')">
                                        <i class="fab fa-twitter me-2"></i>Twitter
                                    </a></li>
                                    <li><a class="dropdown-item" href="#" onclick="shareToSpecificPlatform('facebook', '${window.location.origin}/blog/${post.sponsored ? 'patrocinado/' : ''}${post.slug}/', '${post.title}', '${post.excerpt}')">
                                        <i class="fab fa-facebook me-2"></i>Facebook
                                    </a></li>
                                    <li><a class="dropdown-item" href="#" onclick="shareToSpecificPlatform('linkedin', '${window.location.origin}/blog/${post.sponsored ? 'patrocinado/' : ''}${post.slug}/', '${post.title}', '${post.excerpt}')">
                                        <i class="fab fa-linkedin me-2"></i>LinkedIn
                                    </a></li>
                                    <li><a class="dropdown-item" href="#" onclick="shareToSpecificPlatform('whatsapp', '${window.location.origin}/blog/${post.sponsored ? 'patrocinado/' : ''}${post.slug}/', '${post.title}', '${post.excerpt}')">
                                        <i class="fab fa-whatsapp me-2"></i>WhatsApp
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const paginationContainer = document.getElementById('blog-pagination');
    
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(filterPosts().length / postsPerPage)) return;
    
    currentPage = page;
    loadBlogPosts();
    
    // Scroll to top of posts
    document.querySelector('.blog-posts').scrollIntoView({ behavior: 'smooth' });
}

function loadFeaturedPost() {
    const featuredPost = blogData.posts.find(post => post.featured);
    const container = document.getElementById('featured-post');
    
    if (!container || !featuredPost) return;
    
    const author = blogData.authors[featuredPost.authorId];
    const category = blogData.categories[featuredPost.category];
    
    container.innerHTML = `
        <img src="../assets/images/blog/${featuredPost.image}" class="card-img-top" alt="${featuredPost.title}">
        <div class="card-body">
            <div class="mb-2">
                <span class="badge bg-primary">
                    <i class="${category.icon} me-1"></i>${category.name}
                </span>
                <span class="badge bg-warning text-dark ms-2">
                    <i class="fas fa-star me-1"></i>Destaque
                </span>
            </div>
            <h6 class="card-title">
                <a href="${featuredPost.sponsored ? 'patrocinado/' : ''}${featuredPost.slug}/" class="text-decoration-none">
                    ${featuredPost.title}
                </a>
            </h6>
            <p class="card-text small">${featuredPost.excerpt}</p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">
                    <img src="../assets/images/authors/${author.avatar}" alt="${author.name}" class="rounded-circle me-1" width="20" height="20">
                    ${author.name}
                </small>
                <small class="text-muted">${featuredPost.readingTime} min</small>
            </div>
        </div>
    `;
}

function loadPopularTags() {
    const tagCounts = {};
    
    blogData.posts.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    
    const sortedTags = Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 15);
    
    const container = document.getElementById('popular-tags');
    if (!container) return;
    
    container.innerHTML = sortedTags.map(([tag, count]) => `
        <span class="badge bg-secondary me-2 mb-2 tag-badge" onclick="filterByTag('${tag}')" style="cursor: pointer;">
            ${tag} (${count})
        </span>
    `).join('');
}

function loadRecentComments() {
    // Mock recent comments data
    const recentComments = [
        {
            author: 'Roberto Silva',
            comment: 'Excelente artigo sobre Spark! Muito útil.',
            post: 'Otimização de Performance no Apache Spark',
            time: '2 horas atrás'
        },
        {
            author: 'Ana Oliveira',
            comment: 'Quando teremos mais conteúdo sobre Kafka?',
            post: 'Tendências do Hadoop em 2025',
            time: '5 horas atrás'
        },
        {
            author: 'Carlos Santos',
            comment: 'O caso da Netflix foi muito esclarecedor.',
            post: 'Como a Netflix Migrou do Hadoop',
            time: '1 dia atrás'
        }
    ];
    
    const container = document.getElementById('recent-comments');
    if (!container) return;
    
    container.innerHTML = recentComments.map(comment => `
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${comment.author}</h6>
                <small>${comment.time}</small>
            </div>
            <p class="mb-1 small">${comment.comment}</p>
            <small class="text-muted">em "${comment.post}"</small>
        </div>
    `).join('');
}

function loadBlogArchive() {
    // Generate archive based on post dates
    const archive = {};
    
    blogData.posts.forEach(post => {
        const date = new Date(post.publishedDate);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
        
        if (!archive[monthYear]) {
            archive[monthYear] = {
                name: monthName,
                count: 0
            };
        }
        archive[monthYear].count++;
    });
    
    const sortedArchive = Object.entries(archive)
        .sort(([a], [b]) => b.localeCompare(a))
        .slice(0, 12);
    
    const container = document.getElementById('blog-archive');
    if (!container) return;
    
    container.innerHTML = sortedArchive.map(([monthYear, data]) => `
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onclick="filterByMonth('${monthYear}')">
            ${data.name}
            <span class="badge bg-primary rounded-pill">${data.count}</span>
        </a>
    `).join('');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function isRecent(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
}

// Event handlers
function filterByTag(tag) {
    document.getElementById('tag-filter').value = tag;
    currentFilter.tag = tag;
    currentPage = 1;
    loadBlogPosts();
}

function filterByMonth(monthYear) {
    // This would filter posts by month - simplified implementation
    console.log('Filter by month:', monthYear);
}

function sharePost(postId) {
    const post = blogData.posts.find(p => p.id === postId);
    if (!post) return;
    
    const url = `${window.location.origin}/blog/${post.sponsored ? 'patrocinado/' : ''}${post.slug}/`;
    const text = `${post.title} - ${post.excerpt}`;
    
    if (navigator.share) {
        navigator.share({
            title: post.title,
            text: text,
            url: url
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    }
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const weeklyDigest = form.querySelector('#weekly-digest')?.checked || false;
    const breakingNews = form.querySelector('#breaking-news')?.checked || false;
    
    // Simple form validation
    if (!email || !email.includes('@')) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Mock newsletter subscription
    console.log('Newsletter subscription:', {
        email,
        weeklyDigest,
        breakingNews
    });
    
    // Show success message
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check me-2"></i>Inscrito!';
    button.disabled = true;
    button.classList.remove('btn-success');
    button.classList.add('btn-success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        form.reset();
    }, 3000);
}

// Comments functionality
function loadComments(postId) {
    const comments = commentsData[postId] || [];
    const container = document.getElementById('comments-section');
    
    if (!container) return;
    
    if (comments.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-comments fa-2x text-muted mb-3"></i>
                <p class="text-muted">Seja o primeiro a comentar!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
}

function createCommentHTML(comment) {
    const timeAgo = getTimeAgo(comment.timestamp);
    const repliesHTML = comment.replies.map(reply => `
        <div class="comment-reply ms-4 mt-3 p-3 bg-light rounded">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <strong>${reply.author}</strong>
                <small class="text-muted">${getTimeAgo(reply.timestamp)}</small>
            </div>
            <p class="mb-0">${reply.content}</p>
        </div>
    `).join('');
    
    return `
        <div class="comment mb-4 p-3 border rounded">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="d-flex align-items-center">
                    <div class="avatar-placeholder bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                        ${comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <strong>${comment.author}</strong>
                        <br>
                        <small class="text-muted">${timeAgo}</small>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-secondary" onclick="replyToComment('${comment.id}')">
                    <i class="fas fa-reply me-1"></i>Responder
                </button>
            </div>
            <p class="mb-2">${comment.content}</p>
            ${repliesHTML}
            <div id="reply-form-${comment.id}" class="reply-form mt-3" style="display: none;">
                <form onsubmit="submitReply(event, '${comment.id}')">
                    <div class="mb-3">
                        <textarea class="form-control matrix-input" rows="3" placeholder="Sua resposta..." required></textarea>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary btn-sm">
                            <i class="fas fa-paper-plane me-1"></i>Responder
                        </button>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="cancelReply('${comment.id}')">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function submitComment(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('#comment-name').value;
    const email = form.querySelector('#comment-email').value;
    const content = form.querySelector('#comment-content').value;
    
    // Simple validation
    if (!name || !email || !content) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Mock comment submission
    const newComment = {
        id: 'c' + Date.now(),
        author: name,
        email: email,
        content: content,
        timestamp: new Date().toISOString(),
        replies: []
    };
    
    // Add to comments data (in real app, this would be sent to server)
    const postId = getCurrentPostId();
    if (!commentsData[postId]) {
        commentsData[postId] = [];
    }
    commentsData[postId].unshift(newComment);
    
    // Reload comments
    loadComments(postId);
    
    // Reset form
    form.reset();
    
    // Show success message
    showNotification('Comentário enviado com sucesso!', 'success');
}

function replyToComment(commentId) {
    // Hide all other reply forms
    document.querySelectorAll('.reply-form').forEach(form => {
        form.style.display = 'none';
    });
    
    // Show this reply form
    const replyForm = document.getElementById(`reply-form-${commentId}`);
    if (replyForm) {
        replyForm.style.display = 'block';
        replyForm.querySelector('textarea').focus();
    }
}

function cancelReply(commentId) {
    const replyForm = document.getElementById(`reply-form-${commentId}`);
    if (replyForm) {
        replyForm.style.display = 'none';
        replyForm.querySelector('form').reset();
    }
}

function submitReply(event, commentId) {
    event.preventDefault();
    
    const form = event.target;
    const content = form.querySelector('textarea').value;
    
    if (!content.trim()) {
        alert('Por favor, escreva uma resposta.');
        return;
    }
    
    // Mock reply submission
    const newReply = {
        id: 'r' + Date.now(),
        author: 'Usuário', // In real app, this would come from authentication
        content: content,
        timestamp: new Date().toISOString()
    };
    
    // Add reply to comment (in real app, this would be sent to server)
    const postId = getCurrentPostId();
    const comments = commentsData[postId] || [];
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
        comment.replies.push(newReply);
    }
    
    // Reload comments
    loadComments(postId);
    
    // Show success message
    showNotification('Resposta enviada com sucesso!', 'success');
}

function getCurrentPostId() {
    // Extract post ID from URL or use a default for demo
    const path = window.location.pathname;
    if (path.includes('hadoop-2025-trends')) return 'hadoop-2025-trends';
    if (path.includes('spark-performance-tutorial')) return 'spark-performance-tutorial';
    if (path.includes('netflix-data-migration')) return 'netflix-data-migration';
    return 'hadoop-2025-trends'; // Default for demo
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'agora mesmo';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} dias atrás`;
    
    return time.toLocaleDateString('pt-BR');
}

// Enhanced sharing functionality
function enhancedSharePost(postId, platform = null) {
    const post = blogData.posts.find(p => p.id === postId);
    if (!post) return;
    
    const url = `${window.location.origin}/blog/${post.sponsored ? 'patrocinado/' : ''}${post.slug}/`;
    const title = post.title;
    const text = post.excerpt;
    
    if (platform) {
        shareToSpecificPlatform(platform, url, title, text);
    } else if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        });
    } else {
        showShareModal(url, title, text);
    }
}

function shareToSpecificPlatform(platform, url, title, text) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);
    
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

function showShareModal(url, title, text) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Compartilhar Artigo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-6">
                            <button class="btn btn-primary w-100" onclick="shareToSpecificPlatform('twitter', '${url}', '${title}', '${text}')">
                                <i class="fab fa-twitter me-2"></i>Twitter
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-primary w-100" onclick="shareToSpecificPlatform('facebook', '${url}', '${title}', '${text}')">
                                <i class="fab fa-facebook me-2"></i>Facebook
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-primary w-100" onclick="shareToSpecificPlatform('linkedin', '${url}', '${title}', '${text}')">
                                <i class="fab fa-linkedin me-2"></i>LinkedIn
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-success w-100" onclick="shareToSpecificPlatform('whatsapp', '${url}', '${title}', '${text}')">
                                <i class="fab fa-whatsapp me-2"></i>WhatsApp
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-info w-100" onclick="shareToSpecificPlatform('telegram', '${url}', '${title}', '${text}')">
                                <i class="fab fa-telegram me-2"></i>Telegram
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-secondary w-100" onclick="shareToSpecificPlatform('email', '${url}', '${title}', '${text}')">
                                <i class="fas fa-envelope me-2"></i>E-mail
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="input-group">
                        <input type="text" class="form-control" value="${url}" id="share-url" readonly>
                        <button class="btn btn-outline-secondary" onclick="copyToClipboard('share-url')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    showNotification('Link copiado para a área de transferência!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Enhanced search functionality specific to blog
function enhancedBlogSearch(query) {
    const results = blogData.posts.filter(post => {
        const searchTerm = query.toLowerCase();
        return post.title.toLowerCase().includes(searchTerm) ||
               post.excerpt.toLowerCase().includes(searchTerm) ||
               post.content.toLowerCase().includes(searchTerm) ||
               post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
               post.author.toLowerCase().includes(searchTerm) ||
               blogData.categories[post.category].name.toLowerCase().includes(searchTerm);
    });
    
    return results.sort((a, b) => {
        // Prioritize title matches
        const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 0;
        const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 0;
        
        // Then excerpt matches
        const aExcerpt = a.excerpt.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        const bExcerpt = b.excerpt.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        
        const aScore = aTitle + aExcerpt + (a.featured ? 1 : 0) + (a.popular ? 1 : 0);
        const bScore = bTitle + bExcerpt + (b.featured ? 1 : 0) + (b.popular ? 1 : 0);
        
        return bScore - aScore;
    });
}

function showSearchSuggestions(query) {
    const results = enhancedBlogSearch(query).slice(0, 5);
    const searchInput = document.getElementById('blog-search');
    
    // Remove existing suggestions
    hideSearchSuggestions();
    
    if (results.length === 0) return;
    
    const suggestions = document.createElement('div');
    suggestions.id = 'search-suggestions';
    suggestions.className = 'position-absolute bg-white border rounded shadow-sm w-100 mt-1';
    suggestions.style.cssText = 'z-index: 1000; max-height: 300px; overflow-y: auto;';
    
    suggestions.innerHTML = results.map(post => `
        <div class="suggestion-item p-3 border-bottom" style="cursor: pointer;" onclick="selectSearchSuggestion('${post.id}')">
            <div class="d-flex align-items-center">
                <img src="../assets/images/blog/${post.image}" alt="${post.title}" class="rounded me-3" width="40" height="40" style="object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-1 text-dark">${highlightSearchTerm(post.title, query)}</h6>
                    <small class="text-muted">${post.category} • ${post.readingTime} min</small>
                </div>
            </div>
        </div>
    `).join('');
    
    // Position suggestions below search input
    const inputRect = searchInput.getBoundingClientRect();
    const container = searchInput.closest('.col-md-6');
    container.style.position = 'relative';
    container.appendChild(suggestions);
}

function hideSearchSuggestions() {
    const suggestions = document.getElementById('search-suggestions');
    if (suggestions) {
        suggestions.remove();
    }
}

function selectSearchSuggestion(postId) {
    const post = blogData.posts.find(p => p.id === postId);
    if (post) {
        window.location.href = `/blog/${post.sponsored ? 'patrocinado/' : ''}${post.slug}/`;
    }
    hideSearchSuggestions();
}

function highlightSearchTerm(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Export for global access
window.blogSystem = {
    filterByTag,
    filterByMonth,
    sharePost,
    changePage,
    loadComments,
    submitComment,
    replyToComment,
    cancelReply,
    submitReply,
    enhancedSharePost,
    enhancedBlogSearch,
    showNotification
};