/**
 * Automated Sitemap Updater
 * Portal Big Data - Automatic sitemap generation and submission
 */

const AutomatedSitemapUpdater = {
    // Configuration
    config: {
        sitemapPath: '/sitemap.xml',
        updateFrequency: 24 * 60 * 60 * 1000, // 24 hours
        maxUrls: 50000, // Google's limit
        compressionEnabled: true,
        lastModified: true
    },
    
    // Initialize automated updates
    init: function() {
        this.scheduleUpdates();
        this.setupContentChangeDetection();
        console.log('Automated sitemap updater initialized');
    },
    
    // Schedule regular sitemap updates
    scheduleUpdates: function() {
        // Update sitemap daily
        setInterval(() => {
            this.updateSitemap();
        }, this.config.updateFrequency);
        
        // Initial update after 30 seconds
        setTimeout(() => {
            this.updateSitemap();
        }, 30000);
    },
    
    // Setup content change detection
    setupContentChangeDetection: function() {
        // Monitor for new pages or content changes
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            mutations.forEach((mutation) => {
                // Check for new content that might affect sitemap
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check for new technology pages, courses, or blog posts
                            if (node.querySelector('[data-sitemap-update]') || 
                                node.classList.contains('technology-page') ||
                                node.classList.contains('course-page') ||
                                node.classList.contains('blog-post')) {
                                shouldUpdate = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldUpdate) {
                // Debounce updates to avoid too frequent regeneration
                clearTimeout(this.updateTimeout);
                this.updateTimeout = setTimeout(() => {
                    this.updateSitemap();
                }, 5000); // 5 second delay
            }
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },
    
    // Update sitemap
    updateSitemap: async function() {
        try {
            console.log('Updating sitemap...');
            
            // Generate new sitemap
            const sitemap = await this.generateComprehensiveSitemap();
            
            // Validate sitemap
            if (!this.validateSitemapContent(sitemap)) {
                throw new Error('Generated sitemap is invalid');
            }
            
            // Store updated sitemap
            this.storeSitemap(sitemap);
            
            // Submit to Search Console
            if (window.SitemapManager) {
                await window.SitemapManager.submitSitemap(this.config.sitemapPath);
            }
            
            // Update last modification time
            localStorage.setItem('sitemap_last_updated', new Date().toISOString());
            
            console.log('Sitemap updated successfully');
            
        } catch (error) {
            console.error('Failed to update sitemap:', error);
            this.recordError('sitemap_update_failed', error.message);
        }
    },
    
    // Generate comprehensive sitemap
    generateComprehensiveSitemap: async function() {
        const baseUrl = window.location.origin;
        const now = new Date().toISOString();
        
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

        // Get all URLs to include
        const urls = await this.discoverAllUrls();
        
        // Sort URLs by priority
        urls.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));
        
        // Add URLs to sitemap
        for (const urlData of urls) {
            if (sitemap.length > 1000000) break; // Prevent sitemap from becoming too large
            
            sitemap += this.generateUrlEntry(urlData, baseUrl, now);
        }
        
        sitemap += '</urlset>';
        
        return sitemap;
    },
    
    // Discover all URLs in the site
    discoverAllUrls: async function() {
        const urls = [];
        
        // Static pages from configuration
        if (window.SearchConsoleConfig && window.SearchConsoleConfig.SITE_STRUCTURE) {
            Object.entries(window.SearchConsoleConfig.SITE_STRUCTURE).forEach(([url, pageInfo]) => {
                urls.push({
                    url: url,
                    type: pageInfo.type,
                    title: pageInfo.title,
                    priority: this.getPriorityForType(pageInfo.type),
                    changefreq: this.getChangeFreqForType(pageInfo.type),
                    lastmod: this.getLastModForUrl(url)
                });
            });
        }
        
        // Technology pages
        if (window.SearchConsoleConfig && window.SearchConsoleConfig.TECHNOLOGY_PAGES) {
            Object.entries(window.SearchConsoleConfig.TECHNOLOGY_PAGES).forEach(([url, techInfo]) => {
                urls.push({
                    url: url,
                    type: 'technology',
                    title: techInfo.name,
                    priority: '0.9',
                    changefreq: 'weekly',
                    lastmod: this.getLastModForUrl(url)
                });
            });
        }
        
        // Course pages
        if (window.SearchConsoleConfig && window.SearchConsoleConfig.COURSE_PAGES) {
            Object.entries(window.SearchConsoleConfig.COURSE_PAGES).forEach(([url, courseInfo]) => {
                urls.push({
                    url: url,
                    type: 'course',
                    title: courseInfo.name,
                    priority: '0.8',
                    changefreq: 'monthly',
                    lastmod: this.getLastModForUrl(url)
                });
            });
        }
        
        // Discover additional URLs from DOM
        const discoveredUrls = await this.discoverUrlsFromDOM();
        urls.push(...discoveredUrls);
        
        // Remove duplicates
        const uniqueUrls = urls.filter((url, index, self) => 
            index === self.findIndex(u => u.url === url.url)
        );
        
        return uniqueUrls;
    },
    
    // Discover URLs from DOM
    discoverUrlsFromDOM: async function() {
        const urls = [];
        
        // Find all internal links
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip external links, anchors, and javascript links
            if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) {
                return;
            }
            
            // Clean up URL
            let cleanUrl = href;
            if (cleanUrl.startsWith('./')) {
                cleanUrl = cleanUrl.substring(2);
            }
            if (!cleanUrl.startsWith('/')) {
                cleanUrl = '/' + cleanUrl;
            }
            
            // Remove query parameters and fragments
            cleanUrl = cleanUrl.split('?')[0].split('#')[0];
            
            // Determine page type and priority
            const pageType = this.determinePageType(cleanUrl);
            
            urls.push({
                url: cleanUrl,
                type: pageType,
                title: link.textContent.trim() || 'Untitled',
                priority: this.getPriorityForType(pageType),
                changefreq: this.getChangeFreqForType(pageType),
                lastmod: this.getLastModForUrl(cleanUrl)
            });
        });
        
        return urls;
    },
    
    // Generate URL entry for sitemap
    generateUrlEntry: function(urlData, baseUrl, defaultLastMod) {
        const fullUrl = baseUrl + urlData.url;
        const lastmod = urlData.lastmod || defaultLastMod;
        
        return `  <url>
    <loc>${this.escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${urlData.changefreq}</changefreq>
    <priority>${urlData.priority}</priority>
  </url>
`;
    },
    
    // Determine page type from URL
    determinePageType: function(url) {
        if (url === '/') return 'homepage';
        if (url.includes('/tecnologias/')) return 'technology';
        if (url.includes('/cursos/')) return 'course';
        if (url.includes('/blog/')) return 'blog';
        if (url.includes('/entrar-hadoop/') || url.includes('/sair-hadoop/')) return 'category';
        return 'static';
    },
    
    // Get priority for page type
    getPriorityForType: function(type) {
        const priorities = {
            homepage: '1.0',
            technology: '0.9',
            course: '0.8',
            category: '0.8',
            blog: '0.7',
            static: '0.6'
        };
        return priorities[type] || '0.5';
    },
    
    // Get change frequency for page type
    getChangeFreqForType: function(type) {
        const frequencies = {
            homepage: 'daily',
            technology: 'weekly',
            course: 'monthly',
            category: 'weekly',
            blog: 'weekly',
            static: 'monthly'
        };
        return frequencies[type] || 'monthly';
    },
    
    // Get last modification date for URL
    getLastModForUrl: function(url) {
        // Check if we have stored modification dates
        const modDates = JSON.parse(localStorage.getItem('url_modification_dates') || '{}');
        
        if (modDates[url]) {
            return modDates[url];
        }
        
        // Default to current date for new URLs
        const now = new Date().toISOString();
        modDates[url] = now;
        localStorage.setItem('url_modification_dates', JSON.stringify(modDates));
        
        return now;
    },
    
    // Update modification date for URL
    updateModificationDate: function(url) {
        const modDates = JSON.parse(localStorage.getItem('url_modification_dates') || '{}');
        modDates[url] = new Date().toISOString();
        localStorage.setItem('url_modification_dates', JSON.stringify(modDates));
    },
    
    // Validate sitemap content
    validateSitemapContent: function(sitemap) {
        // Basic XML validation
        if (!sitemap.includes('<?xml') || !sitemap.includes('<urlset')) {
            return false;
        }
        
        // Check for required elements
        const urlCount = (sitemap.match(/<url>/g) || []).length;
        if (urlCount === 0) {
            return false;
        }
        
        // Check size limits
        if (sitemap.length > 50 * 1024 * 1024) { // 50MB limit
            console.warn('Sitemap exceeds size limit');
            return false;
        }
        
        if (urlCount > this.config.maxUrls) {
            console.warn('Sitemap exceeds URL limit');
            return false;
        }
        
        return true;
    },
    
    // Store sitemap
    storeSitemap: function(sitemap) {
        // Store in sessionStorage for access
        sessionStorage.setItem('current_sitemap', sitemap);
        
        // Store compressed version in localStorage for persistence
        if (this.config.compressionEnabled) {
            try {
                const compressed = this.compressSitemap(sitemap);
                localStorage.setItem('compressed_sitemap', compressed);
            } catch (error) {
                console.warn('Failed to compress sitemap:', error);
            }
        }
        
        // Store metadata
        const metadata = {
            generated: new Date().toISOString(),
            urlCount: (sitemap.match(/<url>/g) || []).length,
            size: sitemap.length,
            version: this.getSitemapVersion()
        };
        
        localStorage.setItem('sitemap_metadata', JSON.stringify(metadata));
    },
    
    // Compress sitemap (simple compression)
    compressSitemap: function(sitemap) {
        // Simple compression by removing unnecessary whitespace
        return sitemap
            .replace(/>\s+</g, '><')
            .replace(/\s+/g, ' ')
            .trim();
    },
    
    // Get sitemap version
    getSitemapVersion: function() {
        const version = localStorage.getItem('sitemap_version') || '1';
        const newVersion = (parseInt(version) + 1).toString();
        localStorage.setItem('sitemap_version', newVersion);
        return newVersion;
    },
    
    // Escape XML characters
    escapeXml: function(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    },
    
    // Record error
    recordError: function(type, message) {
        const errors = JSON.parse(localStorage.getItem('sitemap_errors') || '[]');
        errors.push({
            type: type,
            message: message,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 errors
        if (errors.length > 50) {
            errors.splice(0, errors.length - 50);
        }
        
        localStorage.setItem('sitemap_errors', JSON.stringify(errors));
    },
    
    // Get sitemap statistics
    getStatistics: function() {
        const metadata = JSON.parse(localStorage.getItem('sitemap_metadata') || '{}');
        const errors = JSON.parse(localStorage.getItem('sitemap_errors') || '[]');
        const lastUpdated = localStorage.getItem('sitemap_last_updated');
        
        return {
            metadata: metadata,
            lastUpdated: lastUpdated,
            errorCount: errors.length,
            recentErrors: errors.slice(-5),
            nextUpdate: this.getNextUpdateTime()
        };
    },
    
    // Get next update time
    getNextUpdateTime: function() {
        const lastUpdated = localStorage.getItem('sitemap_last_updated');
        if (!lastUpdated) return 'Soon';
        
        const nextUpdate = new Date(lastUpdated);
        nextUpdate.setTime(nextUpdate.getTime() + this.config.updateFrequency);
        
        return nextUpdate.toISOString();
    },
    
    // Manual sitemap generation
    generateNow: async function() {
        console.log('Manually generating sitemap...');
        await this.updateSitemap();
        return this.getStatistics();
    },
    
    // Export current sitemap
    exportSitemap: function() {
        const sitemap = sessionStorage.getItem('current_sitemap');
        if (!sitemap) {
            alert('No sitemap available. Generate one first.');
            return;
        }
        
        const blob = new Blob([sitemap], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

// Export for use
window.AutomatedSitemapUpdater = AutomatedSitemapUpdater;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize in production or when explicitly enabled
    if (window.location.hostname === 'hadoop.com.br' || localStorage.getItem('enable_seo_monitoring') === 'true') {
        AutomatedSitemapUpdater.init();
    }
});