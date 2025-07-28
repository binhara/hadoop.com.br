/**
 * Technology Page Dynamic Content Handler
 * Portal Big Data - Matrix Theme
 */

// Technology data structure template
const technologyData = {
    // This will be populated with specific technology data
    id: '',
    name: '',
    category: '',
    description: '',
    detailedDescription: '',
    history: '',
    architecture: '',
    advantages: [],
    disadvantages: [],
    features: [],
    specifications: {},
    useCases: [],
    recommendedFor: [],
    considerAlternatives: [],
    installation: '',
    configuration: '',
    usage: '',
    relatedTechnologies: [],
    relatedCourses: [],
    comparison: [],
    tutorials: [],
    officialSite: '',
    github: '',
    documentation: '',
    community: '',
    version: '',
    license: '',
    language: '',
    firstRelease: '',
    lastUpdate: '',
    trending: false
};

/**
 * Initialize technology page with dynamic content
 */
function initTechnologyPage(techData) {
    if (!techData) {
        console.error('Technology data not provided');
        return;
    }

    // Update page title and meta information
    updatePageMeta(techData);
    
    // Populate overview tab
    populateOverviewTab(techData);
    
    // Populate features tab
    populateFeaturesTab(techData);
    
    // Populate use cases tab
    populateUseCasesTab(techData);
    
    // Populate examples tab
    populateExamplesTab(techData);
    
    // Populate comparison tab
    populateComparisonTab(techData);
    
    // Populate sidebar
    populateSidebar(techData);
    
    // Show trending badge if applicable
    if (techData.trending) {
        document.getElementById('trending-badge').style.display = 'inline-block';
    }
}

/**
 * Update page meta information
 */
function updatePageMeta(techData) {
    document.title = `${techData.name} - ${techData.category} | Portal Big Data`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `${techData.description} - Guia completo, casos de uso, instalação e comparações no Portal Big Data.`;
    }
}

/**
 * Populate overview tab content
 */
function populateOverviewTab(techData) {
    // Update detailed description
    const overviewTab = document.getElementById('overview');
    if (overviewTab) {
        overviewTab.querySelector('p').textContent = techData.detailedDescription || techData.description;
        
        // Update history section
        const historyContent = overviewTab.querySelector('h4:nth-of-type(2) + p');
        if (historyContent) {
            historyContent.textContent = techData.history || 'Informações sobre a história desta tecnologia serão adicionadas em breve.';
        }
        
        // Update architecture section
        const architectureContent = overviewTab.querySelector('h4:nth-of-type(3) + p');
        if (architectureContent) {
            architectureContent.textContent = techData.architecture || 'Informações sobre a arquitetura desta tecnologia serão adicionadas em breve.';
        }
    }
    
    // Populate advantages
    const advantagesList = document.getElementById('advantages-list');
    if (advantagesList && techData.advantages) {
        advantagesList.innerHTML = techData.advantages.map(advantage => `<li>${advantage}</li>`).join('');
    }
    
    // Populate disadvantages
    const disadvantagesList = document.getElementById('disadvantages-list');
    if (disadvantagesList && techData.disadvantages) {
        disadvantagesList.innerHTML = techData.disadvantages.map(disadvantage => `<li>${disadvantage}</li>`).join('');
    }
}

/**
 * Populate features tab content
 */
function populateFeaturesTab(techData) {
    // Populate features grid
    const featuresGrid = document.getElementById('features-grid');
    if (featuresGrid && techData.features) {
        featuresGrid.innerHTML = techData.features.map(feature => `
            <div class="col-md-6 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h6 class="card-title">${feature.name || feature}</h6>
                        <p class="card-text small">${feature.description || 'Descrição em breve.'}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Populate specifications table
    const specificationsTable = document.getElementById('specifications-table');
    if (specificationsTable && techData.specifications) {
        specificationsTable.innerHTML = Object.entries(techData.specifications).map(([key, value]) => `
            <tr>
                <td><strong>${key}:</strong></td>
                <td>${value}</td>
            </tr>
        `).join('');
    }
}

/**
 * Populate use cases tab content
 */
function populateUseCasesTab(techData) {
    // Populate use cases content
    const useCasesContent = document.getElementById('use-cases-content');
    if (useCasesContent && techData.useCases) {
        useCasesContent.innerHTML = techData.useCases.map(useCase => `
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="card-title">${useCase.title || useCase}</h6>
                    <p class="card-text">${useCase.description || 'Descrição detalhada em breve.'}</p>
                    ${useCase.example ? `<small class="text-muted">Exemplo: ${useCase.example}</small>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    // Populate recommended for list
    const recommendedFor = document.getElementById('recommended-for');
    if (recommendedFor && techData.recommendedFor) {
        recommendedFor.innerHTML = techData.recommendedFor.map(item => `<li>${item}</li>`).join('');
    }
    
    // Populate consider alternatives list
    const considerAlternatives = document.getElementById('consider-alternatives');
    if (considerAlternatives && techData.considerAlternatives) {
        considerAlternatives.innerHTML = techData.considerAlternatives.map(item => `<li>${item}</li>`).join('');
    }
}

/**
 * Populate examples tab content
 */
function populateExamplesTab(techData) {
    // Populate installation code
    const installationCode = document.getElementById('installation-code');
    if (installationCode) {
        installationCode.textContent = techData.installation || '# Instruções de instalação serão adicionadas em breve';
    }
    
    // Populate configuration code
    const configurationCode = document.getElementById('configuration-code');
    if (configurationCode) {
        configurationCode.textContent = techData.configuration || '# Exemplos de configuração serão adicionados em breve';
    }
    
    // Populate usage code
    const usageCode = document.getElementById('usage-code');
    if (usageCode) {
        usageCode.textContent = techData.usage || '# Exemplos de uso serão adicionados em breve';
    }
    
    // Populate related tutorials
    const relatedTutorials = document.getElementById('related-tutorials');
    if (relatedTutorials && techData.tutorials) {
        relatedTutorials.innerHTML = techData.tutorials.map(tutorial => `
            <div class="card mb-2">
                <div class="card-body py-2">
                    <h6 class="card-title mb-1">${tutorial.title}</h6>
                    <small class="text-muted">Nível: ${tutorial.level || 'Intermediário'}</small>
                    <a href="${tutorial.url}" class="btn btn-sm btn-outline-success ms-2">Ver Tutorial</a>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Populate comparison tab content
 */
function populateComparisonTab(techData) {
    // Populate comparison table
    const comparisonTable = document.getElementById('comparison-table');
    if (comparisonTable && techData.comparison) {
        comparisonTable.innerHTML = techData.comparison.map(tech => `
            <tr>
                <td><strong>${tech.name}</strong></td>
                <td>${getPerformanceStars(tech.performance)}</td>
                <td>${getPerformanceStars(tech.easeOfUse)}</td>
                <td>${getPerformanceStars(tech.community)}</td>
                <td><span class="badge bg-info">${tech.license}</span></td>
            </tr>
        `).join('');
    }
    
    // Populate decision matrix
    const decisionMatrix = document.getElementById('decision-matrix');
    if (decisionMatrix && techData.comparison) {
        decisionMatrix.innerHTML = `
            <div class="alert alert-info">
                <h6>💡 Dica de Escolha:</h6>
                <p>Use esta matriz para comparar as tecnologias baseado em seus requisitos específicos.</p>
            </div>
        `;
    }
}

/**
 * Populate sidebar content
 */
function populateSidebar(techData) {
    // Update quick facts
    updateQuickFacts(techData);
    
    // Update official links
    updateOfficialLinks(techData);
    
    // Populate related technologies
    populateRelatedTechnologies(techData);
    
    // Populate related courses
    populateRelatedCourses(techData);
    
    // Populate sponsored content
    populateSponsoredContent(techData);
}

/**
 * Update quick facts in sidebar
 */
function updateQuickFacts(techData) {
    const elements = {
        'current-version': techData.version || 'N/A',
        'license': techData.license || 'N/A',
        'language': techData.language || 'N/A',
        'first-release': techData.firstRelease || 'N/A',
        'last-update': techData.lastUpdate || 'N/A'
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

/**
 * Update official links in sidebar
 */
function updateOfficialLinks(techData) {
    const links = [
        { selector: 'a[href="[OFFICIAL_SITE]"]', url: techData.officialSite },
        { selector: 'a[href="[GITHUB_URL]"]', url: techData.github },
        { selector: 'a[href="[DOCUMENTATION_URL]"]', url: techData.documentation },
        { selector: 'a[href="[COMMUNITY_URL]"]', url: techData.community }
    ];
    
    links.forEach(link => {
        const element = document.querySelector(link.selector);
        if (element && link.url) {
            element.href = link.url;
        } else if (element) {
            element.style.display = 'none';
        }
    });
}

/**
 * Populate related technologies
 */
function populateRelatedTechnologies(techData) {
    const relatedTechnologies = document.getElementById('related-technologies');
    if (relatedTechnologies && techData.relatedTechnologies) {
        relatedTechnologies.innerHTML = techData.relatedTechnologies.map(tech => `
            <a href="../${tech.category}/${tech.id}/" class="btn btn-outline-success btn-sm mb-2 me-2">
                ${tech.name}
            </a>
        `).join('');
    }
}

/**
 * Populate related courses
 */
function populateRelatedCourses(techData) {
    const relatedCourses = document.getElementById('related-courses');
    if (relatedCourses && techData.relatedCourses) {
        relatedCourses.innerHTML = techData.relatedCourses.map(course => `
            <div class="card mb-2">
                <div class="card-body py-2">
                    <h6 class="card-title mb-1">${course.title}</h6>
                    <small class="text-muted">${course.level} • ${course.duration}</small>
                    <a href="../../cursos/${course.id}/" class="btn btn-sm btn-primary mt-1">Ver Curso</a>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Populate sponsored content
 */
function populateSponsoredContent(techData) {
    const sponsoredContent = document.getElementById('sponsored-content');
    if (sponsoredContent) {
        // Default sponsored content - can be customized per technology
        sponsoredContent.innerHTML = `
            <div class="text-center">
                <p class="small mb-2">Aprenda mais sobre Big Data:</p>
                <a href="https://dssbr.com.br" target="_blank" class="btn btn-warning btn-sm mb-2 d-block">
                    📊 Data Science & Big Data
                </a>
                <a href="https://gubigdata.com.br" target="_blank" class="btn btn-warning btn-sm mb-2 d-block">
                    🎓 Cursos Especializados
                </a>
                <a href="https://oworkshop.com.br" target="_blank" class="btn btn-warning btn-sm d-block">
                    🛠️ Workshops Práticos
                </a>
            </div>
        `;
    }
}

/**
 * Helper function to generate performance stars
 */
function getPerformanceStars(rating) {
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return `<span class="text-warning">${stars}</span>`;
}

/**
 * Add smooth scrolling to tab navigation
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling when tabs are clicked
    const tabButtons = document.querySelectorAll('#techTabs button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Smooth scroll to top of content area
            document.querySelector('#techTabsContent').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Add copy functionality to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-outline-success position-absolute top-0 end-0 m-2';
        button.innerHTML = '📋 Copiar';
        button.onclick = () => {
            navigator.clipboard.writeText(block.textContent);
            button.innerHTML = '✅ Copiado!';
            setTimeout(() => {
                button.innerHTML = '📋 Copiar';
            }, 2000);
        };
        
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(button);
    });
});

// Export for use in specific technology pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initTechnologyPage, technologyData };
}