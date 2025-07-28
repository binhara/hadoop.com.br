/**
 * Image Optimization System
 * Handles lazy loading, format detection, and CDN integration
 */

class ImageOptimizer {
    constructor() {
        this.cdnBaseUrl = 'https://cdn.hadoop.com.br';
        this.supportedFormats = this.detectSupportedFormats();
        this.lazyLoadObserver = null;
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeExistingImages();
        this.setupImageErrorHandling();
    }

    /**
     * Detect supported modern image formats
     */
    detectSupportedFormats() {
        const formats = {
            webp: false,
            avif: false
        };

        // Test WebP support
        const webpCanvas = document.createElement('canvas');
        webpCanvas.width = 1;
        webpCanvas.height = 1;
        formats.webp = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

        // Test AVIF support (more complex detection)
        const avifImage = new Image();
        avifImage.onload = () => {
            formats.avif = true;
        };
        avifImage.onerror = () => {
            formats.avif = false;
        };
        avifImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';

        return formats;
    }

    /**
     * Setup Intersection Observer for lazy loading
     */
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.lazyLoadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.lazyLoadObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.lazyLoadObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            this.loadAllImages();
        }
    }

    /**
     * Load individual image with format optimization
     */
    loadImage(img) {
        const originalSrc = img.dataset.src;
        const optimizedSrc = this.getOptimizedImageUrl(originalSrc);
        
        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            img.src = optimizedSrc;
            img.classList.add('loaded');
            img.classList.remove('loading');
        };
        
        imageLoader.onerror = () => {
            // Fallback to original image
            img.src = originalSrc;
            img.classList.add('loaded');
            img.classList.remove('loading');
        };
        
        img.classList.add('loading');
        imageLoader.src = optimizedSrc;
    }

    /**
     * Get optimized image URL with CDN and format selection
     */
    getOptimizedImageUrl(originalSrc) {
        // If already a full URL, return as is
        if (originalSrc.startsWith('http')) {
            return originalSrc;
        }

        // Remove leading slash if present
        const cleanSrc = originalSrc.replace(/^\//, '');
        
        // Get file extension
        const extension = cleanSrc.split('.').pop().toLowerCase();
        const basePath = cleanSrc.replace(`.${extension}`, '');

        // Choose best format
        let optimizedFormat = extension;
        if (this.supportedFormats.avif && ['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
            optimizedFormat = 'avif';
        } else if (this.supportedFormats.webp && ['jpg', 'jpeg', 'png'].includes(extension)) {
            optimizedFormat = 'webp';
        }

        // Construct CDN URL with optimization parameters
        const cdnUrl = `${this.cdnBaseUrl}/${basePath}.${optimizedFormat}`;
        
        // Add optimization parameters
        const params = new URLSearchParams({
            'auto': 'compress,format',
            'fit': 'max',
            'q': '85'
        });

        return `${cdnUrl}?${params.toString()}`;
    }

    /**
     * Optimize existing images on the page
     */
    optimizeExistingImages() {
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            if (img.src && !img.dataset.optimized) {
                const optimizedSrc = this.getOptimizedImageUrl(img.src);
                if (optimizedSrc !== img.src) {
                    img.dataset.originalSrc = img.src;
                    img.src = optimizedSrc;
                    img.dataset.optimized = 'true';
                }
            }
        });
    }

    /**
     * Setup error handling for failed image loads
     */
    setupImageErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                const img = e.target;
                
                // Try fallback to original source
                if (img.dataset.originalSrc && img.src !== img.dataset.originalSrc) {
                    img.src = img.dataset.originalSrc;
                } else if (img.dataset.src && img.src !== img.dataset.src) {
                    img.src = img.dataset.src;
                } else {
                    // Use placeholder image
                    img.src = '/assets/images/placeholder.jpg';
                    img.alt = 'Imagem não disponível';
                }
            }
        }, true);
    }

    /**
     * Fallback method to load all images (for older browsers)
     */
    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    }

    /**
     * Preload critical images
     */
    preloadCriticalImages(imageUrls) {
        imageUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = this.getOptimizedImageUrl(url);
            document.head.appendChild(link);
        });
    }

    /**
     * Generate responsive image srcset
     */
    generateResponsiveSrcSet(baseSrc, sizes = [320, 640, 960, 1280, 1920]) {
        const extension = baseSrc.split('.').pop();
        const basePath = baseSrc.replace(`.${extension}`, '');
        
        return sizes.map(size => {
            const optimizedUrl = this.getOptimizedImageUrl(`${basePath}-${size}w.${extension}`);
            return `${optimizedUrl} ${size}w`;
        }).join(', ');
    }

    /**
     * Create optimized picture element with multiple formats
     */
    createPictureElement(src, alt, className = '') {
        const picture = document.createElement('picture');
        const basePath = src.replace(/\.[^/.]+$/, '');
        
        // AVIF source
        if (this.supportedFormats.avif) {
            const avifSource = document.createElement('source');
            avifSource.type = 'image/avif';
            avifSource.srcset = this.getOptimizedImageUrl(`${basePath}.avif`);
            picture.appendChild(avifSource);
        }
        
        // WebP source
        if (this.supportedFormats.webp) {
            const webpSource = document.createElement('source');
            webpSource.type = 'image/webp';
            webpSource.srcset = this.getOptimizedImageUrl(`${basePath}.webp`);
            picture.appendChild(webpSource);
        }
        
        // Fallback img
        const img = document.createElement('img');
        img.src = this.getOptimizedImageUrl(src);
        img.alt = alt;
        img.className = className;
        img.loading = 'lazy';
        picture.appendChild(img);
        
        return picture;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
    
    // Preload critical images for Matrix theme
    window.imageOptimizer.preloadCriticalImages([
        '/assets/images/morpheus-pills.png',
        '/assets/images/morpheus.png'
    ]);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageOptimizer;
}