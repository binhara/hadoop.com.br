#!/usr/bin/env node

/**
 * Validation Script for Image Optimization
 * Tests if all optimization features are properly implemented
 */

const fs = require('fs');
const path = require('path');

class OptimizationValidator {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    test(description, condition) {
        const result = {
            description,
            passed: condition,
            timestamp: new Date().toISOString()
        };
        
        this.results.tests.push(result);
        
        if (condition) {
            this.results.passed++;
            console.log(`✅ ${description}`);
        } else {
            this.results.failed++;
            console.log(`❌ ${description}`);
        }
        
        return condition;
    }

    validateFiles() {
        console.log('🔍 Validando arquivos de otimização...\n');
        
        // Test JavaScript files
        this.test(
            'image-optimization.js existe',
            fs.existsSync('assets/js/image-optimization.js')
        );
        
        this.test(
            'cdn-config.js existe',
            fs.existsSync('assets/js/cdn-config.js')
        );
        
        this.test(
            'asset-compression.js existe',
            fs.existsSync('assets/js/asset-compression.js')
        );
        
        this.test(
            'placeholder-generator.js existe',
            fs.existsSync('assets/js/placeholder-generator.js')
        );
        
        this.test(
            'optimization-config.js existe',
            fs.existsSync('assets/js/optimization-config.js')
        );
        
        // Test CSS files
        this.test(
            'image-optimization.css existe',
            fs.existsSync('assets/css/image-optimization.css')
        );
        
        // Test documentation
        this.test(
            'README-optimization.md existe',
            fs.existsSync('assets/images/README-optimization.md')
        );
        
        // Test scripts
        this.test(
            'analyze-images.js existe',
            fs.existsSync('scripts/analyze-images.js')
        );
    }

    validateContent() {
        console.log('\n🔍 Validando conteúdo dos arquivos...\n');
        
        // Test image-optimization.js content
        if (fs.existsSync('assets/js/image-optimization.js')) {
            const content = fs.readFileSync('assets/js/image-optimization.js', 'utf8');
            
            this.test(
                'ImageOptimizer class definida',
                content.includes('class ImageOptimizer')
            );
            
            this.test(
                'Lazy loading implementado',
                content.includes('IntersectionObserver') && content.includes('lazyLoadObserver')
            );
            
            this.test(
                'Detecção de formatos implementada',
                content.includes('detectSupportedFormats') && content.includes('webp') && content.includes('avif')
            );
            
            this.test(
                'CDN integration implementada',
                content.includes('getOptimizedImageUrl') && content.includes('cdnBaseUrl')
            );
        }
        
        // Test CSS content
        if (fs.existsSync('assets/css/image-optimization.css')) {
            const cssContent = fs.readFileSync('assets/css/image-optimization.css', 'utf8');
            
            this.test(
                'Lazy loading styles definidos',
                cssContent.includes('img[data-src]') && cssContent.includes('.loading')
            );
            
            this.test(
                'Responsive image styles definidos',
                cssContent.includes('.img-container') && cssContent.includes('aspect-')
            );
            
            this.test(
                'Placeholder styles definidos',
                cssContent.includes('.img-placeholder') && cssContent.includes('.img-error')
            );
        }
        
        // Test main.js integration
        if (fs.existsSync('assets/js/main.js')) {
            const mainContent = fs.readFileSync('assets/js/main.js', 'utf8');
            
            this.test(
                'Otimização integrada no main.js',
                mainContent.includes('initImageOptimization') || mainContent.includes('initPerformanceOptimizations')
            );
        }
    }

    validateIntegration() {
        console.log('\n🔍 Validando integração...\n');
        
        // Test index.html integration
        if (fs.existsSync('index.html')) {
            const indexContent = fs.readFileSync('index.html', 'utf8');
            
            this.test(
                'Scripts de otimização incluídos no index.html',
                indexContent.includes('image-optimization.js') && 
                indexContent.includes('cdn-config.js') &&
                indexContent.includes('asset-compression.js')
            );
            
            this.test(
                'CSS de otimização incluído no index.html',
                indexContent.includes('image-optimization.css')
            );
        }
        
        // Test package.json scripts
        if (fs.existsSync('package.json')) {
            const packageContent = fs.readFileSync('package.json', 'utf8');
            const packageJson = JSON.parse(packageContent);
            
            this.test(
                'Scripts de otimização definidos no package.json',
                packageJson.scripts && 
                packageJson.scripts['optimize:images'] &&
                packageJson.scripts['generate:webp'] &&
                packageJson.scripts['generate:avif']
            );
        }
        
        // Test test file
        this.test(
            'Arquivo de teste existe',
            fs.existsSync('test-image-optimization.html')
        );
    }

    validateConfiguration() {
        console.log('\n🔍 Validando configuração...\n');
        
        if (fs.existsSync('assets/js/optimization-config.js')) {
            const configContent = fs.readFileSync('assets/js/optimization-config.js', 'utf8');
            
            this.test(
                'Configuração CDN definida',
                configContent.includes('cdn:') && configContent.includes('primary:') && configContent.includes('fallback:')
            );
            
            this.test(
                'Configuração de imagens definida',
                configContent.includes('images:') && configContent.includes('lazyLoading:') && configContent.includes('quality:')
            );
            
            this.test(
                'Configuração de compressão definida',
                configContent.includes('compression:') && configContent.includes('css:') && configContent.includes('js:')
            );
            
            this.test(
                'Configuração de performance definida',
                configContent.includes('performance:') && configContent.includes('preload:')
            );
        }
    }

    validateCoreWebVitals() {
        console.log('\n🔍 Validando Core Web Vitals...\n');
        
        // Test Core Web Vitals files
        this.test(
            'core-web-vitals.js existe',
            fs.existsSync('assets/js/core-web-vitals.js')
        );
        
        this.test(
            'performance-monitor.js existe',
            fs.existsSync('assets/js/performance-monitor.js')
        );
        
        this.test(
            'performance-monitor.css existe',
            fs.existsSync('assets/css/performance-monitor.css')
        );
        
        this.test(
            'test-core-web-vitals.html existe',
            fs.existsSync('test-core-web-vitals.html')
        );
        
        // Test Core Web Vitals content
        if (fs.existsSync('assets/js/core-web-vitals.js')) {
            const content = fs.readFileSync('assets/js/core-web-vitals.js', 'utf8');
            
            this.test(
                'CoreWebVitalsOptimizer class definida',
                content.includes('class CoreWebVitalsOptimizer')
            );
            
            this.test(
                'Otimização LCP implementada',
                content.includes('optimizeLCP') && content.includes('preloadCriticalResources')
            );
            
            this.test(
                'Otimização FID implementada',
                content.includes('optimizeFID') && content.includes('breakUpLongTasks')
            );
            
            this.test(
                'Otimização CLS implementada',
                content.includes('optimizeCLS') && content.includes('reserveSpaceForDynamicContent')
            );
            
            this.test(
                'Monitoramento implementado',
                content.includes('startMonitoring') && content.includes('PerformanceObserver')
            );
        }
        
        // Test performance monitor content
        if (fs.existsSync('assets/js/performance-monitor.js')) {
            const content = fs.readFileSync('assets/js/performance-monitor.js', 'utf8');
            
            this.test(
                'PerformanceMonitor class definida',
                content.includes('class PerformanceMonitor')
            );
            
            this.test(
                'UI de monitoramento implementada',
                content.includes('createMonitorUI') && content.includes('updateMetrics')
            );
            
            this.test(
                'Exportação de relatórios implementada',
                content.includes('exportReport') && content.includes('JSON.stringify')
            );
        }
        
        // Test main.js integration
        if (fs.existsSync('assets/js/main.js')) {
            const mainContent = fs.readFileSync('assets/js/main.js', 'utf8');
            
            this.test(
                'Core Web Vitals integrado no main.js',
                mainContent.includes('initCoreWebVitals') && mainContent.includes('coreWebVitalsOptimizer')
            );
            
            this.test(
                'Otimizações de FID implementadas',
                mainContent.includes('handleLongTasks') && mainContent.includes('optimizeUserInteractions')
            );
        }
    }

    generateReport() {
        console.log('\n📊 RELATÓRIO DE VALIDAÇÃO');
        console.log('=========================');
        console.log(`✅ Testes aprovados: ${this.results.passed}`);
        console.log(`❌ Testes falharam: ${this.results.failed}`);
        console.log(`📈 Taxa de sucesso: ${Math.round((this.results.passed / (this.results.passed + this.results.failed)) * 100)}%`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ TESTES QUE FALHARAM:');
            console.log('========================');
            this.results.tests
                .filter(test => !test.passed)
                .forEach(test => {
                    console.log(`• ${test.description}`);
                });
        }
        
        // Save report
        const reportPath = path.join(__dirname, '..', 'reports', 'optimization-validation.json');
        const reportDir = path.dirname(reportPath);
        
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
        
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n💾 Relatório salvo em: ${reportPath}`);
        
        return this.results.failed === 0;
    }

    run() {
        console.log('🎯 Portal Big Data - Validação de Otimização');
        console.log('=============================================\n');
        
        this.validateFiles();
        this.validateContent();
        this.validateIntegration();
        this.validateConfiguration();
        this.validateCoreWebVitals();
        
        const success = this.generateReport();
        
        if (success) {
            console.log('\n🎉 Todas as validações passaram! Sistema de otimização está funcionando corretamente.');
        } else {
            console.log('\n⚠️  Algumas validações falharam. Verifique os itens acima.');
        }
        
        return success;
    }
}

// Run the validator
if (require.main === module) {
    const validator = new OptimizationValidator();
    const success = validator.run();
    process.exit(success ? 0 : 1);
}

module.exports = OptimizationValidator;