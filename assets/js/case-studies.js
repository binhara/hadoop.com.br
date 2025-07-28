// Case Studies Management System
class CaseStudiesManager {
    constructor() {
        this.caseStudies = [];
        this.filteredCaseStudies = [];
        this.currentFilters = {
            industry: '',
            technology: '',
            size: ''
        };
        this.init();
    }

    init() {
        this.loadCaseStudies();
        this.setupEventListeners();
    }

    loadCaseStudies() {
        // Sample case studies data - in a real implementation, this would come from an API
        this.caseStudies = [
            {
                id: 'banco-brasil-hadoop-migration',
                title: 'Migração de Data Warehouse Legado para Hadoop',
                company: 'Banco do Brasil',
                industry: 'financeiro',
                size: 'enterprise',
                technology: 'hadoop',
                techStack: ['Hadoop', 'Hive', 'Spark', 'Kafka', 'HBase'],
                summary: 'Migração completa de um data warehouse legado para uma arquitetura Hadoop, resultando em redução significativa de custos e melhoria na performance de consultas.',
                publishDate: '2024-01-15',
                difficulty: 'advanced',
                metrics: {
                    'Redução de Custos': '65%',
                    'Melhoria na Performance': '300%',
                    'Volume de Dados': '50TB → 500TB',
                    'Tempo de Implementação': '18 meses',
                    'ROI': '250%'
                },
                tags: ['migração', 'data warehouse', 'hadoop', 'enterprise'],
                resources: [
                    { type: 'pdf', name: 'Arquitetura Completa', size: '2.5MB', downloads: 1250 },
                    { type: 'code', name: 'Scripts de Migração', size: '850KB', downloads: 890 },
                    { type: 'presentation', name: 'Apresentação Executiva', size: '15MB', downloads: 2100 }
                ],
                fullContent: `
                    <h3>Contexto e Desafios</h3>
                    <p>O Banco do Brasil enfrentava limitações significativas com seu data warehouse legado, incluindo altos custos de licenciamento, performance inadequada para grandes volumes de dados e dificuldades de escalabilidade.</p>
                    
                    <h4>Principais Desafios:</h4>
                    <ul>
                        <li>Custos elevados de licenciamento de software proprietário</li>
                        <li>Performance inadequada para consultas complexas</li>
                        <li>Limitações de escalabilidade horizontal</li>
                        <li>Dificuldades na integração com sistemas modernos</li>
                    </ul>

                    <h3>Solução Implementada</h3>
                    <div class="case-study-architecture">
                        <h4>Arquitetura da Solução</h4>
                        <div class="architecture-diagram">
                            [Fontes de Dados] → [Kafka] → [Spark Streaming] → [HDFS/HBase] → [Hive] → [Dashboards]
                        </div>
                    </div>

                    <h4>Componentes Principais:</h4>
                    <ul>
                        <li><strong>Apache Hadoop:</strong> Plataforma base para armazenamento distribuído</li>
                        <li><strong>Apache Spark:</strong> Processamento de dados em batch e streaming</li>
                        <li><strong>Apache Kafka:</strong> Ingestão de dados em tempo real</li>
                        <li><strong>Apache Hive:</strong> Data warehouse SQL sobre Hadoop</li>
                        <li><strong>HBase:</strong> Banco NoSQL para dados operacionais</li>
                    </ul>

                    <h3>Resultados Obtidos</h3>
                    <p>A migração resultou em benefícios significativos em múltiplas dimensões:</p>
                    
                    <h4>Benefícios Financeiros:</h4>
                    <ul>
                        <li>Redução de 65% nos custos operacionais</li>
                        <li>ROI de 250% em 24 meses</li>
                        <li>Eliminação de custos de licenciamento proprietário</li>
                    </ul>

                    <h4>Benefícios Técnicos:</h4>
                    <ul>
                        <li>Melhoria de 300% na performance de consultas</li>
                        <li>Capacidade de processar 10x mais dados</li>
                        <li>Redução de 80% no tempo de ETL</li>
                    </ul>

                    <h3>Lições Aprendidas</h3>
                    <ul>
                        <li>Importância do planejamento detalhado da migração</li>
                        <li>Necessidade de treinamento extensivo das equipes</li>
                        <li>Valor da implementação em fases</li>
                        <li>Importância do monitoramento contínuo</li>
                    </ul>
                `
            },
            {
                id: 'magazine-luiza-real-time-analytics',
                title: 'Implementação de Analytics em Tempo Real',
                company: 'Magazine Luiza',
                industry: 'varejo',
                size: 'grande',
                technology: 'spark',
                techStack: ['Apache Spark', 'Kafka', 'Delta Lake', 'Databricks'],
                summary: 'Implementação de uma plataforma de analytics em tempo real para personalização de experiência do cliente e otimização de estoque.',
                publishDate: '2024-02-20',
                difficulty: 'intermediate',
                metrics: {
                    'Aumento nas Vendas': '25%',
                    'Redução de Estoque Parado': '40%',
                    'Tempo de Resposta': '<100ms',
                    'Eventos Processados/seg': '1M+',
                    'Precisão das Recomendações': '85%'
                },
                tags: ['real-time', 'analytics', 'varejo', 'personalização'],
                resources: [
                    { type: 'pdf', name: 'Caso de Uso Completo', size: '3.2MB', downloads: 1850 },
                    { type: 'code', name: 'Pipeline Spark Streaming', size: '1.2MB', downloads: 1200 },
                    { type: 'video', name: 'Demo da Solução', size: '45MB', downloads: 950 }
                ],
                fullContent: `
                    <h3>Desafio do Negócio</h3>
                    <p>A Magazine Luiza precisava melhorar a experiência do cliente através de recomendações personalizadas em tempo real e otimizar a gestão de estoque baseada em padrões de comportamento dos clientes.</p>

                    <h3>Solução Técnica</h3>
                    <p>Implementação de uma arquitetura de streaming analytics usando Apache Spark e Kafka para processar eventos de navegação e compra em tempo real.</p>

                    <h3>Resultados</h3>
                    <p>A solução resultou em aumento significativo nas vendas e melhoria na eficiência operacional.</p>
                `
            },
            {
                id: 'hospital-sirio-libanes-data-lake',
                title: 'Data Lake para Análise de Dados Médicos',
                company: 'Hospital Sírio-Libanês',
                industry: 'saude',
                size: 'media',
                technology: 'delta-lake',
                techStack: ['Delta Lake', 'Apache Spark', 'Azure Data Factory', 'Power BI'],
                summary: 'Criação de um data lake para centralizar dados médicos de múltiplas fontes e permitir análises avançadas para melhoria do atendimento.',
                publishDate: '2024-03-10',
                difficulty: 'intermediate',
                metrics: {
                    'Redução no Tempo de Diagnóstico': '30%',
                    'Melhoria na Precisão': '15%',
                    'Fontes de Dados Integradas': '25+',
                    'Dados Processados/dia': '2TB',
                    'Satisfação dos Médicos': '92%'
                },
                tags: ['data lake', 'saúde', 'analytics', 'azure'],
                resources: [
                    { type: 'pdf', name: 'Arquitetura de Dados', size: '4.1MB', downloads: 980 },
                    { type: 'presentation', name: 'Resultados Clínicos', size: '12MB', downloads: 1500 }
                ],
                fullContent: `
                    <h3>Contexto Médico</h3>
                    <p>O hospital precisava integrar dados de múltiplos sistemas (prontuários, exames, sensores) para melhorar a qualidade do atendimento e acelerar diagnósticos.</p>

                    <h3>Implementação</h3>
                    <p>Criação de um data lake usando Delta Lake no Azure, com pipelines automatizados para ingestão e processamento de dados médicos.</p>
                `
            },
            {
                id: 'vivo-network-optimization',
                title: 'Otimização de Rede com Big Data',
                company: 'Vivo',
                industry: 'telecomunicacoes',
                size: 'enterprise',
                technology: 'flink',
                techStack: ['Apache Flink', 'Kafka', 'ClickHouse', 'Grafana'],
                summary: 'Uso de analytics em tempo real para otimização automática da rede de telecomunicações, reduzindo congestionamentos e melhorando a qualidade do serviço.',
                publishDate: '2024-01-30',
                difficulty: 'advanced',
                metrics: {
                    'Redução de Congestionamentos': '45%',
                    'Melhoria na Qualidade': '35%',
                    'Economia Operacional': 'R$ 50M/ano',
                    'Eventos Processados/seg': '5M+',
                    'Tempo de Detecção de Problemas': '< 30s'
                },
                tags: ['telecomunicações', 'real-time', 'otimização', 'flink'],
                resources: [
                    { type: 'pdf', name: 'Arquitetura de Rede', size: '5.5MB', downloads: 750 },
                    { type: 'code', name: 'Algoritmos de Otimização', size: '2.1MB', downloads: 650 }
                ],
                fullContent: `
                    <h3>Desafio de Telecomunicações</h3>
                    <p>A Vivo enfrentava problemas de congestionamento de rede e precisava de uma solução para otimização automática baseada em dados em tempo real.</p>

                    <h3>Solução com Apache Flink</h3>
                    <p>Implementação de um sistema de streaming analytics usando Apache Flink para processar dados de rede em tempo real e tomar decisões automáticas de otimização.</p>
                `
            },
            {
                id: 'petrobras-iot-analytics',
                title: 'Analytics de IoT para Monitoramento de Equipamentos',
                company: 'Petrobras',
                industry: 'energia',
                size: 'enterprise',
                technology: 'kafka',
                techStack: ['Apache Kafka', 'Apache Spark', 'InfluxDB', 'Grafana'],
                summary: 'Implementação de uma plataforma de IoT analytics para monitoramento preditivo de equipamentos em refinarias, reduzindo paradas não programadas.',
                publishDate: '2024-02-05',
                difficulty: 'advanced',
                metrics: {
                    'Redução de Paradas': '60%',
                    'Economia em Manutenção': 'R$ 200M/ano',
                    'Sensores Monitorados': '50,000+',
                    'Dados Coletados/dia': '10TB',
                    'Precisão Preditiva': '88%'
                },
                tags: ['iot', 'preditiva', 'energia', 'kafka'],
                resources: [
                    { type: 'pdf', name: 'Caso IoT Industrial', size: '6.2MB', downloads: 1100 },
                    { type: 'code', name: 'Modelos Preditivos', size: '3.5MB', downloads: 800 }
                ],
                fullContent: `
                    <h3>Desafio Industrial</h3>
                    <p>A Petrobras precisava reduzir paradas não programadas em suas refinarias através do monitoramento preditivo de equipamentos críticos.</p>

                    <h3>Solução IoT</h3>
                    <p>Implementação de uma plataforma completa de IoT analytics usando Kafka para ingestão de dados de sensores e Spark para análises preditivas.</p>
                `
            },
            {
                id: 'embraer-manufacturing-analytics',
                title: 'Analytics de Manufatura para Otimização de Produção',
                company: 'Embraer',
                industry: 'manufatura',
                size: 'grande',
                technology: 'snowflake',
                techStack: ['Snowflake', 'dbt', 'Apache Airflow', 'Tableau'],
                summary: 'Implementação de analytics de manufatura para otimização da linha de produção de aeronaves, melhorando eficiência e qualidade.',
                publishDate: '2024-03-01',
                difficulty: 'intermediate',
                metrics: {
                    'Aumento na Eficiência': '22%',
                    'Redução de Defeitos': '35%',
                    'Economia de Tempo': '15%',
                    'Dados Integrados': '100+ fontes',
                    'Dashboards Criados': '50+'
                },
                tags: ['manufatura', 'snowflake', 'otimização', 'qualidade'],
                resources: [
                    { type: 'pdf', name: 'Processo de Manufatura', size: '4.8MB', downloads: 920 },
                    { type: 'presentation', name: 'Resultados Operacionais', size: '18MB', downloads: 1300 }
                ],
                fullContent: `
                    <h3>Desafio de Manufatura</h3>
                    <p>A Embraer buscava otimizar seus processos de manufatura de aeronaves através de analytics avançados e integração de dados de múltiplas fontes.</p>

                    <h3>Solução com Snowflake</h3>
                    <p>Implementação de um data warehouse moderno usando Snowflake, com pipelines automatizados e dashboards para monitoramento em tempo real da produção.</p>
                `
            }
        ];

        this.filteredCaseStudies = [...this.caseStudies];
        this.renderCaseStudies();
    }

    setupEventListeners() {
        // Filter event listeners
        document.getElementById('industryFilter').addEventListener('change', () => this.updateFilters());
        document.getElementById('technologyFilter').addEventListener('change', () => this.updateFilters());
        document.getElementById('sizeFilter').addEventListener('change', () => this.updateFilters());
    }

    updateFilters() {
        this.currentFilters = {
            industry: document.getElementById('industryFilter').value,
            technology: document.getElementById('technologyFilter').value,
            size: document.getElementById('sizeFilter').value
        };
    }

    applyFilters() {
        this.filteredCaseStudies = this.caseStudies.filter(caseStudy => {
            return (!this.currentFilters.industry || caseStudy.industry === this.currentFilters.industry) &&
                   (!this.currentFilters.technology || caseStudy.technology === this.currentFilters.technology) &&
                   (!this.currentFilters.size || caseStudy.size === this.currentFilters.size);
        });

        this.renderCaseStudies();
    }

    clearFilters() {
        document.getElementById('industryFilter').value = '';
        document.getElementById('technologyFilter').value = '';
        document.getElementById('sizeFilter').value = '';
        
        this.currentFilters = { industry: '', technology: '', size: '' };
        this.filteredCaseStudies = [...this.caseStudies];
        this.renderCaseStudies();
    }

    renderCaseStudies() {
        const grid = document.getElementById('caseStudiesGrid');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const noResultsMessage = document.getElementById('noResultsMessage');

        // Hide loading indicator
        loadingIndicator.style.display = 'none';

        if (this.filteredCaseStudies.length === 0) {
            grid.innerHTML = '';
            noResultsMessage.classList.remove('d-none');
            return;
        }

        noResultsMessage.classList.add('d-none');

        // Add results count
        const resultsCount = document.createElement('div');
        resultsCount.className = 'col-12 filter-results-count';
        resultsCount.innerHTML = `<i class="fas fa-chart-bar"></i> ${this.filteredCaseStudies.length} estudos de caso encontrados`;

        grid.innerHTML = '';
        grid.appendChild(resultsCount);

        this.filteredCaseStudies.forEach(caseStudy => {
            const caseStudyCard = this.createCaseStudyCard(caseStudy);
            grid.appendChild(caseStudyCard);
        });
    }

    createCaseStudyCard(caseStudy) {
        const col = document.createElement('div');
        col.className = 'col-lg-6 col-xl-4 mb-4';

        const metricsHtml = Object.entries(caseStudy.metrics)
            .slice(0, 3)
            .map(([key, value]) => `
                <div class="metric-item">
                    <span class="metric-label">${key}:</span>
                    <span class="metric-value">${value}</span>
                </div>
            `).join('');

        const techStackHtml = caseStudy.techStack
            .map(tech => `<span class="tech-badge">${tech}</span>`)
            .join('');

        const resourcesHtml = caseStudy.resources
            .slice(0, 2)
            .map(resource => `
                <div class="resource-item">
                    <i class="fas fa-${this.getResourceIcon(resource.type)}"></i>
                    <span>${resource.name} (${resource.size})</span>
                </div>
            `).join('');

        col.innerHTML = `
            <div class="card case-study-card">
                <div class="card-header case-study-header">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="case-study-title mb-1">${caseStudy.title}</h5>
                            <p class="case-study-company mb-0">${caseStudy.company}</p>
                        </div>
                        <span class="badge case-study-industry">${this.getIndustryLabel(caseStudy.industry)}</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="case-study-tech-stack">
                        ${techStackHtml}
                    </div>
                    
                    <p class="case-study-summary">${caseStudy.summary}</p>
                    
                    <div class="metrics-section">
                        <h6 class="text-success mb-2">
                            <i class="fas fa-chart-line"></i> Principais Resultados
                        </h6>
                        ${metricsHtml}
                    </div>
                    
                    <div class="resources-section">
                        <h6 class="text-success mb-2">
                            <i class="fas fa-download"></i> Recursos Disponíveis
                        </h6>
                        ${resourcesHtml}
                        ${caseStudy.resources.length > 2 ? `<small class="text-muted">+${caseStudy.resources.length - 2} recursos adicionais</small>` : ''}
                    </div>
                    
                    <div class="case-study-actions">
                        <button class="btn btn-case-study btn-sm" onclick="caseStudiesManager.viewCaseStudy('${caseStudy.id}')">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                        <button class="btn btn-download btn-sm" onclick="caseStudiesManager.downloadResources('${caseStudy.id}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <small class="case-study-date">${this.formatDate(caseStudy.publishDate)}</small>
                        <span class="case-study-difficulty difficulty-${caseStudy.difficulty}">
                            ${this.getDifficultyLabel(caseStudy.difficulty)}
                        </span>
                    </div>
                </div>
            </div>
        `;

        return col;
    }

    viewCaseStudy(id) {
        const caseStudy = this.caseStudies.find(cs => cs.id === id);
        if (!caseStudy) return;

        // Create modal for detailed view
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'caseStudyModal';
        modal.setAttribute('tabindex', '-1');

        const allMetricsHtml = Object.entries(caseStudy.metrics)
            .map(([key, value]) => `
                <div class="metric-item">
                    <span class="metric-label">${key}:</span>
                    <span class="metric-value">${value}</span>
                </div>
            `).join('');

        const allResourcesHtml = caseStudy.resources
            .map(resource => `
                <div class="resource-item">
                    <i class="fas fa-${this.getResourceIcon(resource.type)}"></i>
                    <span>${resource.name} (${resource.size})</span>
                    <small class="download-stats">${resource.downloads} downloads</small>
                </div>
            `).join('');

        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${caseStudy.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <h6 class="text-success">Empresa</h6>
                                <p>${caseStudy.company}</p>
                                
                                <h6 class="text-success">Indústria</h6>
                                <p>${this.getIndustryLabel(caseStudy.industry)}</p>
                            </div>
                            <div class="col-md-6">
                                <h6 class="text-success">Tecnologia Principal</h6>
                                <p>${caseStudy.techStack[0]}</p>
                                
                                <h6 class="text-success">Dificuldade</h6>
                                <span class="case-study-difficulty difficulty-${caseStudy.difficulty}">
                                    ${this.getDifficultyLabel(caseStudy.difficulty)}
                                </span>
                            </div>
                        </div>
                        
                        <div class="metrics-section mb-4">
                            <h6 class="text-success mb-3">
                                <i class="fas fa-chart-line"></i> Métricas Completas
                            </h6>
                            ${allMetricsHtml}
                        </div>
                        
                        <div class="case-study-full-content">
                            ${caseStudy.fullContent}
                        </div>
                        
                        <div class="resources-section mt-4">
                            <h6 class="text-success mb-3">
                                <i class="fas fa-download"></i> Todos os Recursos
                            </h6>
                            ${allResourcesHtml}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-download" onclick="caseStudiesManager.downloadResources('${caseStudy.id}')">
                            <i class="fas fa-download"></i> Download Recursos
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        // Remove modal from DOM when hidden
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    downloadResources(id) {
        const caseStudy = this.caseStudies.find(cs => cs.id === id);
        if (!caseStudy) return;

        // In a real implementation, this would trigger actual downloads
        alert(`Iniciando download dos recursos para: ${caseStudy.title}\n\nRecursos incluídos:\n${caseStudy.resources.map(r => `• ${r.name} (${r.size})`).join('\n')}`);
        
        // Track download analytics
        this.trackDownload(id);
    }

    trackDownload(caseStudyId) {
        // In a real implementation, this would send analytics data
        console.log(`Download tracked for case study: ${caseStudyId}`);
    }

    getResourceIcon(type) {
        const icons = {
            'pdf': 'file-pdf',
            'code': 'code',
            'presentation': 'file-powerpoint',
            'video': 'video',
            'dataset': 'database'
        };
        return icons[type] || 'file';
    }

    getIndustryLabel(industry) {
        const labels = {
            'financeiro': 'Financeiro',
            'varejo': 'Varejo',
            'saude': 'Saúde',
            'telecomunicacoes': 'Telecomunicações',
            'energia': 'Energia',
            'manufatura': 'Manufatura',
            'governo': 'Governo',
            'educacao': 'Educação'
        };
        return labels[industry] || industry;
    }

    getDifficultyLabel(difficulty) {
        const labels = {
            'beginner': 'Iniciante',
            'intermediate': 'Intermediário',
            'advanced': 'Avançado'
        };
        return labels[difficulty] || difficulty;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Global functions for button clicks
function applyFilters() {
    caseStudiesManager.applyFilters();
}

function clearFilters() {
    caseStudiesManager.clearFilters();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.caseStudiesManager = new CaseStudiesManager();
});