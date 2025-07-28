#!/usr/bin/env node

/**
 * Image Analysis Script
 * Analyzes images in the project and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');

class ImageAnalyzer {
    constructor() {
        this.imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
        this.results = {
            totalImages: 0,
            totalSize: 0,
            optimizationPotential: 0,
            recommendations: []
        };
    }

    async analyzeDirectory(dirPath) {
        console.log(`🔍 Analisando imagens em: ${dirPath}`);
        
        try {
            const files = fs.readdirSync(dirPath, { withFileTypes: true });
            
            for (const file of files) {
                const fullPath = path.join(dirPath, file.name);
                
                if (file.isDirectory()) {
                    await this.analyzeDirectory(fullPath);
                } else if (this.isImageFile(file.name)) {
                    await this.analyzeImage(fullPath);
                }
            }
        } catch (error) {
            console.error(`❌ Erro ao analisar diretório ${dirPath}:`, error.message);
        }
    }

    isImageFile(filename) {
        const ext = path.extname(filename).toLowerCase();
        return this.imageExtensions.includes(ext);
    }

    async analyzeImage(imagePath) {
        try {
            const stats = fs.statSync(imagePath);
            const ext = path.extname(imagePath).toLowerCase();
            
            this.results.totalImages++;
            this.results.totalSize += stats.size;
            
            const analysis = {
                path: imagePath,
                size: stats.size,
                format: ext.substring(1),
                recommendations: []
            };

            // Check for optimization opportunities
            this.checkOptimizationOpportunities(analysis, stats);
            
            console.log(`📸 ${path.basename(imagePath)}: ${this.formatBytes(stats.size)} (${analysis.format})`);
            
            if (analysis.recommendations.length > 0) {
                analysis.recommendations.forEach(rec => {
                    console.log(`   💡 ${rec}`);
                });
                this.results.recommendations.push(analysis);
            }
            
        } catch (error) {
            console.error(`❌ Erro ao analisar ${imagePath}:`, error.message);
        }
    }

    checkOptimizationOpportunities(analysis, stats) {
        // Check file size
        if (stats.size > 500 * 1024) { // 500KB
            analysis.recommendations.push(`Arquivo grande (${this.formatBytes(stats.size)}) - considere compressão`);
            this.results.optimizationPotential += stats.size * 0.3; // Estimate 30% reduction
        }

        // Check format optimization
        if (analysis.format === 'png') {
            analysis.recommendations.push('PNG - considere converter para JPEG se não precisar de transparência');
        }

        if (analysis.format === 'jpeg' || analysis.format === 'jpg' || analysis.format === 'png') {
            analysis.recommendations.push('Considere gerar versões WebP e AVIF');
        }

        // Check for large files that could benefit from optimization
        if (stats.size > 100 * 1024) { // 100KB
            analysis.recommendations.push('Arquivo pode se beneficiar de otimização de qualidade');
        }
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    generateReport() {
        console.log('\n📊 RELATÓRIO DE ANÁLISE DE IMAGENS');
        console.log('=====================================');
        console.log(`📸 Total de imagens: ${this.results.totalImages}`);
        console.log(`💾 Tamanho total: ${this.formatBytes(this.results.totalSize)}`);
        console.log(`🎯 Potencial de otimização: ${this.formatBytes(this.results.optimizationPotential)}`);
        console.log(`📈 Economia estimada: ${Math.round((this.results.optimizationPotential / this.results.totalSize) * 100)}%`);
        
        if (this.results.recommendations.length > 0) {
            console.log('\n🔧 RECOMENDAÇÕES DE OTIMIZAÇÃO:');
            console.log('================================');
            
            this.results.recommendations.forEach((item, index) => {
                console.log(`\n${index + 1}. ${path.basename(item.path)}`);
                console.log(`   📏 ${item.dimensions} | 💾 ${this.formatBytes(item.size)} | 🎨 ${item.format}`);
                item.recommendations.forEach(rec => {
                    console.log(`   💡 ${rec}`);
                });
            });
        }

        // Generate optimization commands
        console.log('\n🚀 COMANDOS DE OTIMIZAÇÃO SUGERIDOS:');
        console.log('====================================');
        console.log('npm run optimize:images    # Otimizar JPEG/PNG');
        console.log('npm run generate:webp      # Gerar versões WebP');
        console.log('npm run generate:avif      # Gerar versões AVIF');
        console.log('npm run compress:all       # Executar todas as otimizações');
        
        // Save report to file
        const reportPath = path.join(__dirname, '..', 'reports', 'image-analysis.json');
        const reportDir = path.dirname(reportPath);
        
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
        
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n💾 Relatório salvo em: ${reportPath}`);
    }

    async run() {
        console.log('🎯 Portal Big Data - Análise de Imagens');
        console.log('========================================\n');
        
        const assetsPath = path.join(__dirname, '..', 'assets', 'images');
        
        if (!fs.existsSync(assetsPath)) {
            console.error('❌ Diretório de assets não encontrado:', assetsPath);
            process.exit(1);
        }
        
        await this.analyzeDirectory(assetsPath);
        this.generateReport();
        
        console.log('\n✅ Análise concluída!');
    }
}

// Run the analyzer
if (require.main === module) {
    const analyzer = new ImageAnalyzer();
    analyzer.run().catch(error => {
        console.error('❌ Erro durante a análise:', error);
        process.exit(1);
    });
}

module.exports = ImageAnalyzer;