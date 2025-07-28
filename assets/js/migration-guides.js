/**
 * Migration Guides JavaScript
 * Handles interactive functionality for Hadoop migration guides
 */

// Initialize migration guides functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeChecklists();
    initializeTabs();
    initializeTemplateDownloads();
    initializeProgressTracking();
});

/**
 * Initialize checklist functionality
 */
function initializeChecklists() {
    const checkboxes = document.querySelectorAll('.checklist-container input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        // Load saved state
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        // Save state on change
        checkbox.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
            updateProgress();
            
            // Add visual feedback
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.7';
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
            }
        });
        
        // Apply initial styling
        if (checkbox.checked) {
            const label = checkbox.nextElementSibling;
            label.style.textDecoration = 'line-through';
            label.style.opacity = '0.7';
        }
    });
}

/**
 * Initialize tab functionality with progress indicators
 */
function initializeTabs() {
    const tabs = document.querySelectorAll('#migrationTabs button[data-bs-toggle="tab"]');
    
    tabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            const targetId = e.target.getAttribute('data-bs-target');
            updateTabProgress(targetId);
        });
    });
    
    // Update progress for initially active tab
    updateTabProgress('#etl-migration');
}

/**
 * Update progress indicator for a specific tab
 */
function updateTabProgress(tabId) {
    const tabPane = document.querySelector(tabId);
    if (!tabPane) return;
    
    const checkboxes = tabPane.querySelectorAll('input[type="checkbox"]');
    const checkedBoxes = tabPane.querySelectorAll('input[type="checkbox"]:checked');
    
    if (checkboxes.length > 0) {
        const progress = (checkedBoxes.length / checkboxes.length) * 100;
        const tabButton = document.querySelector(`button[data-bs-target="${tabId}"]`);
        
        // Add or update progress indicator
        let progressIndicator = tabButton.querySelector('.progress-indicator');
        if (!progressIndicator) {
            progressIndicator = document.createElement('span');
            progressIndicator.className = 'progress-indicator badge bg-secondary ms-2';
            tabButton.appendChild(progressIndicator);
        }
        
        progressIndicator.textContent = `${Math.round(progress)}%`;
        
        // Update color based on progress
        progressIndicator.className = 'progress-indicator badge ms-2 ' + 
            (progress === 100 ? 'bg-success' : 
             progress >= 50 ? 'bg-warning' : 'bg-secondary');
    }
}

/**
 * Update overall progress
 */
function updateProgress() {
    // Update progress for all tabs
    const tabPanes = ['#etl-migration', '#analytics-migration', '#streaming-migration', '#ml-migration'];
    tabPanes.forEach(updateTabProgress);
}

/**
 * Initialize template download functionality
 */
function initializeTemplateDownloads() {
    window.downloadTemplate = function(templateType) {
        let content = '';
        let filename = '';
        
        switch (templateType) {
            case 'assessment':
                content = generateAssessmentTemplate();
                filename = 'hadoop-migration-assessment.txt';
                break;
            case 'timeline':
                content = generateTimelineTemplate();
                filename = 'hadoop-migration-timeline.txt';
                break;
            default:
                console.error('Unknown template type:', templateType);
                return;
        }
        
        downloadTextFile(content, filename);
    };
}

/**
 * Generate assessment template content
 */
function generateAssessmentTemplate() {
    return `# Hadoop Migration Assessment Template
# Generated on: ${new Date().toLocaleDateString('pt-BR')}

## 1. INVENTÁRIO ATUAL

### Workloads MapReduce
- Número total de jobs MapReduce: ___
- Jobs críticos (SLA < 4h): ___
- Jobs que rodam diariamente: ___
- Jobs que rodam semanalmente: ___
- Tamanho médio dos datasets processados: ___ TB

### Queries Hive/Impala
- Queries executadas por dia: ___
- Queries com SLA crítico: ___
- Tabelas mais acessadas (top 10): ___
- Usuários ativos por mês: ___

### Infraestrutura
- Número de nós no cluster: ___
- CPU total (cores): ___
- RAM total (GB): ___
- Storage total (TB): ___
- Utilização média CPU: ___%
- Utilização média RAM: ___%

### Dados
- Volume total de dados: ___ TB
- Taxa de crescimento mensal: ___ TB
- Retenção de dados: ___ meses
- Backup strategy: ___

## 2. DEPENDÊNCIAS E INTEGRAÇÕES

### Sistemas Upstream
- Sistema 1: ___
- Sistema 2: ___
- Sistema 3: ___

### Sistemas Downstream
- BI Tools: ___
- Aplicações: ___
- APIs: ___

### Ferramentas de Orquestração
- Oozie workflows: ___
- Cron jobs: ___
- Outros: ___

## 3. REQUISITOS DE NEGÓCIO

### SLAs Críticos
- Processo 1: ___ (tempo máximo: ___)
- Processo 2: ___ (tempo máximo: ___)
- Processo 3: ___ (tempo máximo: ___)

### Janelas de Manutenção
- Janela semanal: ___
- Janela mensal: ___
- Blackout periods: ___

### Compliance e Segurança
- Regulamentações aplicáveis: ___
- Requisitos de auditoria: ___
- Controles de acesso: ___

## 4. RECURSOS DISPONÍVEIS

### Equipe Técnica
- Engenheiros Hadoop: ___
- Engenheiros de Dados: ___
- DBAs: ___
- DevOps: ___
- Disponibilidade (horas/semana): ___

### Budget
- Budget total disponível: $ ___
- Budget para consultoria: $ ___
- Budget para infraestrutura: $ ___
- Budget para treinamento: $ ___

### Timeline
- Data desejada para início: ___
- Data limite para conclusão: ___
- Marcos importantes: ___

## 5. CRITÉRIOS DE SUCESSO

### Performance
- Melhoria esperada em tempo de processamento: ___%
- Redução esperada em custos: ___%
- Disponibilidade mínima: ___%

### Funcionalidade
- Funcionalidades que devem ser mantidas: ___
- Novas funcionalidades desejadas: ___
- Funcionalidades que podem ser descontinuadas: ___

## 6. RISCOS IDENTIFICADOS

### Riscos Técnicos
- Risco 1: ___ (Probabilidade: ___, Impacto: ___)
- Risco 2: ___ (Probabilidade: ___, Impacto: ___)
- Risco 3: ___ (Probabilidade: ___, Impacto: ___)

### Riscos de Negócio
- Risco 1: ___ (Probabilidade: ___, Impacto: ___)
- Risco 2: ___ (Probabilidade: ___, Impacto: ___)

### Planos de Mitigação
- Para Risco 1: ___
- Para Risco 2: ___
- Para Risco 3: ___

## 7. PRÓXIMOS PASSOS

1. [ ] Completar este assessment
2. [ ] Revisar com stakeholders
3. [ ] Definir arquitetura alvo
4. [ ] Criar timeline detalhado
5. [ ] Iniciar proof of concept
6. [ ] Preparar ambiente de desenvolvimento
7. [ ] Começar migração piloto

---
Template gerado pelo Portal Big Data - hadoop.com.br
`;
}

/**
 * Generate timeline template content
 */
function generateTimelineTemplate() {
    return `# Hadoop Migration Timeline Template
# Generated on: ${new Date().toLocaleDateString('pt-BR')}

## PROJETO: Migração Hadoop para Stack Moderna
## DURAÇÃO ESTIMADA: 16-20 semanas
## DATA DE INÍCIO: ___________
## DATA DE CONCLUSÃO: ___________

## FASE 1: DESCOBERTA E PLANEJAMENTO (Semanas 1-4)

### Semana 1-2: Assessment Inicial
- [ ] Inventário completo de workloads
- [ ] Análise de dependências
- [ ] Identificação de stakeholders
- [ ] Definição de critérios de sucesso
- [ ] Avaliação de riscos

### Semana 3-4: Arquitetura e Planejamento
- [ ] Design da arquitetura alvo
- [ ] Seleção de tecnologias
- [ ] Planejamento de infraestrutura
- [ ] Definição de estratégia de migração
- [ ] Aprovação do plano pelo steering committee

**Entregáveis:**
- Assessment Report
- Architecture Design Document
- Migration Strategy Document
- Project Plan detalhado

## FASE 2: PREPARAÇÃO (Semanas 5-10)

### Semana 5-6: Setup de Infraestrutura
- [ ] Provisioning do ambiente de desenvolvimento
- [ ] Configuração do ambiente de staging
- [ ] Setup de ferramentas de monitoramento
- [ ] Configuração de backup e recovery
- [ ] Testes de conectividade

### Semana 7-8: Migração de Dados Não-Críticos
- [ ] Migração de dados históricos
- [ ] Validação de integridade dos dados
- [ ] Setup de processos de sincronização
- [ ] Testes de performance inicial
- [ ] Documentação de procedimentos

### Semana 9-10: Desenvolvimento e Testes
- [ ] Conversão de jobs não-críticos
- [ ] Desenvolvimento de scripts de migração
- [ ] Testes unitários e integração
- [ ] Validação de resultados
- [ ] Otimização inicial

**Entregáveis:**
- Ambiente de desenvolvimento funcional
- Scripts de migração testados
- Documentação técnica
- Plano de testes

## FASE 3: MIGRAÇÃO PRINCIPAL (Semanas 11-16)

### Semana 11-12: Migração de Workloads Críticos
- [ ] Migração de jobs ETL principais
- [ ] Conversão de queries Hive críticas
- [ ] Migração de workflows de orquestração
- [ ] Testes paralelos com ambiente atual
- [ ] Ajustes de performance

### Semana 13-14: Integração e Testes
- [ ] Integração com sistemas upstream
- [ ] Integração com sistemas downstream
- [ ] Testes end-to-end
- [ ] Testes de carga e stress
- [ ] Validação de SLAs

### Semana 15-16: Otimização e Preparação
- [ ] Otimização de performance
- [ ] Ajustes de configuração
- [ ] Preparação de runbooks
- [ ] Treinamento da equipe operacional
- [ ] Preparação do go-live

**Entregáveis:**
- Sistema migrado e testado
- Documentação operacional
- Runbooks de troubleshooting
- Plano de go-live

## FASE 4: GO-LIVE E ESTABILIZAÇÃO (Semanas 17-20)

### Semana 17: Go-Live
- [ ] Execução do plano de go-live
- [ ] Monitoramento 24/7
- [ ] Suporte intensivo aos usuários
- [ ] Resolução de issues críticos
- [ ] Validação de métricas de sucesso

### Semana 18-19: Estabilização
- [ ] Monitoramento contínuo
- [ ] Ajustes finos de performance
- [ ] Resolução de bugs menores
- [ ] Coleta de feedback dos usuários
- [ ] Otimizações adicionais

### Semana 20: Encerramento
- [ ] Descomissionamento do ambiente antigo
- [ ] Documentação final
- [ ] Transferência de conhecimento
- [ ] Retrospectiva do projeto
- [ ] Celebração do sucesso!

**Entregáveis:**
- Sistema em produção estável
- Documentação completa
- Relatório final do projeto
- Lições aprendidas

## MARCOS PRINCIPAIS

| Marco | Data Planejada | Data Real | Status |
|-------|----------------|-----------|--------|
| Aprovação do Projeto | ___________ | _________ | ⏳ |
| Conclusão do Assessment | ___________ | _________ | ⏳ |
| Ambiente Dev Pronto | ___________ | _________ | ⏳ |
| Primeira Migração Piloto | ___________ | _________ | ⏳ |
| Migração de Dados Completa | ___________ | _________ | ⏳ |
| Testes de Aceitação OK | ___________ | _________ | ⏳ |
| Go-Live | ___________ | _________ | ⏳ |
| Estabilização Completa | ___________ | _________ | ⏳ |

## RECURSOS NECESSÁRIOS

### Equipe Interna
- Project Manager: ___ (dedicação: ___%)
- Hadoop Engineer: ___ (dedicação: ___%)
- Data Engineer: ___ (dedicação: ___%)
- DevOps Engineer: ___ (dedicação: ___%)
- QA Engineer: ___ (dedicação: ___%)

### Consultoria Externa
- Migration Specialist: ___ (dedicação: ___%)
- Architecture Consultant: ___ (dedicação: ___%)

### Infraestrutura
- Ambiente de desenvolvimento: $ ___
- Ambiente de staging: $ ___
- Ambiente de produção: $ ___
- Ferramentas e licenças: $ ___

## CRITÉRIOS DE SUCESSO

### Técnicos
- [ ] Migração de 100% dos workloads críticos
- [ ] Performance igual ou superior ao ambiente atual
- [ ] Zero perda de dados
- [ ] Disponibilidade > 99.9%

### Negócio
- [ ] Todos os SLAs mantidos ou melhorados
- [ ] Usuários treinados e satisfeitos
- [ ] Redução de custos operacionais
- [ ] Maior agilidade para novos projetos

## PLANO DE CONTINGÊNCIA

### Cenário 1: Problemas de Performance
- Rollback para ambiente anterior
- Análise de root cause
- Otimização e nova tentativa

### Cenário 2: Problemas de Integridade de Dados
- Parada imediata da migração
- Restauração de backup
- Investigação completa

### Cenário 3: Problemas de Integração
- Isolamento do problema
- Correção pontual
- Testes adicionais

## COMUNICAÇÃO

### Stakeholders Principais
- Sponsor: ___
- Business Owner: ___
- Technical Lead: ___
- Operations Manager: ___

### Frequência de Reportes
- Status semanal: toda sexta-feira
- Steering committee: quinzenal
- Comunicação de issues: imediata

---
Template gerado pelo Portal Big Data - hadoop.com.br
Para mais recursos: https://hadoop.com.br/sair-hadoop/migracao/
`;
}

/**
 * Download text file
 */
function downloadTextFile(content, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Show success message
    showNotification(`Template "${filename}" baixado com sucesso!`, 'success');
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

/**
 * Initialize progress tracking
 */
function initializeProgressTracking() {
    // Track page views for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Migration Guides',
            page_location: window.location.href
        });
    }
    
    // Track checklist interactions
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.closest('.checklist-container')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'checklist_item_toggle', {
                    event_category: 'Migration',
                    event_label: e.target.id,
                    value: e.target.checked ? 1 : 0
                });
            }
        }
    });
    
    // Track template downloads
    const originalDownloadTemplate = window.downloadTemplate;
    window.downloadTemplate = function(templateType) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'template_download', {
                event_category: 'Migration',
                event_label: templateType
            });
        }
        return originalDownloadTemplate(templateType);
    };
}

/**
 * Export functions for external use
 */
window.MigrationGuides = {
    updateProgress,
    downloadTemplate: window.downloadTemplate,
    showNotification
};