/**
 * Sponsored Content Tracking System
 * Simple tracking system for sponsored content engagement
 * Compatible with Bootstrap Studio and various analytics platforms
 */

class SponsoredContentTracker {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.trackingEnabled = true;
        this.debugMode = false;
        
        // Initialize tracking on page load
        this.init();
    }
    
    init() {
        // Check if tracking is enabled
        if (!this.trackingEnabled) return;
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Track initial page view
        this.trackEvent('sponsored_page_view', {
            session_id: this.sessionId,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            referrer: document.referrer,
            user_agent: navigator.userAgent
        });
    }
    
    setupEventListeners() {
        // Track scroll depth
        let scrollDepthTracked = {
            '25': false,
            '50': false,
            '75': false,
            '100': false
        };
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            Object.keys(scrollDepthTracked).forEach(depth => {
                if (scrollPercent >= parseInt(depth) && !scrollDepthTracked[depth]) {
                    scrollDepthTracked[depth] = true;
                    this.trackEvent('scroll_depth', {
                        depth: depth + '%',
                        session_id: this.sessionId
                    });
                }
            });
        });
        
        // Track time on page
        let timeOnPage = 0;
        const timeTracker = setInterval(() => {
            timeOnPage += 10;
            
            // Track engagement milestones
            if (timeOnPage === 30) { // 30 seconds
                this.trackEvent('engagement_30s', { session_id: this.sessionId });
            } else if (timeOnPage === 60) { // 1 minute
                this.trackEvent('engagement_1m', { session_id: this.sessionId });
            } else if (timeOnPage === 180) { // 3 minutes
                this.trackEvent('engagement_3m', { session_id: this.sessionId });
            }
        }, 10000); // Check every 10 seconds
        
        // Clear interval on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(timeTracker);
            this.trackEvent('page_unload', {
                time_on_page: timeOnPage,
                session_id: this.sessionId
            });
        });
        
        // Track clicks on sponsored links
        document.addEventListener('click', (event) => {
            const target = event.target.closest('a[rel*="sponsored"]');
            if (target) {
                this.trackSponsorClick(target);
            }
        });
    }
    
    trackEvent(eventType, data = {}) {
        if (!this.trackingEnabled) return;
        
        const eventData = {
            type: eventType,
            timestamp: new Date().toISOString(),
            session_id: this.sessionId,
            ...data
        };
        
        // Add sponsored content specific data if available
        if (window.sponsoredContentData) {
            eventData.article_id = window.sponsoredContentData.articleId;
            eventData.sponsor_id = window.sponsoredContentData.sponsorId;
            eventData.sponsor_name = window.sponsoredContentData.sponsorName;
        }
        
        this.events.push(eventData);
        
        if (this.debugMode) {
            console.log('Sponsored Content Event:', eventData);
        }
        
        // Store in localStorage for reporting
        this.storeEvent(eventData);
        
        // Send to analytics services
        this.sendToAnalytics(eventData);
    }
    
    trackSponsorClick(element) {
        const clickData = {
            url: element.href,
            text: element.textContent.trim(),
            location: this.getClickLocation(element),
            session_id: this.sessionId
        };
        
        this.trackEvent('sponsor_click', clickData);
    }
    
    getClickLocation(element) {
        // Determine where the click occurred based on element classes or position
        if (element.closest('.sponsor-banner')) return 'banner';
        if (element.closest('.sponsor-cta')) return 'cta';
        if (element.closest('.sponsor-info-card')) return 'sidebar';
        if (element.closest('.navbar')) return 'navbar';
        if (element.closest('.footer')) return 'footer';
        return 'content';
    }
    
    storeEvent(eventData) {
        try {
            let storedEvents = JSON.parse(localStorage.getItem('sponsoredContentEvents') || '[]');
            storedEvents.push(eventData);
            
            // Keep only last 500 events to prevent storage overflow
            if (storedEvents.length > 500) {
                storedEvents = storedEvents.slice(-500);
            }
            
            localStorage.setItem('sponsoredContentEvents', JSON.stringify(storedEvents));
        } catch (error) {
            console.warn('Failed to store sponsored content event:', error);
        }
    }
    
    sendToAnalytics(eventData) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventData.type, {
                custom_parameter_article_id: eventData.article_id,
                custom_parameter_sponsor_id: eventData.sponsor_id,
                custom_parameter_session_id: eventData.session_id,
                custom_parameter_location: eventData.location
            });
        }
        
        // Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: 'sponsored_content_event',
                event_category: 'Sponsored Content',
                event_action: eventData.type,
                event_label: eventData.sponsor_name,
                custom_article_id: eventData.article_id,
                custom_sponsor_id: eventData.sponsor_id,
                custom_session_id: eventData.session_id
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'SponsoredContentEngagement', {
                content_type: 'article',
                content_id: eventData.article_id,
                sponsor_id: eventData.sponsor_id,
                event_type: eventData.type
            });
        }
        
        // Custom analytics endpoint (if available)
        if (window.customAnalyticsEndpoint) {
            this.sendToCustomEndpoint(eventData);
        }
    }
    
    sendToCustomEndpoint(eventData) {
        fetch(window.customAnalyticsEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        }).catch(error => {
            console.warn('Failed to send event to custom analytics endpoint:', error);
        });
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Public methods for manual tracking
    trackCustomEvent(eventType, customData = {}) {
        this.trackEvent(eventType, customData);
    }
    
    getStoredEvents() {
        try {
            return JSON.parse(localStorage.getItem('sponsoredContentEvents') || '[]');
        } catch (error) {
            console.warn('Failed to retrieve stored events:', error);
            return [];
        }
    }
    
    clearStoredEvents() {
        try {
            localStorage.removeItem('sponsoredContentEvents');
        } catch (error) {
            console.warn('Failed to clear stored events:', error);
        }
    }
    
    generateReport() {
        const events = this.getStoredEvents();
        const report = {
            total_events: events.length,
            session_id: this.sessionId,
            events_by_type: {},
            sponsors: {},
            articles: {}
        };
        
        events.forEach(event => {
            // Count by event type
            report.events_by_type[event.type] = (report.events_by_type[event.type] || 0) + 1;
            
            // Count by sponsor
            if (event.sponsor_id) {
                if (!report.sponsors[event.sponsor_id]) {
                    report.sponsors[event.sponsor_id] = {
                        name: event.sponsor_name,
                        events: 0
                    };
                }
                report.sponsors[event.sponsor_id].events++;
            }
            
            // Count by article
            if (event.article_id) {
                report.articles[event.article_id] = (report.articles[event.article_id] || 0) + 1;
            }
        });
        
        return report;
    }
    
    enableDebugMode() {
        this.debugMode = true;
        console.log('Sponsored Content Tracking Debug Mode Enabled');
    }
    
    disableTracking() {
        this.trackingEnabled = false;
        console.log('Sponsored Content Tracking Disabled');
    }
}

// Global functions for easy access
window.trackSponsorClick = function(location) {
    if (window.sponsoredTracker) {
        window.sponsoredTracker.trackCustomEvent('manual_sponsor_click', { location: location });
    }
};

window.trackSponsoredEvent = function(eventType, data) {
    if (window.sponsoredTracker) {
        window.sponsoredTracker.trackCustomEvent(eventType, data);
    }
};

// Initialize tracker when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on sponsored content pages
    if (document.body.classList.contains('sponsored-content') || window.sponsoredContentData) {
        window.sponsoredTracker = new SponsoredContentTracker();
        
        // Enable debug mode if in development
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
            window.sponsoredTracker.enableDebugMode();
        }
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SponsoredContentTracker;
}