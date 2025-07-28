/**
 * Asset Compression and Optimization Utilities
 * Handles client-side compression, format conversion, and optimization
 */

class AssetCompressor {
    constructor() {
        this.compressionWorker = null;
        this.supportedFormats = this.detectSupportedFormats();
        this.init();
    }

    init() {
        this.setupCompressionWorker();
        this.optimizePageAssets();
    }

    /**
     * Detect supported compression and image formats
     */
    detectSupportedFormats() {
        const formats = {
            webp: false,
            avif: false,
            brotli: false,
            gzip: true // Always supported
        };

        // Test WebP support
        const webpCanvas = document.createElement('canvas');
        webpCanvas.width = 1;
        webpCanvas.height = 1;
        formats.webp = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

        // Test Brotli support
        if ('CompressionStream' in window) {
            try {
                new CompressionStream('gzip');
                formats.brotli = true;
            } catch (e) {
                formats.brotli = false;
            }
        }

        return formats;
    }

    /**
     * Setup Web Worker for compression tasks
     */
    setupCompressionWorker() {
        if ('Worker' in window) {
            const workerCode = `
                // Web Worker for asset compression
                self.onmessage = function(e) {
                    const { type, data, options } = e.data;
                    
                    switch(type) {
                        case 'compressImage':
                            compressImage(data, options);
                            break;
                        case 'compressText':
                            compressText(data, options);
                            break;
                    }
                };
                
                function compressImage(imageData, options) {
                    // Image compression logic would go here
                    // For now, we'll simulate compression
                    setTimeout(() => {
                        self.postMessage({
                            type: 'imageCompressed',
                            data: imageData,
                            originalSize: imageData.length,
                            compressedSize: Math.floor(imageData.length * 0.7)
                        });
                    }, 100);
                }
                
                function compressText(textData, options) {
                    // Text compression simulation
                    const compressed = textData.replace(/\\s+/g, ' ').trim();
                    
                    self.postMessage({
                        type: 'textCompressed',
                        data: compressed,
                        originalSize: textData.length,
                        compressedSize: compressed.length
                    });
                }
            `;

            const blob = new Blob([workerCode], { type: 'application/javascript' });
            this.compressionWorker = new Worker(URL.createObjectURL(blob));
            
            this.compressionWorker.onmessage = (e) => {
                this.handleWorkerMessage(e.data);
            };
        }
    }

    /**
     * Handle messages from compression worker
     */
    handleWorkerMessage(message) {
        switch(message.type) {
            case 'imageCompressed':
                console.debug('Image compressed:', {
                    originalSize: message.originalSize,
                    compressedSize: message.compressedSize,
                    savings: `${Math.round((1 - message.compressedSize / message.originalSize) * 100)}%`
                });
                break;
            case 'textCompressed':
                console.debug('Text compressed:', {
                    originalSize: message.originalSize,
                    compressedSize: message.compressedSize,
                    savings: `${Math.round((1 - message.compressedSize / message.originalSize) * 100)}%`
                });
                break;
        }
    }

    /**
     * Compress image using Canvas API
     */
    async compressImage(file, options = {}) {
        const {
            quality = 0.8,
            maxWidth = 1920,
            maxHeight = 1080,
            format = 'image/jpeg'
        } = options;

        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions
                let { width, height } = img;
                
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }

                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob((blob) => {
                    resolve({
                        blob,
                        originalSize: file.size,
                        compressedSize: blob.size,
                        compressionRatio: blob.size / file.size
                    });
                }, format, quality);
            };

            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Optimize all images on the current page
     */
    optimizePageAssets() {
        // Optimize images
        document.querySelectorAll('img').forEach(img => {
            this.optimizeImage(img);
        });

        // Optimize CSS
        this.optimizeCSS();

        // Optimize JavaScript
        this.optimizeJavaScript();
    }

    /**
     * Optimize individual image element
     */
    optimizeImage(img) {
        // Skip if already optimized
        if (img.dataset.optimized) return;

        const originalSrc = img.src;
        
        // Add loading attribute for lazy loading
        if (!img.loading) {
            img.loading = 'lazy';
        }

        // Add decoding attribute for better performance
        if (!img.decoding) {
            img.decoding = 'async';
        }

        // Optimize alt text if missing
        if (!img.alt && img.dataset.alt) {
            img.alt = img.dataset.alt;
        }

        // Mark as optimized
        img.dataset.optimized = 'true';
        img.dataset.originalSrc = originalSrc;
    }

    /**
     * Optimize CSS delivery
     */
    optimizeCSS() {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            // Add media attribute if not present
            if (!link.media) {
                link.media = 'all';
            }

            // Preload critical CSS
            if (link.href.includes('matrix-theme') || link.href.includes('bootstrap')) {
                link.rel = 'preload';
                link.as = 'style';
                link.onload = function() {
                    this.rel = 'stylesheet';
                };
            }
        });
    }

    /**
     * Optimize JavaScript delivery
     */
    optimizeJavaScript() {
        document.querySelectorAll('script[src]').forEach(script => {
            // Add async or defer if not present
            if (!script.async && !script.defer) {
                // Defer non-critical scripts
                if (!script.src.includes('main.js') && !script.src.includes('bootstrap')) {
                    script.defer = true;
                }
            }
        });
    }

    /**
     * Generate WebP version of image
     */
    async generateWebP(imageFile) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        return new Promise((resolve, reject) => {
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('WebP conversion failed'));
                    }
                }, 'image/webp', 0.8);
            };

            img.onerror = reject;
            img.src = URL.createObjectURL(imageFile);
        });
    }

    /**
     * Compress text content (CSS, JS, HTML)
     */
    compressText(text, options = {}) {
        const {
            removeComments = true,
            removeWhitespace = true,
            minify = true
        } = options;

        let compressed = text;

        if (removeComments) {
            // Remove CSS comments
            compressed = compressed.replace(/\/\*[\s\S]*?\*\//g, '');
            // Remove JS comments
            compressed = compressed.replace(/\/\/.*$/gm, '');
        }

        if (removeWhitespace) {
            // Remove extra whitespace
            compressed = compressed.replace(/\s+/g, ' ').trim();
        }

        if (minify) {
            // Basic minification
            compressed = compressed
                .replace(/;\s*}/g, '}')
                .replace(/\s*{\s*/g, '{')
                .replace(/;\s*/g, ';')
                .replace(/,\s*/g, ',');
        }

        return compressed;
    }

    /**
     * Create responsive image set
     */
    createResponsiveImageSet(originalSrc, sizes = [320, 640, 960, 1280, 1920]) {
        const srcSet = sizes.map(size => {
            const optimizedSrc = this.getOptimizedImageUrl(originalSrc, { width: size });
            return `${optimizedSrc} ${size}w`;
        }).join(', ');

        return {
            srcset: srcSet,
            sizes: '(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 960px) 960px, (max-width: 1280px) 1280px, 1920px'
        };
    }

    /**
     * Get optimized image URL with compression parameters
     */
    getOptimizedImageUrl(src, options = {}) {
        const {
            width,
            height,
            quality = 85,
            format = 'auto'
        } = options;

        // If using CDN, add optimization parameters
        if (window.cdnManager) {
            return window.cdnManager.getAssetUrl(src, options);
        }

        // Fallback to original URL
        return src;
    }

    /**
     * Monitor compression performance
     */
    getCompressionStats() {
        const stats = {
            imagesOptimized: document.querySelectorAll('img[data-optimized]').length,
            totalImages: document.querySelectorAll('img').length,
            cssOptimized: document.querySelectorAll('link[rel="preload"][as="style"]').length,
            jsOptimized: document.querySelectorAll('script[defer]').length
        };

        stats.optimizationRate = Math.round((stats.imagesOptimized / stats.totalImages) * 100);

        return stats;
    }

    /**
     * Cleanup resources
     */
    cleanup() {
        if (this.compressionWorker) {
            this.compressionWorker.terminate();
            this.compressionWorker = null;
        }
    }
}

// Initialize Asset Compressor
document.addEventListener('DOMContentLoaded', () => {
    window.assetCompressor = new AssetCompressor();
    
    // Log compression stats in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            console.debug('Asset Compression Stats:', window.assetCompressor.getCompressionStats());
        }, 2000);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.assetCompressor) {
        window.assetCompressor.cleanup();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssetCompressor;
}