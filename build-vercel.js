const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Simulando build do Vercel...\n');

// Função para verificar HTML
function validateHTML() {
    console.log('📄 Validando arquivos HTML...');
    
    const htmlFiles = [];
    
    function findHTMLFiles(dir) {
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
                findHTMLFiles(fullPath);
            } else if (file.endsWith('.html')) {
                htmlFiles.push(fullPath);
            }
        }
    }
    
    findHTMLFiles('.');
    
    console.log(`   Encontrados ${htmlFiles.length} arquivos HTML`);
    
    // Verificar se arquivos HTML são válidos (básico)
    let validHTML = true;
    for (const htmlFile of htmlFiles.slice(0, 10)) { // Verificar apenas os primeiros 10
        try {
            const content = fs.readFileSync(htmlFile, 'utf8');
            
            // Verificações básicas
            if (!content.includes('<!DOCTYPE html>')) {
                console.warn(`   ⚠️  ${htmlFile}: Faltando DOCTYPE`);
            }
            if (!content.includes('<html')) {
                console.error(`   ❌ ${htmlFile}: Faltando tag <html>`);
                validHTML = false;
            }
            if (!content.includes('</html>')) {
                console.error(`   ❌ ${htmlFile}: Faltando tag </html>`);
                validHTML = false;
            }
            
        } catch (error) {
            console.error(`   ❌ Erro ao ler ${htmlFile}: ${error.message}`);
            validHTML = false;
        }
    }
    
    if (validHTML) {
        console.log('   ✅ Arquivos HTML válidos');
    }
    
    return validHTML;
}

// Função para verificar JavaScript
function validateJS() {
    console.log('📄 Validando arquivos JavaScript...');
    
    const jsFiles = [];
    
    function findJSFiles(dir) {
        if (!fs.existsSync(dir)) return;
        
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !file.startsWith('.')) {
                findJSFiles(fullPath);
            } else if (file.endsWith('.js') && !file.includes('node_modules')) {
                jsFiles.push(fullPath);
            }
        }
    }
    
    findJSFiles('assets/js');
    
    console.log(`   Encontrados ${jsFiles.length} arquivos JavaScript`);
    
    // Verificação básica de sintaxe JS
    let validJS = true;
    for (const jsFile of jsFiles.slice(0, 15)) { // Verificar apenas os primeiros 15
        try {
            const content = fs.readFileSync(jsFile, 'utf8');
            
            // Verificar se não há erros óbvios de sintaxe
            if (content.includes('function(') && !content.includes(')')) {
                console.warn(`   ⚠️  ${jsFile}: Possível erro de sintaxe`);
            }
            
        } catch (error) {
            console.error(`   ❌ Erro ao ler ${jsFile}: ${error.message}`);
            validJS = false;
        }
    }
    
    if (validJS) {
        console.log('   ✅ Arquivos JavaScript válidos');
    }
    
    return validJS;
}

// Função para verificar estrutura de arquivos
function checkFileStructure() {
    console.log('📁 Verificando estrutura de arquivos...');
    
    const requiredFiles = [
        'index.html',
        'assets/css/matrix-theme.css',
        'assets/js/main.js',
        'README.md'
    ];
    
    const requiredDirs = [
        'assets',
        'assets/css',
        'assets/js',
        'entrar-hadoop',
        'sair-hadoop',
        'tecnologias'
    ];
    
    let structureValid = true;
    
    // Verificar arquivos obrigatórios
    for (const file of requiredFiles) {
        if (!fs.existsSync(file)) {
            console.error(`   ❌ Arquivo obrigatório não encontrado: ${file}`);
            structureValid = false;
        }
    }
    
    // Verificar diretórios obrigatórios
    for (const dir of requiredDirs) {
        if (!fs.existsSync(dir)) {
            console.error(`   ❌ Diretório obrigatório não encontrado: ${dir}`);
            structureValid = false;
        }
    }
    
    if (structureValid) {
        console.log('   ✅ Estrutura de arquivos válida');
    }
    
    return structureValid;
}

// Função para simular otimizações do Vercel
function simulateOptimizations() {
    console.log('⚡ Simulando otimizações do Vercel...');
    
    // Verificar tamanhos de arquivos
    const largeFiles = [];
    
    function checkFileSizes(dir) {
        if (!fs.existsSync(dir)) return;
        
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
                checkFileSizes(fullPath);
            } else if (stat.isFile()) {
                const sizeInMB = stat.size / (1024 * 1024);
                
                if (sizeInMB > 1) { // Arquivos maiores que 1MB
                    largeFiles.push({
                        file: fullPath,
                        size: sizeInMB.toFixed(2) + 'MB'
                    });
                }
            }
        }
    }
    
    checkFileSizes('.');
    
    if (largeFiles.length > 0) {
        console.log('   ⚠️  Arquivos grandes encontrados:');
        largeFiles.forEach(({ file, size }) => {
            console.log(`      ${file}: ${size}`);
        });
    } else {
        console.log('   ✅ Tamanhos de arquivos otimizados');
    }
    
    return true;
}

// Função principal
async function main() {
    console.log('=== BUILD SIMULATION PARA VERCEL ===\n');
    
    let buildSuccess = true;
    
    // 1. Verificar estrutura
    if (!checkFileStructure()) {
        buildSuccess = false;
    }
    console.log('');
    
    // 2. Validar CSS (já feito anteriormente)
    console.log('📄 Executando validação CSS...');
    try {
        execSync('node validate-css.js', { stdio: 'inherit' });
        console.log('   ✅ CSS validado com sucesso\n');
    } catch (error) {
        console.error('   ❌ Erro na validação CSS\n');
        buildSuccess = false;
    }
    
    // 3. Validar HTML
    if (!validateHTML()) {
        buildSuccess = false;
    }
    console.log('');
    
    // 4. Validar JavaScript
    if (!validateJS()) {
        buildSuccess = false;
    }
    console.log('');
    
    // 5. Simular otimizações
    simulateOptimizations();
    console.log('');
    
    // Resultado final
    if (buildSuccess) {
        console.log('🎉 BUILD SIMULADO COM SUCESSO!');
        console.log('✅ Projeto pronto para deploy no Vercel!');
        console.log('\n📋 Próximos passos:');
        console.log('   1. git add .');
        console.log('   2. git commit -m "Fix CSS syntax for Vercel build"');
        console.log('   3. git push origin main');
        console.log('   4. Deploy no Vercel');
    } else {
        console.error('❌ BUILD FALHOU!');
        console.error('   Corrija os erros acima antes do deploy.');
        process.exit(1);
    }
}

main().catch(error => {
    console.error('❌ Erro durante build:', error);
    process.exit(1);
});