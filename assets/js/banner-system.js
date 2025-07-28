/**
 * Banner Management System for Portal Big Data
 * Handles banner rotation, analytics, and partner management
 * Compatible with Bootstrap Studio and various analytics platforms
 */

class BannerSystem {
    constructor(options = {}) {
        this.banners = [];
        this.currentBannerIndex = 0;
        this.rotationInterval = options.rotationInterval || 30000; // 30 seconds default
        this.analyticsEnabled = options.analyticsEnabled !== false;
        this.debugMode = options.debugMode || false;
        this.sessionId = this.generateSessionId();
        
        // Banner positions
        this.positions = {
            'header': '.banner-header',
            'sidebar-top': '.banner-sidebar-top',
            'sidebar-middle': '.banner-sidebar-middle',
            'sidebar-bottom': '.banner-sidebar-bottom',
            'content-top': '.banner-content-top',
            'content-middle': '.banner-content-middle',
            'content-bottom': '.banner-content-bottom',
            'footer': '.banner-footer'
        };
        
        this.init();
    }
    
    init() {
        this.loadBannerConfiguration();
        this.setupBannerContainers();
        this.startRotation();
        this.setupEventListeners();
        
        if (this.debugMode) {
            console.log('Banner System initialized with', this.banners.length, 'banners');
        }
    }
    
    loadBannerConfiguration() {
        // Default banner configuration - can be loaded from external source
        this.banners = [
            {
                id: 'dssbr-main',
                partnerId: 'dssbr',
                partnerName: 'Data Science & Big Data Brasil',
                url: 'https://dssbr.com.br?utm_source=hadoop.com.br&utm_medium=banner&utm_campaign=partner_integration',
                imageUrl: '/assets/images/banners/dssbr-banner.jpg',
                altText: 'Data Science & Big Data Brasil - Cursos e Certificações',
                position: ['sidebar-top', 'content-top'],
                priority: 1,
                active: true,
                startDate: '2024-01-01',
                endDate: '2025-12-31',
                clickGoal: 'dssbr_click',
                impressionGoal: 'dssbr_impression'
            },
            {
                id: 'gubigdata-main',
                partnerId: 'gubigdata',
                partnerName: 'Gu Big Data',
                url: 'https://gubigdata.com.br?utm_source=hadoop.com.br&utm_medium=banner&utm_campaign=partner_integration',
                imageUrl: '/assets/images/banners/gubigdata-banner.jpg',
                altText: 'Gu Big Data - Consultoria e Treinamentos',
                position: ['sidebar-middle', 'content-middle'],
                priority: 2,
                active: true,
                startDate: '2024-01-01',
                endDate: '2025-12-31',
                clickGoal: 'gubigdata_click',
                impressionGoal: 'gubigdata_impression'
            },
            {
                id: 'oworkshop-main',
                partnerId: 'oworkshop',
                partnerName: 'O Workshop',
                url: 'https://oworkshop.com.br?utm_source=hadoop.com.br&utm_medium=banner&utm_campaign=partner_integration',
                imageUrl: '/assets/images/banners/oworkshop-banner.jpg',
                altText: 'O Workshop - Eventos e Treinamentos Tech',
                position: ['sidebar-bottom', 'content-bottom'],
                priority: 3,
                active: true,
                startDate: '2024-01-01',
                endDate: '2025-12-31',
                clickGoal: 'oworkshop_click',
                impressionGoal: 'oworkshop_impression'
            }
        ];
        
        // Filter active banners within date range
        this.banners = this.banners.filter(banner => {
            if (!banner.active) return false;
            
            const now = new Date();
            const startDate = new Date(banner.startDate);
            const endDate = new Date(banner.endDate);
            
            return now >= startDate && now <= endDate;
        });
        
        // Sort by priority
        this.banners.sort((a, b) => a.priority - b.priority);
    }
    
    setupBannerContainers() {
        Object.keys(this.positions).forEach(position => {
            const selector = this.positions[position];
            const containers = document.querySelectorAll(selector);
            
            containers.forEach(container => {
                if (!container.dataset.bannerPosition) {
                    container.dataset.bannerPosition = position;
                    container.classList.add('banner-container');
                    
                    // Add loading placeholder
                    container.innerHTML = `
                        <div class="banner-placeholder d-flex align-items-center justify-content-center" style="min-height: 100px; background-color: rgba(255, 255, 255, 0.1); border: 2px dashed rgba(255, 255, 255, 0.3); border-radius: 8px;">
                            <div class="text-center">
                                <i class="fas fa-ad fa-2x mb-2 text-muted"></i>
                                <p class="text-muted mb-0">Carregando banner...</p>
                            </div>
                        </div>
                    `;
                }
            });
        });
        
        // Initialize banners for each position
        this.displayBanners();
    }
    
    displayBanners() {
        Object.keys(this.positions).forEach(position => {
            const containers = document.querySelectorAll(this.positions[position]);
            const positionBanners = this.banners.filter(banner => 
                banner.position.includes(position)
            );
            
            containers.forEach(container => {
                if (positionBanners.length > 0) {
                    const banner = positionBanners[0]; // Show first banner for now
                    this.renderBanner(container, banner, position);
                }
            });
        });
    }
    
    renderBanner(container, banner, position) {
        const bannerHtml = `
            <div class="banner-item" data-banner-id="${banner.id}" data-position="${position}" data-partner-id="${banner.partnerId}">
                <div class="card banner-card">
                    <div class="card-body p-2">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <small class="text-muted">
                                <i class="fas fa-handshake me-1"></i>Parceiro
                            </small>
                            <small class="text-muted">
                                <i class="fas fa-external-link-alt"></i>
                            </small>
                        </div>
                        <a href="${banner.url}" 
                           target="_blank" 
                           rel="noopener sponsored" 
                           class="banner-link d-block text-decoration-none"
                           onclick="bannerSystem.trackBannerClick('${banner.id}', '${position}')">
                            <img src="${banner.imageUrl}" 
                                 alt="${banner.altText}" 
                                 class="img-fluid rounded banner-image"
                                 loading="lazy"
                                 onerror="this.src='/assets/images/banners/placeholder.jpg'">
                        </a>
                        <div class="mt-2">
                            <small class="text-muted d-block">${banner.partnerName}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = bannerHtml;
        
        // Track impression
        this.trackBannerImpression(banner.id, position);
        
        // Setup intersection observer for viewability tracking
        this.setupViewabilityTracking(container, banner, position);
    }
    
    setupViewabilityTracking(container, banner, position) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackBannerViewability(banner.id, position, entry.intersectionRatio);
                    }
                });
            }, {
                threshold: [0.5, 1.0] // Track when 50% and 100% visible
            });
            
            observer.observe(container);
        }
    }
    
    startRotation() {
        if (this.banners.length <= 1) return;
        
        setInterval(() => {
            this.rotateBanners();
        }, this.rotationInterval);
    }
    
    rotateBanners() {
        Object.keys(this.positions).forEach(position => {
            const containers = document.querySelectorAll(this.positions[position]);
            const positionBanners = this.banners.filter(banner => 
                banner.position.includes(position)
            );
            
            if (positionBanners.length > 1) {
                containers.forEach(container => {
                    const currentBannerElement = container.querySelector('.banner-item');
                    if (currentBannerElement) {
                        const currentBannerId = currentBannerElement.dataset.bannerId;
                        const currentIndex = positionBanners.findIndex(b => b.id === currentBannerId);
                        const nextIndex = (currentIndex + 1) % positionBanners.length;
                        const nextBanner = positionBanners[nextIndex];
                        
                        // Fade out current banner
                        currentBannerElement.style.opacity = '0';
                        
                        setTimeout(() => {
                            this.renderBanner(container, nextBanner, position);
                            
                            // Fade in new banner
                            const newBannerElement = container.querySelector('.banner-item');
                            if (newBannerElement) {
                                newBannerElement.style.opacity = '0';
                                setTimeout(() => {
                                    newBannerElement.style.opacity = '1';
                                }, 50);
                            }
                        }, 300);
                    }
                });
            }
        });
    }
    
    setupEventListeners() {
        // Track banner interactions
        document.addEventListener('click', (event) => {
            const bannerLink = event.target.closest('.banner-link');
            if (bannerLink) {
                const bannerItem = bannerLink.closest('.banner-item');
                if (bannerItem) {
                    const bannerId = bannerItem.dataset.bannerId;
                    const position = bannerItem.dataset.position;
                    this.trackBannerClick(bannerId, position);
                }
            }
        });
        
        // Track hover events
        document.addEventListener('mouseenter', (event) => {
            const bannerItem = event.target.closest('.banner-item');
            if (bannerItem) {
                const bannerId = bannerItem.dataset.bannerId;
                const position = bannerItem.dataset.position;
                this.trackBannerHover(bannerId, position);
            }
        }, true);
    }
    
    trackBannerImpression(bannerId, position) {
        if (!this.analyticsEnabled) return;
        
        const banner = this.banners.find(b => b.id === bannerId);
        if (!banner) return;
        
        const eventData = {
            event_type: 'banner_impression',
            banner_id: bannerId,
            partner_id: banner.partnerId,
            partner_name: banner.partnerName,
            position: position,
            session_id: this.sessionId,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        this.sendAnalyticsEvent(eventData);
        
        // Track impression goal
        if (banner.impressionGoal) {
            this.trackGoal(banner.impressionGoal, eventData);
        }
        
        if (this.debugMode) {
            console.log('Banner Impression:', eventData);
        }
    }
    
    trackBannerClick(bannerId, position) {
        if (!this.analyticsEnabled) return;
        
        const banner = this.banners.find(b => b.id === bannerId);
        if (!banner) return;
        
        const eventData = {
            event_type: 'banner_click',
            banner_id: bannerId,
            partner_id: banner.partnerId,
            partner_name: banner.partnerName,
            position: position,
            destination_url: banner.url,
            session_id: this.sessionId,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        this.sendAnalyticsEvent(eventData);
        
        // Track click goal
        if (banner.clickGoal) {
            this.trackGoal(banner.clickGoal, eventData);
        }
        
        if (this.debugMode) {
            console.log('Banner Click:', eventData);
        }
    }
    
    trackBannerHover(bannerId, position) {
        if (!this.analyticsEnabled) return;
        
        const banner = this.banners.find(b => b.id === bannerId);
        if (!banner) return;
        
        const eventData = {
            event_type: 'banner_hover',
            banner_id: bannerId,
            partner_id: banner.partnerId,
            partner_name: banner.partnerName,
            position: position,
            session_id: this.sessionId,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        this.sendAnalyticsEvent(eventData);
        
        if (this.debugMode) {
            console.log('Banner Hover:', eventData);
        }
    }
    
    trackBannerViewability(bannerId, position, intersectionRatio) {
        if (!this.analyticsEnabled) return;
        
        const banner = this.banners.find(b => b.id === bannerId);
        if (!banner) return;
        
        const eventData = {
            event_type: 'banner_viewability',
            banner_id: bannerId,
            partner_id: banner.partnerId,
            partner_name: banner.partnerName,
            position: position,
            viewability_ratio: intersectionRatio,
            session_id: this.sessionId,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        this.sendAnalyticsEvent(eventData);
        
        if (this.debugMode) {
            console.log('Banner Viewability:', eventData);
        }
    }
    
    sendAnalyticsEvent(eventData) {
        // Store in localStorage for reporting
        this.storeEvent(eventData);
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventData.event_type, {
                custom_parameter_banner_id: eventData.banner_id,
                custom_parameter_partner_id: eventData.partner_id,
                custom_parameter_position: eventData.position,
                custom_parameter_session_id: eventData.session_id
            });
        }
        
        // Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: 'banner_event',
                event_category: 'Banner',
                event_action: eventData.event_type,
                event_label: eventData.partner_name,
                custom_banner_id: eventData.banner_id,
                custom_partner_id: eventData.partner_id,
                custom_position: eventData.position,
                custom_session_id: eventData.session_id
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'BannerEngagement', {
                content_type: 'banner',
                content_id: eventData.banner_id,
                partner_id: eventData.partner_id,
                event_type: eventData.event_type,
                position: eventData.position
            });
        }
    }
    
    trackGoal(goalName, eventData) {
        // Google Analytics Goals
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': goalName,
                'custom_parameter_banner_id': eventData.banner_id,
                'custom_parameter_partner_id': eventData.partner_id
            });
        }
        
        // Custom goal tracking
        if (window.customGoalTracking) {
            window.customGoalTracking(goalName, eventData);
        }
    }
    
    storeEvent(eventData) {
        try {
            let storedEvents = JSON.parse(localStorage.getItem('bannerEvents') || '[]');
            storedEvents.push(eventData);
            
            // Keep only last 1000 events
            if (storedEvents.length > 1000) {
                storedEvents = storedEvents.slice(-1000);
            }
            
            localStorage.setItem('bannerEvents', JSON.stringify(storedEvents));
        } catch (error) {
            console.warn('Failed to store banner event:', error);
        }
    }
    
    generateSessionId() {
        return 'banner_session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Public methods for banner management
    addBanner(bannerConfig) {
        this.banners.push(bannerConfig);
        this.banners.sort((a, b) => a.priority - b.priority);
        this.displayBanners();
    }
    
    removeBanner(bannerId) {
        this.banners = this.banners.filter(b => b.id !== bannerId);
        this.displayBanners();
    }
    
    updateBanner(bannerId, updates) {
        const bannerIndex = this.banners.findIndex(b => b.id === bannerId);
        if (bannerIndex !== -1) {
            this.banners[bannerIndex] = { ...this.banners[bannerIndex], ...updates };
            this.displayBanners();
        }
    }
    
    getBannerStats() {
        const events = JSON.parse(localStorage.getItem('bannerEvents') || '[]');
        const stats = {};
        
        events.forEach(event => {
            if (!stats[event.banner_id]) {
                stats[event.banner_id] = {
                    impressions: 0,
                    clicks: 0,
                    hovers: 0,
                    partner_name: event.partner_name
                };
            }
            
            if (event.event_type === 'banner_impression') {
                stats[event.banner_id].impressions++;
            } else if (event.event_type === 'banner_click') {
                stats[event.banner_id].clicks++;
            } else if (event.event_type === 'banner_hover') {
                stats[event.banner_id].hovers++;
            }
        });
        
        // Calculate CTR
        Object.keys(stats).forEach(bannerId => {
            const banner = stats[bannerId];
            banner.ctr = banner.impressions > 0 ? (banner.clicks / banner.impressions * 100).toFixed(2) : 0;
        });
        
        return stats;
    }
    
    generateReport() {
        const stats = this.getBannerStats();
        const events = JSON.parse(localStorage.getItem('bannerEvents') || '[]');
        
        return {
            total_events: events.length,
            session_id: this.sessionId,
            banner_stats: stats,
            active_banners: this.banners.length,
            positions: Object.keys(this.positions),
            generated_at: new Date().toISOString()
        };
    }
    
    clearStats() {
        localStorage.removeItem('bannerEvents');
    }
    
    enableDebugMode() {
        this.debugMode = true;
        console.log('Banner System Debug Mode Enabled');
    }
    
    disableAnalytics() {
        this.analyticsEnabled = false;
        console.log('Banner Analytics Disabled');
    }
}

// Initialize banner system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if banner containers exist
    const bannerContainers = document.querySelectorAll('[class*="banner-"]');
    
    if (bannerContainers.length > 0) {
        window.bannerSystem = new BannerSystem({
            rotationInterval: 30000, // 30 seconds
            analyticsEnabled: true,
            debugMode: window.location.hostname === 'localhost' || window.location.hostname.includes('dev')
        });
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BannerSystem;
}