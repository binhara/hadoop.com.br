/**
 * Google Search Console Verification Helper
 * Portal Big Data - Setup and Verification Tools
 */

const VERIFICATION_CONFIG = {
    // Verification methods available
    methods: {
        html_file: {
            name: 'HTML File Upload',
            description: 'Upload a verification file to your website root',
            difficulty: 'easy',
            steps: [
                'Download the HTML verification file from Search Console',
                'Upload the file to your website root directory',
                'Verify the file is accessible at https://hadoop.com.br/google[verification-code].html',
                'Click "Verify" in Search Console'
            ]
        },
        
        meta_tag: {
            name: 'HTML Meta Tag',
            description: 'Add a meta tag to your homepage',
            difficulty: 'easy',
            steps: [
                'Copy the meta tag from Search Console',
                'Add it to the <head> section of your homepage',
                'Ensure the tag is present when the page loads',
                'Click "Verify" in Search Console'
            ]
        },
        
        dns_record: {
            name: 'DNS Record',
            description: 'Add a TXT record to your domain DNS',
            difficulty: 'medium',
            steps: [
                'Access your domain DNS settings',
                'Add a new TXT record with name "@" or your domain',
                'Set the value to the verification string from Search Console',
                'Wait for DNS propagation (up to 24 hours)',
                'Click "Verify" in Search Console'
            ]
        },
        
        google_analytics: {
            name: 'Google Analytics',
            description: 'Use existing Google Analytics tracking code',
            difficulty: 'easy',
            steps: [
                'Ensure Google Analytics is properly installed on your site',
                'Use the same Google account for both Analytics and Search Console',
                'Select this verification method in Search Console',
                'Click "Verify" in Search Console'
            ]
        }
    },
    
    // Properties to add to Search Console
    properties: [
        {
            url: 'https://hadoop.com.br',
            type: 'URL prefix',
            primary: true,
            description: 'Main HTTPS property'
        },
        {
            url: 'http://hadoop.com.br',
            type: 'URL prefix',
            primary: false,
            description: 'HTTP redirect verification'
        },
        {
            url: 'sc-domain:hadoop.com.br',
            type: 'Domain',
            primary: false,
            description: 'Domain property (requires DNS verification)'
        }
    ],
    
    // Initial setup checklist
    setupChecklist: [
        {
            task: 'Create Google Search Console account',
            description: 'Sign up at https://search.google.com/search-console/',
            completed: false
        },
        {
            task: 'Add property for https://hadoop.com.br',
            description: 'Add your main website property',
            completed: false
        },
        {
            task: 'Verify ownership',
            description: 'Complete verification using preferred method',
            completed: false
        },
        {
            task: 'Submit sitemap',
            description: 'Submit https://hadoop.com.br/sitemap.xml',
            completed: false
        },
        {
            task: 'Set up email notifications',
            description: 'Configure alerts for critical issues',
            completed: false
        },
        {
            task: 'Link Google Analytics',
            description: 'Connect Analytics and Search Console accounts',
            completed: false
        }
    ]
};

// Verification helper functions
const VerificationHelper = {
    // Generate meta tag for verification
    generateMetaTag: function(verificationCode) {
        return `<meta name="google-site-verification" content="${verificationCode}" />`;
    },
    
    // Generate HTML file content for verification
    generateHtmlFile: function(verificationCode) {
        return `google-site-verification: google${verificationCode}.html`;
    },
    
    // Generate DNS TXT record
    generateDnsRecord: function(verificationCode) {
        return {
            type: 'TXT',
            name: '@',
            value: `google-site-verification=${verificationCode}`,
            ttl: 3600
        };
    },
    
    // Check if verification is already in place
    checkVerification: function(method, verificationCode) {
        switch (method) {
            case 'meta_tag':
                return this.checkMetaTag(verificationCode);
            case 'html_file':
                return this.checkHtmlFile(verificationCode);
            case 'google_analytics':
                return this.checkGoogleAnalytics();
            default:
                return false;
        }
    },
    
    // Check if meta tag is present
    checkMetaTag: function(verificationCode) {
        const metaTags = document.querySelectorAll('meta[name="google-site-verification"]');
        return Array.from(metaTags).some(tag => 
            tag.getAttribute('content') === verificationCode
        );
    },
    
    // Check if HTML file exists
    checkHtmlFile: async function(verificationCode) {
        try {
            const response = await fetch(`/google${verificationCode}.html`);
            return response.ok;
        } catch (error) {
            return false;
        }
    },
    
    // Check if Google Analytics is present
    checkGoogleAnalytics: function() {
        return typeof gtag !== 'undefined' || typeof ga !== 'undefined' || 
               typeof _gaq !== 'undefined' || document.querySelector('[src*="googletagmanager.com"]') !== null;
    },
    
    // Validate sitemap accessibility
    validateSitemap: async function(sitemapUrl = '/sitemap.xml') {
        try {
            const response = await fetch(sitemapUrl);
            if (!response.ok) return false;
            
            const content = await response.text();
            return content.includes('<?xml') && content.includes('<urlset');
        } catch (error) {
            return false;
        }
    },
    
    // Generate setup instructions
    generateSetupInstructions: function(preferredMethod = 'meta_tag') {
        const method = VERIFICATION_CONFIG.methods[preferredMethod];
        if (!method) return null;
        
        return {
            method: preferredMethod,
            name: method.name,
            difficulty: method.difficulty,
            steps: method.steps,
            code_examples: this.getCodeExamples(preferredMethod)
        };
    },
    
    // Get code examples for verification method
    getCodeExamples: function(method) {
        switch (method) {
            case 'meta_tag':
                return {
                    html: `<!-- Add this to the <head> section of your homepage -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />`,
                    location: 'index.html <head> section'
                };
            
            case 'html_file':
                return {
                    filename: 'googleVERIFICATION_CODE.html',
                    content: 'google-site-verification: googleVERIFICATION_CODE.html',
                    location: 'Website root directory'
                };
            
            case 'dns_record':
                return {
                    type: 'TXT Record',
                    name: '@',
                    value: 'google-site-verification=YOUR_VERIFICATION_CODE',
                    location: 'Domain DNS settings'
                };
            
            default:
                return {};
        }
    },
    
    // Run pre-verification checks
    runPreVerificationChecks: async function() {
        const checks = {
            sitemap_accessible: await this.validateSitemap(),
            robots_txt_accessible: await this.validateRobotsTxt(),
            google_analytics_present: this.checkGoogleAnalytics(),
            https_enabled: window.location.protocol === 'https:',
            meta_tags_present: this.checkBasicMetaTags()
        };
        
        return checks;
    },
    
    // Validate robots.txt
    validateRobotsTxt: async function() {
        try {
            const response = await fetch('/robots.txt');
            if (!response.ok) return false;
            
            const content = await response.text();
            return content.includes('Sitemap:');
        } catch (error) {
            return false;
        }
    },
    
    // Check basic meta tags
    checkBasicMetaTags: function() {
        const requiredTags = ['title', 'description'];
        return requiredTags.every(tag => {
            if (tag === 'title') {
                return document.title && document.title.length > 0;
            } else {
                const metaTag = document.querySelector(`meta[name="${tag}"]`);
                return metaTag && metaTag.getAttribute('content');
            }
        });
    },
    
    // Generate verification report
    generateVerificationReport: async function() {
        const preChecks = await this.runPreVerificationChecks();
        
        return {
            timestamp: new Date().toISOString(),
            site_url: window.location.origin,
            pre_verification_checks: preChecks,
            recommended_method: this.getRecommendedMethod(preChecks),
            setup_checklist: VERIFICATION_CONFIG.setupChecklist,
            next_steps: this.getNextSteps(preChecks)
        };
    },
    
    // Get recommended verification method
    getRecommendedMethod: function(preChecks) {
        if (preChecks.google_analytics_present) {
            return 'google_analytics';
        } else {
            return 'meta_tag';
        }
    },
    
    // Get next steps based on current status
    getNextSteps: function(preChecks) {
        const steps = [];
        
        if (!preChecks.sitemap_accessible) {
            steps.push({
                priority: 'high',
                task: 'Fix sitemap accessibility',
                description: 'Ensure sitemap.xml is accessible and properly formatted'
            });
        }
        
        if (!preChecks.robots_txt_accessible) {
            steps.push({
                priority: 'medium',
                task: 'Fix robots.txt',
                description: 'Ensure robots.txt is accessible and includes sitemap reference'
            });
        }
        
        if (!preChecks.https_enabled) {
            steps.push({
                priority: 'high',
                task: 'Enable HTTPS',
                description: 'Set up SSL certificate and redirect HTTP to HTTPS'
            });
        }
        
        if (!preChecks.meta_tags_present) {
            steps.push({
                priority: 'medium',
                task: 'Add basic meta tags',
                description: 'Ensure all pages have title and description meta tags'
            });
        }
        
        return steps;
    }
};

// Search Console setup wizard
const SetupWizard = {
    currentStep: 0,
    
    steps: [
        {
            title: 'Pre-verification Checks',
            description: 'Check if your site is ready for Search Console',
            action: 'runPreChecks'
        },
        {
            title: 'Choose Verification Method',
            description: 'Select the best verification method for your setup',
            action: 'chooseMethod'
        },
        {
            title: 'Implement Verification',
            description: 'Add the verification code to your site',
            action: 'implementVerification'
        },
        {
            title: 'Submit Sitemap',
            description: 'Submit your sitemap to Search Console',
            action: 'submitSitemap'
        },
        {
            title: 'Configure Monitoring',
            description: 'Set up alerts and monitoring',
            action: 'configureMonitoring'
        }
    ],
    
    // Start the setup wizard
    start: function() {
        this.currentStep = 0;
        this.showStep(this.currentStep);
    },
    
    // Show specific step
    showStep: function(stepIndex) {
        const step = this.steps[stepIndex];
        if (!step) return;
        
        console.log(`Setup Wizard - Step ${stepIndex + 1}: ${step.title}`);
        console.log(step.description);
        
        // Execute step action
        if (this[step.action]) {
            this[step.action]();
        }
    },
    
    // Step actions
    runPreChecks: async function() {
        const report = await VerificationHelper.generateVerificationReport();
        console.log('Pre-verification report:', report);
        
        // Auto-advance if all checks pass
        const allPassed = Object.values(report.pre_verification_checks).every(check => check);
        if (allPassed) {
            this.nextStep();
        }
    },
    
    chooseMethod: function() {
        const recommended = VerificationHelper.getRecommendedMethod({
            google_analytics_present: VerificationHelper.checkGoogleAnalytics()
        });
        
        console.log(`Recommended verification method: ${recommended}`);
        console.log('Available methods:', Object.keys(VERIFICATION_CONFIG.methods));
    },
    
    implementVerification: function() {
        console.log('Please implement the chosen verification method');
        console.log('Use VerificationHelper.generateSetupInstructions(method) for detailed steps');
    },
    
    submitSitemap: function() {
        console.log('Submit your sitemap at: https://search.google.com/search-console/sitemaps');
        console.log('Sitemap URL: https://hadoop.com.br/sitemap.xml');
    },
    
    configureMonitoring: function() {
        console.log('Configure email notifications in Search Console settings');
        console.log('Enable SearchConsoleMonitor for automated monitoring');
    },
    
    // Navigate to next step
    nextStep: function() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showStep(this.currentStep);
        } else {
            console.log('Setup wizard completed!');
        }
    },
    
    // Navigate to previous step
    previousStep: function() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }
};

// Export for use
window.SearchConsoleVerification = {
    VerificationHelper,
    SetupWizard,
    VERIFICATION_CONFIG
};

// Auto-run verification checks in development
if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
    document.addEventListener('DOMContentLoaded', async function() {
        console.log('Running Search Console verification checks...');
        const report = await VerificationHelper.generateVerificationReport();
        console.log('Verification report:', report);
    });
}