/**
 * Core Web Vitals Optimization System
 * Implements optimizations for LCP, FID, CLS and continuous monitoring
 */

class CoreWebVitalsOptimizer {
    constructor() {
        this.metrics = {
            lcp: null,
            fid: null,
            cls: null,
            ttfb: null,
            fcp: null
        };
        
        this.thresholds = {
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 },
            ttfb: { good: 800, poor: 1800 },
            fcp: { good: 1800, poor: 3000 }
        };
        
        this.observers = new Map();
        this.isMonitoring = false;
        this.reportingInterval = null;
        
        this.init();
    }
    
    init() {
        // Initialize optimizations immediately
        this.optimizeLCP();
        this.optimizeFID();
        this.optimizeCLS();
        
        // Start monitoring after page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startMonitoring());
        } else {
            this.startMonitoring();
        }
    }
    
    /**
     * Optimize Largest Contentful Paint (LCP)
     */
    optimizeLCP() {
        // 1. Preload critical resources
        this.preloadCriticalResources();
        
        // 2. Optimize images for LCP
        this.optimizeLCPImages();
        
        // 3. Minimize render-blocking resources
        this.minimizeRenderBlocking();
        
        // 4. Implement resource hints
        this.implementResourceHints();
    }
    
    preloadCriticalResources() {
        const criticalResources = [
            // Critical CSS
            { href: 'assets/css/matrix-theme.css', as: 'style' },
            { href: 'assets/css/image-optimization.css', as: 'style' },
            
            // Critical fonts
            { href: 'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap', as: 'style' },
            
            // Hero image (likely LCP candidate)
            { href: 'assets/images/morpheus.png', as: 'image' },
            { href: 'assets/images/morpheus-pills.png', as: 'image' }
        ];
        
        criticalResources.forEach(resource => {
            const existing = document.querySelector(`link[href="${resource.href}"]`);
            if (!existing) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource.href;
                link.as = resource.as;
                if (resource.as === 'style') {
                    link.onload = function() { this.rel = 'stylesheet'; 
                document.head.appendChild(link);
            }
        });
    }
    
    optimizeLCPImages() {
        // Find potential LCP candidates
        const lcpCandidates = document.querySelectorAll('img, picture, video');
        
        lcpCandidates.forEach(element => {
            // Add high priority loading for above-the-fold images
            if (this.isAboveTheFold(element)) {
                if (element.tagName === 'IMG') {
                    element.loading = 'eager';
                    element.fetchPriority = 'high';
                    
                    // Ensure proper sizing to prevent CLS
                    if (!element.width || !element.height) {
                        this.setImageDimensions(element);
                    }
                    
                    // Add decode hint for faster rendering
                    element.decoding = 'sync';
                    
                    // Preload the most likely LCP candidate
                    if (element.classList.contains('hero-image') || element.closest('.hero')) {
                        this.preloadLCPCandidate(element);
                    }
                }
            } else {
                // Optimize below-the-fold images
                if (element.tagName === 'IMG') {
                    element.loading = 'lazy';
                    element.decoding = 'async';
                }
            }
        });
        
        // Optimize background images that could be LCP candidates
        this.optimizeLCPBackgroundImages();
    }
    
    minimizeRenderBlocking() {
        // Defer non-critical CSS
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        nonCriticalCSS.forEach(link => {
            if (!this.isCriticalCSS(link.href)) {
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
            }
        });
        
        // Defer non-critical JavaScript
        const scripts = document.querySelectorAll('script[src]:not([data-critical])');
        scripts.forEach(script => {
            if (!this.isCriticalJS(script.src)) {
                script.defer = true;
            }
        });
    }
    
    implementResourceHints() {
        // DNS prefetch for external domains
        const externalDomains = [
            'cdn.jsdelivr.net',
            'cdnjs.cloudflare.com',
            'fonts.googleapis.com',
            'fonts.gstatic.com'
        ];
        
        externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            document.head.appendChild(link);
        });
        
        // Preconnect to critical origins
        const criticalOrigins = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];
        
        criticalOrigins.forEach(origin => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = origin;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    preloadLCPCandidate(element) {
        // Only preload if not already preloaded
        const existingPreload = document.querySelector(`link[rel="preload"][href="${element.src}"]`);
        if (!existingPreload && element.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = element.src;
            link.as = 'image';
            
            // Add responsive image hints if available
            if (element.srcset) {
                link.imagesrcset = element.srcset;
            }
            if (element.sizes) {
                link.imagesizes = element.sizes;
            }
            
            document.head.appendChild(link);
        }
    }
    
    optimizeLCPBackgroundImages() {
        // Find elements with background images that could be LCP candidates
        const elementsWithBg = document.querySelectorAll('[style*="background-image"], .hero, .banner');
        
        elementsWithBg.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const bgImage = computedStyle.backgroundImage;
            
            if (bgImage && bgImage !== 'none' && this.isAboveTheFold(element)) {
                // Extract URL from background-image
                const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (urlMatch && urlMatch[1]) {
                    const imageUrl = urlMatch[1];
                    
                    // Preload background image
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = imageUrl;
                    link.as = 'image';
                    document.head.appendChild(link);
                }
            }
        });
    }
    
    /**
     * Optimize First Input Delay (FID)
     */
    optimizeFID() {
        // 1. Break up long tasks
        this.breakUpLongTasks();
        
        // 2. Optimize event handlers
        this.optimizeEventHandlers();
        
        // 3. Use web workers for heavy computations
        this.initializeWebWorkers();
        
        // 4. Implement input responsiveness
        this.improveInputResponsiveness();
    }
    
    breakUpLongTasks() {
        // Use scheduler.postTask if available, fallback to setTimeout
        const scheduleTask = (callback, priority = 'user-blocking') => {
            if ('scheduler' in window && 'postTask' in scheduler) {
                scheduler.postTask(callback, { priority });
            } else {
                setTimeout(callback, 0);
            }
        };
        
        // Store reference for use in other methods
        this.scheduleTask = scheduleTask;
        
        // Break up initialization tasks
        this.scheduleTask(() => this.initializeNonCriticalFeatures(), 'background');
    }
    
    optimizeEventHandlers() {
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
        
        // Apply optimized handlers to existing events
        document.addEventListener('scroll', debouncedScrollHandler(() => {
            // Scroll handling logic
        }), { passive: true });
        
        window.addEventListener('resize', throttledResizeHandler(() => {
            // Resize handling logic
        }));
    }
    
    initializeWebWorkers() {
        // Initialize web worker for heavy computations
        if ('Worker' in window) {
            try {
                this.performanceWorker = new Worker('data:application/javascript,' + encodeURIComponent(`
                    self.onmessage = function(e) {
                        const { type, data } = e.data;
                        
                        switch(type) {
                            case 'calculateMetrics':
                                // Perform heavy metric calculations
                                const result = performHeavyCalculation(data);
                                self.postMessage({ type: 'metricsCalculated', result });
                                break;
                        }
                    };
                    
                    function performHeavyCalculation(data) {
                        // Heavy computation logic here
                        return data;
                    }
                `));
                
                this.performanceWorker.onmessage = (e) => {
                    const { type, result } = e.data;
                    if (type === 'metricsCalculated') {
                        this.handleMetricsResult(result);
                    }
                };
            } catch (error) {
                console.warn('Web Worker initialization failed:', error);
            }
        }
    }
    
    improveInputResponsiveness() {
        // Use event delegation for better performance
        document.addEventListener('click', (event) => {
            // Immediate visual feedback
            this.provideImmediateFeedback(event.target);
            
            // Handle clicks with minimal processing
            this.scheduleTask(() => this.handleClick(event), 'user-blocking');
        }, { passive: false });
        
        // Optimize form interactions
        document.addEventListener('input', (event) => {
            if (event.target.matches('input, textarea, select')) {
                // Debounce input handling
                this.debounceInput(event.target, () => {
                    this.scheduleTask(() => this.handleInput(event), 'user-visible');
                });
            }
        }, { passive: true });
        
        // Optimize touch interactions for mobile
        this.optimizeTouchInteractions();
        
        // Preload likely next interactions
        this.preloadLikelyInteractions();
    }
    
    /**
     * Optimize Cumulative Layout Shift (CLS)
     */
    optimizeCLS() {
        // 1. Reserve space for dynamic content
        this.reserveSpaceForDynamicContent();
        
        // 2. Optimize font loading
        this.optimizeFontLoading();
        
        // 3. Handle image dimensions
        this.handleImageDimensions();
        
        // 4. Optimize animations
        this.optimizeAnimations();
    }
    
    reserveSpaceForDynamicContent() {
        // Reserve space for ads and banners
        const adContainers = document.querySelectorAll('.banner-container, .ad-container');
        adContainers.forEach(container => {
            if (!container.style.minHeight) {
                container.style.minHeight = '250px'; // Standard banner height
            }
        });
        
        // Reserve space for dynamic images
        const dynamicImages = document.querySelectorAll('img[data-src]');
        dynamicImages.forEach(img => {
            if (!img.style.aspectRatio && !img.width && !img.height) {
                img.style.aspectRatio = '16/9'; // Default aspect ratio
            }
        });
    }
    
    optimizeFontLoading() {
        // Use font-display: swap for web fonts
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            if (!link.href.includes('display=swap')) {
                link.href += link.href.includes('?') ? '&display=swap' : '?display=swap';
            }
        });
        
        // Preload critical fonts
        const criticalFonts = [
            'https://fonts.gstatic.com/s/courierprime/v9/u-450q2lgwslOqpF_6gQ8kELWwZjb-KZBw.woff2'
        ];
        
        criticalFonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = fontUrl;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    handleImageDimensions() {
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            this.setImageDimensions(img);
        });
    }
    
    optimizeAnimations() {
        // Use transform and opacity for animations to avoid layout shifts
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
        
        // Optimize Matrix rain animation
        const matrixRain = document.querySelector('.matrix-rain');
        if (matrixRain) {
            matrixRain.style.willChange = 'transform';
            matrixRain.style.transform = 'translateZ(0)'; // Force hardware acceleration
        }
        
        // Optimize all CSS animations to use composite layers
        this.optimizeCompositeAnimations();
        
        // Prevent layout thrashing from dynamic content
        this.preventLayoutThrashing();
        
        // Optimize scroll-triggered animations
        this.optimizeScrollAnimations();
    }
    
    /**
     * Start continuous monitoring
     */
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        
        // Monitor Core Web Vitals using web-vitals library or custom implementation
        this.monitorLCP();
        this.monitorFID();
        this.monitorCLS();
        this.monitorTTFB();
        this.monitorFCP();
        
        // Set up performance observer
        this.setupPerformanceObserver();
        
        // Start periodic reporting
        this.startPeriodicReporting();
    }
    
    monitorLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                this.metrics.lcp = lastEntry.startTime;
                this.reportMetric('lcp', lastEntry.startTime);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.set('lcp', observer);
        }
    }
    
    monitorFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-input') {
                        const fid = entry.processingStart - entry.startTime;
                        this.metrics.fid = fid;
                        this.reportMetric('fid', fid);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
            this.observers.set('fid', observer);
        }
    }
    
    monitorCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            let sessionValue = 0;
            let sessionEntries = [];
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        const firstSessionEntry = sessionEntries[0];
                        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
                        
                        if (sessionValue && 
                            entry.startTime - lastSessionEntry.startTime < 1000 &&
                            entry.startTime - firstSessionEntry.startTime < 5000) {
                            sessionValue += entry.value;
                            sessionEntries.push(entry);
                        } else {
                            sessionValue = entry.value;
                            sessionEntries = [entry];
                        }
                        
                        if (sessionValue > clsValue) {
                            clsValue = sessionValue;
                            this.metrics.cls = clsValue;
                            this.reportMetric('cls', clsValue);
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
            this.observers.set('cls', observer);
        }
    }
    
    monitorTTFB() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        const ttfb = entry.responseStart - entry.requestStart;
                        this.metrics.ttfb = ttfb;
                        this.reportMetric('ttfb', ttfb);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['navigation'] });
            this.observers.set('ttfb', observer);
        }
    }
    
    monitorFCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.fcp = entry.startTime;
                        this.reportMetric('fcp', entry.startTime);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['paint'] });
            this.observers.set('fcp', observer);
        }
    }
    
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    // Log long tasks
                    if (entry.entryType === 'longtask') {
                        console.warn('Long task detected:', entry.duration + 'ms');
                        this.reportLongTask(entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['longtask'] });
            this.observers.set('longtask', observer);
        }
    }
    
    startPeriodicReporting() {
        // Report metrics every 30 seconds
        this.reportingInterval = setInterval(() => {
            this.reportAllMetrics();
        }, 30000);
        
        // Report on page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.reportAllMetrics();
            }
        });
        
        // Report on page unload with sendBeacon for reliability
        window.addEventListener('beforeunload', () => {
            this.reportAllMetrics(true);
        });
        
        // Report on page freeze (mobile)
        document.addEventListener('freeze', () => {
            this.reportAllMetrics(true);
        });
        
        // Monitor performance degradation
        this.monitorPerformanceDegradation();
        
        // Set up real-time alerts
        this.setupRealTimeAlerts();
    }
    
    /**
     * Utility methods
     */
    isAboveTheFold(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    setImageDimensions(img) {
        // Try to get dimensions from data attributes or calculate from aspect ratio
        const width = img.dataset.width || img.getAttribute('data-width');
        const height = img.dataset.height || img.getAttribute('data-height');
        const aspectRatio = img.dataset.aspectRatio || img.getAttribute('data-aspect-ratio');
        
        if (width && height) {
            img.width = width;
            img.height = height;
        } else if (aspectRatio) {
            img.style.aspectRatio = aspectRatio;
        } else {
            // Default dimensions to prevent CLS
            img.style.aspectRatio = '16/9';
        }
    }
    
    isCriticalCSS(href) {
        const criticalPatterns = [
            'matrix-theme.css',
            'bootstrap.min.css',
            'critical.css'
        ];
        return criticalPatterns.some(pattern => href.includes(pattern));
    }
    
    isCriticalJS(src) {
        const criticalPatterns = [
            'core-web-vitals.js',
            'main.js',
            'bootstrap.min.js'
        ];
        return criticalPatterns.some(pattern => src.includes(pattern));
    }
    
    initializeNonCriticalFeatures() {
        // Initialize features that don't affect initial render
        this.initializeAnalytics();
        this.initializeThirdPartyWidgets();
    }
    
    initializeAnalytics() {
        // Defer analytics initialization
        if (window.gtag) {
            this.scheduleTask(() => {
                gtag('config', 'GA_MEASUREMENT_ID');
            }, 'background');
        }
    }
    
    initializeThirdPartyWidgets() {
        // Initialize social media widgets, comments, etc.
        const widgets = document.querySelectorAll('[data-widget]');
        widgets.forEach(widget => {
            this.scheduleTask(() => {
                this.loadWidget(widget);
            }, 'background');
        });
    }
    
    loadWidget(widget) {
        // Widget loading logic
        const widgetType = widget.dataset.widget;
        // Implementation specific to each widget type
        console.log('Loading widget:', widgetType);
    }
    
    optimizeCompositeAnimations() {
        // Force composite layers for animated elements
        const animatedElements = document.querySelectorAll('.animate, .fade, .slide, .matrix-rain-column');
        
        animatedElements.forEach(element => {
            // Force hardware acceleration
            element.style.transform = element.style.transform || 'translateZ(0)';
            element.style.willChange = 'transform, opacity';
            
            // Clean up will-change after animation
            element.addEventListener('animationend', () => {
                element.style.willChange = 'auto';
            }, { once: true });
        });
    }
    
    preventLayoutThrashing() {
        // Batch DOM reads and writes to prevent layout thrashing
        let readOperations = [];
        let writeOperations = [];
        let isScheduled = false;
        
        const flushOperations = () => {
            // Execute all reads first
            readOperations.forEach(operation => operation());
            readOperations = [];
            
            // Then execute all writes
            writeOperations.forEach(operation => operation());
            writeOperations = [];
            
            isScheduled = false;
        };
        
        // Expose batching functions globally
        window.batchRead = (callback) => {
            readOperations.push(callback);
            if (!isScheduled) {
                isScheduled = true;
                requestAnimationFrame(flushOperations);
            }
        };
        
        window.batchWrite = (callback) => {
            writeOperations.push(callback);
            if (!isScheduled) {
                isScheduled = true;
                requestAnimationFrame(flushOperations);
            }
        };
    }
    
    optimizeScrollAnimations() {
        // Use Intersection Observer for scroll-triggered animations
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Use transform instead of changing layout properties
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                        
                        // Unobserve after animation
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            // Observe elements that should animate on scroll
            const scrollAnimateElements = document.querySelectorAll('[data-scroll-animate]');
            scrollAnimateElements.forEach(element => {
                // Set initial state
                element.style.transform = 'translateY(20px)';
                element.style.opacity = '0';
                element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
                
                animationObserver.observe(element);
            });
        }
    }
    
    handleClick(event) {
        // Optimized click handling
        console.log('Click handled:', event.target);
    }
    
    handleInput(event) {
        // Optimized input handling
        console.log('Input handled:', event.target.value);
    }
    
    handleMetricsResult(result) {
        // Handle results from web worker
        console.log('Metrics calculated:', result);
    }
    
    provideImmediateFeedback(target) {
        // Provide immediate visual feedback for user interactions
        if (target.matches('button, .btn, a, input[type="submit"]')) {
            target.style.transform = 'scale(0.98)';
            target.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                target.style.transform = '';
            }, 100);
        }
    }
    
    debounceInput(element, callback) {
        // Clear existing timeout
        if (element._inputTimeout) {
            clearTimeout(element._inputTimeout);
        }
        
        // Set new timeout
        element._inputTimeout = setTimeout(callback, 150);
    }
    
    optimizeTouchInteractions() {
        // Optimize touch events for mobile devices
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', (event) => {
                // Prepare for potential interaction
                this.scheduleTask(() => {
                    this.prepareTouchInteraction(event.target);
                }, 'user-blocking');
            }, { passive: true });
        }
    }
    
    prepareTouchInteraction(target) {
        // Pre-warm interaction handlers for touch targets
        if (target.matches('button, .btn, a, input, select, textarea')) {
            // Pre-compile any dynamic content
            target.classList.add('touch-prepared');
        }
    }
    
    preloadLikelyInteractions() {
        // Preload resources for likely next interactions
        const interactiveElements = document.querySelectorAll('a[href], button, .btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.scheduleTask(() => {
                    this.preloadInteractionResources(element);
                }, 'background');
            }, { once: true, passive: true });
        });
    }
    
    preloadInteractionResources(element) {
        // Preload resources for likely interactions
        if (element.tagName === 'A' && element.href) {
            // Prefetch link destination
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = element.href;
            document.head.appendChild(link);
        }
    }
    
    reportMetric(name, value) {
        const status = this.getMetricStatus(name, value);
        
        console.log(`${name.toUpperCase()}: ${value}ms (${status})`);
        
        // Send to analytics if configured
        if (window.gtag) {
            gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: name,
                value: Math.round(value),
                custom_parameter_1: status
            });
        }
        
        // Store in local storage for debugging
        const metrics = JSON.parse(localStorage.getItem('cwv_metrics') || '{}');
        metrics[name] = { value, status, timestamp: Date.now() };
        localStorage.setItem('cwv_metrics', JSON.stringify(metrics));
    }
    
    reportLongTask(entry) {
        console.warn(`Long task: ${entry.duration}ms at ${entry.startTime}ms`);
        
        if (window.gtag) {
            gtag('event', 'long_task', {
                event_category: 'performance',
                event_label: 'longtask',
                value: Math.round(entry.duration)
            });
        }
    }
    
    reportAllMetrics(useBeacon = false) {
        const report = {
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            connection: this.getConnectionInfo(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            metrics: { ...this.metrics },
            performance: this.getPerformanceInfo(),
            errors: this.getErrorInfo()
        };
        
        console.log('Core Web Vitals Report:', report);
        
        // Send to monitoring endpoint if configured
        if (window.OptimizationConfig?.performance?.monitoring?.enabled) {
            this.sendToMonitoring(report, useBeacon);
        }
        
        // Store locally for offline analysis
        this.storeMetricsLocally(report);
    }
    
    sendToMonitoring(report, useBeacon = false) {
        const endpoint = '/api/metrics';
        const data = JSON.stringify(report);
        
        if (useBeacon && 'sendBeacon' in navigator) {
            // Use sendBeacon for reliable delivery during page unload
            navigator.sendBeacon(endpoint, data);
        } else {
            // Use fetch for regular reporting
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data,
                keepalive: true
            }).catch(error => {
                console.warn('Failed to send metrics:', error);
                // Fallback to local storage
                this.storeFailedReport(report);
            });
        }
    }
    
    monitorPerformanceDegradation() {
        // Monitor for performance degradation over time
        let baselineMetrics = { ...this.metrics };
        
        setInterval(() => {
            const currentMetrics = { ...this.metrics };
            
            Object.entries(currentMetrics).forEach(([metric, value]) => {
                if (value !== null && baselineMetrics[metric] !== null) {
                    const degradation = (value - baselineMetrics[metric]) / baselineMetrics[metric];
                    
                    if (degradation > 0.2) { // 20% degradation
                        console.warn(`Performance degradation detected in ${metric}: ${Math.round(degradation * 100)}%`);
                        this.triggerPerformanceAlert(metric, value, baselineMetrics[metric]);
                    }
                }
            });
            
            // Update baseline every 5 minutes
            baselineMetrics = { ...currentMetrics };
        }, 300000); // 5 minutes
    }
    
    setupRealTimeAlerts() {
        // Set up real-time alerts for poor metrics
        const alertThresholds = {
            lcp: 4000, // Poor LCP threshold
            fid: 300,  // Poor FID threshold
            cls: 0.25  // Poor CLS threshold
        };
        
        Object.entries(alertThresholds).forEach(([metric, threshold]) => {
            this.setupMetricAlert(metric, threshold);
        });
    }
    
    setupMetricAlert(metric, threshold) {
        // Monitor specific metric for threshold breaches
        const originalReportMetric = this.reportMetric.bind(this);
        
        this.reportMetric = (name, value) => {
            originalReportMetric(name, value);
            
            if (name === metric && value > threshold) {
                this.triggerRealTimeAlert(name, value, threshold);
            }
        };
    }
    
    triggerPerformanceAlert(metric, currentValue, baselineValue) {
        // Trigger performance degradation alert
        const alert = {
            type: 'performance_degradation',
            metric,
            currentValue,
            baselineValue,
            degradation: ((currentValue - baselineValue) / baselineValue * 100).toFixed(1) + '%',
            timestamp: Date.now(),
            url: window.location.href
        };
        
        console.warn('Performance Alert:', alert);
        
        // Send alert to monitoring system
        if (window.OptimizationConfig?.performance?.monitoring?.enabled) {
            this.sendAlert(alert);
        }
    }
    
    triggerRealTimeAlert(metric, value, threshold) {
        // Trigger real-time threshold alert
        const alert = {
            type: 'threshold_breach',
            metric,
            value,
            threshold,
            status: 'poor',
            timestamp: Date.now(),
            url: window.location.href
        };
        
        console.warn('Real-time Alert:', alert);
        
        // Send alert to monitoring system
        if (window.OptimizationConfig?.performance?.monitoring?.enabled) {
            this.sendAlert(alert);
        }
    }
    
    sendAlert(alert) {
        // Send alert to monitoring endpoint
        fetch('/api/alerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alert)
        }).catch(error => {
            console.warn('Failed to send alert:', error);
        });
    }
    
    getConnectionInfo() {
        // Get network connection information
        if ('connection' in navigator) {
            const conn = navigator.connection;
            return {
                effectiveType: conn.effectiveType,
                downlink: conn.downlink,
                rtt: conn.rtt,
                saveData: conn.saveData
            };
        }
        return null;
    }
    
    getPerformanceInfo() {
        // Get additional performance information
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            return {
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                domInteractive: navigation.domInteractive - navigation.navigationStart,
                resourceCount: performance.getEntriesByType('resource').length
            };
        }
        return null;
    }
    
    getErrorInfo() {
        // Get JavaScript error information
        return {
            errorCount: window.errorCount || 0,
            lastError: window.lastError || null
        };
    }
    
    storeMetricsLocally(report) {
        // Store metrics in localStorage for offline analysis
        try {
            const stored = JSON.parse(localStorage.getItem('cwv_reports') || '[]');
            stored.push(report);
            
            // Keep only last 50 reports
            if (stored.length > 50) {
                stored.splice(0, stored.length - 50);
            }
            
            localStorage.setItem('cwv_reports', JSON.stringify(stored));
        } catch (error) {
            console.warn('Failed to store metrics locally:', error);
        }
    }
    
    storeFailedReport(report) {
        // Store failed reports for retry
        try {
            const failed = JSON.parse(localStorage.getItem('cwv_failed_reports') || '[]');
            failed.push(report);
            localStorage.setItem('cwv_failed_reports', JSON.stringify(failed));
        } catch (error) {
            console.warn('Failed to store failed report:', error);
        }
    }
    
    getMetricStatus(name, value) {
        const thresholds = this.thresholds[name];
        if (!thresholds) return 'unknown';
        
        if (value <= thresholds.good) return 'good';
        if (value <= thresholds.poor) return 'needs-improvement';
        return 'poor';
    }
    
    /**
     * Public API methods
     */
    getMetrics() {
        return { ...this.metrics };
    }
    
    getMetricStatus(name) {
        const value = this.metrics[name];
        if (value === null) return 'not-measured';
        return this.getMetricStatus(name, value);
    }
    
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        // Clean up web worker
        if (this.performanceWorker) {
            this.performanceWorker.terminate();
        }
        
        // Clean up intervals
        if (this.reportingInterval) {
            clearInterval(this.reportingInterval);
        }
        
        // Clean up will-change properties
        const elementsWithWillChange = document.querySelectorAll('[style*="will-change"]');
        elementsWithWillChange.forEach(element => {
            element.style.willChange = 'auto';
        });
        
        this.isMonitoring = false;
    }
}

// Initialize Core Web Vitals optimization
const coreWebVitalsOptimizer = new CoreWebVitalsOptimizer();

// Export for global access
window.CoreWebVitalsOptimizer = CoreWebVitalsOptimizer;
window.coreWebVitalsOptimizer = coreWebVitalsOptimizer;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoreWebVitalsOptimizer;
}