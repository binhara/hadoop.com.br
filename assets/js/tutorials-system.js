/**
 * Tutorials System - Portal Big Data
 * Handles tutorial listing, filtering, progress tracking, and interactive features
 * Bootstrap Studio Compatible - Simple JavaScript
 */

// Tutorials data structure
const tutorialsData = {
    tutorials: [
        {
            id: 'hadoop-installation-guide',
            title: 'Instalação e Configuração do Hadoop',
            description: 'Guia completo para instalar e configurar o Apache Hadoop em ambiente Linux.',
            difficulty: 'beginner',
            technology: 'hadoop',
            duration: 45,
            prerequisites: ['Linux básico', 'Java 8+'],
            learningOutcomes: [
                'Instalar Hadoop em modo standalone',
                'Configurar HDFS e YARN',
                'Executar primeiro job MapReduce',
                'Monitorar cluster Hadoop'
            ],
            author: 'João Silva',
            authorId: 'joao-silva',
            publishedDate: '2024-12-10',
            rating: 4.8,
            completions: 1250,
            featured: true,
            tags: ['hadoop', 'installation', 'configuration', 'hdfs', 'yarn'],
            image: 'hadoop-installation-guide.jpg',
            slug: 'hadoop-installation-guide',
            steps: [
                {
                    id: 'step-1',
                    title: 'Preparação do Ambiente',
                    description: 'Configurar o sistema operacional e instalar dependências',
                    estimatedTime: 10,
                    codeBlocks: [
                        {
                            language: 'bash',
                            code: 'sudo apt update && sudo apt install openjdk-8-jdk'
                        }
                    ]
                },
                {
                    id: 'step-2',
                    title: 'Download e Instalação do Hadoop',
                    description: 'Baixar e instalar o Apache Hadoop',
                    estimatedTime: 15,
                    codeBlocks: [
                        {
                            language: 'bash',
                            code: 'wget https://downloads.apache.org/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz'
                        }
                    ]
                }
            ],
            resources: [
                {
                    name: 'Arquivo de Configuração',
                    type: 'download',
                    url: '/downloads/hadoop-config.xml'
                },
                {
                    name: 'Script de Instalação',
                    type: 'download',
                    url: '/downloads/hadoop-install.sh'
                }
            ]
        },
        {
            id: 'spark-performance-optimization',
            title: 'Otimização de Performance no Apache Spark',
            description: 'Técnicas avançadas para otimizar a performance de aplicações Spark.',
            difficulty: 'advanced',
            technology: 'spark',
            duration: 90,
            prerequisites: ['Spark básico', 'Scala ou Python', 'Conceitos de Big Data'],
            learningOutcomes: [
                'Configurar otimizações de memória',
                'Implementar particionamento eficiente',
                'Usar cache e persist adequadamente',
                'Monitorar e debugar aplicações Spark'
            ],
            author: 'Maria Santos',
            authorId: 'maria-santos',
            publishedDate: '2024-12-08',
            rating: 4.9,
            completions: 890,
            featured: true,
            tags: ['spark', 'performance', 'optimization', 'tuning', 'memory'],
            image: 'spark-performance-optimization.jpg',
            slug: 'spark-performance-optimization',
            steps: [
                {
                    id: 'step-1',
                    title: 'Análise de Performance',
                    description: 'Identificar gargalos de performance em aplicações Spark',
                    estimatedTime: 20,
                    codeBlocks: [
                        {
                            language: 'scala',
                            code: 'val df = spark.read.parquet("data.parquet")\ndf.explain(true)'
                        }
                    ]
                }
            ],
            resources: [
                {
                    name: 'Dataset de Exemplo',
                    type: 'download',
                    url: '/downloads/spark-sample-data.parquet'
                }
            ]
        },
        {
            id: 'kafka-streams-tutorial',
            title: 'Processamento de Streams com Kafka Streams',
            description: 'Tutorial prático sobre processamento de streams em tempo real com Kafka Streams.',
            difficulty: 'intermediate',
            technology: 'kafka',
            duration: 60,
            prerequisites: ['Java básico', 'Conceitos de streaming', 'Apache Kafka básico'],
            learningOutcomes: [
                'Criar aplicações Kafka Streams',
                'Implementar transformações de dados',
                'Trabalhar com windowing',
                'Fazer joins entre streams'
            ],
            author: 'Pedro Lima',
            authorId: 'pedro-lima',
            publishedDate: '2024-12-05',
            rating: 4.7,
            completions: 650,
            featured: false,
            tags: ['kafka', 'streams', 'real-time', 'processing', 'java'],
            image: 'kafka-streams-tutorial.jpg',
            slug: 'kafka-streams-tutorial',
            steps: [
                {
                    id: 'step-1',
                    title: 'Setup do Projeto',
                    description: 'Configurar projeto Maven com dependências Kafka Streams',
                    estimatedTime: 15,
                    codeBlocks: [
                        {
                            language: 'xml',
                            code: '<dependency>\n  <groupId>org.apache.kafka</groupId>\n  <artifactId>kafka-streams</artifactId>\n  <version>3.6.0</version>\n</dependency>'
                        }
                    ]
                }
            ],
            resources: [
                {
                    name: 'Projeto Maven Completo',
                    type: 'download',
                    url: '/downloads/kafka-streams-project.zip'
                }
            ]
        },
        {
            id: 'python-pyspark-basics',
            title: 'PySpark para Iniciantes',
            description: 'Introdução ao Apache Spark usando Python para análise de Big Data.',
            difficulty: 'beginner',
            technology: 'python',
            duration: 75,
            prerequisites: ['Python básico', 'Pandas (recomendado)'],
            learningOutcomes: [
                'Configurar ambiente PySpark',
                'Trabalhar com DataFrames',
                'Executar transformações e ações',
                'Integrar com fontes de dados'
            ],
            author: 'Ana Costa',
            authorId: 'ana-costa',
            publishedDate: '2024-12-03',
            rating: 4.6,
            completions: 1100,
            featured: false,
            tags: ['python', 'pyspark', 'dataframes', 'analytics', 'beginner'],
            image: 'python-pyspark-basics.jpg',
            slug: 'python-pyspark-basics',
            steps: [
                {
                    id: 'step-1',
                    title: 'Instalação do PySpark',
                    description: 'Instalar e configurar PySpark no ambiente local',
                    estimatedTime: 20,
                    codeBlocks: [
                        {
                            language: 'bash',
                            code: 'pip install pyspark jupyter'
                        }
                    ]
                }
            ],
            resources: [
                {
                    name: 'Notebook Jupyter',
                    type: 'download',
                    url: '/downloads/pyspark-basics.ipynb'
                }
            ]
        },
        {
            id: 'hive-data-warehousing',
            title: 'Data Warehousing com Apache Hive',
            description: 'Construir um data warehouse usando Apache Hive e HiveQL.',
            difficulty: 'intermediate',
            technology: 'hive',
            duration: 80,
            prerequisites: ['SQL', 'Hadoop básico', 'Conceitos de DW'],
            learningOutcomes: [
                'Criar tabelas Hive otimizadas',
                'Implementar particionamento',
                'Usar formatos de arquivo eficientes',
                'Otimizar queries HiveQL'
            ],
            author: 'Carlos Oliveira',
            authorId: 'carlos-oliveira',
            publishedDate: '2024-12-01',
            rating: 4.5,
            completions: 420,
            featured: false,
            tags: ['hive', 'data-warehouse', 'sql', 'partitioning', 'optimization'],
            image: 'hive-data-warehousing.jpg',
            slug: 'hive-data-warehousing',
            steps: [
                {
                    id: 'step-1',
                    title: 'Configuração do Hive',
                    description: 'Instalar e configurar Apache Hive',
                    estimatedTime: 25,
                    codeBlocks: [
                        {
                            language: 'sql',
                            code: 'CREATE DATABASE sales_dw;'
                        }
                    ]
                }
            ],
            resources: [
                {
                    name: 'Scripts SQL',
                    type: 'download',
                    url: '/downloads/hive-dw-scripts.sql'
                }
            ]
        },
        {
            id: 'flink-stream-processing',
            title: 'Stream Processing com Apache Flink',
            description: 'Processamento de streams em tempo real usando Apache Flink.',
            difficulty: 'advanced',
            technology: 'flink',
            duration: 95,
            prerequisites: ['Java/Scala', 'Conceitos de streaming', 'Programação funcional'],
            learningOutcomes: [
                'Desenvolver aplicações Flink',
                'Implementar event time processing',
                'Trabalhar com state management',
                'Configurar checkpointing'
            ],
            author: 'Lucia Ferreira',
            authorId: 'lucia-ferreira',
            publishedDate: '2024-11-28',
            rating: 4.8,
            completions: 320,
            featured: false,
            tags: ['flink', 'streaming', 'real-time', 'event-time', 'state'],
            image: 'flink-stream-processing.jpg',
            slug: 'flink-stream-processing',
            steps: [
                {
                    id: 'step-1',
                    title: 'Setup do Ambiente Flink',
                    description: 'Configurar cluster Flink local',
                    estimatedTime: 30,
                    codeBlocks: [
                        {
                            language: 'bash',
                            code: './bin/start-cluster.sh'
                        }
                    ]
                }
            ],
            resources: [
                {
                    name: 'Código Fonte Completo',
                    type: 'download',
                    url: '/downloads/flink-streaming-app.zip'
                }
            ]
        }
    ],
    
    learningPaths: [
        {
            id: 'hadoop-beginner-path',
            name: 'Iniciante em Hadoop',
            description: 'Trilha completa para quem está começando com Hadoop',
            tutorials: ['hadoop-installation-guide', 'hive-data-warehousing'],
            estimatedTime: 125,
            difficulty: 'beginner'
        },
        {
            id: 'spark-mastery-path',
            name: 'Dominando Apache Spark',
            description: 'Do básico ao avançado em Apache Spark',
            tutorials: ['python-pyspark-basics', 'spark-performance-optimization'],
            estimatedTime: 165,
            difficulty: 'intermediate'
        },
        {
            id: 'streaming-expert-path',
            name: 'Especialista em Streaming',
            description: 'Torne-se expert em processamento de streams',
            tutorials: ['kafka-streams-tutorial', 'flink-stream-processing'],
            estimatedTime: 155,
            difficulty: 'advanced'
        }
    ]
};

// Tutorial system state
let currentFilters = {
    difficulty: '',
    technology: '',
    duration: ''
};

let currentPage = 1;
const tutorialsPerPage = 6;

// Initialize tutorials system
document.addEventListener('DOMContentLoaded', function() {
    initializeTutorialsSystem();
});

function initializeTutorialsSystem() {
    setupEventListeners();
    loadLearningPaths();
    loadPopularTutorials();
    loadTutorials();
}

function setupEventListeners() {
    // Filter event listeners
    const difficultyFilter = document.getElementById('difficulty-filter');
    const technologyFilter = document.getElementById('technology-filter');
    const durationFilter = document.getElementById('duration-filter');
    
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', function() {
            currentFilters.difficulty = this.value;
            currentPage = 1;
            loadTutorials();
        });
    }
    
    if (technologyFilter) {
        technologyFilter.addEventListener('change', function() {
            currentFilters.technology = this.value;
            currentPage = 1;
            loadTutorials();
        });
    }
    
    if (durationFilter) {
        durationFilter.addEventListener('change', function() {
            currentFilters.duration = this.value;
            currentPage = 1;
            loadTutorials();
        });
    }
}

function loadTutorials() {
    const filteredTutorials = filterTutorials();
    const paginatedTutorials = paginateTutorials(filteredTutorials);
    
    renderTutorials(paginatedTutorials);
    renderPagination(filteredTutorials.length);
}

function filterTutorials() {
    return tutorialsData.tutorials.filter(tutorial => {
        // Difficulty filter
        if (currentFilters.difficulty && tutorial.difficulty !== currentFilters.difficulty) {
            return false;
        }
        
        // Technology filter
        if (currentFilters.technology && tutorial.technology !== currentFilters.technology) {
            return false;
        }
        
        // Duration filter
        if (currentFilters.duration) {
            switch (currentFilters.duration) {
                case 'short':
                    if (tutorial.duration >= 30) return false;
                    break;
                case 'medium':
                    if (tutorial.duration < 30 || tutorial.duration > 60) return false;
                    break;
                case 'long':
                    if (tutorial.duration <= 60) return false;
                    break;
            }
        }
        
        return true;
    });
}

function paginateTutorials(tutorials) {
    const startIndex = (currentPage - 1) * tutorialsPerPage;
    const endIndex = startIndex + tutorialsPerPage;
    return tutorials.slice(startIndex, endIndex);
}

function renderTutorials(tutorials) {
    const container = document.getElementById('tutorials-grid');
    if (!container) return;
    
    if (tutorials.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>Nenhum tutorial encontrado</h4>
                    <p class="text-muted">Tente ajustar os filtros para encontrar tutoriais.</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = tutorials.map(tutorial => createTutorialCard(tutorial)).join('');
}

function createTutorialCard(tutorial) {
    const difficultyColors = {
        'beginner': 'success',
        'intermediate': 'warning',
        'advanced': 'danger'
    };
    
    const difficultyLabels = {
        'beginner': 'Iniciante',
        'intermediate': 'Intermediário',
        'advanced': 'Avançado'
    };
    
    const durationLabel = tutorial.duration < 60 ? 
        `${tutorial.duration} min` : 
        `${Math.floor(tutorial.duration / 60)}h ${tutorial.duration % 60}min`;
    
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 tutorial-card">
                <img src="../../assets/images/tutorials/${tutorial.image}" class="card-img-top" alt="${tutorial.title}">
                <div class="card-body d-flex flex-column">
                    <div class="tutorial-meta mb-2">
                        <span class="badge bg-${difficultyColors[tutorial.difficulty]} me-2">
                            ${difficultyLabels[tutorial.difficulty]}
                        </span>
                        <span class="badge bg-primary me-2">
                            <i class="fas fa-clock me-1"></i>${durationLabel}
                        </span>
                        ${tutorial.featured ? '<span class="badge bg-warning text-dark"><i class="fas fa-star me-1"></i>Destaque</span>' : ''}
                    </div>
                    
                    <h5 class="card-title">
                        <a href="${tutorial.slug}/" class="text-decoration-none">${tutorial.title}</a>
                    </h5>
                    
                    <p class="card-text flex-grow-1">${tutorial.description}</p>
                    
                    <div class="tutorial-stats mb-3">
                        <div class="row text-center">
                            <div class="col-4">
                                <div class="rating-display">
                                    <i class="fas fa-star text-warning"></i>
                                    <span class="small">${tutorial.rating}</span>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="completions-display">
                                    <i class="fas fa-users text-info"></i>
                                    <span class="small">${tutorial.completions}</span>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="steps-display">
                                    <i class="fas fa-list text-secondary"></i>
                                    <span class="small">${tutorial.steps.length} passos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="prerequisites mb-3">
                        <h6 class="small text-muted mb-1">Pré-requisitos:</h6>
                        <div class="prerequisites-tags">
                            ${tutorial.prerequisites.slice(0, 2).map(prereq => 
                                `<span class="badge bg-light text-dark me-1">${prereq}</span>`
                            ).join('')}
                            ${tutorial.prerequisites.length > 2 ? 
                                `<span class="badge bg-light text-dark">+${tutorial.prerequisites.length - 2}</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="mt-auto">
                        <div class="d-grid gap-2">
                            <a href="${tutorial.slug}/" class="btn btn-primary">
                                <i class="fas fa-play me-1"></i>Iniciar Tutorial
                            </a>
                            <div class="btn-group" role="group">
                                <button class="btn btn-outline-secondary btn-sm" onclick="bookmarkTutorial('${tutorial.id}')">
                                    <i class="fas fa-bookmark"></i>
                                </button>
                                <button class="btn btn-outline-secondary btn-sm" onclick="shareTutorial('${tutorial.id}')">
                                    <i class="fas fa-share"></i>
                                </button>
                                <button class="btn btn-outline-secondary btn-sm" onclick="showPrerequisites('${tutorial.id}')">
                                    <i class="fas fa-info"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPagination(totalTutorials) {
    const totalPages = Math.ceil(totalTutorials / tutorialsPerPage);
    const paginationContainer = document.getElementById('tutorials-pagination');
    
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changeTutorialPage(${currentPage - 1})" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changeTutorialPage(${i})">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changeTutorialPage(${currentPage + 1})" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

function loadLearningPaths() {
    const container = document.getElementById('learning-paths');
    if (!container) return;
    
    container.innerHTML = tutorialsData.learningPaths.map(path => `
        <a href="#" class="list-group-item list-group-item-action" onclick="showLearningPath('${path.id}')">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${path.name}</h6>
                <small class="text-muted">${path.estimatedTime} min</small>
            </div>
            <p class="mb-1 small">${path.description}</p>
            <small class="text-muted">
                <span class="badge bg-secondary">${path.difficulty}</span>
                ${path.tutorials.length} tutoriais
            </small>
        </a>
    `).join('');
}

function loadPopularTutorials() {
    const container = document.getElementById('popular-tutorials');
    if (!container) return;
    
    const popularTutorials = tutorialsData.tutorials
        .sort((a, b) => b.completions - a.completions)
        .slice(0, 5);
    
    container.innerHTML = popularTutorials.map(tutorial => `
        <a href="${tutorial.slug}/" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${tutorial.title}</h6>
                <small class="text-muted">
                    <i class="fas fa-star text-warning"></i> ${tutorial.rating}
                </small>
            </div>
            <p class="mb-1 small">${tutorial.description}</p>
            <small class="text-muted">
                <i class="fas fa-users"></i> ${tutorial.completions} completaram
            </small>
        </a>
    `).join('');
}

// Event handlers
function changeTutorialPage(page) {
    if (page < 1 || page > Math.ceil(filterTutorials().length / tutorialsPerPage)) return;
    
    currentPage = page;
    loadTutorials();
    
    // Scroll to top of tutorials
    document.getElementById('tutorials-grid').scrollIntoView({ behavior: 'smooth' });
}

function bookmarkTutorial(tutorialId) {
    // Simple bookmark functionality
    const bookmarks = JSON.parse(localStorage.getItem('tutorialBookmarks') || '[]');
    
    if (bookmarks.includes(tutorialId)) {
        const index = bookmarks.indexOf(tutorialId);
        bookmarks.splice(index, 1);
        alert('Tutorial removido dos favoritos!');
    } else {
        bookmarks.push(tutorialId);
        alert('Tutorial adicionado aos favoritos!');
    }
    
    localStorage.setItem('tutorialBookmarks', JSON.stringify(bookmarks));
}

function shareTutorial(tutorialId) {
    const tutorial = tutorialsData.tutorials.find(t => t.id === tutorialId);
    if (!tutorial) return;
    
    const url = `${window.location.origin}/blog/tutoriais/${tutorial.slug}/`;
    const text = `${tutorial.title} - ${tutorial.description}`;
    
    if (navigator.share) {
        navigator.share({
            title: tutorial.title,
            text: text,
            url: url
        });
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    }
}

function showPrerequisites(tutorialId) {
    const tutorial = tutorialsData.tutorials.find(t => t.id === tutorialId);
    if (!tutorial) return;
    
    const container = document.getElementById('prerequisites-helper');
    if (!container) return;
    
    container.innerHTML = `
        <h6 class="mb-2">${tutorial.title}</h6>
        <p class="small text-muted mb-2">Pré-requisitos necessários:</p>
        <ul class="small">
            ${tutorial.prerequisites.map(prereq => `<li>${prereq}</li>`).join('')}
        </ul>
        <p class="small text-muted">
            <strong>Duração:</strong> ${tutorial.duration} minutos<br>
            <strong>Dificuldade:</strong> ${tutorial.difficulty}
        </p>
    `;
}

function showLearningPath(pathId) {
    const path = tutorialsData.learningPaths.find(p => p.id === pathId);
    if (!path) return;
    
    alert(`Trilha: ${path.name}\n\n${path.description}\n\nTutoriais inclusos: ${path.tutorials.length}\nTempo estimado: ${path.estimatedTime} minutos`);
}

function submitTutorialSuggestion() {
    const form = document.getElementById('tutorial-suggestion-form');
    const title = document.getElementById('tutorial-title').value;
    const technology = document.getElementById('tutorial-technology').value;
    const description = document.getElementById('tutorial-description').value;
    const difficulty = document.getElementById('tutorial-difficulty').value;
    
    if (!title || !technology || !description || !difficulty) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Mock submission
    console.log('Tutorial suggestion:', {
        title,
        technology,
        description,
        difficulty,
        timestamp: new Date().toISOString()
    });
    
    alert('Obrigado pela sugestão! Analisaremos e entraremos em contato.');
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
    modal.hide();
    form.reset();
}

// Export for global access
window.tutorialsSystem = {
    bookmarkTutorial,
    shareTutorial,
    showPrerequisites,
    showLearningPath,
    changeTutorialPage,
    submitTutorialSuggestion
};