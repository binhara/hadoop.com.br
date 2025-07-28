// Case Study Detail Page Functionality
class CaseStudyDetail {
    constructor(caseStudyData) {
        this.caseStudy = caseStudyData;
        this.init();
    }

    init() {
        this.loadRelatedCaseStudies();
        this.setupDownloadTracking();
        this.setupSocialSharing();
    }

    loadRelatedCaseStudies() {
        // Sample related case studies - in a real implementation, this would come from an API
        const relatedCases = [
            {
                id: 'related-case-1',
                title: 'Implementação de Data Lake na Indústria Financeira',
                company: 'Itaú Unibanco',
                technology: 'Delta Lake'
            },
            {
                id: 'related-case-2',
                title: 'Analytics em Tempo Real para E-commerce',
                company: 'Mercado Livre',
                technology: 'Apache Kafka'
            },
            {
                id: 'related-case-3',
                title: 'Migração para Cloud Data Warehouse',
                company: 'Bradesco',
                technology: 'Snowflake'
            }
        ];

        const container = document.getElementById('relatedCaseStudies');
        if (!container) return;

        container.innerHTML = relatedCases.map(caseStudy => `
            <div class="related-case-item mb-3 p-3 border border-success rounded">
                <h6 class="text-success mb-1">
                    <a href="${caseStudy.id}.html" class="text-success text-decoration-none">
                        ${caseStudy.title}
                    </a>
                </h6>
                <small class="text-muted">${caseStudy.company}</small>
                <br>
                <span class="tech-badge mt-1">${caseStudy.technology}</span>
            </div>
        `).join('');
    }

    setupDownloadTracking() {
        // Track all download buttons
        document.querySelectorAll('[onclick*="download"]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.trackDownload(e.target.textContent);
            });
        });
    }

    setupSocialSharing() {
        // Add social sharing buttons if not present
        const shareContainer = document.querySelector('.case-study-actions');
        if (shareContainer && !shareContainer.querySelector('.social-share')) {
            const socialShare = document.createElement('div');
            socialShare.className = 'social-share mt-2';
            socialShare.innerHTML = `
                <small class="text-muted d-block mb-2">Compartilhar:</small>
                <div class="btn-group" role="group">
                    <button class="btn btn-outline-success btn-sm" onclick="shareOnLinkedIn()">
                        <i class="fab fa-linkedin"></i>
                    </button>
                    <button class="btn btn-outline-success btn-sm" onclick="shareOnTwitter()">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button class="btn btn-outline-success btn-sm" onclick="copyLink()">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
            `;
            shareContainer.appendChild(socialShare);
        }
    }

    trackDownload(resourceName) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'case_study_resource',
                'event_label': `${this.caseStudy.id}_${resourceName}`,
                'value': 1
            });
        }

        // Console log for development
        console.log(`Download tracked: ${this.caseStudy.id} - ${resourceName}`);
    }

    trackShare(platform) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                'event_category': 'case_study',
                'event_label': `${this.caseStudy.id}_${platform}`,
                'value': 1
            });
        }

        console.log(`Share tracked: ${this.caseStudy.id} - ${platform}`);
    }
}

// Global functions for template usage
function initializeCaseStudyDetail(caseStudyData) {
    window.caseStudyDetail = new CaseStudyDetail(caseStudyData);
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    if (window.caseStudyDetail) {
        window.caseStudyDetail.trackShare('linkedin');
    }
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Confira este estudo de caso interessante: ${document.title}`);
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=BigData,Hadoop`;
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    if (window.caseStudyDetail) {
        window.caseStudyDetail.trackShare('twitter');
    }
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        // Show success message
        const button = event.target.closest('button');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('btn-success');
        button.classList.remove('btn-outline-success');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('btn-success');
            button.classList.add('btn-outline-success');
        }, 2000);
        
        if (window.caseStudyDetail) {
            window.caseStudyDetail.trackShare('copy_link');
        }
    }).catch(() => {
        alert('Não foi possível copiar o link. Tente novamente.');
    });
}

// Resource download simulation
function simulateResourceDownload(resourceName, resourceSize) {
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = '#';
    link.download = resourceName;
    
    // Show download progress (simulation)
    const progressModal = document.createElement('div');
    progressModal.className = 'modal fade';
    progressModal.innerHTML = `
        <div class="modal-dialog modal-sm">
            <div class="modal-content bg-dark border-success">
                <div class="modal-header border-success">
                    <h6 class="modal-title text-success">Download em Progresso</h6>
                </div>
                <div class="modal-body text-center">
                    <div class="spinner-border text-success mb-3" role="status">
                        <span class="visually-hidden">Baixando...</span>
                    </div>
                    <p class="text-light">${resourceName}</p>
                    <small class="text-muted">${resourceSize}</small>
                    <div class="progress mt-3">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(progressModal);
    const modal = new bootstrap.Modal(progressModal);
    modal.show();
    
    // Simulate progress
    const progressBar = progressModal.querySelector('.progress-bar');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                modal.hide();
                document.body.removeChild(progressModal);
                
                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success alert-dismissible fade show position-fixed';
                successAlert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
                successAlert.innerHTML = `
                    <i class="fas fa-check-circle"></i> Download concluído: ${resourceName}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                document.body.appendChild(successAlert);
                
                setTimeout(() => {
                    if (document.body.contains(successAlert)) {
                        document.body.removeChild(successAlert);
                    }
                }, 5000);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 200);
}

// Enhanced download functions
function downloadResource(resourceName, resourceSize) {
    simulateResourceDownload(resourceName, resourceSize);
    
    if (window.caseStudyDetail) {
        window.caseStudyDetail.trackDownload(resourceName);
    }
}

// Print functionality
function printCaseStudy() {
    window.print();
}

// Bookmark functionality
function bookmarkCaseStudy() {
    if (window.external && window.external.AddFavorite) {
        // Internet Explorer
        window.external.AddFavorite(window.location.href, document.title);
    } else {
        // Other browsers
        alert('Para adicionar aos favoritos, use Ctrl+D (Windows) ou Cmd+D (Mac)');
    }
}

// Reading time calculator
function calculateReadingTime() {
    const content = document.querySelector('.case-study-content');
    if (!content) return;
    
    const text = content.textContent || content.innerText;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    
    // Add reading time to page
    const readingTimeElement = document.createElement('small');
    readingTimeElement.className = 'text-muted';
    readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min de leitura`;
    
    const header = document.querySelector('.case-study-header-detail .case-study-meta');
    if (header) {
        header.appendChild(readingTimeElement);
    }
}

// Initialize reading time calculation when DOM is loaded
document.addEventListener('DOMContentLoaded', calculateReadingTime);