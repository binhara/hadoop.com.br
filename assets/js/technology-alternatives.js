/**
 * Technology Alternatives Interactive Map
 * Handles filtering, comparisons, and interactive features for the alternatives page
 */

// Technology comparison data
const comparisonData = {
    spark: {
        title: "Apache Spark vs MapReduce",
        content: `
            <div class="row">
                <div class="col-md-6">
                    <h6>Apache Spark</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Performance:</strong> 100x mais rápido (in-memory)</li>
                        <li class="list-group-item"><strong>Facilidade:</strong> APIs em Python, Scala, Java, R</li>
                        <li class="list-group-item"><strong>Recursos:</strong> Streaming, ML, Graph processing</li>
                        <li class="list-group-item"><strong>Latência:</strong> Sub-segundo para queries interativas</li>
                        <li class="list-group-item"><strong>Escalabilidade:</strong> Até 8000+ nós</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6>Hadoop MapReduce</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Performance:</strong> Baseado em disco, mais lento</li>
                        <li class="list-group-item"><strong>Facilidade:</strong> Apenas Java, complexo</li>
                        <li class="list-group-item"><strong>Recursos:</strong> Apenas batch processing</li>
                        <li class="list-group-item"><strong>Latência:</strong> Minutos para jobs simples</li>
                        <li class="list-group-item"><strong>Escalabilidade:</strong> Até 4000 nós</li>
                    </ul>
                </div>
            </div>
            <div class="mt-3">
                <div class="alert alert-success">
                    <strong>Recomendação:</strong> Spark é superior em 90% dos casos de uso. 
                    Migração típica resulta em 5-10x melhoria de performance.
                </div>
            </div>
        `
    },
    delta: {
        title: "Delta Lake vs HDFS",
        content: `
            <div class="row">
                <div class="col-md-6">
                    <h6>Delta Lake</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>ACID:</strong> Transações completas</li>
                        <li class="list-group-item"><strong>Schema Evolution:</strong> Automática</li>
                        <li class="list-group-item"><strong>Time Travel:</strong> Versionamento de dados</li>
                        <li class="list-group-item"><strong>Performance:</strong> Otimizações automáticas</li>
                        <li class="list-group-item"><strong>Streaming:</strong> Unified batch + streaming</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6>HDFS</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>ACID:</strong> Não suportado</li>
                        <li class="list-group-item"><strong>Schema Evolution:</strong> Manual, complexo</li>
                        <li class="list-group-item"><strong>Time Travel:</strong> Não disponível</li>
                        <li class="list-group-item"><strong>Performance:</strong> Otimizações manuais</li>
                        <li class="list-group-item"><strong>Streaming:</strong> Separado do batch</li>
                    </ul>
                </div>
            </div>
            <div class="mt-3">
                <div class="alert alert-info">
                    <strong>Caso de Uso:</strong> Delta Lake é ideal para data lakes que precisam de 
                    confiabilidade e governança, especialmente em ambientes multi-usuário.
                </div>
            </div>
        `
    },
    trino: {
        title: "Trino vs Apache Hive",
        content: `
            <div class="row">
                <div class="col-md-6">
                    <h6>Trino (Presto)</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Performance:</strong> Queries interativas (segundos)</li>
                        <li class="list-group-item"><strong>Conectores:</strong> 50+ data sources</li>
                        <li class="list-group-item"><strong>SQL:</strong> ANSI SQL completo</li>
                        <li class="list-group-item"><strong>Federação:</strong> Cross-platform queries</li>
                        <li class="list-group-item"><strong>Escalabilidade:</strong> Petabytes de dados</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6>Apache Hive</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Performance:</strong> Batch jobs (minutos/horas)</li>
                        <li class="list-group-item"><strong>Conectores:</strong> Limitado ao Hadoop</li>
                        <li class="list-group-item"><strong>SQL:</strong> HiveQL (limitado)</li>
                        <li class="list-group-item"><strong>Federação:</strong> Não suportado</li>
                        <li class="list-group-item"><strong>Escalabilidade:</strong> Limitado pelo HDFS</li>
                    </ul>
                </div>
            </div>
            <div class="mt-3">
                <div class="alert alert-warning">
                    <strong>Migração:</strong> Trino pode consultar dados Hive existentes, 
                    permitindo migração gradual sem reescrita de dados.
                </div>
            </div>
        `
    },
    kafka: {
        title: "Apache Kafka vs Apache Flume",
        content: `
            <div class="row">
                <div class="col-md-6">
                    <h6>Apache Kafka</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Throughput:</strong> Milhões msgs/sec</li>
                        <li class="list-group-item"><strong>Durabilidade:</strong> Persistência configurável</li>
                        <li class="list-group-item"><strong>Ecosystem:</strong> Kafka Streams, Connect</li>
                        <li class="list-group-item"><strong>Use Cases:</strong> Event streaming, microservices</li>
                        <li class="list-group-item"><strong>Latência:</strong> Sub-milissegundo</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6>Apache Flume</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Throughput:</strong> Milhares msgs/sec</li>
                        <li class="list-group-item"><strong>Durabilidade:</strong> Limitada</li>
                        <li class="list-group-item"><strong>Ecosystem:</strong> Apenas ingestão</li>
                        <li class="list-group-item"><strong>Use Cases:</strong> Log collection para HDFS</li>
                        <li class="list-group-item"><strong>Latência:</strong> Segundos</li>
                    </ul>
                </div>
            </div>
            <div class="mt-3">
                <div class="alert alert-success">
                    <strong>Evolução:</strong> Kafka oferece arquitetura event-driven moderna, 
                    enquanto Flume é focado apenas em ingestão batch.
                </div>
            </div>
        `
    },
    airflow: {
        title: "Apache Airflow vs Apache Oozie",
        content: `
            <div class="row">
                <div class="col-md-6">
                    <h6>Apache Airflow</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Interface:</strong> Web UI moderna</li>
                        <li class="list-group-item"><strong>Linguagem:</strong> Python (DAGs como código)</li>
                        <li class="list-group-item"><strong>Integrações:</strong> 1000+ operators</li>
                        <li class="list-group-item"><strong>Monitoramento:</strong> Real-time, alertas</li>
                        <li class="list-group-item"><strong>Comunidade:</strong> Muito ativa</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6>Apache Oozie</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Interface:</strong> Web UI básica</li>
                        <li class="list-group-item"><strong>Linguagem:</strong> XML (complexo)</li>
                        <li class="list-group-item"><strong>Integrações:</strong> Limitado ao Hadoop</li>
                        <li class="list-group-item"><strong>Monitoramento:</strong> Básico</li>
                        <li class="list-group-item"><strong>Comunidade:</strong> Declínio</li>
                    </ul>
                </div>
            </div>
            <div class="mt-3">
                <div class="alert alert-info">
                    <strong>Produtividade:</strong> Airflow reduz tempo de desenvolvimento de workflows 
                    em 60-80% comparado ao Oozie.
                </div>
            </div>
        `
    },
    clickhouse: {
        title: "ClickHouse vs Apache Impala",
        content: `
            <div class="row">
                <div class="col-md-6">
                    <h6>ClickHouse</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Performance:</strong> 100-1000x mais rápido</li>
                        <li class="list-group-item"><strong>Compressão:</strong> 10:1 ratio típico</li>
                        <li class="list-group-item"><strong>Real-time:</strong> Ingestão contínua</li>
                        <li class="list-group-item"><strong>SQL:</strong> Extensões para analytics</li>
                        <li class="list-group-item"><strong>Deployment:</strong> Cloud-native</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6>Apache Impala</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Performance:</strong> Rápido para Hadoop</li>
                        <li class="list-group-item"><strong>Compressão:</strong> Dependente do formato</li>
                        <li class="list-group-item"><strong>Real-time:</strong> Limitado</li>
                        <li class="list-group-item"><strong>SQL:</strong> SQL básico</li>
                        <li class="list-group-item"><strong>Deployment:</strong> Acoplado ao Hadoop</li>
                    </ul>
                </div>
            </div>
            <div class="mt-3">
                <div class="alert alert-success">
                    <strong>Analytics:</strong> ClickHouse é otimizado para OLAP workloads, 
                    oferecendo performance superior para agregações complexas.
                </div>
            </div>
        `
    }
};

// Filter functionality
function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const useCaseFilter = document.getElementById('useCaseFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterTechnologies);
    }
    
    if (useCaseFilter) {
        useCaseFilter.addEventListener('change', filterTechnologies);
    }
}

function filterTechnologies() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const useCaseFilter = document.getElementById('useCaseFilter').value;
    const cards = document.querySelectorAll('.technology-card');
    
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardUseCases = card.dataset.usecase.split(',');
        
        let showCard = true;
        
        // Filter by category
        if (categoryFilter !== 'all' && cardCategory !== categoryFilter) {
            showCard = false;
        }
        
        // Filter by use case
        if (useCaseFilter !== 'all' && !cardUseCases.includes(useCaseFilter)) {
            showCard = false;
        }
        
        // Show/hide card with animation
        if (showCard) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 100);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Comparison modal functionality
function showComparison(technology) {
    const modal = new bootstrap.Modal(document.getElementById('comparisonModal'));
    const title = document.getElementById('comparisonTitle');
    const content = document.getElementById('comparisonContent');
    
    if (comparisonData[technology]) {
        title.textContent = comparisonData[technology].title;
        content.innerHTML = comparisonData[technology].content;
        modal.show();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to technology cards
    document.querySelectorAll('.technology-card .card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Export functions for global access
window.showComparison = showComparison;