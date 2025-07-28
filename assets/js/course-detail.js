/**
 * Course Detail Page Dynamic Content Handler
 * Portal Big Data - Matrix Theme
 */

// Enhanced course detail data structure
const courseDetailData = {
    // Basic course information
    id: '',
    title: '',
    description: '',
    detailedDescription: '',
    category: '',
    level: '',
    duration: '',
    price: '',
    priceDisplay: '',
    
    // Instructor information
    instructor: {
        name: '',
        title: '',
        bio: '',
        rating: 0,
        students: 0,
        courses: 0,
        image: '',
        experience: '',
        certifications: [],
        socialLinks: {
            linkedin: '',
            github: '',
            twitter: ''
        }
    },
    
    // Course metrics
    rating: 0,
    students: 0,
    featured: false,
    lastUpdated: '',
    datePublished: '',
    
    // Course content
    technologies: [],
    prerequisites: [],
    learningObjectives: [],
    targetAudience: [],
    courseOutcomes: [],
    
    // Enhanced module structure
    modules: [],
    totalLessons: 0,
    totalQuizzes: 0,
    totalProjects: 0,
    
    // Prerequisites and suggestions system
    prerequisiteCourses: [],
    suggestedNextCourses: [],
    complementaryCourses: [],
    
    // Reviews and ratings
    reviews: [],
    ratingBreakdown: {
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    },
    
    // Course logistics
    enrollmentUrl: '',
    certificationType: '',
    accessDuration: '',
    supportLevel: '',
    language: 'pt-BR',
    subtitles: [],
    
    // Related content
    relatedCourses: [],
    relatedTechnologies: [],
    
    // Course features
    features: [],
    requirements: {
        system: [],
        software: [],
        hardware: []
    }
};

/**
 * Initialize course detail page with dynamic content
 */
function initCourseDetailPage(courseData) {
    if (!courseData) {
        console.error('Course data not provided');
        return;
    }

    // Update page meta information
    updatePageMeta(courseData);
    
    // Populate header section
    populateHeader(courseData);
    
    // Populate overview tab
    populateOverviewTab(courseData);
    
    // Populate curriculum tab
    populateCurriculumTab(courseData);
    
    // Populate instructor tab
    populateInstructorTab(courseData);
    
    // Populate reviews tab
    populateReviewsTab(courseData);
    
    // Populate related courses
    populateRelatedCourses(courseData);
    
    // Show featured badge if applicable
    if (courseData.featured) {
        document.getElementById('featured-badge').style.display = 'inline-block';
    }
}

/**
 * Update page meta information
 */
function updatePageMeta(courseData) {
    document.title = `${courseData.title} - Cursos | Portal Big Data`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `${courseData.description} - Curso especializado em Big Data no Portal Big Data.`;
    }
}

/**
 * Populate header section
 */
function populateHeader(courseData) {
    // Update badges
    document.getElementById('level-badge').textContent = capitalizeFirst(courseData.level);
    document.getElementById('price-badge').textContent = courseData.priceDisplay;
    document.getElementById('category-badge').textContent = capitalizeFirst(courseData.category);
    
    // Update rating stars
    const ratingStars = document.getElementById('rating-stars');
    if (ratingStars) {
        ratingStars.innerHTML = generateStars(courseData.rating);
    }
    
    // Update stats
    document.getElementById('rating-value').textContent = courseData.rating;
    document.getElementById('students-count').textContent = courseData.students.toLocaleString();
    document.getElementById('duration').textContent = courseData.duration;
    
    // Update enrollment URL
    const enrollmentLink = document.querySelector('a[href="[ENROLLMENT_URL]"]');
    if (enrollmentLink) {
        enrollmentLink.href = courseData.enrollmentUrl;
    }
}

/**
 * Populate overview tab content with enhanced features
 */
function populateOverviewTab(courseData) {
    // Learning objectives
    const learningObjectives = document.getElementById('learning-objectives');
    if (learningObjectives && courseData.learningObjectives && courseData.learningObjectives.length > 0) {
        learningObjectives.innerHTML = `
            <ul class="list-group list-group-flush">
                ${courseData.learningObjectives.map(objective => 
                    `<li class="list-group-item bg-transparent text-success border-success">✅ ${objective}</li>`
                ).join('')}
            </ul>
        `;
    } else {
        learningObjectives.innerHTML = generateDefaultLearningObjectives(courseData.category, courseData.level);
    }
    
    // Prerequisites with course suggestions
    const prerequisites = document.getElementById('prerequisites');
    if (prerequisites) {
        let prerequisitesHtml = '';
        
        // Basic prerequisites
        if (courseData.prerequisites && courseData.prerequisites.length > 0) {
            prerequisitesHtml += `
                <div class="basic-prerequisites mb-3">
                    <h6>📋 Conhecimentos Necessários:</h6>
                    <ul class="list-group list-group-flush">
                        ${courseData.prerequisites.map(prereq => 
                            `<li class="list-group-item bg-transparent text-warning border-warning">⚠️ ${prereq}</li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Prerequisite courses
        if (courseData.prerequisiteCourses && courseData.prerequisiteCourses.length > 0) {
            prerequisitesHtml += `
                <div class="prerequisite-courses">
                    <h6>📚 Cursos Recomendados Antes:</h6>
                    <div class="row">
                        ${courseData.prerequisiteCourses.map(course => `
                            <div class="col-md-6 mb-2">
                                <div class="card bg-dark border-warning">
                                    <div class="card-body py-2">
                                        <h6 class="card-title mb-1">${course.title}</h6>
                                        <small class="text-muted">${course.description}</small>
                                        <div class="mt-2">
                                            <a href="../cursos/${course.id}/" class="btn btn-outline-warning btn-sm">Ver Curso</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        prerequisites.innerHTML = prerequisitesHtml || generateDefaultPrerequisites(courseData.category, courseData.level);
    }
    
    // Technologies with links
    const technologies = document.getElementById('technologies');
    if (technologies && courseData.technologies && courseData.technologies.length > 0) {
        technologies.innerHTML = courseData.technologies.map(tech => {
            const techSlug = tech.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            return `<a href="../tecnologias/${getCategoryByTech(tech)}/${techSlug}/" class="badge bg-info me-2 mb-2 text-decoration-none">${tech}</a>`;
        }).join('');
    }
    
    // Enhanced detailed description
    const detailedDescription = document.getElementById('detailed-description');
    if (detailedDescription) {
        let descriptionHtml = courseData.detailedDescription || courseData.description;
        
        // Add target audience if available
        if (courseData.targetAudience && courseData.targetAudience.length > 0) {
            descriptionHtml += `
                <div class="target-audience mt-4">
                    <h5>🎯 Para Quem é Este Curso</h5>
                    <ul>
                        ${courseData.targetAudience.map(audience => `<li>${audience}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Add course outcomes if available
        if (courseData.courseOutcomes && courseData.courseOutcomes.length > 0) {
            descriptionHtml += `
                <div class="course-outcomes mt-4">
                    <h5>🏆 O Que Você Será Capaz de Fazer</h5>
                    <ul>
                        ${courseData.courseOutcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Add course features if available
        if (courseData.features && courseData.features.length > 0) {
            descriptionHtml += `
                <div class="course-features mt-4">
                    <h5>✨ Recursos do Curso</h5>
                    <div class="row">
                        ${courseData.features.map(feature => `
                            <div class="col-md-6 mb-2">
                                <span class="badge bg-success me-2">✓</span>${feature}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        detailedDescription.innerHTML = descriptionHtml;
    }
    
    // Update course info table with enhanced information
    document.getElementById('course-level').textContent = capitalizeFirst(courseData.level);
    document.getElementById('course-duration').textContent = courseData.duration;
    document.getElementById('course-category').textContent = capitalizeFirst(courseData.category);
    document.getElementById('last-updated').textContent = courseData.lastUpdated || 'Recente';
    
    // Add suggested next courses section
    addSuggestedNextCourses(courseData);
}

/**
 * Add suggested next courses section to overview
 */
function addSuggestedNextCourses(courseData) {
    if (courseData.suggestedNextCourses && courseData.suggestedNextCourses.length > 0) {
        const overviewTab = document.getElementById('overview');
        const suggestedCoursesHtml = `
            <div class="suggested-next-courses mt-4">
                <div class="card">
                    <div class="card-header">
                        <h5>🚀 Próximos Passos Recomendados</h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted mb-3">Após concluir este curso, recomendamos continuar sua jornada com:</p>
                        <div class="row">
                            ${courseData.suggestedNextCourses.map(course => `
                                <div class="col-md-6 mb-3">
                                    <div class="card bg-dark border-success">
                                        <div class="card-body">
                                            <h6 class="card-title">${course.title}</h6>
                                            <p class="card-text small">${course.description}</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="badge bg-info">${capitalizeFirst(course.level)}</span>
                                                <a href="../cursos/${course.id}/" class="btn btn-outline-success btn-sm">Ver Curso</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        overviewTab.insertAdjacentHTML('beforeend', suggestedCoursesHtml);
    }
}

/**
 * Generate default learning objectives based on category and level
 */
function generateDefaultLearningObjectives(category, level) {
    const objectives = {
        'processamento': {
            'iniciante': [
                'Compreender os conceitos fundamentais de processamento distribuído',
                'Configurar e usar ferramentas básicas da categoria',
                'Desenvolver aplicações simples de processamento de dados',
                'Identificar casos de uso apropriados para a tecnologia'
            ],
            'intermediario': [
                'Implementar soluções de processamento de dados em escala',
                'Otimizar performance de aplicações distribuídas',
                'Integrar múltiplas ferramentas do ecossistema',
                'Resolver problemas complexos de processamento'
            ],
            'avancado': [
                'Arquitetar soluções enterprise de processamento distribuído',
                'Implementar otimizações avançadas de performance',
                'Desenvolver frameworks e bibliotecas customizadas',
                'Liderar projetos de migração e modernização'
            ]
        }
    };
    
    const categoryObjectives = objectives[category] || objectives['processamento'];
    const levelObjectives = categoryObjectives[level] || categoryObjectives['intermediario'];
    
    return `
        <ul class="list-group list-group-flush">
            ${levelObjectives.map(objective => 
                `<li class="list-group-item bg-transparent text-success border-success">✅ ${objective}</li>`
            ).join('')}
        </ul>
    `;
}

/**
 * Generate default prerequisites based on category and level
 */
function generateDefaultPrerequisites(category, level) {
    const prerequisites = {
        'processamento': {
            'iniciante': ['Conhecimentos básicos de programação', 'Familiaridade com linha de comando'],
            'intermediario': ['Programação intermediária', 'Conceitos de sistemas distribuídos', 'SQL básico'],
            'avancado': ['Programação avançada', 'Arquitetura de sistemas', 'Experiência com Big Data']
        },
        'streaming': {
            'iniciante': ['Programação básica', 'Conceitos de banco de dados'],
            'intermediario': ['Programação intermediária', 'Conhecimento de APIs', 'Conceitos de mensageria'],
            'avancado': ['Programação avançada', 'Arquitetura de microserviços', 'Experiência com sistemas distribuídos']
        }
    };
    
    const categoryPrereqs = prerequisites[category] || prerequisites['processamento'];
    const levelPrereqs = categoryPrereqs[level] || categoryPrereqs['intermediario'];
    
    return `
        <div class="basic-prerequisites">
            <h6>📋 Conhecimentos Necessários:</h6>
            <ul class="list-group list-group-flush">
                ${levelPrereqs.map(prereq => 
                    `<li class="list-group-item bg-transparent text-warning border-warning">⚠️ ${prereq}</li>`
                ).join('')}
            </ul>
        </div>
    `;
}

/**
 * Get technology category for linking
 */
function getCategoryByTech(tech) {
    const techCategories = {
        'Apache Spark': 'processamento',
        'Apache Kafka': 'streaming',
        'Apache Flink': 'streaming',
        'ClickHouse': 'data-warehousing',
        'Delta Lake': 'sistemas-arquivos',
        'Apache Airflow': 'orquestracao',
        'MLflow': 'machine-learning',
        'Apache Superset': 'visualizacao'
    };
    
    return techCategories[tech] || 'processamento';
}

/**
 * Populate curriculum tab content with enhanced module structure
 */
function populateCurriculumTab(courseData) {
    const courseModules = document.getElementById('course-modules');
    
    if (courseModules && courseData.modules && courseData.modules.length > 0) {
        // Add course summary stats
        const courseSummary = `
            <div class="row mb-4">
                <div class="col-md-3 text-center">
                    <div class="stat-card">
                        <div class="h4 text-success">${courseData.modules.length}</div>
                        <small>Módulos</small>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-card">
                        <div class="h4 text-success">${courseData.totalLessons || calculateTotalLessons(courseData.modules)}</div>
                        <small>Aulas</small>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-card">
                        <div class="h4 text-success">${courseData.totalQuizzes || calculateTotalQuizzes(courseData.modules)}</div>
                        <small>Quizzes</small>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-card">
                        <div class="h4 text-success">${courseData.totalProjects || calculateTotalProjects(courseData.modules)}</div>
                        <small>Projetos</small>
                    </div>
                </div>
            </div>
        `;
        
        const modulesHtml = courseData.modules.map((module, index) => `
            <div class="accordion mb-3" id="module-${index}">
                <div class="accordion-item bg-dark border-success">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed bg-dark text-success border-success" type="button" 
                                data-bs-toggle="collapse" data-bs-target="#collapse-${index}">
                            <div class="d-flex justify-content-between align-items-center w-100 me-3">
                                <div>
                                    <strong>Módulo ${index + 1}: ${module.title}</strong>
                                    ${module.description ? `<br><small class="text-muted">${module.description}</small>` : ''}
                                </div>
                                <div class="text-end">
                                    <span class="badge bg-info me-2">${module.duration || '2h'}</span>
                                    ${module.lessons ? `<span class="badge bg-secondary">${module.lessons.length} aulas</span>` : ''}
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div id="collapse-${index}" class="accordion-collapse collapse" data-bs-parent="#module-${index}">
                        <div class="accordion-body">
                            ${module.description ? `<p class="mb-3">${module.description}</p>` : ''}
                            
                            ${module.lessons && module.lessons.length > 0 ? `
                                <h6 class="mb-3">📚 Aulas do Módulo:</h6>
                                <div class="lessons-list mb-3">
                                    ${module.lessons.map((lesson, lessonIndex) => `
                                        <div class="lesson-item d-flex justify-content-between align-items-center py-2 border-bottom border-secondary">
                                            <div class="lesson-info">
                                                <span class="lesson-number text-muted me-2">${lessonIndex + 1}.</span>
                                                <span class="lesson-title">${lesson.title}</span>
                                                ${lesson.type ? `<span class="badge bg-outline-info ms-2">${lesson.type}</span>` : ''}
                                            </div>
                                            <div class="lesson-meta">
                                                ${lesson.duration ? `<small class="text-muted">${lesson.duration}</small>` : ''}
                                                ${lesson.preview ? `<span class="badge bg-warning ms-2">👁️ Preview</span>` : ''}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                            
                            ${module.topics && module.topics.length > 0 ? `
                                <h6 class="mb-2">🎯 Tópicos Principais:</h6>
                                <div class="topics-grid mb-3">
                                    ${module.topics.map(topic => `
                                        <span class="badge bg-success me-1 mb-1">${topic}</span>
                                    `).join('')}
                                </div>
                            ` : ''}
                            
                            ${module.learningObjectives && module.learningObjectives.length > 0 ? `
                                <h6 class="mb-2">✅ Objetivos de Aprendizado:</h6>
                                <ul class="learning-objectives mb-3">
                                    ${module.learningObjectives.map(objective => `
                                        <li class="text-success">${objective}</li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                            
                            ${module.exercises ? `
                                <div class="alert alert-info mb-3">
                                    <h6 class="alert-heading">💻 Exercícios Práticos</h6>
                                    <p class="mb-0">${module.exercises}</p>
                                </div>
                            ` : ''}
                            
                            ${module.quiz ? `
                                <div class="alert alert-warning mb-3">
                                    <h6 class="alert-heading">📝 Quiz do Módulo</h6>
                                    <p class="mb-1">${module.quiz.description || 'Quiz para testar seus conhecimentos'}</p>
                                    <small class="text-muted">
                                        ${module.quiz.questions || 10} questões • 
                                        ${module.quiz.timeLimit || '15 minutos'} • 
                                        Nota mínima: ${module.quiz.passingScore || '70%'}
                                    </small>
                                </div>
                            ` : ''}
                            
                            ${module.project ? `
                                <div class="alert alert-success mb-0">
                                    <h6 class="alert-heading">🚀 Projeto Prático</h6>
                                    <p class="mb-1">${module.project.description}</p>
                                    <small class="text-muted">
                                        Tempo estimado: ${module.project.estimatedTime || '2-4 horas'} • 
                                        Dificuldade: ${module.project.difficulty || 'Intermediária'}
                                    </small>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        courseModules.innerHTML = courseSummary + modulesHtml;
    } else {
        courseModules.innerHTML = generateDefaultCurriculum(courseData);
    }
}

/**
 * Generate default curriculum when detailed modules are not available
 */
function generateDefaultCurriculum(courseData) {
    const defaultModules = generateDefaultModulesByCategory(courseData.category, courseData.level);
    
    return `
        <div class="alert alert-info mb-4">
            <h5>📚 Currículo Estruturado</h5>
            <p>Este curso segue uma estrutura pedagógica comprovada para ${courseData.category}. O currículo detalhado será disponibilizado em breve.</p>
        </div>
        
        <div class="default-curriculum">
            ${defaultModules.map((module, index) => `
                <div class="module-preview card mb-3">
                    <div class="card-body">
                        <h6 class="card-title">
                            <span class="module-number badge bg-primary me-2">${index + 1}</span>
                            ${module.title}
                        </h6>
                        <p class="card-text text-muted">${module.description}</p>
                        <div class="module-meta">
                            <span class="badge bg-info me-2">${module.duration}</span>
                            <span class="badge bg-secondary">${module.lessons} aulas</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Generate default modules based on course category and level
 */
function generateDefaultModulesByCategory(category, level) {
    const moduleTemplates = {
        'processamento': [
            { title: 'Introdução ao Processamento Distribuído', description: 'Conceitos fundamentais e arquiteturas', duration: '3h', lessons: 8 },
            { title: 'Configuração do Ambiente', description: 'Setup e configuração das ferramentas', duration: '2h', lessons: 5 },
            { title: 'Primeiros Programas', description: 'Desenvolvimento de aplicações básicas', duration: '4h', lessons: 10 },
            { title: 'Otimização e Performance', description: 'Técnicas avançadas de otimização', duration: '3h', lessons: 7 },
            { title: 'Projeto Final', description: 'Aplicação prática dos conceitos aprendidos', duration: '4h', lessons: 6 }
        ],
        'streaming': [
            { title: 'Fundamentos de Streaming', description: 'Conceitos de processamento em tempo real', duration: '3h', lessons: 9 },
            { title: 'Arquiteturas de Streaming', description: 'Padrões e melhores práticas', duration: '2h', lessons: 6 },
            { title: 'Implementação Prática', description: 'Desenvolvimento de pipelines de streaming', duration: '5h', lessons: 12 },
            { title: 'Monitoramento e Debugging', description: 'Ferramentas de observabilidade', duration: '2h', lessons: 5 },
            { title: 'Casos de Uso Avançados', description: 'Implementações complexas e otimizações', duration: '4h', lessons: 8 }
        ],
        'data-warehousing': [
            { title: 'Conceitos de Data Warehousing', description: 'Fundamentos e modelagem dimensional', duration: '3h', lessons: 8 },
            { title: 'Arquitetura e Design', description: 'Estruturas de dados e esquemas', duration: '3h', lessons: 7 },
            { title: 'ETL e Pipelines', description: 'Extração, transformação e carga de dados', duration: '4h', lessons: 10 },
            { title: 'Consultas e Otimização', description: 'SQL avançado e performance tuning', duration: '3h', lessons: 8 },
            { title: 'Governança e Segurança', description: 'Controle de acesso e qualidade de dados', duration: '2h', lessons: 5 }
        ]
    };
    
    return moduleTemplates[category] || moduleTemplates['processamento'];
}

/**
 * Calculate total lessons from modules
 */
function calculateTotalLessons(modules) {
    return modules.reduce((total, module) => {
        return total + (module.lessons ? module.lessons.length : 0);
    }, 0) || 25;
}

/**
 * Calculate total quizzes from modules
 */
function calculateTotalQuizzes(modules) {
    return modules.reduce((total, module) => {
        return total + (module.quiz ? 1 : 0);
    }, 0) || 5;
}

/**
 * Calculate total projects from modules
 */
function calculateTotalProjects(modules) {
    return modules.reduce((total, module) => {
        return total + (module.project ? 1 : 0);
    }, 0) || 3;
}

/**
 * Populate instructor tab content
 */
function populateInstructorTab(courseData) {
    if (courseData.instructor) {
        const instructor = courseData.instructor;
        
        // Update instructor info
        document.getElementById('instructor-name').textContent = instructor.name;
        document.getElementById('instructor-title').textContent = instructor.title || 'Especialista em Big Data';
        
        // Update instructor bio
        const instructorBio = document.getElementById('instructor-bio');
        if (instructorBio) {
            instructorBio.innerHTML = instructor.bio || 'Biografia do instrutor em breve.';
        }
        
        // Update instructor stats
        document.getElementById('instructor-rating').textContent = instructor.rating || '4.8';
        document.getElementById('instructor-students').textContent = (instructor.students || 5000).toLocaleString();
        document.getElementById('instructor-courses').textContent = instructor.courses || '12';
    }
}

/**
 * Populate reviews tab content
 */
function populateReviewsTab(courseData) {
    // Overall rating
    document.getElementById('overall-rating').textContent = courseData.rating;
    document.getElementById('overall-stars').innerHTML = generateStars(courseData.rating);
    document.getElementById('total-reviews').textContent = courseData.reviews?.length || '150';
    
    // Rating breakdown
    const ratingBreakdown = document.getElementById('rating-breakdown');
    if (ratingBreakdown) {
        const breakdown = generateRatingBreakdown(courseData.rating);
        ratingBreakdown.innerHTML = breakdown;
    }
    
    // Reviews list
    const reviewsList = document.getElementById('reviews-list');
    if (reviewsList && courseData.reviews && courseData.reviews.length > 0) {
        reviewsList.innerHTML = courseData.reviews.map(review => `
            <div class="review-item border-bottom border-success py-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <strong class="text-success">${review.author}</strong>
                        <div class="text-warning">${generateStars(review.rating)}</div>
                    </div>
                    <small class="text-muted">${review.date}</small>
                </div>
                <p class="mb-0">${review.comment}</p>
            </div>
        `).join('');
    } else {
        reviewsList.innerHTML = `
            <div class="alert alert-info">
                <h5>⭐ Avaliações em breve</h5>
                <p>Este curso ainda não possui avaliações. Seja o primeiro a avaliar após concluir o curso!</p>
            </div>
        `;
    }
}

/**
 * Populate related courses section
 */
function populateRelatedCourses(courseData) {
    const relatedCourses = document.getElementById('related-courses');
    if (relatedCourses && courseData.relatedCourses && courseData.relatedCourses.length > 0) {
        relatedCourses.innerHTML = courseData.relatedCourses.map(course => `
            <div class="col-md-4 mb-4">
                <div class="card course-card h-100">
                    <div class="card-body">
                        <h6 class="card-title">${course.title}</h6>
                        <p class="card-text small">${course.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-info">${capitalizeFirst(course.level)}</span>
                            <small class="text-muted">${course.duration}</small>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="../cursos/${course.id}/" class="btn btn-outline-success btn-sm">Ver Curso</a>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        relatedCourses.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    <p class="mb-0">Cursos relacionados serão sugeridos em breve baseados no seu perfil e interesses.</p>
                </div>
            </div>
        `;
    }
}

/**
 * Generate star rating HTML
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

/**
 * Generate rating breakdown HTML
 */
function generateRatingBreakdown(overallRating) {
    // Simulate rating distribution based on overall rating
    const distribution = {
        5: Math.round(overallRating * 15),
        4: Math.round((5 - overallRating) * 10 + 20),
        3: Math.round((5 - overallRating) * 5 + 10),
        2: Math.round((5 - overallRating) * 3 + 5),
        1: Math.round((5 - overallRating) * 2 + 2)
    };
    
    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(distribution).reverse().map(([stars, count]) => {
        const percentage = total > 0 ? (count / total) * 100 : 0;
        return `
            <div class="d-flex align-items-center mb-1">
                <span class="me-2">${stars} ★</span>
                <div class="progress flex-grow-1 me-2" style="height: 8px;">
                    <div class="progress-bar bg-warning" style="width: ${percentage}%"></div>
                </div>
                <small class="text-muted">${count}</small>
            </div>
        `;
    }).join('');
}

/**
 * Add course to wishlist
 */
function addToWishlist(courseId) {
    // Get existing wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('courseWishlist') || '[]');
    
    // Check if course is already in wishlist
    if (wishlist.includes(courseId)) {
        alert('Este curso já está na sua lista de desejos!');
        return;
    }
    
    // Add course to wishlist
    wishlist.push(courseId);
    localStorage.setItem('courseWishlist', JSON.stringify(wishlist));
    
    // Update button text temporarily
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '✅ Adicionado!';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
    
    alert('Curso adicionado à sua lista de desejos!');
}

/**
 * Utility function to capitalize first letter
 */
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Add smooth scrolling to tab navigation
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling when tabs are clicked
    const tabButtons = document.querySelectorAll('#courseTabs button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Smooth scroll to top of content area
            document.querySelector('#courseTabsContent').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Initialize enrollment tracking
    const enrollmentLinks = document.querySelectorAll('a[href*="enrollment"]');
    enrollmentLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track enrollment click (could be sent to analytics)
            console.log('Enrollment clicked for course:', window.location.pathname);
        });
    });
});

// Make addToWishlist available globally
window.addToWishlist = addToWishlist;

// Export for use in specific course pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initCourseDetailPage, courseDetailData };
}