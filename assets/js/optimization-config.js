/**
 * Image and Asset Optimization Configuration
 * Central configuration for all optimization features
 */

window.OptimizationConfig = {
    // CDN Configuration
    cdn: {
        primary: 'https://cdn.hadoop.com.br',
        fallback: 'https://backup-cdn.hadoop.com.br',
        enabled: true,
        version: '1.0.0'
    },
    
    // Image Optimization Settings
    images: {
        // Lazy loading settings
        lazyLoading: {
            enabled: true,
            rootMargin: '50px 0px',
            threshold: 0.01
        },
        
        // Format support detection
        formats: {
            avif: true,
            webp: true,
            jpg: true,
            png: true
        },
        
        // Quality settings
        quality: {
            default: 85,
            thumbnail: 75,
            banner: 90,
            logo: 95
        },
        
        // Responsive breakpoints
        breakpoints: [320, 640, 960, 1280, 1920],
        
        // Placeholder settings
        placeholders: {
            enabled: true,
            backgroundColor: '#1a1a1a',
            textColor: '#00ff00',
            fontSize: 16,
            fontFamily: 'Courier New, monospace'
        }
    },
    
    // Asset Compression Settings
    compression: {
        enabled: true,
        
        // CSS compression
        css: {
            minify: true,
            removeComments: true,
            removeWhitespace: true
        },
        
        // JavaScript compression
        js: {
            minify: true,
            removeComments: true,
            removeWhitespace: true
        },
        
        // Image compression
        images: {
            quality: 0.8,
            maxWidth: 1920,
            maxHeight: 1080
        }
    },
    
    // Performance Settings
    performance: {
        // Preload critical resources
        preload: {
            enabled: true,
            resources: [
                '/assets/css/matrix-theme.css',
                '/assets/css/image-optimization.css',
                '/assets/js/main.js',
                '/assets/images/morpheus-pills.png',
                '/assets/images/morpheus.png'
            ]
        },
        
        // Prefetch settings
        prefetch: {
            enabled: true,
            delay: 2000 // ms
        },
        
        // Monitoring
        monitoring: {
            enabled: true,
            logLevel: 'debug' // debug, info, warn, error
        }
    },
    
    // Error Handling
    errorHandling: {
        // Image error fallbacks
        imageFallbacks: [
            '/assets/images/placeholder.jpg',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJDb3VyaWVyIE5ldywgbW9ub3NwYWNlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMDBmZjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW0gbsOjbyBkaXNwb27DrXZlbDwvdGV4dD48L3N2Zz4='
        ],
        
        // CDN fallback strategy
        cdnFallback: {
            enabled: true,
            retryAttempts: 2,
            retryDelay: 1000 // ms
        },
        
        // Error reporting
        reporting: {
            enabled: false, // Set to true in production
            endpoint: '/api/errors'
        }
    },
    
    // Development Settings
    development: {
        // Enable debug logging
        debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
        
        // Performance monitoring
        performanceMonitoring: true,
        
        // Show optimization stats
        showStats: true
    }
};

// Apply configuration based on environment
if (window.OptimizationConfig.development.debug) {
    console.log('Image Optimization Config loaded:', window.OptimizationConfig);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.OptimizationConfig;
}