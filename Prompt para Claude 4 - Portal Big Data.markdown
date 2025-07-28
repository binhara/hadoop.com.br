# Prompt Detalhado para Claude 4: Criação de um Portal de Big Data

Você foi encarregado de criar um plano detalhado e a estrutura para um portal de Big Data a ser hospedado em domino hadoop.com.br. O portal tem como objetivo atrair profissionais que trabalham com tecnologias de Big Data, abrangendo soluções comerciais e de código aberto. Ele deve ter um tema único inspirado no filme *Matrix*, com um conceito de "pílulas" onde os usuários podem escolher "entrar" (explorar Hadoop) ou "sair" (visão geral ou outras tecnologias), simbolizando seu engajamento com a tecnologia.

## Requisitos de Conteúdo

### 1. Seção Hadoop
- **História do Hadoop**: Forneça uma história abrangente do Hadoop, desde sua criação em 2006 por Doug Cutting e Mike Cafarella, inspirada nos artigos do Google sobre MapReduce e GFS, até sua evolução em 2025. Destaque marcos como o desenvolvimento do HDFS e YARN, e a relevância atual frente a alternativas modernas.
- **Distribuições Hadoop**: Liste e descreva as distribuições Hadoop em 2025, incluindo:
  - **Cloudera**: Uma das principais distribuições comerciais, com foco em integração e suporte empresarial.
  - **Hortonworks**: Se ainda relevante ou fundida com Cloudera, detalhe sua história e status.
  - **MapR**: Discuta sua abordagem convergente para dados.
  - **Acceldata Open Data Platform** ([https://www.acceldata.io/hadoop](https://www.acceldata.io/hadoop)): Uma solução para modernizar Hadoop, com ferramentas como Pulse para observabilidade e otimização de recursos.
  - **Clemlab OpenSource Data Platform** ([https://opensourcedataplatform.com/](https://opensourcedataplatform.com/)): Uma distribuição 100% open-source gerenciada por Apache Ambari, com foco nas versões mais recentes.
- **Alternativas ao Hadoop**: Discuta tecnologias que complementam ou substituem o Hadoop, como:
  - Apache Spark (processamento em memória).
  - Apache Flink (streaming e processamento).
  - Apache Kafka (mensageria e streaming).
  - Trino (consultas SQL distribuídas).
  - Soluções em nuvem como Amazon EMR, Google Cloud Dataproc e Microsoft Azure HDInsight.

### 2. Tecnologias de Big Data
Crie seções para diferentes categorias de tecnologias de Big Data, com visões gerais, características, casos de uso e comparações relevantes para 2025:
- **Sistemas de Arquivos Distribuídos**:
  - HDFS: Sistema de arquivos do Hadoop, escalável para grandes volumes.
  - Ceph: Solução de armazenamento distribuído open-source.
  - GlusterFS: Sistema de arquivos escalável para clusters.
  - MinIO: Armazenamento de objetos de alto desempenho, compatível com S3.
- **Sistemas de Processamento Distribuído**:
  - MapReduce: Modelo de processamento do Hadoop.
  - Apache Spark: Framework rápido para processamento em memória.
  - Apache Flink: Ideal para streaming e processamento em tempo real.
- **Data Warehousing**:
  - Hive: Data warehouse para Hadoop.
  - Impala: Consultas SQL rápidas em Hadoop.
  - Snowflake: Solução em nuvem para data warehousing.
- **Processamento de Streaming**:
  - Apache Kafka: Plataforma de mensageria e streaming.
  - Apache Flink: Processamento de streaming em tempo real.
  - Amazon Kinesis: Solução em nuvem para streaming.
- **Machine Learning**:
  - TensorFlow: Framework para machine learning.
  - PyTorch: Popular para pesquisa e produção.
  - MLflow: Gerenciamento de ciclo de vida de ML.

### 3. Cursos e Treinamentos
Inclua uma seção dedicada a cursos para profissionais de Big Data, com descrições breves e links para mais informações ou inscrição:
- **Modelagem para Projetos de Dados (BI, Analytics...)**: Aborda modelagem de dados (conceitual, lógica, física), esquemas estrela e floco de neve, governança, qualidade e ferramentas como dbt, SQL, Qlik e Power BI.
- **MinIO**: Curso sobre armazenamento de objetos, incluindo instalação, configuração, segurança e integração com Spark, Hadoop e Airflow.
- **Delta Lake**: Focado em data lakes confiáveis, com transações ACID, gerenciamento de dados e integração com Spark e dbt.
- **Apache Spark**: Ensina RDDs, DataFrames, streaming, MLlib e implantação em produção.
- **Apache Airflow**: Cobre orquestração de workflows, criação de DAGs, operadores, monitoramento e boas práticas.
- **Debezium**: Explora Change Data Capture (CDC) com integração em bancos como MySQL e PostgreSQL, e Kafka.
- **dbt (Data Build Tool)**: Focado em transformação de dados, modelagem SQL, testes e documentação.
- **Trino**: Curso sobre consultas SQL distribuídas, com conectores para várias fontes de dados.
- **Amundsen**: Aborda catalogação de dados, descoberta e governança de metadados.
- **Outros Cursos**: Inclua cursos sobre ClickHouse (banco de dados analítico), Gaio Data OS (plataforma de dados) e outras tecnologias relevantes.

### 4. Artigos Patrocinados e Banners
- **Artigos Patrocinados**: Designe áreas para conteúdo patrocinado, claramente marcadas como tal, com artigos de empresas ou fornecedores.
- **Banners**: Inclua espaços para banners de sites parceiros:
  - [www.dssbr.com.br](https://www.dssbr.com.br)
  - [www.gubigdata.com.br](https://www.gubigdata.com.br)
  - [www.oworkshop.com.br](https://www.oworkshop.com.br)
- Posicione banners em locais estratégicos, como barras laterais, rodapé ou seções específicas.

### 5. Tema Matrix
- Implemente um tema inspirado no *Matrix*, com uma página inicial que apresenta a escolha entre a "pílula vermelha" (mergulho profundo no Hadoop) e a "pílula azul" (visão geral ou saída para outras tecnologias).
- Use elementos visuais como fundo escuro e texto verde para reforçar o tema.

### 6. Stacks Open-Source para Substituir Hadoop
Destaque stacks open-source que podem substituir ou complementar o Hadoop:
- **MinIO**: Armazenamento de objetos compatível com S3, ideal para data lakes.
- **Delta Lake**: Camada de armazenamento para data lakes com transações ACID.
- **Apache Spark**: Processamento distribuído em memória, mais rápido que MapReduce.
- **Apache Airflow**: Orquestração de pipelines de dados.
- **dbt**: Transformação e modelagem de dados com SQL.
- **Trino**: Consultas SQL distribuídas em grandes conjuntos de dados.
- **Amundsen**: Catálogo de dados para descoberta e governança.

## Requisitos Técnicos

### 1. Framework de Frontend
- Use **Bootstrap 5.3** ([https://getbootstrap.com/docs/5.3/](https://getbootstrap.com/docs/5.3/)) para todo o desenvolvimento do frontend.
- Garanta compatibilidade total com **Bootstrap Studio** para facilitar edição e manutenção.

### 2. Diretrizes de Design
- Utilize apenas componentes nativos do Bootstrap (ex.: `navbar`, `cards`, `modals`).
- Mantenha o CSS mínimo, organizado em um arquivo `custom.css`, evitando CSS inline.
- Implemente um sistema de grid responsivo (ex.: `container`, `row`, `col`) para acessibilidade em dispositivos móveis e desktops.
- Evite Tailwind CSS e JavaScript complexo. Se necessário, use JavaScript simples e bem documentado.

### 3. Qualidade do Código
- Adicione comentários detalhados no código HTML e CSS para facilitar edições futuras.

## Estrutura de Arquivos

Organize o conteúdo em uma estrutura de arquivos clara e escalável:

| **Pasta/Arquivo** | **Descrição** |
|-------------------|---------------|
| `index.html` | Página inicial com tema *Matrix* e escolha de pílulas. |
| `about-hadoop.html` | História, distribuições e alternativas do Hadoop. |
| `technologies.html` | Visão geral das tecnologias de Big Data. |
| `courses.html` | Lista de cursos com descrições e links. |
| `sponsors.html` | Artigos patrocinados e banners. |
| `blog.html` | Blog com tutoriais, estudos de caso e novidades. |
| `contact.html` | Formulário de contato. |
| `technologies/distributed-file-systems.html` | HDFS, MinIO, Ceph, etc. |
| `technologies/distributed-processing.html` | MapReduce, Spark, Flink, etc. |
| `technologies/data-warehousing.html` | Hive, Impala, Snowflake, etc. |
| `technologies/streaming.html` | Kafka, Flink, Kinesis, etc. |
| `technologies/machine-learning.html` | TensorFlow, PyTorch, MLflow, etc. |
| `courses/modelagem-dados.html` | Curso de modelagem de dados. |
| `courses/minio.html` | Curso sobre MinIO. |
| `courses/delta-lake.html` | Curso sobre Delta Lake. |
| `courses/apache-spark.html` | Curso sobre Apache Spark. |
| `courses/apache-airflow.html` | Curso sobre Apache Airflow. |
| `courses/debezium.html` | Curso sobre Debezium. |
| `courses/dbt.html` | Curso sobre dbt. |
| `courses/trino.html` | Curso sobre Trino. |
| `courses/amundsen.html` | Curso sobre Amundsen. |
| `resources/css/custom.css` | Estilos personalizados para o tema *Matrix*. |
| `resources/js/main.js` | JavaScript simples, se necessário. |
| `resources/images/` | Imagens, como fundo *Matrix*. |

## Exemplo de Código

### Página Inicial (index.html)
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Big Data</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="resources/css/custom.css" rel="stylesheet">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Big Data Portal</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="about-hadoop.html">Hadoop</a></li>
                    <li class="nav-item"><a class="nav-link" href="technologies.html">Tecnologias</a></li>
                    <li class="nav-item"><a class="nav-link" href="courses.html">Cursos</a></li>
                    <li class="nav-item"><a class="nav-link" href="sponsors.html">Patrocinadores</a></li>
                    <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contato</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-matrix text-center py-5">
        <div class="container">
            <h1>Bem-vindo ao Portal Big Data</h1>
            <p>Escolha sua pílula: mergulhe no universo do Hadoop ou explore outras tecnologias.</p>
            <a href="about-hadoop.html" class="btn btn-danger mx-2">Pílula Vermelha</a>
            <a href="technologies.html" class="btn btn-primary mx-2">Pílula Azul</a>
        </div>
    </section>

    <!-- Banner Section -->
    <section class="container my-5">
        <div class="row">
            <div class="col-md-4">
                <a href="https://www.dssbr.com.br"><img src="resources/images/dssbr-banner.jpg" class="img-fluid" alt="DSSBR"></a>
            </div>
            <div class="col-md-4">
                <a href="https://www.gubigdata.com.br"><img src="resources/images/gubigdata-banner.jpg" class="img-fluid" alt="GuBigData"></a>
            </div>
            <div class="col-md-4">
                <a href="https://www.oworkshop.com.br"><img src="resources/images/oworkshop-banner.jpg" class="img-fluid" alt="OWorkshop"></a>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### CSS Personalizado (custom.css)
```css
/* Tema Matrix */
body {
    background-color: #0a0a0a;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
}

/* Hero Section */
.hero-matrix {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('../images/matrix-bg.jpg');
    background-size: cover;
    color: #00ff00;
}

/* Responsividade */
@media (max-width: 768px) {
    .hero-matrix h1 {
        font-size: 1.5rem;
    }
}
```

## Sugestões Adicionais
- **Fórum da Comunidade**: Adicione uma seção interativa com `accordion` do Bootstrap para FAQs ou discussões.
- **Newsletter**: Inclua um formulário de inscrição para atualizações, usando um `form` do Bootstrap.
- **Integração com APIs**: Considere exibir estatísticas em tempo real (ex.: adoção de tecnologias) com chamadas simples de API.

## Mapa do Site

| **Seção** | **Subseções** | **Descrição** |
|-----------|---------------|---------------|
| Página Inicial | - | Tema *Matrix* com escolha de pílulas, introdução e destaques. |
| Sobre Hadoop | História, Distribuições, Alternativas | Evolução do Hadoop, distribuições (Cloudera, Acceldata, Clemlab) e alternativas (Spark, Flink). |
| Tecnologias de Big Data | Sistemas de Arquivos, Processamento, Data Warehousing, Streaming, Machine Learning | Detalhes sobre HDFS, Spark, Snowflake, Kafka, TensorFlow, etc. |
| Cursos e Treinamentos | Lista de Cursos | Cursos como MinIO, Delta Lake, Spark, com links para inscrição. |
| Conteúdo Patrocinado | - | Artigos patrocinados e banners de parceiros. |
| Blog e Recursos | Tutoriais, Estudos de Caso, Novidades | Conteúdo sobre tendências em Big Data para 2025. |
| Contato | - | Formulário de contato e informações para parcerias. |

## Referências
- [Apache Hadoop](https://hadoop.apache.org/)
- [Acceldata Open Data Platform](https://www.acceldata.io/hadoop)
- [Clemlab OpenSource Data Platform](https://opensourcedataplatform.com/)
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/)
- [Tendências em Big Data](https://www.techtarget.com/searchdatamanagement/feature/15-big-data-tools-and-technologies-to-know-about)