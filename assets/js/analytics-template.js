/**
 * Analytics Template for Portal Big Data Pages
 * Include this script on all pages to enable tracking
 */

// Page-specific tracking configuration
const PAGE_ANALYTICS_CONFIG = {
    // Technology pages
    technology: {
        trackPageView: true,
        customEvents: ['technology_view'],
        autoTrack: ['external_links', 'downloads', 'related_content_clicks']
    },
    
    // Course pages
    course: {
        trackPageView: true,
        customEvents: ['course_interest', 'course_enrollment'],
        autoTrack: ['enrollment_clicks', 'prerequisite_links', 'instructor_links']
    },
    
    // Blog pages
    blog: {
        trackPageView: true,
        customEvents: ['article_read', 'social_share'],
        autoTrack: ['read_time', 'scroll_depth', 'comment_interactions']
    },
    
    // Sponsored content pages
    sponsored: {
        trackPageView: true,
        customEvents: ['sponsored_content_view', 'sponsor_link_click'],
        autoTrack: ['engagement_time', 'cta_clicks']
    }
};

// Initialize page-specific analytics
function initPageAnalytics(pageType, pageData = {}) {
    if (!window.PortalAnalytics) {
        console.warn('Portal Analytics not loaded');
        return;
    }
    
    const config = PAGE_ANALYTICS_CONFIG[pageType];
    if (!config) {
        console.warn(`Unknown page type: ${pageType}`);
        return;
    }
    
    // Track page view with custom parameters
    if (config.trackPageView) {
        const customParams = {
            custom_parameter_2: pageType,
            ...pageData
        };
        
        window.PortalAnalytics.trackPageView(document.title, customParams);
    }
    
    // Setup automatic tracking based on page type
    setupPageSpecificTracking(pageType, pageData);
}

// Setup page-specific automatic tracking
function setupPageSpecificTracking(pageType, pageData) {
    switch (pageType) {
        case 'technology':
            setupTechnologyPageTracking(pageData);
            break;
        case 'course':
            setupCoursePageTracking(pageData);
            break;
        case 'blog':
            setupBlogPageTracking(pageData);
            break;
        case 'sponsored':
            setupSponsoredPageTracking(pageData);
            break;
    }
}

// Technology page specific tracking
function setupTechnologyPageTracking(pageData) {
    // Track technology view
    if (pageData.technologyName && pageData.category) {
        window.PortalAnalytics.trackTechnologyView(
            pageData.technologyName,
            pageData.category,
            document.referrer
        );
    }
    
    // Track related technology clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (!target) return;
        
        // Track clicks on related technologies
        if (target.closest('.related-technologies')) {
            const relatedTech = target.textContent.trim();
            window.PortalAnalytics.trackEvent('related_technology_click', {
                source_technology: pageData.technologyName,
                target_technology: relatedTech,
                custom_parameter_2: 'technology'
            });
        }
        
        // Track official documentation clicks
        if (target.href && (target.href.includes('docs') || target.href.includes('documentation'))) {
            window.PortalAnalytics.trackEvent('documentation_click', {
                technology_name: pageData.technologyName,
                link_type: 'official_docs'
            });
        }
    });
}

// Course page specific tracking
function setupCoursePageTracking(pageData) {
    // Track course interest
    if (pageData.courseName && pageData.courseLevel) {
        window.PortalAnalytics.trackCourseInteraction(
            pageData.courseName,
            pageData.courseLevel,
            'page_view'
        );
    }
    
    // Track enrollment button clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;
        
        if (target.textContent.toLowerCase().includes('inscrever') || 
            target.textContent.toLowerCase().includes('enrollment')) {
            
            window.PortalAnalytics.trackCourseInteraction(
                pageData.courseName,
                pageData.courseLevel,
                'enrollment_click'
            );
        }
        
        // Track prerequisite course clicks
        if (target.closest('.prerequisites')) {
            window.PortalAnalytics.trackEvent('prerequisite_click', {
                source_course: pageData.courseName,
                target_course: target.textContent.trim()
            });
        }
    });
}

// Blog page specific tracking
function setupBlogPageTracking(pageData) {
    let readStartTime = Date.now();
    let maxScrollDepth = 0;
    
    // Track reading time
    window.addEventListener('beforeunload', function() {
        const readTime = Math.round((Date.now() - readStartTime) / 1000);
        if (readTime > 10) { // Only track if read for more than 10 seconds
            window.PortalAnalytics.trackEvent('article_read_time', {
                article_title: pageData.articleTitle || document.title,
                read_time_seconds: readTime,
                max_scroll_depth: maxScrollDepth
            });
        }
    });
    
    // Track scroll depth
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);
        
        // Track milestone scroll depths
        if (scrollPercent >= 25 && !window.scrollTracked25) {
            window.PortalAnalytics.trackEvent('scroll_depth', { percent: 25, article_title: pageData.articleTitle });
            window.scrollTracked25 = true;
        }
        if (scrollPercent >= 50 && !window.scrollTracked50) {
            window.PortalAnalytics.trackEvent('scroll_depth', { percent: 50, article_title: pageData.articleTitle });
            window.scrollTracked50 = true;
        }
        if (scrollPercent >= 75 && !window.scrollTracked75) {
            window.PortalAnalytics.trackEvent('scroll_depth', { percent: 75, article_title: pageData.articleTitle });
            window.scrollTracked75 = true;
        }
    });
    
    // Track social sharing
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (!target) return;
        
        if (target.href.includes('facebook.com/sharer') || 
            target.href.includes('twitter.com/intent') ||
            target.href.includes('linkedin.com/sharing')) {
            
            const platform = target.href.includes('facebook') ? 'facebook' :
                           target.href.includes('twitter') ? 'twitter' : 'linkedin';
            
            window.PortalAnalytics.trackEvent('social_share', {
                platform: platform,
                article_title: pageData.articleTitle,
                share_url: window.location.href
            });
        }
    });
}

// Sponsored content page tracking
function setupSponsoredPageTracking(pageData) {
    // Track sponsored content view
    if (pageData.partnerName && pageData.contentTitle) {
        window.PortalAnalytics.trackSponsoredContent(
            pageData.contentType || 'article',
            pageData.partnerName,
            pageData.contentTitle
        );
    }
    
    // Track sponsor CTA clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;
        
        if (target.closest('.sponsor-cta') || target.classList.contains('sponsor-link')) {
            window.PortalAnalytics.trackEvent('sponsor_cta_click', {
                partner_name: pageData.partnerName,
                cta_text: target.textContent.trim(),
                cta_position: getSponsorCTAPosition(target)
            });
        }
    });
}

// Helper function to get sponsor CTA position
function getSponsorCTAPosition(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    if (rect.top < viewportHeight * 0.33) return 'top';
    if (rect.top < viewportHeight * 0.66) return 'middle';
    return 'bottom';
}

// Export for use in page templates
window.PageAnalytics = {
    init: initPageAnalytics,
    setupTechnologyPageTracking,
    setupCoursePageTracking,
    setupBlogPageTracking,
    setupSponsoredPageTracking
};

// Usage examples for different page types:
/*

// Technology page example:
PageAnalytics.init('technology', {
    technologyName: 'Apache Spark',
    category: 'processamento',
    custom_parameter_3: 'intermediate'
});

// Course page example:
PageAnalytics.init('course', {
    courseName: 'Apache Spark Fundamentals',
    courseLevel: 'intermediate',
    coursePrice: 0
});

// Blog page example:
PageAnalytics.init('blog', {
    articleTitle: 'Hadoop vs Spark: Complete Comparison',
    articleCategory: 'comparison',
    authorName: 'Portal Big Data Team'
});

// Sponsored content example:
PageAnalytics.init('sponsored', {
    partnerName: 'dssbr.com.br',
    contentTitle: 'Advanced Hadoop Training',
    contentType: 'course_promotion'
});

*/