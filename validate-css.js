const fs = require('fs');
const path = require('path');
const csstree = require('css-tree');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

console.log('🔍 Validando CSS para build do Vercel...\n');

// Função para validar sintaxe CSS
function validateCSS(filePath) {
    console.log(`📄 Validando: ${filePath}`);
    
    try {
        const cssContent = fs.readFileSync(filePath, 'utf8');
        
        // Validar sintaxe com css-tree
        const ast = csstree.parse(cssContent, {
            filename: filePath,
            positions: true
        });
        
        console.log(`✅ Sintaxe CSS válida: ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Erro de sintaxe CSS em ${filePath}:`);
        console.error(`   Linha ${error.line || 'desconhecida'}: ${error.message}`);
        
        if (error.source) {
            const lines = error.source.split('\n');
            const errorLine = error.line - 1;
            const start = Math.max(0, errorLine - 2);
            const end = Math.min(lines.length, errorLine + 3);
            
            console.error('\n   Contexto:');
            for (let i = start; i < end; i++) {
                const marker = i === errorLine ? '>>> ' : '    ';
                console.error(`   ${marker}${i + 1}: ${lines[i]}`);
            }
        }
        
        return false;
    }
}

// Função para processar CSS com PostCSS (similar ao Vercel)
async function processCSS(filePath) {
    console.log(`🔧 Processando com PostCSS: ${filePath}`);
    
    try {
        const cssContent = fs.readFileSync(filePath, 'utf8');
        
        const result = await postcss([
            autoprefixer({
                overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
            })
        ]).process(cssContent, {
            from: filePath,
            to: filePath
        });
        
        if (result.warnings().length > 0) {
            console.warn(`⚠️  Avisos em ${filePath}:`);
            result.warnings().forEach(warning => {
                console.warn(`   ${warning.toString()}`);
            });
        } else {
            console.log(`✅ PostCSS processado com sucesso: ${filePath}`);
        }
        
        return true;
        
    } catch (error) {
        console.error(`❌ Erro no PostCSS em ${filePath}:`);
        console.error(`   ${error.message}`);
        return false;
    }
}

// Função principal
async function main() {
    const cssFiles = [
        'assets/css/matrix-theme.css',
        'assets/css/banner-styles.css',
        'assets/css/case-studies.css',
        'assets/css/image-optimization.css',
        'assets/css/intelligent-suggestions.css',
        'assets/css/news-trends.css',
        'assets/css/performance-monitor.css'
    ];
    
    let allValid = true;
    
    // Validar sintaxe de todos os arquivos CSS
    console.log('=== VALIDAÇÃO DE SINTAXE CSS ===\n');
    for (const cssFile of cssFiles) {
        if (fs.existsSync(cssFile)) {
            const isValid = validateCSS(cssFile);
            if (!isValid) {
                allValid = false;
            }
        } else {
            console.log(`⚠️  Arquivo não encontrado: ${cssFile}`);
        }
        console.log('');
    }
    
    if (!allValid) {
        console.error('❌ Erros de sintaxe CSS encontrados! Corrija antes do deploy.');
        process.exit(1);
    }
    
    // Processar com PostCSS
    console.log('\n=== PROCESSAMENTO POSTCSS ===\n');
    for (const cssFile of cssFiles) {
        if (fs.existsSync(cssFile)) {
            const processed = await processCSS(cssFile);
            if (!processed) {
                allValid = false;
            }
        }
        console.log('');
    }
    
    if (allValid) {
        console.log('🎉 Todos os arquivos CSS são válidos para build do Vercel!');
        console.log('✅ Pronto para deploy!');
    } else {
        console.error('❌ Erros encontrados! Corrija antes do deploy.');
        process.exit(1);
    }
}

main().catch(error => {
    console.error('❌ Erro durante validação:', error);
    process.exit(1);
});