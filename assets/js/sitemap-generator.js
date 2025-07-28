/**
 * Automatic Sitemap Generator for Portal Big Data
 * Generates XML sitemap for Google Search Console
 */

const SITEMAP_CONFIG = {
    baseUrl: 'https://hadoop.com.br',
    defaultChangeFreq: 'weekly',
    defaultPriority: '0.8',
    
    // Page categories with specific configurations
    pageTypes: {
        homepage: {
            priority: '1.0',
            changefreq: 'daily',
            lastmod: true
        },
        
        technology: {
            priority: '0.9',
            changefreq: 'weekly',
            lastmod: true
        },
        
        course: {
            priority: '0.8',
            changefreq: 'monthly',
            lastmod: true
        },
        
        blog: {
            priority: '0.7',
            changefreq: 'weekly',
            lastmod: true
        },
        
        category: {
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: true
        },
        
        static: {
            priority: '0.6',
            changefreq: 'monthly',
            lastmod: false
        }
    }
};

// Site structure definition
const SITE_STRUCTURE = {
    // Homepage
    '/': {
        type: 'homepage',
        title: 'Portal Big Data - hadoop.com.br'
    },
    
    // Main sections
    '/entrar-hadoop/': {
        type: 'category',
        title: 'Entrar no Hadoop'
    },
    '/sair-hadoop/': {
        type: 'category',
        title: 'Sair do Hadoop'
    },
    '/tecnologias/': {
        type: 'category',
        title: 'Tecnologias Big Data'
    },
    '/cursos/': {
        type: 'category',
        title: 'Cursos e Treinamentos'
    },
    '/blog/': {
        type: 'category',
        title: 'Blog'
    },
    
    // Entrar no Hadoop subsections
    '/entrar-hadoop/introducao/': {
        type: 'static',
        title: 'Introdução ao Hadoop'
    },
    '/entrar-hadoop/distribuicoes/': {
        type: 'static',
        title: 'Distribuições Hadoop'
    },
    '/entrar-hadoop/primeiros-passos/': {
        type: 'static',
        title: 'Primeiros Passos com Hadoop'
    },
    '/entrar-hadoop/casos-uso/': {
        type: 'static',
        title: 'Casos de Uso Hadoop'
    },
    '/entrar-hadoop/roadmap/': {
        type: 'static',
        title: 'Roadmap de Aprendizado Hadoop'
    },
    
    // Sair do Hadoop subsections
    '/sair-hadoop/alternativas/': {
        type: 'static',
        title: 'Alternativas ao Hadoop'
    },
    '/sair-hadoop/migracao/': {
        type: 'static',
        title: 'Guias de Migração'
    },
    '/sair-hadoop/stacks-modernas/': {
        type: 'static',
        title: 'Stacks Modernas'
    },
    
    // Technology categories
    '/tecnologias/sistemas-arquivos/': {
        type: 'category',
        title: 'Sistemas de Arquivos Distribuídos'
    },
    '/tecnologias/processamento/': {
        type: 'category',
        title: 'Tecnologias de Processamento'
    },
    '/tecnologias/data-warehousing/': {
        type: 'category',
        title: 'Data Warehousing'
    },
    '/tecnologias/streaming/': {
        type: 'category',
        title: 'Streaming de Dados'
    },
    '/tecnologias/machine-learning/': {
        type: 'category',
        title: 'Machine Learning'
    },
    '/tecnologias/orquestracao/': {
        type: 'category',
        title: 'Orquestração'
    },
    '/tecnologias/visualizacao/': {
        type: 'category',
        title: 'Visualização de Dados'
    },
    
    // Blog categories
    '/blog/tutoriais/': {
        type: 'category',
        title: 'Tutoriais'
    },
    '/blog/estudos-caso/': {
        type: 'category',
        title: 'Estudos de Caso'
    },
    '/blog/novidades/': {
        type: 'category',
        title: 'Novidades e Tendências'
    },
    '/blog/hadoop-2025-trends/': {
        type: 'blog',
        title: 'Tendências Hadoop 2025'
    },
    
    // Static pages
    '/buscar.html': {
        type: 'static',
        title: 'Busca'
    }
};

// Technology pages - dynamically generated
const TECHNOLOGY_PAGES = {
    // Sistemas de Arquivos
    '/tecnologias/sistemas-arquivos/hdfs/': { name: 'Apache HDFS', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/minio/': { name: 'MinIO', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/ceph/': { name: 'Ceph', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/glusterfs/': { name: 'GlusterFS', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/amazon-s3/': { name: 'Amazon S3', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/google-cloud-storage/': { name: 'Google Cloud Storage', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/azure-blob/': { name: 'Azure Blob Storage', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/apache-iceberg/': { name: 'Apache Iceberg', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/delta-lake/': { name: 'Delta Lake', category: 'sistemas-arquivos' },
    '/tecnologias/sistemas-arquivos/apache-hudi/': { name: 'Apache Hudi', category: 'sistemas-arquivos' },
    
    // Processamento
    '/tecnologias/processamento/apache-spark/': { name: 'Apache Spark', category: 'processamento' },
    '/tecnologias/processamento/apache-flink/': { name: 'Apache Flink', category: 'processamento' },
    '/tecnologias/processamento/apache-storm/': { name: 'Apache Storm', category: 'processamento' },
    '/tecnologias/processamento/apache-beam/': { name: 'Apache Beam', category: 'processamento' },
    '/tecnologias/processamento/dask/': { name: 'Dask', category: 'processamento' },
    '/tecnologias/processamento/ray/': { name: 'Ray', category: 'processamento' },
    '/tecnologias/processamento/databricks/': { name: 'Databricks', category: 'processamento' },
    '/tecnologias/processamento/kafka-streams/': { name: 'Kafka Streams', category: 'processamento' },
    '/tecnologias/processamento/apache-samza/': { name: 'Apache Samza', category: 'processamento' },
    
    // Data Warehousing
    '/tecnologias/data-warehousing/apache-hive/': { name: 'Apache Hive', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/apache-impala/': { name: 'Apache Impala', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/trino/': { name: 'Trino', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/clickhouse/': { name: 'ClickHouse', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/snowflake/': { name: 'Snowflake', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/bigquery/': { name: 'Google BigQuery', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/redshift/': { name: 'Amazon Redshift', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/databricks-sql/': { name: 'Databricks SQL', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/apache-drill/': { name: 'Apache Drill', category: 'data-warehousing' },
    '/tecnologias/data-warehousing/apache-phoenix/': { name: 'Apache Phoenix', category: 'data-warehousing' },
    
    // Streaming
    '/tecnologias/streaming/apache-kafka/': { name: 'Apache Kafka', category: 'streaming' },
    '/tecnologias/streaming/apache-pulsar/': { name: 'Apache Pulsar', category: 'streaming' },
    '/tecnologias/streaming/amazon-kinesis/': { name: 'Amazon Kinesis', category: 'streaming' },
    '/tecnologias/streaming/google-pubsub/': { name: 'Google Pub/Sub', category: 'streaming' },
    '/tecnologias/streaming/apache-nifi/': { name: 'Apache NiFi', category: 'streaming' },
    '/tecnologias/streaming/streamsets/': { name: 'StreamSets', category: 'streaming' },
    '/tecnologias/streaming/confluent/': { name: 'Confluent Platform', category: 'streaming' },
    
    // Machine Learning
    '/tecnologias/machine-learning/tensorflow/': { name: 'TensorFlow', category: 'machine-learning' },
    '/tecnologias/machine-learning/pytorch/': { name: 'PyTorch', category: 'machine-learning' },
    '/tecnologias/machine-learning/scikit-learn/': { name: 'Scikit-learn', category: 'machine-learning' },
    '/tecnologias/machine-learning/mlflow/': { name: 'MLflow', category: 'machine-learning' },
    '/tecnologias/machine-learning/kubeflow/': { name: 'Kubeflow', category: 'machine-learning' },
    '/tecnologias/machine-learning/h2o-ai/': { name: 'H2O.ai', category: 'machine-learning' },
    '/tecnologias/machine-learning/apache-mahout/': { name: 'Apache Mahout', category: 'machine-learning' },
    '/tecnologias/machine-learning/spark-mllib/': { name: 'Spark MLlib', category: 'machine-learning' },
    
    // Orquestração
    '/tecnologias/orquestracao/apache-airflow/': { name: 'Apache Airflow', category: 'orquestracao' },
    '/tecnologias/orquestracao/prefect/': { name: 'Prefect', category: 'orquestracao' },
    '/tecnologias/orquestracao/dagster/': { name: 'Dagster', category: 'orquestracao' },
    '/tecnologias/orquestracao/luigi/': { name: 'Luigi', category: 'orquestracao' },
    '/tecnologias/orquestracao/apache-oozie/': { name: 'Apache Oozie', category: 'orquestracao' },
    '/tecnologias/orquestracao/kubernetes/': { name: 'Kubernetes', category: 'orquestracao' },
    '/tecnologias/orquestracao/docker/': { name: 'Docker', category: 'orquestracao' },
    '/tecnologias/orquestracao/apache-mesos/': { name: 'Apache Mesos', category: 'orquestracao' },
    
    // Visualização
    '/tecnologias/visualizacao/apache-superset/': { name: 'Apache Superset', category: 'visualizacao' },
    '/tecnologias/visualizacao/grafana/': { name: 'Grafana', category: 'visualizacao' },
    '/tecnologias/visualizacao/tableau/': { name: 'Tableau', category: 'visualizacao' },
    '/tecnologias/visualizacao/power-bi/': { name: 'Power BI', category: 'visualizacao' },
    '/tecnologias/visualizacao/qlik-sense/': { name: 'Qlik Sense', category: 'visualizacao' },
    '/tecnologias/visualizacao/looker/': { name: 'Looker', category: 'visualizacao' },
    '/tecnologias/visualizacao/metabase/': { name: 'Metabase', category: 'visualizacao' },
    '/tecnologias/visualizacao/apache-zeppelin/': { name: 'Apache Zeppelin', category: 'visualizacao' }
};

// Course pages
const COURSE_PAGES = {
    '/cursos/hadoop-fundamentals/': { name: 'Hadoop Fundamentals', level: 'beginner' },
    '/cursos/escolhendo-distribuicao-hadoop/': { name: 'Escolhendo a Distribuição Hadoop Certa', level: 'intermediate' },
    '/cursos/primeiros-passos-hdfs-mapreduce/': { name: 'Primeiros Passos com HDFS e MapReduce', level: 'beginner' },
    '/cursos/hadoop-ecosystem-overview/': { name: 'Hadoop Ecosystem Overview', level: 'intermediate' },
    '/cursos/migracao-hadoop-spark/': { name: 'Migração de Hadoop para Spark', level: 'advanced' },
    '/cursos/alternativas-modernas-hadoop/': { name: 'Alternativas Modernas ao Hadoop', level: 'intermediate' },
    '/cursos/delta-lake-usuarios-hadoop/': { name: 'Delta Lake para Usuários Hadoop', level: 'intermediate' },
    '/cursos/estrategias-migracao-data-lakes/': { name: 'Estratégias de Migração de Data Lakes', level: 'advanced' },
    '/cursos/apache-spark-fundamentals/': { name: 'Apache Spark Fundamentals', level: 'intermediate' },
    '/cursos/apache-kafka-streaming/': { name: 'Apache Kafka e Streaming', level: 'intermediate' },
    '/cursos/clickhouse-analytics/': { name: 'ClickHouse para Analytics', level: 'intermediate' },
    '/cursos/kubernetes-big-data/': { name: 'Kubernetes para Big Data', level: 'advanced' },
    '/cursos/mlops-production/': { name: 'MLOps em Produção', level: 'advanced' },
    '/cursos/data-lakehouse-architecture/': { name: 'Arquitetura Data Lakehouse', level: 'advanced' },
    '/cursos/real-time-analytics/': { name: 'Real-time Analytics', level: 'advanced' }
};

// Generate sitemap XML
function generateSitemap() {
    const now = new Date().toISOString();
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    // Add main site structure
    for (const [url, pageInfo] of Object.entries(SITE_STRUCTURE)) {
        const config = SITEMAP_CONFIG.pageTypes[pageInfo.type];
        sitemap += generateUrlEntry(url, config, now);
    }
    
    // Add technology pages
    for (const [url, techInfo] of Object.entries(TECHNOLOGY_PAGES)) {
        const config = SITEMAP_CONFIG.pageTypes.technology;
        sitemap += generateUrlEntry(url, config, now);
    }
    
    // Add course pages
    for (const [url, courseInfo] of Object.entries(COURSE_PAGES)) {
        const config = SITEMAP_CONFIG.pageTypes.course;
        sitemap += generateUrlEntry(url, config, now);
    }
    
    sitemap += '</urlset>';
    return sitemap;
}

// Generate individual URL entry
function generateUrlEntry(url, config, lastmod) {
    const fullUrl = SITEMAP_CONFIG.baseUrl + url;
    let entry = `  <url>
    <loc>${fullUrl}</loc>`;
    
    if (config.lastmod) {
        entry += `
    <lastmod>${lastmod}</lastmod>`;
    }
    
    entry += `
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>
`;
    
    return entry;
}

// Generate robots.txt
function generateRobotsTxt() {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITEMAP_CONFIG.baseUrl}/sitemap.xml

# Disallow admin and test pages
Disallow: /admin/
Disallow: /test-*
Disallow: /*.json$

# Allow important resources
Allow: /assets/css/
Allow: /assets/js/
Allow: /assets/images/

# Crawl delay for respectful crawling
Crawl-delay: 1`;
}

// Google Search Console verification methods
const SEARCH_CONSOLE_CONFIG = {
    verificationMethods: {
        htmlFile: {
            filename: 'google{verification-code}.html',
            content: 'google-site-verification: google{verification-code}.html'
        },
        
        metaTag: {
            tag: '<meta name="google-site-verification" content="{verification-code}" />',
            placement: 'head section of homepage'
        },
        
        dnsRecord: {
            type: 'TXT',
            name: '@',
            value: 'google-site-verification={verification-code}'
        }
    },
    
    // Properties to submit to Search Console
    properties: [
        'https://hadoop.com.br',
        'http://hadoop.com.br', // For redirect verification
        'https://www.hadoop.com.br', // If www subdomain is used
        'http://www.hadoop.com.br'
    ],
    
    // Important pages to monitor
    keyPages: [
        '/',
        '/entrar-hadoop/',
        '/sair-hadoop/',
        '/tecnologias/',
        '/cursos/',
        '/tecnologias/processamento/apache-spark/',
        '/tecnologias/streaming/apache-kafka/',
        '/tecnologias/data-warehousing/clickhouse/',
        '/cursos/apache-spark-fundamentals/',
        '/blog/'
    ],
    
    // Keywords to monitor
    targetKeywords: [
        'hadoop',
        'big data',
        'apache spark',
        'apache kafka',
        'clickhouse',
        'data processing',
        'hadoop alternatives',
        'big data courses',
        'hadoop migration',
        'data lakehouse',
        'streaming analytics',
        'hadoop distribuições',
        'big data brasil',
        'curso hadoop',
        'apache spark tutorial'
    ]
};

// SEO monitoring alerts configuration
const SEO_ALERTS_CONFIG = {
    indexingIssues: {
        name: 'Problemas de Indexação',
        conditions: [
            'pages_not_indexed > 10',
            'crawl_errors > 5',
            'sitemap_errors > 0'
        ],
        frequency: 'daily',
        severity: 'high'
    },
    
    rankingDrops: {
        name: 'Queda no Ranking',
        conditions: [
            'average_position_change > +5',
            'clicks_change < -20%',
            'impressions_change < -15%'
        ],
        frequency: 'weekly',
        severity: 'medium'
    },
    
    technicalIssues: {
        name: 'Problemas Técnicos',
        conditions: [
            'mobile_usability_errors > 0',
            'core_web_vitals_poor > 10%',
            'https_errors > 0'
        ],
        frequency: 'daily',
        severity: 'high'
    },
    
    contentIssues: {
        name: 'Problemas de Conteúdo',
        conditions: [
            'duplicate_titles > 0',
            'missing_descriptions > 5',
            'thin_content_pages > 0'
        ],
        frequency: 'weekly',
        severity: 'medium'
    }
};

// Export functions and configurations
window.SearchConsoleConfig = {
    generateSitemap,
    generateRobotsTxt,
    SEARCH_CONSOLE_CONFIG,
    SEO_ALERTS_CONFIG,
    SITE_STRUCTURE,
    TECHNOLOGY_PAGES,
    COURSE_PAGES
};

// Auto-generate and update sitemap
document.addEventListener('DOMContentLoaded', function() {
    // Generate sitemap XML and make it available
    const sitemapXML = generateSitemap();
    const robotsTxt = generateRobotsTxt();
    
    // Store in sessionStorage for download/viewing
    sessionStorage.setItem('generated_sitemap', sitemapXML);
    sessionStorage.setItem('generated_robots', robotsTxt);
    
    console.log('Sitemap and robots.txt generated successfully');
    console.log('Access via sessionStorage.getItem("generated_sitemap")');
});