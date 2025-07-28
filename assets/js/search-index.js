/**
 * Portal Big Data - Search Index System
 * Global search functionality with content indexing
 */

// Search index data structure
const searchIndex = {
    technologies: [
        // Sistemas de Arquivos Distribuídos
        {
            id: 'hdfs',
            title: 'Apache HDFS',
            category: 'sistemas-arquivos',
            type: 'technology',
            description: 'Sistema de arquivos distribuído do Hadoop para armazenamento de big data',
            keywords: ['hadoop', 'hdfs', 'distributed', 'file system', 'storage', 'big data'],
            url: '/tecnologias/sistemas-arquivos/hdfs/',
            trending: false,
            opensource: true
        },
        {
            id: 'minio',
            title: 'MinIO',
            category: 'sistemas-arquivos',
            type: 'technology',
            description: 'Object storage server compatível com Amazon S3 para cloud nativa',
            keywords: ['minio', 's3', 'object storage', 'cloud native', 'kubernetes'],
            url: '/tecnologias/sistemas-arquivos/minio/',
            trending: true,
            opensource: true
        },
        {
            id: 'ceph',
            title: 'Ceph',
            category: 'sistemas-arquivos',
            type: 'technology',
            description: 'Sistema de armazenamento distribuído unificado para object, block e file storage',
            keywords: ['ceph', 'distributed storage', 'object storage', 'block storage', 'file storage'],
            url: '/tecnologias/sistemas-arquivos/ceph/',
            trending: false,
            opensource: true
        },
        {
            id: 'glusterfs',
            title: 'GlusterFS',
            category: 'sistemas-arquivos',
            type: 'technology',
            description: 'Sistema de arquivos distribuído escalável para cloud computing',
            keywords: ['glusterfs', 'distributed file system', 'scalable', 'cloud computing'],
            url: '/tecnologias/sistemas-arquivos/glusterfs/',
            trending: false,
            opensource: true
        },
        {
            id: 'amazon-s3',
            title: 'Amazon S3',
            category: 'sistemas-arquivos',
            type: 'technology',
            description: 'Serviço de armazenamento de objetos da Amazon Web Services',
            keywords: ['amazon s3', 'aws', 'object storage', 'cloud storage', 'scalable'],
            url: '/tecnologias/sistemas-arquivos/amazon-s3/',
            trending: true,
            opensource: false
        },
        {
            id: 'google-cloud-storage',
            title: 'Google Cloud Storage',
            category: 'sistemas-arquivos',
            type: 'technology',
            description: 'Serviço de armazenamento de objetos do Google Cloud Platform',
            keywords: ['google cloud storage', 'gcp', 'object storage', 'cloud storage'],
            url: '/tecnologias/sistemas-arquivos/google-cloud-storage/',
            trending: true,
            opensource: false
        },
        {
            id: 'azure-blob-storage',
            title: 'Azure Blob Storage',
            category: 'sistemas-arquivos',
            type: 'technology',
            description: 'Serviço de armazenamento de objetos do Microsoft Azure',
            keywords: ['azure blob storage', 'microsoft azure', 'object storage', 'cloud storage'],
            url: '/tecnologias/sistemas-arquivos/azure-blob-storage/',
            trending: true,
            opensource: false
        },
        {
            id: 'apache-iceberg',
            title: 'Apache Iceberg',
            category: 'sistemas-arquivos',
            type: 'technology',
            description: 'Table format aberto para datasets analíticos grandes',
            keywords: ['apache iceberg', 'table format', 'data lake', 'analytics', 'parquet'],
            url: '/tecnologias/sistemas-arquivos/apache-iceberg/',
            trending: true,
            opensource: true
        },

        // Processamento
        {
            id: 'apache-spark',
            title: 'Apache Spark',
            category: 'processamento',
            type: 'technology',
            description: 'Engine de analytics unificado para processamento de big data em larga escala',
            keywords: ['apache spark', 'big data', 'analytics', 'processing', 'scala', 'python', 'java'],
            url: '/tecnologias/processamento/apache-spark/',
            trending: true,
            opensource: true
        },
        {
            id: 'apache-flink',
            title: 'Apache Flink',
            category: 'processamento',
            type: 'technology',
            description: 'Framework para processamento de stream e batch distribuído',
            keywords: ['apache flink', 'stream processing', 'batch processing', 'real-time', 'distributed'],
            url: '/tecnologias/processamento/apache-flink/',
            trending: true,
            opensource: true
        },
        {
            id: 'apache-storm',
            title: 'Apache Storm',
            category: 'processamento',
            type: 'technology',
            description: 'Sistema de computação distribuída em tempo real',
            keywords: ['apache storm', 'real-time', 'distributed computing', 'stream processing'],
            url: '/tecnologias/processamento/apache-storm/',
            trending: false,
            opensource: true
        },
        {
            id: 'apache-beam',
            title: 'Apache Beam',
            category: 'processamento',
            type: 'technology',
            description: 'Modelo de programação unificado para processamento batch e stream',
            keywords: ['apache beam', 'batch processing', 'stream processing', 'unified model'],
            url: '/tecnologias/processamento/apache-beam/',
            trending: true,
            opensource: true
        },
        {
            id: 'dask',
            title: 'Dask',
            category: 'processamento',
            type: 'technology',
            description: 'Biblioteca Python para computação paralela e distribuída',
            keywords: ['dask', 'python', 'parallel computing', 'distributed computing', 'pandas'],
            url: '/tecnologias/processamento/dask/',
            trending: true,
            opensource: true
        },
        {
            id: 'ray',
            title: 'Ray',
            category: 'processamento',
            type: 'technology',
            description: 'Framework para aplicações distribuídas de AI e machine learning',
            keywords: ['ray', 'distributed ai', 'machine learning', 'python', 'scalable'],
            url: '/tecnologias/processamento/ray/',
            trending: true,
            opensource: true
        },
        {
            id: 'databricks',
            title: 'Databricks',
            category: 'processamento',
            type: 'technology',
            description: 'Plataforma de analytics unificada baseada em Apache Spark',
            keywords: ['databricks', 'spark', 'analytics platform', 'machine learning', 'collaborative'],
            url: '/tecnologias/processamento/databricks/',
            trending: true,
            opensource: false
        },
        {
            id: 'kafka-streams',
            title: 'Kafka Streams',
            category: 'processamento',
            type: 'technology',
            description: 'Biblioteca para construir aplicações de stream processing',
            keywords: ['kafka streams', 'stream processing', 'apache kafka', 'real-time'],
            url: '/tecnologias/processamento/kafka-streams/',
            trending: true,
            opensource: true
        },
        {
            id: 'apache-samza',
            title: 'Apache Samza',
            category: 'processamento',
            type: 'technology',
            description: 'Framework distribuído para processamento de streams',
            keywords: ['apache samza', 'stream processing', 'distributed', 'kafka'],
            url: '/tecnologias/processamento/apache-samza/',
            trending: false,
            opensource: true
        },

        // Data Warehousing
        {
            id: 'apache-hive',
            title: 'Apache Hive',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Data warehouse software para leitura, escrita e gerenciamento de datasets',
            keywords: ['apache hive', 'data warehouse', 'hadoop', 'sql', 'hql'],
            url: '/tecnologias/data-warehousing/apache-hive/',
            trending: false,
            opensource: true
        },
        {
            id: 'apache-impala',
            title: 'Apache Impala',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Engine SQL nativo para Apache Hadoop',
            keywords: ['apache impala', 'sql engine', 'hadoop', 'real-time queries'],
            url: '/tecnologias/data-warehousing/apache-impala/',
            trending: false,
            opensource: true
        },
        {
            id: 'trino',
            title: 'Trino (Presto)',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Engine de query SQL distribuído para big data analytics',
            keywords: ['trino', 'presto', 'sql engine', 'distributed queries', 'big data'],
            url: '/tecnologias/data-warehousing/trino/',
            trending: true,
            opensource: true
        },
        {
            id: 'clickhouse',
            title: 'ClickHouse',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Sistema de gerenciamento de banco de dados colunar para OLAP',
            keywords: ['clickhouse', 'columnar database', 'olap', 'analytics', 'real-time'],
            url: '/tecnologias/data-warehousing/clickhouse/',
            trending: true,
            opensource: true
        },
        {
            id: 'snowflake',
            title: 'Snowflake',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Data warehouse na nuvem com arquitetura única',
            keywords: ['snowflake', 'cloud data warehouse', 'scalable', 'analytics'],
            url: '/tecnologias/data-warehousing/snowflake/',
            trending: true,
            opensource: false
        },
        {
            id: 'google-bigquery',
            title: 'Google BigQuery',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Data warehouse serverless e altamente escalável do Google Cloud',
            keywords: ['google bigquery', 'serverless', 'data warehouse', 'gcp', 'analytics'],
            url: '/tecnologias/data-warehousing/google-bigquery/',
            trending: true,
            opensource: false
        },
        {
            id: 'amazon-redshift',
            title: 'Amazon Redshift',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Data warehouse na nuvem da Amazon Web Services',
            keywords: ['amazon redshift', 'aws', 'data warehouse', 'cloud', 'analytics'],
            url: '/tecnologias/data-warehousing/amazon-redshift/',
            trending: true,
            opensource: false
        },
        {
            id: 'databricks-sql',
            title: 'Databricks SQL',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Analytics SQL serverless na plataforma Databricks',
            keywords: ['databricks sql', 'serverless sql', 'analytics', 'spark'],
            url: '/tecnologias/data-warehousing/databricks-sql/',
            trending: true,
            opensource: false
        },
        {
            id: 'apache-drill',
            title: 'Apache Drill',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Engine SQL schema-free para exploração de big data',
            keywords: ['apache drill', 'schema-free', 'sql engine', 'big data exploration'],
            url: '/tecnologias/data-warehousing/apache-drill/',
            trending: false,
            opensource: true
        },
        {
            id: 'apache-phoenix',
            title: 'Apache Phoenix',
            category: 'data-warehousing',
            type: 'technology',
            description: 'Camada SQL sobre Apache HBase para aplicações OLTP',
            keywords: ['apache phoenix', 'sql', 'hbase', 'oltp', 'real-time'],
            url: '/tecnologias/data-warehousing/apache-phoenix/',
            trending: false,
            opensource: true
        },

        // Streaming
        {
            id: 'apache-kafka',
            title: 'Apache Kafka',
            category: 'streaming',
            type: 'technology',
            description: 'Plataforma de streaming distribuída para dados em tempo real',
            keywords: ['apache kafka', 'streaming', 'real-time', 'distributed', 'messaging'],
            url: '/tecnologias/streaming/apache-kafka/',
            trending: true,
            opensource: true
        },
        {
            id: 'apache-pulsar',
            title: 'Apache Pulsar',
            category: 'streaming',
            type: 'technology',
            description: 'Sistema de messaging distribuído cloud-native',
            keywords: ['apache pulsar', 'messaging', 'cloud-native', 'distributed', 'streaming'],
            url: '/tecnologias/streaming/apache-pulsar/',
            trending: true,
            opensource: true
        },
        {
            id: 'amazon-kinesis',
            title: 'Amazon Kinesis',
            category: 'streaming',
            type: 'technology',
            description: 'Plataforma para streaming de dados em tempo real na AWS',
            keywords: ['amazon kinesis', 'aws', 'streaming', 'real-time', 'analytics'],
            url: '/tecnologias/streaming/amazon-kinesis/',
            trending: true,
            opensource: false
        },
        {
            id: 'google-pubsub',
            title: 'Google Pub/Sub',
            category: 'streaming',
            type: 'technology',
            description: 'Serviço de messaging assíncrono do Google Cloud',
            keywords: ['google pubsub', 'gcp', 'messaging', 'asynchronous', 'real-time'],
            url: '/tecnologias/streaming/google-pubsub/',
            trending: true,
            opensource: false
        },
        {
            id: 'apache-nifi',
            title: 'Apache NiFi',
            category: 'streaming',
            type: 'technology',
            description: 'Sistema para automatizar fluxo de dados entre sistemas',
            keywords: ['apache nifi', 'data flow', 'automation', 'etl', 'integration'],
            url: '/tecnologias/streaming/apache-nifi/',
            trending: true,
            opensource: true
        },
        {
            id: 'streamsets',
            title: 'StreamSets',
            category: 'streaming',
            type: 'technology',
            description: 'Plataforma para construção de pipelines de dados em tempo real',
            keywords: ['streamsets', 'data pipelines', 'real-time', 'integration'],
            url: '/tecnologias/streaming/streamsets/',
            trending: true,
            opensource: false
        },
        {
            id: 'confluent',
            title: 'Confluent Platform',
            category: 'streaming',
            type: 'technology',
            description: 'Plataforma de streaming de dados baseada em Apache Kafka',
            keywords: ['confluent', 'kafka', 'streaming platform', 'real-time'],
            url: '/tecnologias/streaming/confluent/',
            trending: true,
            opensource: false
        },

        // Machine Learning
        {
            id: 'tensorflow',
            title: 'TensorFlow',
            category: 'machine-learning',
            type: 'technology',
            description: 'Plataforma open source para machine learning',
            keywords: ['tensorflow', 'machine learning', 'deep learning', 'neural networks', 'google'],
            url: '/tecnologias/machine-learning/tensorflow/',
            trending: true,
            opensource: true
        },
        {
            id: 'pytorch',
            title: 'PyTorch',
            category: 'machine-learning',
            type: 'technology',
            description: 'Framework de machine learning para Python',
            keywords: ['pytorch', 'machine learning', 'deep learning', 'python', 'facebook'],
            url: '/tecnologias/machine-learning/pytorch/',
            trending: true,
            opensource: true
        },
        {
            id: 'scikit-learn',
            title: 'Scikit-learn',
            category: 'machine-learning',
            type: 'technology',
            description: 'Biblioteca de machine learning para Python',
            keywords: ['scikit-learn', 'sklearn', 'machine learning', 'python', 'algorithms'],
            url: '/tecnologias/machine-learning/scikit-learn/',
            trending: true,
            opensource: true
        },
        {
            id: 'mlflow',
            title: 'MLflow',
            category: 'machine-learning',
            type: 'technology',
            description: 'Plataforma open source para gerenciar o ciclo de vida de ML',
            keywords: ['mlflow', 'ml lifecycle', 'model management', 'experiment tracking'],
            url: '/tecnologias/machine-learning/mlflow/',
            trending: true,
            opensource: true
        },
        {
            id: 'kubeflow',
            title: 'Kubeflow',
            category: 'machine-learning',
            type: 'technology',
            description: 'Plataforma de ML para Kubernetes',
            keywords: ['kubeflow', 'kubernetes', 'machine learning', 'ml platform'],
            url: '/tecnologias/machine-learning/kubeflow/',
            trending: true,
            opensource: true
        },
        {
            id: 'h2o-ai',
            title: 'H2O.ai',
            category: 'machine-learning',
            type: 'technology',
            description: 'Plataforma de machine learning e AI',
            keywords: ['h2o.ai', 'machine learning', 'artificial intelligence', 'automl'],
            url: '/tecnologias/machine-learning/h2o-ai/',
            trending: true,
            opensource: true
        },
        {
            id: 'apache-mahout',
            title: 'Apache Mahout',
            category: 'machine-learning',
            type: 'technology',
            description: 'Biblioteca de machine learning distribuído',
            keywords: ['apache mahout', 'machine learning', 'distributed', 'algorithms'],
            url: '/tecnologias/machine-learning/apache-mahout/',
            trending: false,
            opensource: true
        },
        {
            id: 'spark-mllib',
            title: 'Spark MLlib',
            category: 'machine-learning',
            type: 'technology',
            description: 'Biblioteca de machine learning do Apache Spark',
            keywords: ['spark mllib', 'apache spark', 'machine learning', 'distributed ml'],
            url: '/tecnologias/machine-learning/spark-mllib/',
            trending: true,
            opensource: true
        },

        // Orquestração
        {
            id: 'apache-airflow',
            title: 'Apache Airflow',
            category: 'orquestracao',
            type: 'technology',
            description: 'Plataforma para desenvolver, agendar e monitorar workflows',
            keywords: ['apache airflow', 'workflow', 'orchestration', 'scheduling', 'dag'],
            url: '/tecnologias/orquestracao/apache-airflow/',
            trending: true,
            opensource: true
        },
        {
            id: 'prefect',
            title: 'Prefect',
            category: 'orquestracao',
            type: 'technology',
            description: 'Plataforma moderna de orquestração de workflows',
            keywords: ['prefect', 'workflow orchestration', 'data pipelines', 'modern'],
            url: '/tecnologias/orquestracao/prefect/',
            trending: true,
            opensource: true
        },
        {
            id: 'dagster',
            title: 'Dagster',
            category: 'orquestracao',
            type: 'technology',
            description: 'Sistema de orquestração de dados com foco em desenvolvimento',
            keywords: ['dagster', 'data orchestration', 'data pipelines', 'development'],
            url: '/tecnologias/orquestracao/dagster/',
            trending: true,
            opensource: true
        },
        {
            id: 'luigi',
            title: 'Luigi',
            category: 'orquestracao',
            type: 'technology',
            description: 'Framework Python para construir pipelines de dados complexos',
            keywords: ['luigi', 'python', 'data pipelines', 'batch processing'],
            url: '/tecnologias/orquestracao/luigi/',
            trending: false,
            opensource: true
        },
        {
            id: 'apache-oozie',
            title: 'Apache Oozie',
            category: 'orquestracao',
            type: 'technology',
            description: 'Sistema de agendamento de workflows para Hadoop',
            keywords: ['apache oozie', 'hadoop', 'workflow scheduling', 'coordination'],
            url: '/tecnologias/orquestracao/apache-oozie/',
            trending: false,
            opensource: true
        },
        {
            id: 'kubernetes',
            title: 'Kubernetes',
            category: 'orquestracao',
            type: 'technology',
            description: 'Sistema de orquestração de containers',
            keywords: ['kubernetes', 'container orchestration', 'k8s', 'cloud native'],
            url: '/tecnologias/orquestracao/kubernetes/',
            trending: true,
            opensource: true
        },
        {
            id: 'docker',
            title: 'Docker',
            category: 'orquestracao',
            type: 'technology',
            description: 'Plataforma de containerização de aplicações',
            keywords: ['docker', 'containers', 'containerization', 'deployment'],
            url: '/tecnologias/orquestracao/docker/',
            trending: true,
            opensource: true
        },
        {
            id: 'apache-mesos',
            title: 'Apache Mesos',
            category: 'orquestracao',
            type: 'technology',
            description: 'Kernel distribuído para gerenciamento de recursos',
            keywords: ['apache mesos', 'resource management', 'distributed systems', 'cluster'],
            url: '/tecnologias/orquestracao/apache-mesos/',
            trending: false,
            opensource: true
        },

        // Visualização
        {
            id: 'apache-superset',
            title: 'Apache Superset',
            category: 'visualizacao',
            type: 'technology',
            description: 'Plataforma moderna de exploração e visualização de dados',
            keywords: ['apache superset', 'data visualization', 'dashboards', 'business intelligence'],
            url: '/tecnologias/visualizacao/apache-superset/',
            trending: true,
            opensource: true
        },
        {
            id: 'grafana',
            title: 'Grafana',
            category: 'visualizacao',
            type: 'technology',
            description: 'Plataforma de analytics e monitoramento',
            keywords: ['grafana', 'monitoring', 'analytics', 'dashboards', 'metrics'],
            url: '/tecnologias/visualizacao/grafana/',
            trending: true,
            opensource: true
        },
        {
            id: 'tableau',
            title: 'Tableau',
            category: 'visualizacao',
            type: 'technology',
            description: 'Plataforma de business intelligence e analytics',
            keywords: ['tableau', 'business intelligence', 'data visualization', 'analytics'],
            url: '/tecnologias/visualizacao/tableau/',
            trending: true,
            opensource: false
        },
        {
            id: 'power-bi',
            title: 'Microsoft Power BI',
            category: 'visualizacao',
            type: 'technology',
            description: 'Serviço de analytics empresarial da Microsoft',
            keywords: ['power bi', 'microsoft', 'business intelligence', 'analytics', 'dashboards'],
            url: '/tecnologias/visualizacao/power-bi/',
            trending: true,
            opensource: false
        },
        {
            id: 'qlik-sense',
            title: 'Qlik Sense',
            category: 'visualizacao',
            type: 'technology',
            description: 'Plataforma de analytics self-service',
            keywords: ['qlik sense', 'self-service analytics', 'data visualization', 'business intelligence'],
            url: '/tecnologias/visualizacao/qlik-sense/',
            trending: true,
            opensource: false
        },
        {
            id: 'looker',
            title: 'Looker',
            category: 'visualizacao',
            type: 'technology',
            description: 'Plataforma de business intelligence do Google Cloud',
            keywords: ['looker', 'google cloud', 'business intelligence', 'data platform'],
            url: '/tecnologias/visualizacao/looker/',
            trending: true,
            opensource: false
        },
        {
            id: 'metabase',
            title: 'Metabase',
            category: 'visualizacao',
            type: 'technology',
            description: 'Ferramenta open source de business intelligence',
            keywords: ['metabase', 'business intelligence', 'open source', 'dashboards'],
            url: '/tecnologias/visualizacao/metabase/',
            trending: true,
            opensource: true
        },
        {
            id: 'apache-zeppelin',
            title: 'Apache Zeppelin',
            category: 'visualizacao',
            type: 'technology',
            description: 'Notebook web para analytics interativo',
            keywords: ['apache zeppelin', 'notebook', 'interactive analytics', 'data science'],
            url: '/tecnologias/visualizacao/apache-zeppelin/',
            trending: false,
            opensource: true
        }
    ],

    courses: [
        {
            id: 'hadoop-fundamentals',
            title: 'Hadoop Fundamentals',
            category: 'hadoop',
            type: 'course',
            description: 'Curso completo sobre fundamentos do Apache Hadoop',
            keywords: ['hadoop', 'fundamentals', 'hdfs', 'mapreduce', 'yarn'],
            url: '/cursos/hadoop-fundamentals/',
            level: 'beginner',
            duration: '40 horas',
            price: 'free'
        },
        {
            id: 'apache-spark-essentials',
            title: 'Apache Spark Essentials',
            category: 'processamento',
            type: 'course',
            description: 'Aprenda Apache Spark do básico ao avançado',
            keywords: ['apache spark', 'big data', 'processing', 'scala', 'python'],
            url: '/cursos/apache-spark-essentials/',
            level: 'intermediate',
            duration: '60 horas',
            price: 'paid'
        },
        {
            id: 'kafka-streaming',
            title: 'Kafka Streaming Mastery',
            category: 'streaming',
            type: 'course',
            description: 'Domine Apache Kafka para streaming de dados',
            keywords: ['kafka', 'streaming', 'real-time', 'messaging'],
            url: '/cursos/kafka-streaming/',
            level: 'intermediate',
            duration: '45 horas',
            price: 'paid'
        },
        {
            id: 'delta-lake-essentials',
            title: 'Delta Lake Essentials',
            category: 'sistemas-arquivos',
            type: 'course',
            description: 'Construa data lakes modernos com Delta Lake',
            keywords: ['delta lake', 'data lake', 'lakehouse', 'spark'],
            url: '/cursos/delta-lake-essentials/',
            level: 'intermediate',
            duration: '35 horas',
            price: 'paid'
        },
        {
            id: 'hadoop-migration-guide',
            title: 'Hadoop Migration Guide',
            category: 'migracao',
            type: 'course',
            description: 'Guia completo para migração de Hadoop para tecnologias modernas',
            keywords: ['hadoop migration', 'modernization', 'cloud', 'alternatives'],
            url: '/cursos/hadoop-migration-guide/',
            level: 'advanced',
            duration: '50 horas',
            price: 'paid'
        }
    ],

    articles: [
        {
            id: 'hadoop-vs-spark',
            title: 'Hadoop vs Spark: Qual Escolher em 2025?',
            category: 'comparacao',
            type: 'article',
            description: 'Comparação detalhada entre Hadoop e Spark para projetos de Big Data',
            keywords: ['hadoop', 'spark', 'comparison', 'big data', '2025'],
            url: '/blog/hadoop-vs-spark-2025/',
            date: '2024-12-01'
        },
        {
            id: 'modern-data-stack',
            title: 'Modern Data Stack: Tendências 2025',
            category: 'tendencias',
            type: 'article',
            description: 'As principais tendências em tecnologias de dados para 2025',
            keywords: ['modern data stack', 'trends', '2025', 'data technologies'],
            url: '/blog/modern-data-stack-2025/',
            date: '2024-11-28'
        }
    ],

    sections: [
        {
            id: 'entrar-hadoop',
            title: 'Entrar no Hadoop',
            category: 'hadoop',
            type: 'section',
            description: 'Área dedicada para iniciantes em Hadoop',
            keywords: ['hadoop', 'iniciantes', 'aprender', 'começar'],
            url: '/entrar-hadoop/',
            color: 'red'
        },
        {
            id: 'sair-hadoop',
            title: 'Sair do Hadoop',
            category: 'alternativas',
            type: 'section',
            description: 'Alternativas modernas ao Hadoop',
            keywords: ['hadoop alternatives', 'migration', 'modern technologies'],
            url: '/sair-hadoop/',
            color: 'blue'
        },
        {
            id: 'tecnologias',
            title: 'Catálogo de Tecnologias',
            category: 'tecnologias',
            type: 'section',
            description: 'Mais de 50 tecnologias de Big Data catalogadas',
            keywords: ['technologies', 'big data', 'catalog', 'tools'],
            url: '/tecnologias/',
            color: 'green'
        },
        {
            id: 'cursos',
            title: 'Cursos e Treinamentos',
            category: 'educacao',
            type: 'section',
            description: 'Cursos especializados em tecnologias de Big Data',
            keywords: ['courses', 'training', 'education', 'learning'],
            url: '/cursos/',
            color: 'green'
        }
    ]
};

// Category mappings for better organization
const categoryMappings = {
    'sistemas-arquivos': {
        name: 'Sistemas de Arquivos',
        icon: 'fas fa-database',
        color: '#00ff00'
    },
    'processamento': {
        name: 'Processamento',
        icon: 'fas fa-cogs',
        color: '#00ff00'
    },
    'data-warehousing': {
        name: 'Data Warehousing',
        icon: 'fas fa-warehouse',
        color: '#00ff00'
    },
    'streaming': {
        name: 'Streaming',
        icon: 'fas fa-stream',
        color: '#00ff00'
    },
    'machine-learning': {
        name: 'Machine Learning',
        icon: 'fas fa-brain',
        color: '#00ff00'
    },
    'orquestracao': {
        name: 'Orquestração',
        icon: 'fas fa-project-diagram',
        color: '#00ff00'
    },
    'visualizacao': {
        name: 'Visualização',
        icon: 'fas fa-chart-bar',
        color: '#00ff00'
    },
    'hadoop': {
        name: 'Hadoop',
        icon: 'fas fa-elephant',
        color: '#ff0000'
    },
    'alternativas': {
        name: 'Alternativas',
        icon: 'fas fa-exchange-alt',
        color: '#0066ff'
    },
    'educacao': {
        name: 'Educação',
        icon: 'fas fa-graduation-cap',
        color: '#00ff00'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { searchIndex, categoryMappings };
}