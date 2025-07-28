/**
 * Courses Page Dynamic Content Handler
 * Portal Big Data - Matrix Theme
 */

// Sample courses data - this would typically come from a database or API
const coursesData = [
    {
        id: 'apache-spark-fundamentals',
        title: 'Apache Spark Fundamentals',
        description: 'Aprenda os fundamentos do Apache Spark para processamento distribuído de dados em larga escala.',
        category: 'processamento',
        level: 'intermediario',
        duration: '40 horas',
        price: 'gratuito',
        technologies: ['Apache Spark', 'Python', 'SQL'],
        prerequisites: ['Python básico', 'SQL básico'],
        instructor: 'João Silva',
        rating: 4.8,
        students: 1250,
        featured: true,
        image: '../assets/images/courses/spark-fundamentals.jpg',
        enrollmentUrl: 'https://example.com/spark-course'
    },
    {
        id: 'kafka-streaming-essentials',
        title: 'Kafka Streaming Essentials',
        description: 'Domine o Apache Kafka para streaming de dados em tempo real e arquiteturas orientadas a eventos.',
        category: 'streaming',
        level: 'intermediario',
        duration: '35 horas',
        price: 'pago',
        technologies: ['Apache Kafka', 'Java', 'Kafka Streams'],
        prerequisites: ['Java básico', 'Conceitos de sistemas distribuídos'],
        instructor: 'Maria Santos',
        rating: 4.9,
        students: 890,
        featured: true,
        image: '../assets/images/courses/kafka-essentials.jpg',
        enrollmentUrl: 'https://example.com/kafka-course'
    },
    {
        id: 'hadoop-fundamentals',
        title: 'Hadoop Fundamentals',
        description: 'Curso completo sobre os fundamentos do Apache Hadoop, desde conceitos básicos até implementação prática.',
        category: 'hadoop',
        level: 'iniciante',
        duration: '35 horas',
        price: 'gratuito',
        technologies: ['Apache Hadoop', 'HDFS', 'MapReduce', 'YARN', 'Hive', 'Pig'],
        prerequisites: ['Conhecimentos básicos de Linux', 'Programação básica (Java ou Python)'],
        instructor: 'Carlos Oliveira',
        rating: 4.7,
        students: 2850,
        featured: true,
        image: '../assets/images/courses/hadoop-fundamentals.jpg',
        enrollmentUrl: 'https://example.com/hadoop-fundamentals',
        detailedDescription: 'Este curso abrangente oferece uma introdução completa ao Apache Hadoop, a plataforma líder para processamento de Big Data. Você aprenderá desde os conceitos fundamentais até a implementação prática de soluções Hadoop.',
        learningObjectives: [
            'Compreender a arquitetura e componentes do ecossistema Hadoop',
            'Configurar e gerenciar clusters Hadoop',
            'Desenvolver aplicações MapReduce para processamento distribuído',
            'Utilizar HDFS para armazenamento distribuído de dados',
            'Trabalhar com Hive para consultas SQL em Big Data',
            'Implementar pipelines de dados com ferramentas do ecossistema'
        ],
        modules: [
            {
                title: 'Introdução ao Big Data e Hadoop',
                description: 'Conceitos fundamentais, história e casos de uso',
                duration: '4h',
                lessons: [
                    { title: 'O que é Big Data?', duration: '30min', type: 'video' },
                    { title: 'História do Apache Hadoop', duration: '25min', type: 'video' },
                    { title: 'Arquitetura do Hadoop', duration: '45min', type: 'video' },
                    { title: 'Casos de uso reais', duration: '35min', type: 'video' },
                    { title: 'Comparação com outras tecnologias', duration: '40min', type: 'video' }
                ],
                topics: ['Big Data', 'Hadoop Architecture', 'Use Cases', 'Distributed Systems'],
                quiz: { questions: 10, timeLimit: '15 min', passingScore: '70%' }
            },
            {
                title: 'HDFS - Hadoop Distributed File System',
                description: 'Sistema de arquivos distribuído do Hadoop',
                duration: '6h',
                lessons: [
                    { title: 'Arquitetura do HDFS', duration: '45min', type: 'video' },
                    { title: 'NameNode e DataNodes', duration: '40min', type: 'video' },
                    { title: 'Comandos básicos do HDFS', duration: '50min', type: 'hands-on' },
                    { title: 'Replicação e tolerância a falhas', duration: '35min', type: 'video' },
                    { title: 'Configuração e otimização', duration: '45min', type: 'hands-on' }
                ],
                topics: ['HDFS Architecture', 'NameNode', 'DataNode', 'Replication', 'Fault Tolerance'],
                exercises: 'Laboratório prático: Configurar HDFS e executar operações básicas',
                quiz: { questions: 12, timeLimit: '20 min', passingScore: '75%' }
            },
            {
                title: 'MapReduce Programming Model',
                description: 'Paradigma de programação para processamento distribuído',
                duration: '8h',
                lessons: [
                    { title: 'Conceitos do MapReduce', duration: '40min', type: 'video' },
                    { title: 'Função Map e Reduce', duration: '50min', type: 'video' },
                    { title: 'Primeiro programa MapReduce', duration: '60min', type: 'hands-on' },
                    { title: 'Otimização de jobs MapReduce', duration: '45min', type: 'video' },
                    { title: 'Debugging e monitoramento', duration: '40min', type: 'hands-on' }
                ],
                topics: ['MapReduce Paradigm', 'Map Function', 'Reduce Function', 'Job Optimization'],
                exercises: 'Desenvolver aplicação MapReduce para análise de logs',
                project: {
                    description: 'Criar sistema de análise de dados de vendas usando MapReduce',
                    estimatedTime: '4-6 horas',
                    difficulty: 'Intermediária'
                }
            }
        ]
    },
    {
        id: 'escolhendo-distribuicao-hadoop',
        title: 'Escolhendo a Distribuição Hadoop Certa',
        description: 'Guia completo para escolher a distribuição Hadoop mais adequada para seu projeto e organização.',
        category: 'hadoop',
        level: 'intermediario',
        duration: '25 horas',
        price: 'gratuito',
        technologies: ['Cloudera', 'Hortonworks', 'MapR', 'Amazon EMR', 'Google Dataproc', 'Azure HDInsight'],
        prerequisites: ['Conhecimentos básicos de Hadoop', 'Experiência com sistemas distribuídos'],
        instructor: 'Ana Costa',
        rating: 4.8,
        students: 1650,
        featured: true,
        image: '../assets/images/courses/hadoop-distributions.jpg',
        enrollmentUrl: 'https://example.com/hadoop-distributions',
        detailedDescription: 'Navegue pelo complexo mundo das distribuições Hadoop e aprenda a escolher a solução ideal para suas necessidades específicas. Este curso aborda as principais distribuições comerciais e open-source disponíveis no mercado.',
        learningObjectives: [
            'Comparar as principais distribuições Hadoop do mercado',
            'Avaliar critérios técnicos e comerciais para seleção',
            'Entender as diferenças entre soluções on-premise e cloud',
            'Planejar migração entre distribuições',
            'Calcular TCO (Total Cost of Ownership) de cada opção',
            'Implementar POCs para validação de distribuições'
        ],
        modules: [
            {
                title: 'Panorama das Distribuições Hadoop',
                description: 'Visão geral do mercado e principais players',
                duration: '3h',
                topics: ['Market Overview', 'Commercial vs Open Source', 'Vendor Landscape'],
                quiz: { questions: 8, timeLimit: '12 min', passingScore: '70%' }
            },
            {
                title: 'Distribuições Comerciais',
                description: 'Análise detalhada das soluções enterprise',
                duration: '8h',
                topics: ['Cloudera CDP', 'MapR', 'Acceldata', 'Support Models', 'Licensing'],
                exercises: 'Comparação hands-on entre Cloudera e outras distribuições'
            },
            {
                title: 'Soluções Cloud',
                description: 'Hadoop como serviço nos principais clouds',
                duration: '6h',
                topics: ['Amazon EMR', 'Google Dataproc', 'Azure HDInsight', 'Cost Analysis'],
                project: {
                    description: 'Implementar o mesmo workload em 3 plataformas cloud diferentes',
                    estimatedTime: '3-4 horas',
                    difficulty: 'Intermediária'
                }
            }
        ]
    },
    {
        id: 'primeiros-passos-hdfs-mapreduce',
        title: 'Primeiros Passos com HDFS e MapReduce',
        description: 'Curso prático focado em hands-on com HDFS e desenvolvimento de aplicações MapReduce.',
        category: 'hadoop',
        level: 'iniciante',
        duration: '28 horas',
        price: 'gratuito',
        technologies: ['HDFS', 'MapReduce', 'Java', 'Python', 'Hadoop Streaming'],
        prerequisites: ['Hadoop Fundamentals', 'Programação básica em Java ou Python'],
        instructor: 'Roberto Silva',
        rating: 4.6,
        students: 1890,
        featured: false,
        image: '../assets/images/courses/hdfs-mapreduce.jpg',
        enrollmentUrl: 'https://example.com/hdfs-mapreduce',
        detailedDescription: 'Curso intensivo e prático para dominar os componentes fundamentais do Hadoop: HDFS para armazenamento distribuído e MapReduce para processamento paralelo de dados.',
        learningObjectives: [
            'Dominar operações avançadas do HDFS',
            'Desenvolver aplicações MapReduce em Java e Python',
            'Otimizar performance de jobs MapReduce',
            'Implementar padrões comuns de processamento',
            'Monitorar e debuggar aplicações Hadoop',
            'Integrar HDFS com outras ferramentas do ecossistema'
        ],
        modules: [
            {
                title: 'HDFS Avançado',
                description: 'Operações avançadas e otimização do HDFS',
                duration: '8h',
                topics: ['Advanced HDFS Operations', 'Performance Tuning', 'Security', 'Backup Strategies'],
                exercises: 'Laboratório: Configuração avançada de cluster HDFS'
            },
            {
                title: 'MapReduce com Java',
                description: 'Desenvolvimento de aplicações MapReduce em Java',
                duration: '10h',
                topics: ['Java MapReduce API', 'Custom InputFormat', 'Combiners', 'Partitioners'],
                project: {
                    description: 'Sistema de análise de logs web com MapReduce Java',
                    estimatedTime: '5-7 horas',
                    difficulty: 'Intermediária'
                }
            },
            {
                title: 'MapReduce com Python',
                description: 'Hadoop Streaming e desenvolvimento em Python',
                duration: '6h',
                topics: ['Hadoop Streaming', 'Python MapReduce', 'MRJob Framework'],
                exercises: 'Converter aplicação Java para Python usando Streaming'
            }
        ]
    },
    {
        id: 'hadoop-ecosystem-overview',
        title: 'Hadoop Ecosystem Overview',
        description: 'Visão abrangente do ecossistema Hadoop e suas principais ferramentas e componentes.',
        category: 'hadoop',
        level: 'intermediario',
        duration: '32 horas',
        price: 'pago',
        technologies: ['Hive', 'Pig', 'HBase', 'Sqoop', 'Flume', 'Oozie', 'Zookeeper', 'Spark'],
        prerequisites: ['Hadoop Fundamentals', 'Experiência com HDFS e MapReduce'],
        instructor: 'Maria Santos',
        rating: 4.9,
        students: 1420,
        featured: true,
        image: '../assets/images/courses/hadoop-ecosystem.jpg',
        enrollmentUrl: 'https://example.com/hadoop-ecosystem',
        detailedDescription: 'Explore o rico ecossistema de ferramentas que complementam o Apache Hadoop, desde data warehousing com Hive até processamento em tempo real com Spark.',
        learningObjectives: [
            'Dominar as principais ferramentas do ecossistema Hadoop',
            'Integrar múltiplas ferramentas em pipelines de dados',
            'Escolher a ferramenta certa para cada caso de uso',
            'Implementar soluções end-to-end usando o ecossistema',
            'Otimizar performance de soluções integradas',
            'Gerenciar e monitorar pipelines complexos'
        ],
        modules: [
            {
                title: 'Data Warehousing com Hive',
                description: 'SQL sobre Hadoop com Apache Hive',
                duration: '8h',
                topics: ['Hive Architecture', 'HiveQL', 'Partitioning', 'Optimization'],
                exercises: 'Construir data warehouse dimensional com Hive'
            },
            {
                title: 'NoSQL com HBase',
                description: 'Banco de dados NoSQL distribuído',
                duration: '6h',
                topics: ['HBase Architecture', 'Data Modeling', 'API Usage', 'Performance'],
                exercises: 'Implementar sistema de recomendação com HBase'
            },
            {
                title: 'Ingestão de Dados',
                description: 'Sqoop e Flume para ingestão de dados',
                duration: '5h',
                topics: ['Sqoop Import/Export', 'Flume Agents', 'Real-time Ingestion'],
                exercises: 'Pipeline de ingestão de dados relacionais e streaming'
            },
            {
                title: 'Orquestração com Oozie',
                description: 'Workflow management para Hadoop',
                duration: '4h',
                topics: ['Oozie Workflows', 'Coordinators', 'Bundles', 'Scheduling'],
                project: {
                    description: 'Pipeline completo de ETL orquestrado com Oozie',
                    estimatedTime: '4-6 horas',
                    difficulty: 'Avançada'
                }
            }
        ]
    },
    {
        id: 'delta-lake-mastery',
        title: 'Delta Lake Mastery',
        description: 'Aprenda a implementar data lakes modernos com Delta Lake, ACID transactions e time travel.',
        category: 'sistemas-arquivos',
        level: 'avancado',
        duration: '45 horas',
        price: 'pago',
        technologies: ['Delta Lake', 'Apache Spark', 'Databricks'],
        prerequisites: ['Apache Spark intermediário', 'SQL avançado'],
        instructor: 'Ana Costa',
        rating: 4.9,
        students: 650,
        featured: true,
        image: '../assets/images/courses/delta-lake.jpg',
        enrollmentUrl: 'https://example.com/delta-course'
    },
    {
        id: 'clickhouse-analytics',
        title: 'ClickHouse para Analytics',
        description: 'Domine o ClickHouse para análises OLAP de alta performance e dashboards em tempo real.',
        category: 'data-warehousing',
        level: 'intermediario',
        duration: '25 horas',
        price: 'pago',
        technologies: ['ClickHouse', 'SQL', 'Grafana'],
        prerequisites: ['SQL intermediário', 'Conceitos de OLAP'],
        instructor: 'Pedro Lima',
        rating: 4.7,
        students: 420,
        featured: false,
        image: '../assets/images/courses/clickhouse.jpg',
        enrollmentUrl: 'https://example.com/clickhouse-course'
    },
    {
        id: 'airflow-orchestration',
        title: 'Apache Airflow para Orquestração',
        description: 'Aprenda a orquestrar pipelines de dados complexos com Apache Airflow e melhores práticas.',
        category: 'orquestracao',
        level: 'intermediario',
        duration: '30 horas',
        price: 'gratuito',
        technologies: ['Apache Airflow', 'Python', 'Docker'],
        prerequisites: ['Python intermediário', 'Conceitos de ETL'],
        instructor: 'Lucia Ferreira',
        rating: 4.8,
        students: 980,
        featured: false,
        image: '../assets/images/courses/airflow.jpg',
        enrollmentUrl: 'https://example.com/airflow-course'
    },
    {
        id: 'migracao-hadoop-spark',
        title: 'Migração de Hadoop para Spark',
        description: 'Guia completo para migrar workloads Hadoop MapReduce para Apache Spark com estratégias práticas e casos reais.',
        category: 'migracao',
        level: 'avancado',
        duration: '42 horas',
        price: 'pago',
        technologies: ['Apache Hadoop', 'Apache Spark', 'Scala', 'Python', 'YARN', 'Kubernetes'],
        prerequisites: ['Experiência sólida com Hadoop MapReduce', 'Conhecimentos básicos de Spark', 'Arquitetura de sistemas'],
        instructor: 'Roberto Alves',
        rating: 4.9,
        students: 485,
        featured: true,
        image: '../assets/images/courses/hadoop-to-spark.jpg',
        enrollmentUrl: 'https://example.com/hadoop-to-spark',
        detailedDescription: 'Este curso especializado oferece um roadmap completo para migrar aplicações Hadoop MapReduce para Apache Spark, incluindo estratégias de migração, otimização de performance e casos de uso reais.',
        learningObjectives: [
            'Planejar estratégias de migração de MapReduce para Spark',
            'Converter aplicações MapReduce existentes para Spark',
            'Otimizar performance de aplicações Spark migradas',
            'Implementar testes e validação de migração',
            'Gerenciar riscos e rollback durante a migração',
            'Treinar equipes para a nova tecnologia'
        ],
        modules: [
            {
                title: 'Análise de Workloads Existentes',
                description: 'Avaliação e categorização de aplicações MapReduce',
                duration: '8h',
                topics: ['Workload Analysis', 'Migration Assessment', 'Risk Evaluation', 'ROI Calculation'],
                exercises: 'Auditoria completa de cluster Hadoop existente'
            },
            {
                title: 'Estratégias de Migração',
                description: 'Abordagens e metodologias para migração segura',
                duration: '10h',
                topics: ['Migration Strategies', 'Phased Approach', 'Parallel Running', 'Testing Frameworks'],
                project: {
                    description: 'Plano de migração para aplicação MapReduce complexa',
                    estimatedTime: '6-8 horas',
                    difficulty: 'Avançada'
                }
            },
            {
                title: 'Conversão Prática MapReduce → Spark',
                description: 'Hands-on conversion de aplicações reais',
                duration: '12h',
                topics: ['Code Conversion', 'API Mapping', 'Performance Optimization', 'Memory Management'],
                exercises: 'Converter 5 aplicações MapReduce diferentes para Spark'
            },
            {
                title: 'Validação e Go-Live',
                description: 'Testes, validação e deployment em produção',
                duration: '8h',
                topics: ['Testing Strategies', 'Performance Validation', 'Monitoring', 'Rollback Plans'],
                project: {
                    description: 'Pipeline completo de CI/CD para aplicações Spark migradas',
                    estimatedTime: '4-6 horas',
                    difficulty: 'Avançada'
                }
            }
        ]
    },
    {
        id: 'alternativas-modernas-hadoop',
        title: 'Alternativas Modernas ao Hadoop',
        description: 'Explore as tecnologias mais modernas que estão substituindo o Hadoop em diferentes casos de uso.',
        category: 'migracao',
        level: 'intermediario',
        duration: '38 horas',
        price: 'pago',
        technologies: ['Apache Spark', 'Delta Lake', 'Apache Iceberg', 'Trino', 'ClickHouse', 'Kubernetes', 'MinIO'],
        prerequisites: ['Experiência com Hadoop', 'Conceitos de arquitetura de dados'],
        instructor: 'Ana Costa',
        rating: 4.8,
        students: 720,
        featured: true,
        image: '../assets/images/courses/modern-alternatives.jpg',
        enrollmentUrl: 'https://example.com/modern-alternatives',
        detailedDescription: 'Descubra as tecnologias de próxima geração que estão revolucionando o processamento de Big Data, oferecendo melhor performance, facilidade de uso e menor custo que o Hadoop tradicional.',
        learningObjectives: [
            'Comparar tecnologias modernas com Hadoop tradicional',
            'Implementar soluções com stacks modernas de Big Data',
            'Avaliar ROI e TCO de diferentes alternativas',
            'Projetar arquiteturas cloud-native para Big Data',
            'Implementar data lakes modernos com table formats',
            'Escolher a stack ideal para diferentes casos de uso'
        ],
        modules: [
            {
                title: 'Panorama das Tecnologias Modernas',
                description: 'Visão geral das alternativas disponíveis',
                duration: '6h',
                topics: ['Technology Landscape', 'Spark vs MapReduce', 'Cloud-Native Solutions', 'Cost Analysis'],
                quiz: { questions: 15, timeLimit: '25 min', passingScore: '75%' }
            },
            {
                title: 'Data Lakes Modernos',
                description: 'Delta Lake, Iceberg e Hudi como alternativas ao HDFS',
                duration: '10h',
                topics: ['Table Formats', 'ACID Transactions', 'Time Travel', 'Schema Evolution'],
                exercises: 'Implementar data lake com Delta Lake e comparar com HDFS'
            },
            {
                title: 'Query Engines Modernos',
                description: 'Trino, ClickHouse e outras alternativas ao Hive',
                duration: '8h',
                topics: ['Trino Architecture', 'ClickHouse OLAP', 'Performance Comparison', 'SQL Compatibility'],
                project: {
                    description: 'Migrar queries Hive para Trino com otimizações',
                    estimatedTime: '4-5 horas',
                    difficulty: 'Intermediária'
                }
            },
            {
                title: 'Orquestração Cloud-Native',
                description: 'Kubernetes e ferramentas modernas de orquestração',
                duration: '8h',
                topics: ['Kubernetes for Data', 'Airflow on K8s', 'Serverless Computing', 'Auto-scaling'],
                exercises: 'Deploy de pipeline Spark no Kubernetes'
            }
        ]
    },
    {
        id: 'delta-lake-usuarios-hadoop',
        title: 'Delta Lake para Usuários Hadoop',
        description: 'Aprenda Delta Lake com foco em profissionais vindos do ecossistema Hadoop, comparando conceitos e práticas.',
        category: 'sistemas-arquivos',
        level: 'intermediario',
        duration: '30 horas',
        price: 'pago',
        technologies: ['Delta Lake', 'Apache Spark', 'Databricks', 'Parquet', 'S3', 'HDFS'],
        prerequisites: ['Experiência com Hadoop/HDFS', 'Conhecimentos básicos de Spark', 'SQL intermediário'],
        instructor: 'Eduardo Lima',
        rating: 4.9,
        students: 650,
        featured: true,
        image: '../assets/images/courses/delta-lake-hadoop.jpg',
        enrollmentUrl: 'https://example.com/delta-lake-hadoop',
        detailedDescription: 'Curso especializado para profissionais Hadoop que desejam migrar para Delta Lake, com comparações diretas, casos de uso práticos e estratégias de migração.',
        learningObjectives: [
            'Compreender as vantagens do Delta Lake sobre HDFS',
            'Migrar dados de HDFS para Delta Lake',
            'Implementar ACID transactions em data lakes',
            'Utilizar time travel e versionamento de dados',
            'Otimizar performance com Z-ordering e compaction',
            'Integrar Delta Lake com ferramentas do ecossistema Spark'
        ],
        modules: [
            {
                title: 'HDFS vs Delta Lake: Comparação Detalhada',
                description: 'Diferenças arquiteturais e vantagens do Delta Lake',
                duration: '6h',
                topics: ['Architecture Comparison', 'ACID Properties', 'Schema Evolution', 'Performance Benefits'],
                exercises: 'Benchmark comparativo entre HDFS e Delta Lake'
            },
            {
                title: 'Migração de Dados HDFS → Delta Lake',
                description: 'Estratégias e ferramentas para migração',
                duration: '8h',
                topics: ['Migration Strategies', 'Data Conversion', 'Incremental Migration', 'Validation'],
                project: {
                    description: 'Migrar dataset Hadoop completo para Delta Lake',
                    estimatedTime: '5-7 horas',
                    difficulty: 'Intermediária'
                }
            },
            {
                title: 'Recursos Avançados do Delta Lake',
                description: 'Time travel, merge, e otimizações avançadas',
                duration: '10h',
                topics: ['Time Travel', 'Merge Operations', 'Z-Ordering', 'Auto Compaction'],
                exercises: 'Implementar pipeline CDC com Delta Lake merge'
            },
            {
                title: 'Governança e Monitoramento',
                description: 'Delta Lake em ambiente enterprise',
                duration: '6h',
                topics: ['Data Governance', 'Monitoring', 'Security', 'Multi-cluster Setup'],
                exercises: 'Configurar governança completa para data lake Delta'
            }
        ]
    },
    {
        id: 'estrategias-migracao-data-lakes',
        title: 'Estratégias de Migração de Data Lakes',
        description: 'Metodologias e melhores práticas para migrar data lakes Hadoop para arquiteturas modernas.',
        category: 'migracao',
        level: 'avancado',
        duration: '45 horas',
        price: 'pago',
        technologies: ['Hadoop', 'Apache Spark', 'Delta Lake', 'Apache Iceberg', 'AWS S3', 'Kubernetes', 'Terraform'],
        prerequisites: ['Experiência avançada com Hadoop', 'Arquitetura de dados', 'Conhecimentos de cloud'],
        instructor: 'Marcos Pereira',
        rating: 4.9,
        students: 380,
        featured: true,
        image: '../assets/images/courses/data-lake-migration.jpg',
        enrollmentUrl: 'https://example.com/data-lake-migration',
        detailedDescription: 'Curso avançado que aborda metodologias completas para migração de data lakes Hadoop para arquiteturas modernas, incluindo planejamento, execução e validação.',
        learningObjectives: [
            'Desenvolver estratégias completas de migração de data lakes',
            'Avaliar e mitigar riscos de migração',
            'Implementar migrações zero-downtime',
            'Validar integridade de dados durante migração',
            'Otimizar custos na nova arquitetura',
            'Treinar equipes para novas tecnologias'
        ],
        modules: [
            {
                title: 'Planejamento Estratégico de Migração',
                description: 'Metodologias e frameworks para planejamento',
                duration: '10h',
                topics: ['Migration Frameworks', 'Risk Assessment', 'Timeline Planning', 'Resource Allocation'],
                exercises: 'Desenvolver plano de migração para data lake de 100TB'
            },
            {
                title: 'Arquiteturas de Destino',
                description: 'Design de arquiteturas modernas de data lake',
                duration: '12h',
                topics: ['Modern Architectures', 'Cloud-Native Design', 'Multi-Cloud Strategies', 'Cost Optimization'],
                project: {
                    description: 'Projetar arquitetura completa de data lake moderno',
                    estimatedTime: '8-10 horas',
                    difficulty: 'Avançada'
                }
            },
            {
                title: 'Execução de Migração',
                description: 'Implementação prática de migração em fases',
                duration: '15h',
                topics: ['Phased Migration', 'Data Validation', 'Performance Testing', 'Rollback Procedures'],
                exercises: 'Executar migração completa em ambiente de laboratório'
            },
            {
                title: 'Pós-Migração e Otimização',
                description: 'Monitoramento, otimização e melhoria contínua',
                duration: '8h',
                topics: ['Performance Monitoring', 'Cost Optimization', 'Team Training', 'Continuous Improvement'],
                project: {
                    description: 'Implementar sistema de monitoramento pós-migração',
                    estimatedTime: '4-6 horas',
                    difficulty: 'Avançada'
                }
            }
        ]
    },
    {
        id: 'superset-visualization',
        title: 'Apache Superset para Visualização',
        description: 'Crie dashboards interativos e visualizações avançadas com Apache Superset.',
        category: 'visualizacao',
        level: 'iniciante',
        duration: '20 horas',
        price: 'gratuito',
        technologies: ['Apache Superset', 'SQL', 'Python'],
        prerequisites: ['SQL básico'],
        instructor: 'Fernanda Silva',
        rating: 4.5,
        students: 750,
        featured: false,
        image: '../assets/images/courses/superset.jpg',
        enrollmentUrl: 'https://example.com/superset-course'
    },
    {
        id: 'mlflow-machine-learning',
        title: 'MLflow para Machine Learning',
        description: 'Gerencie o ciclo de vida completo de modelos ML com MLflow e melhores práticas MLOps.',
        category: 'machine-learning',
        level: 'avancado',
        duration: '40 horas',
        price: 'pago',
        technologies: ['MLflow', 'Python', 'Scikit-learn', 'TensorFlow'],
        prerequisites: ['Python avançado', 'Machine Learning básico'],
        instructor: 'Daniel Costa',
        rating: 4.8,
        students: 540,
        featured: false,
        image: '../assets/images/courses/mlflow.jpg',
        enrollmentUrl: 'https://example.com/mlflow-course'
    },
    {
        id: 'flink-streaming-advanced',
        title: 'Apache Flink Streaming Avançado',
        description: 'Processamento de streams complexos com Apache Flink, state management e fault tolerance.',
        category: 'streaming',
        level: 'avancado',
        duration: '45 horas',
        price: 'pago',
        technologies: ['Apache Flink', 'Java', 'Kafka'],
        prerequisites: ['Java avançado', 'Streaming concepts'],
        instructor: 'Marcos Pereira',
        rating: 4.9,
        students: 380,
        featured: true,
        image: '../assets/images/courses/flink-advanced.jpg',
        enrollmentUrl: 'https://example.com/flink-course'
    },
    {
        id: 'trino-sql-analytics',
        title: 'Trino SQL para Analytics',
        description: 'Análise de dados distribuídos com Trino (ex-Presto) e otimização de queries SQL.',
        category: 'data-warehousing',
        level: 'intermediario',
        duration: '30 horas',
        price: 'gratuito',
        technologies: ['Trino', 'SQL', 'Hive'],
        prerequisites: ['SQL avançado', 'Conceitos de data warehouse'],
        instructor: 'Sandra Ribeiro',
        rating: 4.7,
        students: 560,
        featured: false,
        image: '../assets/images/courses/trino-sql.jpg',
        enrollmentUrl: 'https://example.com/trino-course'
    },
    {
        id: 'kubernetes-data-platform',
        title: 'Kubernetes para Plataformas de Dados',
        description: 'Deploy e gerenciamento de aplicações Big Data em Kubernetes com Helm e operators.',
        category: 'orquestracao',
        level: 'avancado',
        duration: '40 horas',
        price: 'pago',
        technologies: ['Kubernetes', 'Docker', 'Helm', 'Apache Spark'],
        prerequisites: ['Docker básico', 'Conceitos de containers'],
        instructor: 'Rafael Santos',
        rating: 4.8,
        students: 290,
        featured: false,
        image: '../assets/images/courses/k8s-data.jpg',
        enrollmentUrl: 'https://example.com/k8s-course'
    },
    {
        id: 'dbt-data-transformation',
        title: 'dbt para Transformação de Dados',
        description: 'Transformações de dados modernas com dbt, testes automatizados e documentação.',
        category: 'data-warehousing',
        level: 'intermediario',
        duration: '25 horas',
        price: 'gratuito',
        technologies: ['dbt', 'SQL', 'Snowflake', 'BigQuery'],
        prerequisites: ['SQL intermediário', 'Conceitos de ELT'],
        instructor: 'Camila Oliveira',
        rating: 4.6,
        students: 720,
        featured: false,
        image: '../assets/images/courses/dbt-transform.jpg',
        enrollmentUrl: 'https://example.com/dbt-course'
    },
    {
        id: 'iceberg-table-format',
        title: 'Apache Iceberg Table Format',
        description: 'Implementação de data lakes modernos com Apache Iceberg, schema evolution e time travel.',
        category: 'sistemas-arquivos',
        level: 'avancado',
        duration: '35 horas',
        price: 'pago',
        technologies: ['Apache Iceberg', 'Apache Spark', 'Trino'],
        prerequisites: ['Apache Spark intermediário', 'Conceitos de data lake'],
        instructor: 'Eduardo Lima',
        rating: 4.9,
        students: 180,
        featured: true,
        image: '../assets/images/courses/iceberg-format.jpg',
        enrollmentUrl: 'https://example.com/iceberg-course'
    }
];

// Global variables
let filteredCourses = [...coursesData];
let currentSort = 'relevance';
let searchSuggestions = [];
let autocompleteVisible = false;

/**
 * Initialize courses page
 */
document.addEventListener('DOMContentLoaded', function() {
    renderCourses();
    setupEventListeners();
    updateResultsCount();
});

/**
 * Setup event listeners for search and filters
 */
function setupEventListeners() {
    // Search input with autocomplete
    const searchInput = document.getElementById('courseSearch');
    searchInput.addEventListener('input', debounce(handleSearchInput, 200));
    searchInput.addEventListener('focus', showSearchSuggestions);
    searchInput.addEventListener('blur', hideSearchSuggestions);
    
    // Filter selects
    document.getElementById('categoryFilter').addEventListener('change', filterCourses);
    document.getElementById('levelFilter').addEventListener('change', filterCourses);
    document.getElementById('typeFilter').addEventListener('change', filterCourses);
    
    // Clear filters button
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);
    
    // Sort options
    document.querySelectorAll('input[name="sortOrder"]').forEach(radio => {
        radio.addEventListener('change', function() {
            currentSort = this.value;
            renderCourses();
        });
    });
    
    // Initialize autocomplete
    initializeAutocomplete();
}

/**
 * Initialize autocomplete functionality
 */
function initializeAutocomplete() {
    // Build search suggestions from course data
    searchSuggestions = [];
    
    coursesData.forEach(course => {
        // Add course titles
        searchSuggestions.push({
            text: course.title,
            type: 'course',
            category: course.category
        });
        
        // Add technologies
        course.technologies.forEach(tech => {
            if (!searchSuggestions.find(s => s.text.toLowerCase() === tech.toLowerCase())) {
                searchSuggestions.push({
                    text: tech,
                    type: 'technology',
                    category: course.category
                });
            }
        });
        
        // Add instructor names
        if (!searchSuggestions.find(s => s.text.toLowerCase() === course.instructor.toLowerCase())) {
            searchSuggestions.push({
                text: course.instructor,
                type: 'instructor',
                category: course.category
            });
        }
    });
    
    // Sort suggestions alphabetically
    searchSuggestions.sort((a, b) => a.text.localeCompare(b.text));
}

/**
 * Handle search input with autocomplete
 */
function handleSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (searchTerm.length >= 2) {
        showSearchSuggestions();
        updateSearchSuggestions(searchTerm);
    } else {
        hideSearchSuggestions();
    }
    
    filterCourses();
}

/**
 * Update search suggestions based on input
 */
function updateSearchSuggestions(searchTerm) {
    const suggestionsList = document.getElementById('searchSuggestions');
    if (!suggestionsList) return;
    
    const matchingSuggestions = searchSuggestions
        .filter(suggestion => suggestion.text.toLowerCase().includes(searchTerm))
        .slice(0, 8); // Limit to 8 suggestions
    
    if (matchingSuggestions.length === 0) {
        suggestionsList.innerHTML = '<div class="suggestion-item text-muted">Nenhuma sugestão encontrada</div>';
        return;
    }
    
    suggestionsList.innerHTML = matchingSuggestions
        .map(suggestion => {
            const typeIcon = {
                'course': '📚',
                'technology': '🛠️',
                'instructor': '👨‍🏫'
            };
            
            return `
                <div class="suggestion-item" onclick="selectSuggestion('${suggestion.text}')">
                    <span class="suggestion-icon">${typeIcon[suggestion.type]}</span>
                    <span class="suggestion-text">${suggestion.text}</span>
                    <small class="suggestion-type text-muted">${suggestion.type}</small>
                </div>
            `;
        })
        .join('');
}

/**
 * Show search suggestions dropdown
 */
function showSearchSuggestions() {
    let suggestionsList = document.getElementById('searchSuggestions');
    
    if (!suggestionsList) {
        // Create suggestions dropdown
        const searchContainer = document.getElementById('courseSearch').parentElement;
        searchContainer.style.position = 'relative';
        
        suggestionsList = document.createElement('div');
        suggestionsList.id = 'searchSuggestions';
        suggestionsList.className = 'search-suggestions';
        searchContainer.appendChild(suggestionsList);
    }
    
    suggestionsList.style.display = 'block';
    autocompleteVisible = true;
}

/**
 * Hide search suggestions dropdown
 */
function hideSearchSuggestions() {
    setTimeout(() => {
        const suggestionsList = document.getElementById('searchSuggestions');
        if (suggestionsList) {
            suggestionsList.style.display = 'none';
        }
        autocompleteVisible = false;
    }, 200);
}

/**
 * Select a suggestion from autocomplete
 */
function selectSuggestion(suggestionText) {
    document.getElementById('courseSearch').value = suggestionText;
    hideSearchSuggestions();
    filterCourses();
}

/**
 * Enhanced filter courses with improved search
 */
function filterCourses() {
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const levelFilter = document.getElementById('levelFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    filteredCourses = coursesData.filter(course => {
        // Enhanced search filter with relevance scoring
        let searchScore = 0;
        let matchesSearch = true;
        
        if (searchTerm) {
            matchesSearch = false;
            
            // Title match (highest priority)
            if (course.title.toLowerCase().includes(searchTerm)) {
                matchesSearch = true;
                searchScore += 10;
                if (course.title.toLowerCase().startsWith(searchTerm)) {
                    searchScore += 5;
                }
            }
            
            // Technology match (high priority)
            if (course.technologies.some(tech => tech.toLowerCase().includes(searchTerm))) {
                matchesSearch = true;
                searchScore += 8;
            }
            
            // Description match (medium priority)
            if (course.description.toLowerCase().includes(searchTerm)) {
                matchesSearch = true;
                searchScore += 5;
            }
            
            // Instructor match (low priority)
            if (course.instructor.toLowerCase().includes(searchTerm)) {
                matchesSearch = true;
                searchScore += 3;
            }
            
            // Category match (low priority)
            if (course.category.toLowerCase().includes(searchTerm)) {
                matchesSearch = true;
                searchScore += 2;
            }
        }
        
        // Store search score for sorting
        course.searchScore = searchScore;
        
        // Category filter
        const matchesCategory = !categoryFilter || course.category === categoryFilter;
        
        // Level filter
        const matchesLevel = !levelFilter || course.level === levelFilter;
        
        // Type filter
        const matchesType = !typeFilter || course.price === typeFilter;
        
        return matchesSearch && matchesCategory && matchesLevel && matchesType;
    });
    
    renderCourses();
    updateResultsCount();
}

/**
 * Clear all filters and search
 */
function clearAllFilters() {
    document.getElementById('courseSearch').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('levelFilter').value = '';
    document.getElementById('typeFilter').value = '';
    
    filteredCourses = [...coursesData];
    renderCourses();
    updateResultsCount();
}

/**
 * Sort courses based on selected criteria
 */
function sortCourses(courses) {
    switch (currentSort) {
        case 'name':
            return courses.sort((a, b) => a.title.localeCompare(b.title));
        case 'level':
            const levelOrder = { 'iniciante': 1, 'intermediario': 2, 'avancado': 3 };
            return courses.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
        case 'popularity':
            return courses.sort((a, b) => {
                if (a.students !== b.students) return b.students - a.students;
                return b.rating - a.rating;
            });
        case 'rating':
            return courses.sort((a, b) => {
                if (a.rating !== b.rating) return b.rating - a.rating;
                return b.students - a.students;
            });
        case 'duration':
            return courses.sort((a, b) => {
                const getDurationHours = (duration) => {
                    const match = duration.match(/(\d+)/);
                    return match ? parseInt(match[1]) : 0;
                };
                return getDurationHours(a.duration) - getDurationHours(b.duration);
            });
        case 'relevance':
        default:
            return courses.sort((a, b) => {
                // If there's a search term, use search score
                const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
                if (searchTerm && (a.searchScore || b.searchScore)) {
                    const scoreA = a.searchScore || 0;
                    const scoreB = b.searchScore || 0;
                    if (scoreA !== scoreB) return scoreB - scoreA;
                }
                
                // Featured courses first
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                
                // Then by rating and student count
                if (a.rating !== b.rating) return b.rating - a.rating;
                return b.students - a.students;
            });
    }
}

/**
 * Render courses grid
 */
function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredCourses.length === 0) {
        coursesGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    const sortedCourses = sortCourses([...filteredCourses]);
    
    coursesGrid.innerHTML = sortedCourses.map(course => createCourseCard(course)).join('');
}

/**
 * Create course card HTML
 */
function createCourseCard(course) {
    const levelBadgeClass = {
        'iniciante': 'bg-success',
        'intermediario': 'bg-warning text-dark',
        'avancado': 'bg-danger'
    };
    
    const priceBadgeClass = course.price === 'gratuito' ? 'bg-success' : 'bg-primary';
    const priceText = course.price === 'gratuito' ? 'Gratuito' : 'Pago';
    
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card course-card h-100">
                ${course.featured ? '<div class="ribbon">⭐ Destaque</div>' : ''}
                <div class="card-header d-flex justify-content-between align-items-start">
                    <div>
                        <h5 class="card-title mb-2">${course.title}</h5>
                        <div class="course-badges">
                            <span class="badge ${levelBadgeClass[course.level]} me-1">${capitalizeFirst(course.level)}</span>
                            <span class="badge ${priceBadgeClass}">${priceText}</span>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">${course.description}</p>
                    
                    <div class="course-meta mb-3">
                        <small class="text-muted d-block">
                            <strong>⏱️ Duração:</strong> ${course.duration}
                        </small>
                        <small class="text-muted d-block">
                            <strong>👨‍🏫 Instrutor:</strong> ${course.instructor}
                        </small>
                        <small class="text-muted d-block">
                            <strong>🎯 Pré-requisitos:</strong> ${course.prerequisites.join(', ')}
                        </small>
                    </div>
                    
                    <div class="technologies-tags mb-3">
                        ${course.technologies.map(tech => 
                            `<span class="badge bg-info me-1 mb-1">${tech}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="course-stats d-flex justify-content-between align-items-center mb-3">
                        <div class="rating">
                            <span class="text-warning">${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5 - Math.floor(course.rating))}</span>
                            <small class="text-muted">${course.rating}</small>
                        </div>
                        <small class="text-muted">👥 ${course.students.toLocaleString()} alunos</small>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-grid gap-2">
                        <a href="${course.enrollmentUrl}" class="btn btn-primary" target="_blank">
                            📚 Inscrever-se
                        </a>
                        <button class="btn btn-outline-secondary btn-sm" onclick="showCourseDetails('${course.id}')">
                            ℹ️ Mais Informações
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update results count display
 */
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    const total = filteredCourses.length;
    const totalCourses = coursesData.length;
    
    if (total === totalCourses) {
        resultsCount.textContent = `Exibindo todos os ${total} cursos disponíveis`;
    } else {
        resultsCount.textContent = `Exibindo ${total} de ${totalCourses} cursos`;
    }
}

/**
 * Show course details modal
 */
function showCourseDetails(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    // Create modal HTML
    const modalHtml = `
        <div class="modal fade" id="courseModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-success">
                    <div class="modal-header border-success">
                        <h5 class="modal-title">${course.title}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-8">
                                <h6>📋 Descrição Completa</h6>
                                <p>${course.description}</p>
                                
                                <h6>🎯 Pré-requisitos</h6>
                                <ul>
                                    ${course.prerequisites.map(req => `<li>${req}</li>`).join('')}
                                </ul>
                                
                                <h6>🛠️ Tecnologias Abordadas</h6>
                                <div class="mb-3">
                                    ${course.technologies.map(tech => 
                                        `<span class="badge bg-info me-1 mb-1">${tech}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h6>📊 Informações do Curso</h6>
                                        <table class="table table-sm table-dark">
                                            <tr><td><strong>Nível:</strong></td><td>${capitalizeFirst(course.level)}</td></tr>
                                            <tr><td><strong>Duração:</strong></td><td>${course.duration}</td></tr>
                                            <tr><td><strong>Preço:</strong></td><td>${course.price === 'gratuito' ? 'Gratuito' : 'Pago'}</td></tr>
                                            <tr><td><strong>Instrutor:</strong></td><td>${course.instructor}</td></tr>
                                            <tr><td><strong>Avaliação:</strong></td><td>${course.rating} ⭐</td></tr>
                                            <tr><td><strong>Alunos:</strong></td><td>${course.students.toLocaleString()}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-success">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <a href="${course.enrollmentUrl}" class="btn btn-primary" target="_blank">📚 Inscrever-se</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('courseModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();
    
    // Clean up modal after it's hidden
    document.getElementById('courseModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Utility function to capitalize first letter
 */
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Debounce function for search input
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions available globally
window.clearAllFilters = clearAllFilters;
window.selectSuggestion = selectSuggestion;