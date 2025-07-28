/**
 * Simple SEO Meta Tags System - Bootstrap Studio Compatible
 * Portal Big Data - hadoop.com.br
 * 
 * Simple functions for generating meta tags without complex classes
 */

// Base configuration
var seoConfig = {
    baseUrl: 'https://hadoop.com.br',
    siteName: 'Portal Big Data',
    defaultImage: '/assets/images/og/default-og.jpg',
    twitterHandle: '@portalbigdata'
};
/**
 * Generate meta tags for technology pages - Simple function
 */
function generateTechnologyMeta(techData) {
        const meta = {
            title: `${techData.name} - ${techData.categoryName} | Portal Big Data`,
            description: `${techData.description} - Guia completo, casos de uso, instalação e comparações no Portal Big Data.`,
            keywords: `${techData.name}, big data, ${techData.category}, hadoop, apache, open source, ${techData.keywords || ''}`,
            canonical: `${this.baseUrl}/tecnologias/${techData.category}/${techData.id}`,
            
            // Open Graph
            ogTitle: `${techData.name} - ${techData.categoryName} | Portal Big Data`,
            ogDescription: `${techData.description} - Guia completo, casos de uso, instalação e comparações.`,
            ogImage: techData.ogImage || `${this.baseUrl}/assets/images/og/${techData.id}-og.jpg`,
            ogUrl: `${this.baseUrl}/tecnologias/${techData.category}/${techData.id}`,
            ogType: 'article',
            
            // Twitter Card
            twitterCard: 'summary_large_image',
            twitterTitle: `${techData.name} - ${techData.categoryName} | Portal Big Data`,
            twitterDescription: `${techData.description} - Guia completo, casos de uso, instalação e comparações.`,
            twitterImage: techData.twitterImage || `${this.baseUrl}/assets/images/twitter/${techData.id}-twitter.jpg`,
            
            // Structured Data
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": techData.name,
                "description": techData.description,
                "url": techData.officialUrl || techData.website,
                "applicationCategory": techData.categoryName,
                "operatingSystem": techData.supportedOS || "Linux, Windows, macOS",
                "offers": {
                    "@type": "Offer",
                    "price": techData.price || "0",
                    "priceCurrency": "USD"
                },
                "author": {
                    "@type": "Organization",
                    "name": "Portal Big Data",
                    "url": this.baseUrl
                },
                "datePublished": techData.datePublished || new Date().toISOString(),
                "dateModified": techData.lastUpdated || new Date().toISOString()
            }
        };

        return meta;
    }

    /**
     * Generate meta tags for course pages
     */
    generateCourseMeta(courseData) {
        const meta = {
            title: `${courseData.title} - Cursos | Portal Big Data`,
            description: `${courseData.description} - Curso especializado em Big Data no Portal Big Data.`,
            keywords: `${courseData.title}, curso big data, ${courseData.technologies?.join(', ') || ''}, treinamento, certificação`,
            canonical: `${this.baseUrl}/cursos/${courseData.id}`,
            
            // Open Graph
            ogTitle: `${courseData.title} - Cursos | Portal Big Data`,
            ogDescription: `${courseData.description} - Curso especializado em Big Data.`,
            ogImage: courseData.ogImage || `${this.baseUrl}/assets/images/courses/${courseData.id}-og.jpg`,
            ogUrl: `${this.baseUrl}/cursos/${courseData.id}`,
            ogType: 'article',
            
            // Twitter Card
            twitterCard: 'summary_large_image',
            twitterTitle: `${courseData.title} - Cursos | Portal Big Data`,
            twitterDescription: `${courseData.description} - Curso especializado em Big Data.`,
            twitterImage: courseData.twitterImage || `${this.baseUrl}/assets/images/courses/${courseData.id}-twitter.jpg`,
            
            // Structured Data
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Course",
                "name": courseData.title,
                "description": courseData.description,
                "provider": {
                    "@type": "Organization",
                    "name": "Portal Big Data",
                    "url": this.baseUrl
                },
                "instructor": {
                    "@type": "Person",
                    "name": courseData.instructor || "Portal Big Data Team"
                },
                "courseCode": courseData.id,
                "educationalLevel": courseData.level,
                "timeRequired": courseData.duration,
                "offers": {
                    "@type": "Offer",
                    "price": courseData.price || "0",
                    "priceCurrency": "BRL",
                    "availability": "https://schema.org/InStock"
                },
                "datePublished": courseData.datePublished || new Date().toISOString(),
                "dateModified": courseData.lastUpdated || new Date().toISOString()
            }
        };

        return meta;
    }

    /**
     * Generate meta tags for blog/article pages
     */
    generateArticleMeta(articleData) {
        const meta = {
            title: `${articleData.title} | Portal Big Data`,
            description: articleData.excerpt || articleData.description,
            keywords: `${articleData.tags?.join(', ') || ''}, big data, hadoop, tecnologia`,
            canonical: `${this.baseUrl}/blog/${articleData.slug}`,
            
            // Open Graph
            ogTitle: `${articleData.title} | Portal Big Data`,
            ogDescription: articleData.excerpt || articleData.description,
            ogImage: articleData.featuredImage || `${this.baseUrl}/assets/images/blog/${articleData.slug}-og.jpg`,
            ogUrl: `${this.baseUrl}/blog/${articleData.slug}`,
            ogType: 'article',
            
            // Twitter Card
            twitterCard: 'summary_large_image',
            twitterTitle: `${articleData.title} | Portal Big Data`,
            twitterDescription: articleData.excerpt || articleData.description,
            twitterImage: articleData.featuredImage || `${this.baseUrl}/assets/images/blog/${articleData.slug}-twitter.jpg`,
            
            // Structured Data
            structuredData: {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": articleData.title,
                "description": articleData.excerpt || articleData.description,
                "image": articleData.featuredImage,
                "author": {
                    "@type": "Person",
                    "name": articleData.author || "Portal Big Data Team"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Portal Big Data",
                    "url": this.baseUrl,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${this.baseUrl}/assets/images/logo.png`
                    }
                },
                "datePublished": articleData.publishedDate,
                "dateModified": articleData.modifiedDate || articleData.publishedDate,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `${this.baseUrl}/blog/${articleData.slug}`
                }
            }
        };

        return meta;
    }

    /**
     * Generate breadcrumb structured data
     */
    generateBreadcrumbData(breadcrumbs) {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `${this.baseUrl}${crumb.url}`
            }))
        };
    }

    /**
     * Apply meta tags to the current page
     */
    applyMetaTags(metaData) {
        // Update title
        document.title = metaData.title;

        // Update or create meta tags
        this.updateMetaTag('description', metaData.description);
        this.updateMetaTag('keywords', metaData.keywords);
        
        // Canonical URL
        this.updateLinkTag('canonical', metaData.canonical);

        // Open Graph tags
        this.updateMetaProperty('og:title', metaData.ogTitle);
        this.updateMetaProperty('og:description', metaData.ogDescription);
        this.updateMetaProperty('og:image', metaData.ogImage);
        this.updateMetaProperty('og:url', metaData.ogUrl);
        this.updateMetaProperty('og:type', metaData.ogType);
        this.updateMetaProperty('og:site_name', this.siteName);

        // Twitter Card tags
        this.updateMetaName('twitter:card', metaData.twitterCard);
        this.updateMetaName('twitter:title', metaData.twitterTitle);
        this.updateMetaName('twitter:description', metaData.twitterDescription);
        this.updateMetaName('twitter:image', metaData.twitterImage);
        this.updateMetaName('twitter:site', this.twitterHandle);

        // Structured Data
        if (metaData.structuredData) {
            this.updateStructuredData(metaData.structuredData);
        }
    }

    /**
     * Update or create a meta tag with name attribute
     */
    updateMetaTag(name, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    /**
     * Update or create a meta tag with property attribute (for Open Graph)
     */
    updateMetaProperty(property, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    /**
     * Update or create a meta tag with name attribute (for Twitter)
     */
    updateMetaName(name, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    /**
     * Update or create a link tag
     */
    updateLinkTag(rel, href) {
        if (!href) return;
        
        let link = document.querySelector(`link[rel="${rel}"]`);
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', rel);
            document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    }

    /**
     * Update structured data JSON-LD
     */
    updateStructuredData(data) {
        // Remove existing structured data
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Add new structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
    }

    /**
     * Generate meta tags for homepage
     */
    generateHomepageMeta() {
        return {
            title: 'Portal Big Data - hadoop.com.br | Hub Completo de Big Data e Hadoop',
            description: 'Portal Big Data - Seu hub completo para Hadoop, distribuições, tecnologias modernas e alternativas. Escolha entre entrar no Hadoop ou explorar soluções modernas de Big Data.',
            keywords: 'hadoop, big data, apache spark, data processing, distribuições hadoop, tecnologias big data, portal big data',
            canonical: this.baseUrl,
            
            ogTitle: 'Portal Big Data - hadoop.com.br | Hub Completo de Big Data e Hadoop',
            ogDescription: 'Seu hub completo para Hadoop, distribuições, tecnologias modernas e alternativas',
            ogImage: `${this.baseUrl}/assets/images/og/homepage-og.jpg`,
            ogUrl: this.baseUrl,
            ogType: 'website',
            
            twitterCard: 'summary_large_image',
            twitterTitle: 'Portal Big Data - hadoop.com.br | Hub Completo de Big Data e Hadoop',
            twitterDescription: 'Seu hub completo para Hadoop, distribuições, tecnologias modernas e alternativas',
            twitterImage: `${this.baseUrl}/assets/images/twitter/homepage-twitter.jpg`,
            
            structuredData: {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Portal Big Data",
                "url": this.baseUrl,
                "description": "Hub completo para Hadoop, distribuições, tecnologias modernas e alternativas de Big Data",
                "publisher": {
                    "@type": "Organization",
                    "name": "Portal Big Data",
                    "url": this.baseUrl
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${this.baseUrl}/buscar?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            }
        };
    }

    /**
     * Generate meta tags for category pages (e.g., /tecnologias/, /cursos/)
     */
    generateCategoryMeta(categoryData) {
        return {
            title: `${categoryData.name} | Portal Big Data`,
            description: `${categoryData.description} - Explore todas as ${categoryData.name.toLowerCase()} disponíveis no Portal Big Data.`,
            keywords: `${categoryData.keywords}, big data, hadoop, tecnologias`,
            canonical: `${this.baseUrl}/${categoryData.slug}/`,
            
            ogTitle: `${categoryData.name} | Portal Big Data`,
            ogDescription: `${categoryData.description} - Explore todas as ${categoryData.name.toLowerCase()} disponíveis no Portal Big Data.`,
            ogImage: `${this.baseUrl}/assets/images/og/${categoryData.slug}-og.jpg`,
            ogUrl: `${this.baseUrl}/${categoryData.slug}/`,
            ogType: 'website',
            
            twitterCard: 'summary_large_image',
            twitterTitle: `${categoryData.name} | Portal Big Data`,
            twitterDescription: `${categoryData.description} - Explore todas as ${categoryData.name.toLowerCase()} disponíveis.`,
            twitterImage: `${this.baseUrl}/assets/images/twitter/${categoryData.slug}-twitter.jpg`,
            
            structuredData: {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": categoryData.name,
                "description": categoryData.description,
                "url": `${this.baseUrl}/${categoryData.slug}/`,
                "isPartOf": {
                    "@type": "WebSite",
                    "name": "Portal Big Data",
                    "url": this.baseUrl
                }
            }
        };
    }
}

// Export for use in other modules
window.SEOMetaTags = SEOMetaTags;

// Initialize global instance
window.seoMetaTags = new SEOMetaTags();