/**
 * Meta Tags Templates System
 * Portal Big Data - hadoop.com.br
 * 
 * This module provides HTML templates for meta tags that can be
 * dynamically inserted into page heads
 */

class MetaTagsTemplates {
    constructor() {
        this.baseUrl = 'https://hadoop.com.br';
        this.siteName = 'Portal Big Data';
        this.twitterHandle = '@portalbigdata';
    }

    /**
     * Generate complete HTML meta tags for technology pages
     */
    generateTechnologyMetaHTML(techData) {
        const title = `${techData.name} - ${techData.categoryName} | Portal Big Data`;
        const description = `${techData.description} - Guia completo, casos de uso, instalação e comparações no Portal Big Data.`;
        const keywords = `${techData.name}, big data, ${techData.category}, hadoop, apache, open source, ${techData.keywords || ''}`;
        const canonical = `${this.baseUrl}/tecnologias/${techData.category}/${techData.id}`;
        const ogImage = techData.ogImage || `${this.baseUrl}/assets/images/og/${techData.id}-og.jpg`;
        const twitterImage = techData.twitterImage || `${this.baseUrl}/assets/images/twitter/${techData.id}-twitter.jpg`;

        return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="${canonical}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="${this.siteName}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonical}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${twitterImage}">
    <meta property="twitter:site" content="${this.twitterHandle}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "${techData.name}",
        "description": "${techData.description}",
        "url": "${techData.officialUrl || techData.website || ''}",
        "applicationCategory": "${techData.categoryName}",
        "operatingSystem": "${techData.supportedOS || 'Linux, Windows, macOS'}",
        "offers": {
            "@type": "Offer",
            "price": "${techData.price || '0'}",
            "priceCurrency": "USD"
        },
        "author": {
            "@type": "Organization",
            "name": "Portal Big Data",
            "url": "${this.baseUrl}"
        },
        "datePublished": "${techData.datePublished || new Date().toISOString()}",
        "dateModified": "${techData.lastUpdated || new Date().toISOString()}"
    }
    </script>`;
    }

    /**
     * Generate complete HTML meta tags for course pages
     */
    generateCourseMetaHTML(courseData) {
        const title = `${courseData.title} - Cursos | Portal Big Data`;
        const description = `${courseData.description} - Curso especializado em Big Data no Portal Big Data.`;
        const keywords = `${courseData.title}, curso big data, ${courseData.technologies?.join(', ') || ''}, treinamento, certificação`;
        const canonical = `${this.baseUrl}/cursos/${courseData.id}`;
        const ogImage = courseData.ogImage || `${this.baseUrl}/assets/images/courses/${courseData.id}-og.jpg`;
        const twitterImage = courseData.twitterImage || `${this.baseUrl}/assets/images/courses/${courseData.id}-twitter.jpg`;

        return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="${canonical}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="${this.siteName}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonical}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${twitterImage}">
    <meta property="twitter:site" content="${this.twitterHandle}">
    
    <!-- Structured Data for Course -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "${courseData.title}",
        "description": "${courseData.description}",
        "provider": {
            "@type": "Organization",
            "name": "Portal Big Data",
            "url": "${this.baseUrl}"
        },
        "instructor": {
            "@type": "Person",
            "name": "${courseData.instructor || 'Portal Big Data Team'}"
        },
        "courseCode": "${courseData.id}",
        "educationalLevel": "${courseData.level}",
        "timeRequired": "${courseData.duration}",
        "offers": {
            "@type": "Offer",
            "price": "${courseData.price || '0'}",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
        },
        "datePublished": "${courseData.datePublished || new Date().toISOString()}",
        "dateModified": "${courseData.lastUpdated || new Date().toISOString()}"
    }
    </script>`;
    }

    /**
     * Generate complete HTML meta tags for blog/article pages
     */
    generateArticleMetaHTML(articleData) {
        const title = `${articleData.title} | Portal Big Data`;
        const description = articleData.excerpt || articleData.description;
        const keywords = `${articleData.tags?.join(', ') || ''}, big data, hadoop, tecnologia`;
        const canonical = `${this.baseUrl}/blog/${articleData.slug}`;
        const ogImage = articleData.featuredImage || `${this.baseUrl}/assets/images/blog/${articleData.slug}-og.jpg`;
        const twitterImage = articleData.featuredImage || `${this.baseUrl}/assets/images/blog/${articleData.slug}-twitter.jpg`;

        return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="${canonical}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="${this.siteName}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonical}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${twitterImage}">
    <meta property="twitter:site" content="${this.twitterHandle}">
    
    <!-- Structured Data for Article -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${articleData.title}",
        "description": "${description}",
        "image": "${ogImage}",
        "author": {
            "@type": "Person",
            "name": "${articleData.author || 'Portal Big Data Team'}"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Portal Big Data",
            "url": "${this.baseUrl}",
            "logo": {
                "@type": "ImageObject",
                "url": "${this.baseUrl}/assets/images/logo.png"
            }
        },
        "datePublished": "${articleData.publishedDate}",
        "dateModified": "${articleData.modifiedDate || articleData.publishedDate}",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${canonical}"
        }
    }
    </script>`;
    }

    /**
     * Generate breadcrumb structured data HTML
     */
    generateBreadcrumbHTML(breadcrumbs) {
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `${this.baseUrl}${crumb.url}`
            }))
        };

        return `
    <!-- Breadcrumb Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(breadcrumbData, null, 4)}
    </script>`;
    }

    /**
     * Generate homepage meta tags HTML
     */
    generateHomepageMetaHTML() {
        const title = 'Portal Big Data - hadoop.com.br | Hub Completo de Big Data e Hadoop';
        const description = 'Portal Big Data - Seu hub completo para Hadoop, distribuições, tecnologias modernas e alternativas. Escolha entre entrar no Hadoop ou explorar soluções modernas de Big Data.';
        const keywords = 'hadoop, big data, apache spark, data processing, distribuições hadoop, tecnologias big data, portal big data';
        const ogImage = `${this.baseUrl}/assets/images/og/homepage-og.jpg`;
        const twitterImage = `${this.baseUrl}/assets/images/twitter/homepage-twitter.jpg`;

        return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="${this.baseUrl}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${this.baseUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="${this.siteName}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${this.baseUrl}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${twitterImage}">
    <meta property="twitter:site" content="${this.twitterHandle}">
    
    <!-- Structured Data for Website -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Portal Big Data",
        "url": "${this.baseUrl}",
        "description": "${description}",
        "publisher": {
            "@type": "Organization",
            "name": "Portal Big Data",
            "url": "${this.baseUrl}"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "${this.baseUrl}/buscar?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>`;
    }

    /**
     * Generate category page meta tags HTML
     */
    generateCategoryMetaHTML(categoryData) {
        const title = `${categoryData.name} | Portal Big Data`;
        const description = `${categoryData.description} - Explore todas as ${categoryData.name.toLowerCase()} disponíveis no Portal Big Data.`;
        const keywords = `${categoryData.keywords}, big data, hadoop, tecnologias`;
        const canonical = `${this.baseUrl}/${categoryData.slug}/`;
        const ogImage = `${this.baseUrl}/assets/images/og/${categoryData.slug}-og.jpg`;
        const twitterImage = `${this.baseUrl}/assets/images/twitter/${categoryData.slug}-twitter.jpg`;

        return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="${canonical}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="${this.siteName}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonical}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${twitterImage}">
    <meta property="twitter:site" content="${this.twitterHandle}">
    
    <!-- Structured Data for Collection Page -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "${categoryData.name}",
        "description": "${description}",
        "url": "${canonical}",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Portal Big Data",
            "url": "${this.baseUrl}"
        }
    }
    </script>`;
    }

    /**
     * Generate basic meta tags template for any page
     */
    generateBasicMetaHTML(pageData) {
        const title = pageData.title || 'Portal Big Data';
        const description = pageData.description || 'Hub completo para Big Data e Hadoop';
        const keywords = pageData.keywords || 'big data, hadoop, tecnologias';
        const canonical = pageData.canonical || this.baseUrl;
        const ogImage = pageData.ogImage || `${this.baseUrl}/assets/images/og/default-og.jpg`;
        const twitterImage = pageData.twitterImage || `${this.baseUrl}/assets/images/twitter/default-twitter.jpg`;

        return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="${canonical}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="${this.siteName}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonical}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${twitterImage}">
    <meta property="twitter:site" content="${this.twitterHandle}">`;
    }
}

// Export for use in other modules
window.MetaTagsTemplates = MetaTagsTemplates;

// Initialize global instance
window.metaTagsTemplates = new MetaTagsTemplates();