/**
 * Placeholder Image Generator
 * Creates dynamic placeholder images for missing or loading content
 */

class PlaceholderGenerator {
    constructor() {
        this.defaultOptions = {
            width: 400,
            height: 300,
            backgroundColor: '#1a1a1a',
            textColor: '#00ff00',
            fontSize: 16,
            fontFamily: 'Courier New, monospace',
            text: 'Carregando...',
            pattern: 'matrix'
        };
    }

    /**
     * Generate placeholder image as data URL
     */
    generatePlaceholder(options = {}) {
        const config = { ...this.defaultOptions, ...options };
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = config.width;
        canvas.height = config.height;

        // Fill background
        ctx.fillStyle = config.backgroundColor;
        ctx.fillRect(0, 0, config.width, config.height);

        // Add pattern if specified
        if (config.pattern === 'matrix') {
            this.drawMatrixPattern(ctx, config);
        } else if (config.pattern === 'grid') {
            this.drawGridPattern(ctx, config);
        }

        // Add text
        ctx.fillStyle = config.textColor;
        ctx.font = `${config.fontSize}px ${config.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const x = config.width / 2;
        const y = config.height / 2;
        
        // Add text shadow for better visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        ctx.fillText(config.text, x, y);

        return canvas.toDataURL('image/png');
    }

    /**
     * Draw Matrix-style pattern
     */
    drawMatrixPattern(ctx, config) {
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 12;
        const columns = Math.floor(config.width / fontSize);
        const rows = Math.floor(config.height / fontSize);

        ctx.font = `${fontSize}px ${config.fontFamily}`;
        ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                if (Math.random() > 0.95) {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(char, i * fontSize, j * fontSize);
                }
            }
        }
    }

    /**
     * Draw grid pattern
     */
    drawGridPattern(ctx, config) {
        const gridSize = 20;
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= config.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, config.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= config.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(config.width, y);
            ctx.stroke();
        }
    }

    /**
     * Create placeholder for technology logo
     */
    createTechLogoPlaceholder(techName, size = 100) {
        return this.generatePlaceholder({
            width: size,
            height: size,
            text: techName.charAt(0).toUpperCase(),
            fontSize: Math.floor(size * 0.4),
            pattern: 'none'
        });
    }

    /**
     * Create placeholder for banner
     */
    createBannerPlaceholder(width = 400, height = 200, text = 'Banner') {
        return this.generatePlaceholder({
            width,
            height,
            text,
            pattern: 'grid'
        });
    }

    /**
     * Create placeholder for article image
     */
    createArticlePlaceholder(width = 600, height = 400) {
        return this.generatePlaceholder({
            width,
            height,
            text: '📄 Artigo',
            fontSize: 24,
            pattern: 'matrix'
        });
    }

    /**
     * Replace broken images with placeholders
     */
    replaceBrokenImages() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.dataset.placeholderHandled) {
                img.addEventListener('error', () => {
                    const width = img.width || img.offsetWidth || 400;
                    const height = img.height || img.offsetHeight || 300;
                    
                    let text = 'Imagem não disponível';
                    
                    // Try to get meaningful text from alt or title
                    if (img.alt) {
                        text = img.alt.substring(0, 20);
                    } else if (img.title) {
                        text = img.title.substring(0, 20);
                    }
                    
                    const placeholder = this.generatePlaceholder({
                        width,
                        height,
                        text,
                        pattern: 'matrix'
                    });
                    
                    img.src = placeholder;
                    img.classList.add('placeholder-image');
                });
                
                img.dataset.placeholderHandled = 'true';
            }
        });
    }

    /**
     * Create loading placeholder
     */
    createLoadingPlaceholder(width = 400, height = 300) {
        return this.generatePlaceholder({
            width,
            height,
            text: '⚡ Carregando...',
            fontSize: 18,
            pattern: 'matrix'
        });
    }

    /**
     * Generate SVG placeholder (smaller file size)
     */
    generateSVGPlaceholder(options = {}) {
        const config = { ...this.defaultOptions, ...options };
        
        const svg = `
            <svg width="${config.width}" height="${config.height}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="matrix" patternUnits="userSpaceOnUse" width="20" height="20">
                        <rect width="20" height="20" fill="${config.backgroundColor}"/>
                        <text x="10" y="15" font-family="${config.fontFamily}" font-size="12" 
                              fill="rgba(0, 255, 0, 0.3)" text-anchor="middle">0</text>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#matrix)"/>
                <rect width="100%" height="100%" fill="${config.backgroundColor}" opacity="0.8"/>
                <text x="50%" y="50%" font-family="${config.fontFamily}" font-size="${config.fontSize}" 
                      fill="${config.textColor}" text-anchor="middle" dominant-baseline="middle">
                    ${config.text}
                </text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    /**
     * Auto-replace images with placeholders on page load
     */
    autoReplacePlaceholders() {
        // Replace images with data-placeholder attribute
        document.querySelectorAll('img[data-placeholder]').forEach(img => {
            const placeholderType = img.dataset.placeholder;
            const width = parseInt(img.dataset.width) || 400;
            const height = parseInt(img.dataset.height) || 300;
            const text = img.dataset.text || 'Placeholder';
            
            let placeholder;
            
            switch (placeholderType) {
                case 'tech-logo':
                    placeholder = this.createTechLogoPlaceholder(text, Math.min(width, height));
                    break;
                case 'banner':
                    placeholder = this.createBannerPlaceholder(width, height, text);
                    break;
                case 'article':
                    placeholder = this.createArticlePlaceholder(width, height);
                    break;
                case 'loading':
                    placeholder = this.createLoadingPlaceholder(width, height);
                    break;
                default:
                    placeholder = this.generatePlaceholder({ width, height, text });
            }
            
            img.src = placeholder;
            img.classList.add('placeholder-image');
        });
    }
}

// Initialize placeholder generator
document.addEventListener('DOMContentLoaded', () => {
    window.placeholderGenerator = new PlaceholderGenerator();
    
    // Auto-replace placeholders
    window.placeholderGenerator.autoReplacePlaceholders();
    
    // Handle broken images
    window.placeholderGenerator.replaceBrokenImages();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlaceholderGenerator;
}