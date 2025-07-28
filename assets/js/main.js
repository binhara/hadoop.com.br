/**
 * Portal Big Data - Main JavaScript
 * Matrix Theme Implementation and Core Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Matrix theme effects
    initMatrixEffects();
    
    // Initialize responsive navigation
    initNavigation();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
});

/**
 * Initialize Matrix visual effects
 */
function initMatrixEffects() {
    // Add matrix rain background effect
    createMatrixRain();
    
    // Add typing effect for headers (will be enhanced in later tasks)
    addTypingEffect();
}

/**
 * Create Matrix rain background effect
 */
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);
    
    // Matrix characters to use in the rain effect
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Create multiple columns of falling characters
    for (let i = 0; i < 10; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-rain-column';
        
        // Generate random characters for this column
        let columnText = '';
        for (let j = 0; j < 20; j++) {
            columnText += matrixChars.charAt(Math.floor(Math.random() * matrixChars.length)) + '<br>';
        }
        column.innerHTML = columnText;
        
        matrixContainer.appendChild(column);
    }
    
    // Add background pattern
    const matrixBackground = document.createElement('div');
    matrixBackground.className = 'matrix-background';
    document.body.appendChild(matrixBackground);
}

/**
 * Add typing effect to headers
 */
function addTypingEffect() {
    const headers = document.querySelectorAll('h1, h2');
    headers.forEach(header => {
        const text = header.textContent;
        header.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                header.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    });
}

/**
 * Initialize responsive navigation
 */
function initNavigation() {
    // Handle mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Add active state to current page navigation
    highlightCurrentPage();
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize performance optimizations
 */
function initPerformanceOptimizations() {
    // Initialize Core Web Vitals optimization
    initCoreWebVitals();
    
    // Initialize image optimization system
    initImageOptimization();
    
    // Initialize asset compression
    initAssetCompression();
    
    // Initialize CDN management
    initCDNManagement();
    
    // Preload critical resources
    preloadCriticalResources();
}

/**
 * Initialize Core Web Vitals optimization
 */
function initCoreWebVitals() {
    // Core Web Vitals optimizer is automatically initialized
    // This function provides integration and monitoring
    
    if (window.coreWebVitalsOptimizer) {
        console.log('✅ Core Web Vitals optimizer initialized');
        
        // Monitor metrics in development
        if (window.OptimizationConfig?.development?.debug) {
            setTimeout(() => {
                const metrics = window.coreWebVitalsOptimizer.getMetrics();
                console.log('📊 Current Core Web Vitals:', metrics);
            }, 5000);
        }
    }
    
    // Initialize performance monitor in development
    if (window.OptimizationConfig?.development?.debug && window.PerformanceMonitor) {
        if (!window.performanceMonitor) {
            window.performanceMonitor = new window.PerformanceMonitor();
            console.log('📈 Performance Monitor initialized. Press Ctrl+Shift+P to toggle.');
        }
    }
    
    // Optimize critical rendering path
    optimizeCriticalRenderingPath();
    
    // Handle long tasks
    handleLongTasks();
    
    // Optimize user interactions
    optimizeUserInteractions();
}

/**
 * Initialize image optimization system
 */
function initImageOptimization() {
    // Image optimization is handled by image-optimization.js
    // This function ensures compatibility with existing code
    
    // Convert existing lazy images to new format
    const legacyLazyImages = document.querySelectorAll('img.lazy');
    legacyLazyImages.forEach(img => {
        if (img.src && !img.dataset.src) {
            img.dataset.src = img.src;
            img.src = '';
        }
    });
}

/**
 * Initialize asset compression
 */
function initAssetCompression() {
    // Asset compression is handled by asset-compression.js
    // This function provides integration points
    
    // Monitor compression performance
    if (window.assetCompressor) {
        setTimeout(() => {
            const stats = window.assetCompressor.getCompressionStats();
            console.debug('Asset optimization stats:', stats);
        }, 3000);
    }
}

/**
 * Initialize CDN management
 */
function initCDNManagement() {
    // CDN management is handled by cdn-config.js
    // This function provides fallback handling
    
    // Handle CDN failures
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG' && window.cdnManager) {
            const fallbackUrl = window.cdnManager.handleCDNFailure(e.target.src);
            if (fallbackUrl !== e.target.src) {
                e.target.src = fallbackUrl;
            }
        }
    }, true);
}

/**
 * Preload critical resources
 */
function preloadCriticalResources() {
    // Preload critical CSS and fonts
    const criticalResources = [
        'assets/css/matrix-theme.css',
        'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

/**
 * Optimize critical rendering path
 */
function optimizeCriticalRenderingPath() {
    // Defer non-critical CSS
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    nonCriticalCSS.forEach(link => {
        if (!isCriticalResource(link.href)) {
            link.media = 'print';
            link.onload = function() { this.media = 'all'; };
        }
    });
    
    // Defer non-critical JavaScript
    const scripts = document.querySelectorAll('script[src]:not([data-critical])');
    scripts.forEach(script => {
        if (!isCriticalResource(script.src)) {
            script.defer = true;
        }
    });
}

/**
 * Handle long tasks to improve FID
 */
function handleLongTasks() {
    // Break up initialization into smaller tasks
    const tasks = [
        () => initMatrixEffects(),
        () => initNavigation(),
        () => initImageOptimization(),
        () => initAssetCompression(),
        () => initCDNManagement()
    ];
    
    // Use scheduler.postTask if available, fallback to setTimeout
    const scheduleTask = (callback, priority = 'user-blocking') => {
        if ('scheduler' in window && 'postTask' in scheduler) {
            scheduler.postTask(callback, { priority });
        } else {
            setTimeout(callback, 0);
        }
    };
    
    // Execute tasks with proper scheduling
    tasks.forEach((task, index) => {
        const priority = index === 0 ? 'user-blocking' : 'background';
        scheduleTask(task, priority);
    });
}

/**
 * Optimize user interactions for better FID
 */
function optimizeUserInteractions() {
    // Debounce scroll events
    let scrollTimeout;
    const debouncedScrollHandler = (handler) => {
        return function(event) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => handler.call(this, event), 16); // ~60fps
        };
    };
    
    // Throttle resize events
    let resizeTimeout;
    const throttledResizeHandler = (handler) => {
        return function(event) {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                    handler.call(this, event);
                    resizeTimeout = null;
                }, 100);
            }
        };
    };
    
    // Apply optimized event handlers
    window.addEventListener('scroll', debouncedScrollHandler(() => {
        // Handle scroll events efficiently
    }), { passive: true });
    
    window.addEventListener('resize', throttledResizeHandler(() => {
        // Handle resize events efficiently
    }));
    
    // Optimize click handlers with event delegation
    document.addEventListener('click', (event) => {
        // Handle clicks with minimal processing
        if (event.target.matches('.btn, button, a')) {
            // Schedule non-critical processing
            setTimeout(() => {
                handleInteraction(event);
            }, 0);
        }
    });
}

/**
 * Handle user interactions efficiently
 */
function handleInteraction(event) {
    // Process user interactions without blocking the main thread
    const target = event.target;
    
    if (target.matches('.btn-pill')) {
        // Handle pill button interactions
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            target.style.transform = '';
        }, 150);
    }
}

/**
 * Check if a resource is critical for initial render
 */
function isCriticalResource(url) {
    const criticalPatterns = [
        'matrix-theme.css',
        'bootstrap.min.css',
        'core-web-vitals.js',
        'main.js',
        'critical.css'
    ];
    
    return criticalPatterns.some(pattern => url.includes(pattern));
}

/**
 * Utility functions for future tasks
 */

// Search functionality (to be implemented in later tasks)
function initSearch() {
    // Placeholder for search implementation
}

// Course filtering (to be implemented in later tasks)
function initCourseFilters() {
    // Placeholder for course filtering implementation
}

// Analytics tracking (to be implemented in later tasks)
function initAnalytics() {
    // Placeholder for analytics implementation
}

// Form validation (to be implemented in later tasks)
function initFormValidation() {
    // Placeholder for form validation implementation
}
/*
*
 * Landing Page Specific Functions
 */

// Initialize landing page functionality
function initLandingPage() {
    initNewsletterForm();
    initSearchToggle();
    initPillAnimations();
}

/**
 * Initialize newsletter form
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                email: document.getElementById('email').value,
                interest: document.getElementById('interest').value,
                privacy: document.getElementById('privacy').checked
            };
            
            // Validate form
            if (!formData.firstName || !formData.email || !formData.interest || !formData.privacy) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            showNotification('Inscrição realizada com sucesso! Obrigado por se juntar à nossa comunidade.', 'success');
            form.reset();
        });
    }
}

/**
 * Initialize search toggle functionality
 */
function initSearchToggle() {
    // Create search overlay if it doesn't exist
    if (!document.querySelector('.search-overlay')) {
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.innerHTML = `
            <div class="search-container">
                <h3 class="text-success mb-3">Buscar no Portal</h3>
                <input type="text" class="search-input" placeholder="Digite sua busca..." id="searchInput">
                <div class="mt-3 text-center">
                    <button class="btn btn-success me-2" onclick="performSearch()">Buscar</button>
                    <button class="btn btn-outline-success" onclick="closeSearch()">Fechar</button>
                </div>
            </div>
        `;
        document.body.appendChild(searchOverlay);
    }
}

/**
 * Toggle search overlay
 */
function toggleSearch() {
    const overlay = document.querySelector('.search-overlay');
    if (overlay) {
        overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
        if (overlay.style.display === 'flex') {
            document.getElementById('searchInput').focus();
        }
    }
}

/**
 * Close search overlay
 */
function closeSearch() {
    const overlay = document.querySelector('.search-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

/**
 * Perform search (placeholder implementation)
 */
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim()) {
        // Redirect to search results page (to be implemented in later tasks)
        window.location.href = `/buscar?q=${encodeURIComponent(searchTerm)}`;
    }
}

/**
 * Initialize pill animations
 */
function initPillAnimations() {
    const pills = document.querySelectorAll('.btn-pill');
    pills.forEach(pill => {
        pill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        pill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 400px;';
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

// Initialize landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLandingPage();
});

// Handle escape key for search overlay
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
    }
});

// Handle enter key in search input
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.id === 'searchInput') {
        performSearch();
    }
});