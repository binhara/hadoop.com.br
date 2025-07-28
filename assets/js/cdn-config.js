/**
 * CDN Configuration and Asset Management
 * Handles CDN integration, asset versioning, and fallback strategies
 */

class CDNManager {
    constructor() {
        this.config = {
            // Primary CDN endpoints
            primary: 'https://cdn.hadoop.com.br',
            fallback: 'https://backup-cdn.hadoop.com.br',
            
            // Asset versioning
            version: '1.0.0',
            
            // Optimization settings
            imageQuality: 85,
            autoFormat: true,
            autoCompress: true,
            
            // Cache settings
            cacheMaxAge: 31536000, // 1 year
            
            // Supported formats by priority
            imageFormats: ['avif', 'webp', 'jpg', 'png'],
            
            // Asset types configuration
            assetTypes: {
                images: {
                    path: 'images',
                    extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif'],
                    optimization: true
                },
                css: {
                    path: 'css',
                    extensions: ['css'],
                    minify: true,
                    optimization: true
                },
                js: {
                    path: 'js',
                    extensions: ['js'],
                    minify: true,
                    optimization: true
                },
                fonts: {
                    path: 'fonts',
                    extensions: ['woff', 'woff2', 'ttf', 'eot'],
                    optimization: false
                }
            }
        };
        
        this.init();
    }

    init() {
        this.detectCDNAvailability();
        this.setupAssetInterception();
        this.preloadCriticalAssets();
    }

    /**
     * Detect CDN availability and set active endpoint
     */
    async detectCDNAvailability() {
        try {
            const response = await fetch(`${this.config.primary}/health-check`, {
                method: 'HEAD',
                timeout: 3000
            });
            
            if (response.ok) {
                this.activeCDN = this.config.primary;
            } else {
                throw new Error('Primary CDN unavailable');
            }
        } catch (error) {
            console.warn('Primary CDN unavailable, using fallback:', error);
            this.activeCDN = this.config.fallback;
            
            // Test fallback
            try {
                const fallbackResponse = await fetch(`${this.config.fallback}/health-check`, {
                    method: 'HEAD',
                    timeout: 3000
                });
                
                if (!fallbackResponse.ok) {
                    throw new Error('Fallback CDN also unavailable');
                }
            } catch (fallbackError) {
                console.error('Both CDNs unavailable, using local assets:', fallbackError);
                this.activeCDN = '';
            }
        }
    }

    /**
     * Get optimized asset URL
     */
    getAssetUrl(assetPath, options = {}) {
        // If no CDN available, return local path
        if (!this.activeCDN) {
            return assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
        }

        // Clean asset path
        const cleanPath = assetPath.replace(/^\//, '');
        
        // Get asset type
        const extension = cleanPath.split('.').pop().toLowerCase();
        const assetType = this.getAssetType(extension);
        
        // Build CDN URL
        let cdnUrl = `${this.activeCDN}/${cleanPath}`;
        
        // Add version parameter
        const params = new URLSearchParams();
        params.set('v', this.config.version);
        
        // Add optimization parameters for images
        if (assetType === 'images' && this.config.assetTypes.images.optimization) {
            if (this.config.autoFormat) {
                params.set('auto', 'format,compress');
            }
            
            params.set('q', options.quality || this.config.imageQuality);
            
            if (options.width) {
                params.set('w', options.width);
            }
            
            if (options.height) {
                params.set('h', options.height);
            }
            
            if (options.fit) {
                params.set('fit', options.fit);
            }
        }
        
        // Add minification for CSS/JS
        if ((assetType === 'css' || assetType === 'js') && this.config.assetTypes[assetType].minify) {
            params.set('min', '1');
        }
        
        return `${cdnUrl}?${params.toString()}`;
    }

    /**
     * Get asset type based on extension
     */
    getAssetType(extension) {
        for (const [type, config] of Object.entries(this.config.assetTypes)) {
            if (config.extensions.includes(extension)) {
                return type;
            }
        }
        return 'unknown';
    }

    /**
     * Setup asset URL interception for automatic CDN usage
     */
    setupAssetInterception() {
        // Intercept image src changes
        const originalSetAttribute = Element.prototype.setAttribute;
        Element.prototype.setAttribute = function(name, value) {
            if (name === 'src' && this.tagName === 'IMG' && value.startsWith('/assets/')) {
                value = window.cdnManager.getAssetUrl(value);
            } else if (name === 'href' && this.tagName === 'LINK' && value.startsWith('/assets/')) {
                value = window.cdnManager.getAssetUrl(value);
            }
            
            return originalSetAttribute.call(this, name, value);
        };

        // Intercept CSS url() references
        this.interceptCSSUrls();
    }

    /**
     * Intercept CSS url() references for CDN
     */
    interceptCSSUrls() {
        const styleSheets = document.styleSheets;
        
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const rules = styleSheets[i].cssRules || styleSheets[i].rules;
                
                for (let j = 0; j < rules.length; j++) {
                    const rule = rules[j];
                    
                    if (rule.style && rule.style.backgroundImage) {
                        const bgImage = rule.style.backgroundImage;
                        const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                        
                        if (urlMatch && urlMatch[1].startsWith('/assets/')) {
                            const optimizedUrl = this.getAssetUrl(urlMatch[1]);
                            rule.style.backgroundImage = bgImage.replace(urlMatch[1], optimizedUrl);
                        }
                    }
                }
            } catch (e) {
                // Skip cross-origin stylesheets
                console.debug('Cannot access stylesheet:', e);
            }
        }
    }

    /**
     * Preload critical assets
     */
    preloadCriticalAssets() {
        const criticalAssets = [
            '/assets/css/matrix-theme.css',
            '/assets/css/image-optimization.css',
            '/assets/js/main.js',
            '/assets/images/morpheus-pills.png',
            '/assets/images/morpheus.png'
        ];

        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            
            if (asset.endsWith('.css')) {
                link.as = 'style';
            } else if (asset.endsWith('.js')) {
                link.as = 'script';
            } else if (asset.match(/\.(jpg|jpeg|png|gif|webp|avif)$/)) {
                link.as = 'image';
            }
            
            link.href = this.getAssetUrl(asset);
            document.head.appendChild(link);
        });
    }

    /**
     * Generate responsive image srcset with CDN
     */
    generateResponsiveSrcSet(imagePath, sizes = [320, 640, 960, 1280, 1920]) {
        return sizes.map(size => {
            const url = this.getAssetUrl(imagePath, { width: size });
            return `${url} ${size}w`;
        }).join(', ');
    }

    /**
     * Prefetch assets for next page
     */
    prefetchAssets(assetPaths) {
        assetPaths.forEach(path => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = this.getAssetUrl(path);
            document.head.appendChild(link);
        });
    }

    /**
     * Get cache-busted URL
     */
    getCacheBustedUrl(assetPath) {
        const timestamp = Date.now();
        return this.getAssetUrl(assetPath) + `&cb=${timestamp}`;
    }

    /**
     * Monitor CDN performance
     */
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.name.includes(this.activeCDN)) {
                        console.debug('CDN Asset Performance:', {
                            name: entry.name,
                            duration: entry.duration,
                            transferSize: entry.transferSize,
                            encodedBodySize: entry.encodedBodySize
                        });
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }

    /**
     * Handle CDN failures gracefully
     */
    handleCDNFailure(assetUrl) {
        // Extract original path from CDN URL
        const originalPath = assetUrl.replace(this.activeCDN, '').split('?')[0];
        
        // Return local fallback
        return originalPath.startsWith('/') ? originalPath : `/${originalPath}`;
    }
}

// Initialize CDN Manager
document.addEventListener('DOMContentLoaded', () => {
    window.cdnManager = new CDNManager();
    
    // Monitor performance in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.cdnManager.monitorPerformance();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CDNManager;
}