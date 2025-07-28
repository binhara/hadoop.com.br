/**
 * Google Analytics 4 Configuration
 * Portal Big Data - hadoop.com.br
 */

// GA4 Configuration
const GA4_CONFIG = {
    measurementId: 'G-XXXXXXXXXX', // Replace with actual GA4 Measurement ID
    
    // Custom events configuration
    events: {
        // Page navigation events
        page_view: {
            event_name: 'page_view',
            parameters: ['page_title', 'page_location', 'page_referrer']
        },
        
        // User journey events
        pill_selection: {
            event_name: 'pill_selection',
            parameters: ['pill_type', 'user_journey']
        },
        
        // Content engagement events
        technology_view: {
            event_name: 'technology_view',
            parameters: ['technology_name', 'category', 'source_page']
        },
        
        course_interest: {
            event_name: 'course_interest',
            parameters: ['course_name', 'course_level', 'action_type']
        },
        
        // Download and external link tracking
        file_download: {
            event_name: 'file_download',
            parameters: ['file_name', 'file_type', 'download_url']
        },
        
        external_link_click: {
            event_name: 'click',
            parameters: ['link_url', 'link_text', 'outbound']
        },
        
        // Newsletter and conversion events
        newsletter_signup: {
            event_name: 'sign_up',
            parameters: ['method', 'interest_area']
        },
        
        search_performed: {
            event_name: 'search',
            parameters: ['search_term', 'search_results_count']
        },
        
        // Partner content tracking
        sponsored_content_view: {
            event_name: 'sponsored_content_view',
            parameters: ['content_type', 'partner_name', 'content_title']
        },
        
        banner_click: {
            event_name: 'banner_click',
            parameters: ['banner_position', 'partner_name', 'banner_type']
        }
    },
    
    // Goals and conversions
    goals: {
        newsletter_conversion: {
            event_name: 'newsletter_signup_complete',
            value: 1
        },
        
        course_enrollment: {
            event_name: 'course_enrollment',
            value: 5
        },
        
        technology_deep_dive: {
            event_name: 'technology_engagement',
            value: 2
        },
        
        partner_referral: {
            event_name: 'partner_referral',
            value: 3
        }
    },
    
    // Custom dimensions
    customDimensions: {
        user_journey: 'custom_parameter_1', // 'entrar_hadoop' or 'sair_hadoop'
        content_category: 'custom_parameter_2', // 'technology', 'course', 'blog', etc.
        user_level: 'custom_parameter_3', // 'beginner', 'intermediate', 'advanced'
        content_source: 'custom_parameter_4' // 'organic', 'sponsored', 'partner'
    }
};

// Initialize Google Analytics 4
function initializeGA4() {
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    // Configure GA4
    gtag('config', GA4_CONFIG.measurementId, {
        // Enhanced measurement
        enhanced_measurement: true,
        
        // Custom parameters
        custom_map: GA4_CONFIG.customDimensions,
        
        // Privacy settings
        anonymize_ip: true,
        allow_google_signals: true,
        allow_ad_personalization_signals: false
    });
    
    // Make gtag globally available
    window.gtag = gtag;
    
    console.log('Google Analytics 4 initialized successfully');
}

// Track custom events
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
        console.log(`GA4 Event tracked: ${eventName}`, parameters);
    } else {
        console.warn('GA4 not initialized, event not tracked:', eventName);
    }
}

// Track page views with custom parameters
function trackPageView(pageTitle, customParams = {}) {
    const params = {
        page_title: pageTitle,
        page_location: window.location.href,
        page_referrer: document.referrer,
        ...customParams
    };
    
    trackEvent('page_view', params);
}

// Track user journey selection (pill choice)
function trackPillSelection(pillType) {
    trackEvent('pill_selection', {
        pill_type: pillType,
        user_journey: pillType === 'red' ? 'entrar_hadoop' : 'sair_hadoop',
        custom_parameter_1: pillType === 'red' ? 'entrar_hadoop' : 'sair_hadoop'
    });
}

// Track technology page views
function trackTechnologyView(technologyName, category, sourcePage = '') {
    trackEvent('technology_view', {
        technology_name: technologyName,
        category: category,
        source_page: sourcePage,
        custom_parameter_2: 'technology'
    });
}

// Track course interactions
function trackCourseInteraction(courseName, courseLevel, actionType) {
    trackEvent('course_interest', {
        course_name: courseName,
        course_level: courseLevel,
        action_type: actionType,
        custom_parameter_2: 'course',
        custom_parameter_3: courseLevel
    });
}

// Track file downloads
function trackFileDownload(fileName, fileType, downloadUrl) {
    trackEvent('file_download', {
        file_name: fileName,
        file_type: fileType,
        download_url: downloadUrl
    });
}

// Track external link clicks
function trackExternalLink(linkUrl, linkText) {
    trackEvent('click', {
        link_url: linkUrl,
        link_text: linkText,
        outbound: true
    });
}

// Track newsletter signups
function trackNewsletterSignup(interestArea) {
    trackEvent('sign_up', {
        method: 'newsletter',
        interest_area: interestArea
    });
    
    // Track as conversion goal
    trackEvent('newsletter_signup_complete', {
        value: GA4_CONFIG.goals.newsletter_conversion.value
    });
}

// Track search functionality
function trackSearch(searchTerm, resultsCount) {
    trackEvent('search', {
        search_term: searchTerm,
        search_results_count: resultsCount
    });
}

// Track sponsored content views
function trackSponsoredContent(contentType, partnerName, contentTitle) {
    trackEvent('sponsored_content_view', {
        content_type: contentType,
        partner_name: partnerName,
        content_title: contentTitle,
        custom_parameter_4: 'sponsored'
    });
}

// Track banner clicks
function trackBannerClick(bannerPosition, partnerName, bannerType) {
    trackEvent('banner_click', {
        banner_position: bannerPosition,
        partner_name: partnerName,
        banner_type: bannerType
    });
    
    // Track as partner referral goal
    trackEvent('partner_referral', {
        value: GA4_CONFIG.goals.partner_referral.value,
        partner_name: partnerName
    });
}

// Enhanced ecommerce tracking for course enrollments
function trackCourseEnrollment(courseName, coursePrice, courseCategory) {
    trackEvent('purchase', {
        transaction_id: `course_${Date.now()}`,
        value: coursePrice || 0,
        currency: 'BRL',
        items: [{
            item_id: courseName.toLowerCase().replace(/\s+/g, '_'),
            item_name: courseName,
            category: courseCategory,
            quantity: 1,
            price: coursePrice || 0
        }]
    });
    
    // Track as conversion goal
    trackEvent('course_enrollment', {
        value: GA4_CONFIG.goals.course_enrollment.value,
        course_name: courseName
    });
}

// Automatic tracking setup
function setupAutomaticTracking() {
    // Track pill button clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (!target) return;
        
        // Track pill selections
        if (target.href.includes('entrar-hadoop')) {
            trackPillSelection('red');
        } else if (target.href.includes('sair-hadoop')) {
            trackPillSelection('blue');
        }
        
        // Track external links
        if (target.hostname && target.hostname !== window.location.hostname) {
            trackExternalLink(target.href, target.textContent.trim());
        }
        
        // Track download links
        const href = target.href;
        if (href.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar)$/i)) {
            const fileName = href.split('/').pop();
            const fileType = fileName.split('.').pop();
            trackFileDownload(fileName, fileType, href);
        }
        
        // Track banner clicks
        if (target.closest('.banner-content-top, .banner-content-middle, .banner-content-bottom')) {
            const bannerContainer = target.closest('[class*="banner-content"]');
            const position = bannerContainer.className.includes('top') ? 'top' : 
                           bannerContainer.className.includes('middle') ? 'middle' : 'bottom';
            trackBannerClick(position, 'partner', 'display');
        }
    });
    
    // Track newsletter form submissions
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const interestSelect = document.getElementById('interest');
            const interestArea = interestSelect ? interestSelect.value : 'unknown';
            trackNewsletterSignup(interestArea);
        });
    }
    
    // Track scroll depth
    let scrollDepthTracked = false;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent >= 75 && !scrollDepthTracked) {
            trackEvent('scroll', {
                percent_scrolled: 75
            });
            scrollDepthTracked = true;
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeGA4();
    setupAutomaticTracking();
    
    // Track initial page view
    trackPageView(document.title, {
        custom_parameter_2: 'homepage'
    });
});

// Export functions for use in other scripts
window.PortalAnalytics = {
    trackEvent,
    trackPageView,
    trackPillSelection,
    trackTechnologyView,
    trackCourseInteraction,
    trackFileDownload,
    trackExternalLink,
    trackNewsletterSignup,
    trackSearch,
    trackSponsoredContent,
    trackBannerClick,
    trackCourseEnrollment
};