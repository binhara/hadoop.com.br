/**
 * Structured Data (Schema.org) System
 * Portal Big Data - hadoop.com.br
 * 
 * This module provides utilities for generating and managing
 * structured data markup for SEO optimization
 */

class StructuredData {
    constructor() {
        this.baseUrl = 'https://hadoop.com.br';
        this.organizationData = this.getOrganizationData();
    }

    /**
     * Get base organization data
     */
    getOrganizationData() {
        return {
            "@type": "Organization",
            "name": "Portal Big Data",
            "url": this.baseUrl,
            "logo": {
                "@type": "ImageObject",
                "url": `${this.baseUrl}/assets/images/logo.png`,
                "width": 200,
                "height": 60
            },
            "description": "Hub completo para Hadoop, distribuições, tecnologias modernas e alternativas de Big Data",
            "foundingDate": "2024",
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contato@hadoop.com.br"
            },
            "sameAs": [
                "https://twitter.com/portalbigdata",
                "https://linkedin.com/company/portal-big-data"
            ]
        };
    }

    /**
     * Generate SoftwareApplication structured data
     */
    generateSoftwareApplicationData(techData) {
        return {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": techData.name,
            "description": techData.description,
            "url": techData.officialUrl || techData.website,
            "applicationCategory": techData.categoryName,
            "operatingSystem": techData.supportedOS || "Linux, Windows, macOS",
            "programmingLanguage": techData.programmingLanguage || techData.language,
            "license": techData.license || "Various",
            "version": techData.version || techData.currentVersion,
            "datePublished": techData.datePublished || techData.firstRelease,
            "dateModified": techData.lastUpdated || new Date().toISOString(),
            "author": this.organizationData,
            "publisher": this.organizationData,
            "offers": {
                "@type": "Offer",
                "price": techData.price || "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
            },
            "aggregateRating": techData.rating ? {
                "@type": "AggregateRating",
                "ratingValue": techData.rating,
                "ratingCount": techData.ratingCount || 100,
                "bestRating": 5,
                "worstRating": 1
            } : undefined,
            "screenshot": techData.screenshots ? techData.screenshots.map(url => ({
                "@type": "ImageObject",
                "url": url
            })) : undefined,
            "featureList": techData.features || [],
            "requirements": techData.requirements || techData.prerequisites,
            "downloadUrl": techData.downloadUrl,
            "installUrl": techData.installUrl,
            "memoryRequirements": techData.memoryRequirements,
            "storageRequirements": techData.storageRequirements,
            "processorRequirements": techData.processorRequirements
        };
    }

    /**
     * Generate Course structured data
     */
    generateCourseData(courseData) {
        return {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": courseData.title,
            "description": courseData.description,
            "provider": this.organizationData,
            "instructor": courseData.instructor ? {
                "@type": "Person",
                "name": courseData.instructor,
                "description": courseData.instructorBio,
                "image": courseData.instructorImage,
                "jobTitle": courseData.instructorTitle
            } : this.organizationData,
            "courseCode": courseData.id,
            "educationalLevel": courseData.level,
            "timeRequired": courseData.duration,
            "inLanguage": "pt-BR",
            "availableLanguage": "pt-BR",
            "teaches": courseData.learningObjectives || courseData.topics,
            "coursePrerequisites": courseData.prerequisites,
            "educationalCredentialAwarded": "Certificate of Completion",
            "datePublished": courseData.datePublished || new Date().toISOString(),
            "dateModified": courseData.lastUpdated || new Date().toISOString(),
            "image": courseData.image || `${this.baseUrl}/assets/images/courses/${courseData.id}.jpg`,
            "url": `${this.baseUrl}/cursos/${courseData.id}`,
            "offers": {
                "@type": "Offer",
                "price": courseData.price || "0",
                "priceCurrency": "BRL",
                "availability": "https://schema.org/InStock",
                "validFrom": courseData.validFrom || new Date().toISOString(),
                "category": courseData.category
            },
            "aggregateRating": courseData.rating ? {
                "@type": "AggregateRating",
                "ratingValue": courseData.rating,
                "ratingCount": courseData.ratingCount || 50,
                "bestRating": 5,
                "worstRating": 1
            } : undefined,
            "review": courseData.reviews ? courseData.reviews.map(review => ({
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": review.author
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": review.rating,
                    "bestRating": 5,
                    "worstRating": 1
                },
                "reviewBody": review.text,
                "datePublished": review.date
            })) : undefined,
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "online",
                "courseWorkload": courseData.duration,
                "instructor": courseData.instructor ? {
                    "@type": "Person",
                    "name": courseData.instructor
                } : this.organizationData
            }
        };
    }

    /**
     * Generate EducationalOrganization structured data
     */
    generateEducationalOrganizationData() {
        return {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Portal Big Data",
            "url": this.baseUrl,
            "logo": this.organizationData.logo,
            "description": "Plataforma educacional especializada em Big Data, Hadoop e tecnologias modernas",
            "foundingDate": "2024",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR",
                "addressLocality": "Brasil"
            },
            "contactPoint": this.organizationData.contactPoint,
            "sameAs": this.organizationData.sameAs,
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Catálogo de Cursos Big Data",
                "itemListElement": [
                    {
                        "@type": "Course",
                        "name": "Apache Spark Fundamentals",
                        "url": `${this.baseUrl}/cursos/apache-spark-fundamentals`
                    },
                    {
                        "@type": "Course",
                        "name": "Hadoop Migration Guide",
                        "url": `${this.baseUrl}/cursos/hadoop-migration-guide`
                    },
                    {
                        "@type": "Course",
                        "name": "Delta Lake Essentials",
                        "url": `${this.baseUrl}/cursos/delta-lake-essentials`
                    }
                ]
            },
            "department": [
                {
                    "@type": "Organization",
                    "name": "Departamento Hadoop",
                    "description": "Especializado em tecnologias Hadoop e distribuições"
                },
                {
                    "@type": "Organization",
                    "name": "Departamento Tecnologias Modernas",
                    "description": "Focado em alternativas modernas ao Hadoop"
                }
            ]
        };
    }

    /**
     * Generate Article/BlogPosting structured data
     */
    generateArticleData(articleData) {
        return {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": articleData.title,
            "description": articleData.excerpt || articleData.description,
            "image": {
                "@type": "ImageObject",
                "url": articleData.featuredImage || `${this.baseUrl}/assets/images/blog/${articleData.slug}-og.jpg`,
                "width": 1200,
                "height": 630
            },
            "author": {
                "@type": "Person",
                "name": articleData.author || "Portal Big Data Team",
                "url": articleData.authorUrl || this.baseUrl
            },
            "publisher": this.organizationData,
            "datePublished": articleData.publishedDate,
            "dateModified": articleData.modifiedDate || articleData.publishedDate,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${this.baseUrl}/blog/${articleData.slug}`
            },
            "url": `${this.baseUrl}/blog/${articleData.slug}`,
            "wordCount": articleData.wordCount,
            "keywords": articleData.tags ? articleData.tags.join(', ') : '',
            "articleSection": articleData.category || "Big Data",
            "inLanguage": "pt-BR",
            "about": articleData.topics ? articleData.topics.map(topic => ({
                "@type": "Thing",
                "name": topic
            })) : undefined,
            "mentions": articleData.technologies ? articleData.technologies.map(tech => ({
                "@type": "SoftwareApplication",
                "name": tech
            })) : undefined
        };
    }

    /**
     * Generate BreadcrumbList structured data
     */
    generateBreadcrumbData(breadcrumbs) {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": {
                    "@type": "WebPage",
                    "@id": `${this.baseUrl}${crumb.url}`,
                    "name": crumb.name
                }
            }))
        };
    }

    /**
     * Generate WebSite structured data with search functionality
     */
    generateWebSiteData() {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Portal Big Data",
            "alternateName": "hadoop.com.br",
            "url": this.baseUrl,
            "description": "Hub completo para Hadoop, distribuições, tecnologias modernas e alternativas de Big Data",
            "publisher": this.organizationData,
            "inLanguage": "pt-BR",
            "potentialAction": [
                {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${this.baseUrl}/buscar?q={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                }
            ],
            "mainEntity": {
                "@type": "ItemList",
                "name": "Seções Principais",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                            "@type": "WebPage",
                            "name": "Tecnologias",
                            "url": `${this.baseUrl}/tecnologias`,
                            "description": "Catálogo completo de tecnologias Big Data"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "item": {
                            "@type": "WebPage",
                            "name": "Cursos",
                            "url": `${this.baseUrl}/cursos`,
                            "description": "Cursos especializados em Big Data"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "item": {
                            "@type": "WebPage",
                            "name": "Entrar no Hadoop",
                            "url": `${this.baseUrl}/entrar-hadoop`,
                            "description": "Recursos para iniciantes em Hadoop"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "item": {
                            "@type": "WebPage",
                            "name": "Sair do Hadoop",
                            "url": `${this.baseUrl}/sair-hadoop`,
                            "description": "Alternativas modernas ao Hadoop"
                        }
                    }
                ]
            }
        };
    }

    /**
     * Generate FAQ structured data
     */
    generateFAQData(faqItems) {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };
    }

    /**
     * Generate HowTo structured data for tutorials
     */
    generateHowToData(tutorialData) {
        return {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": tutorialData.title,
            "description": tutorialData.description,
            "image": tutorialData.image,
            "totalTime": tutorialData.duration,
            "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "BRL",
                "value": tutorialData.cost || "0"
            },
            "supply": tutorialData.supplies ? tutorialData.supplies.map(supply => ({
                "@type": "HowToSupply",
                "name": supply
            })) : undefined,
            "tool": tutorialData.tools ? tutorialData.tools.map(tool => ({
                "@type": "HowToTool",
                "name": tool
            })) : undefined,
            "step": tutorialData.steps ? tutorialData.steps.map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": step.title,
                "text": step.description,
                "image": step.image,
                "url": step.url
            })) : undefined
        };
    }

    /**
     * Insert structured data into page head
     */
    insertStructuredData(data, id = null) {
        // Remove existing structured data with same ID
        if (id) {
            const existing = document.querySelector(`script[data-structured-data-id="${id}"]`);
            if (existing) {
                existing.remove();
            }
        }

        // Create new script element
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data, null, 2);
        
        if (id) {
            script.setAttribute('data-structured-data-id', id);
        }

        // Add to head
        document.head.appendChild(script);
    }

    /**
     * Remove structured data by ID
     */
    removeStructuredData(id) {
        const script = document.querySelector(`script[data-structured-data-id="${id}"]`);
        if (script) {
            script.remove();
        }
    }

    /**
     * Validate structured data (basic validation)
     */
    validateStructuredData(data) {
        const required = ['@context', '@type'];
        const missing = required.filter(field => !data[field]);
        
        if (missing.length > 0) {
            console.warn('Missing required structured data fields:', missing);
            return false;
        }
        
        return true;
    }

    /**
     * Generate multiple structured data types for a page
     */
    generatePageStructuredData(pageType, pageData) {
        const structuredDataArray = [];

        switch (pageType) {
            case 'technology':
                structuredDataArray.push(this.generateSoftwareApplicationData(pageData));
                if (pageData.breadcrumbs) {
                    structuredDataArray.push(this.generateBreadcrumbData(pageData.breadcrumbs));
                }
                break;

            case 'course':
                structuredDataArray.push(this.generateCourseData(pageData));
                if (pageData.breadcrumbs) {
                    structuredDataArray.push(this.generateBreadcrumbData(pageData.breadcrumbs));
                }
                break;

            case 'article':
                structuredDataArray.push(this.generateArticleData(pageData));
                if (pageData.breadcrumbs) {
                    structuredDataArray.push(this.generateBreadcrumbData(pageData.breadcrumbs));
                }
                break;

            case 'homepage':
                structuredDataArray.push(this.generateWebSiteData());
                structuredDataArray.push(this.generateEducationalOrganizationData());
                break;

            case 'faq':
                if (pageData.faqItems) {
                    structuredDataArray.push(this.generateFAQData(pageData.faqItems));
                }
                break;

            case 'tutorial':
                structuredDataArray.push(this.generateHowToData(pageData));
                if (pageData.breadcrumbs) {
                    structuredDataArray.push(this.generateBreadcrumbData(pageData.breadcrumbs));
                }
                break;
        }

        return structuredDataArray;
    }
}

// Initialize structured data manager
window.structuredData = new StructuredData();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StructuredData;
}