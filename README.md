# Portal Big Data - hadoop.com.br

Portal completo sobre Hadoop, suas distribuições, tecnologias relacionadas e alternativas modernas. Com um tema inspirado no filme Matrix, o portal oferece uma experiência única onde os usuários podem escolher entre mergulhar profundamente no universo Hadoop ou explorar o ecossistema mais amplo de Big Data.

## 🎯 Conceito

O portal é baseado na metáfora das pílulas do Matrix:

- **🟢 Pílula Verde (Entrar no Hadoop)**: Para quem quer aprender e adotar Hadoop
- **🔵 Pílula Azul (Sair do Hadoop)**: Para quem busca alternativas modernas

## 🚀 Funcionalidades

### Seção "Entrar no Hadoop"
- Introdução completa ao Hadoop
- Guia de distribuições (Cloudera, Acceldata, etc.)
- Primeiros passos e tutoriais
- Casos de uso práticos
- Roadmap de aprendizado

### Seção "Sair do Hadoop"
- Alternativas modernas (Spark, Databricks, Snowflake, etc.)
- Guias de migração detalhados
- Comparações técnicas
- Stacks modernas recomendadas
- Calculadora de ROI

### Catálogo de Tecnologias
- **Processamento**: Apache Spark, Flink, Storm, Beam
- **Armazenamento**: Delta Lake, Iceberg, MinIO, S3
- **Analytics**: Trino, ClickHouse, Snowflake
- **Streaming**: Kafka, Pulsar, Kinesis
- **ML**: TensorFlow, MLflow, Kubeflow
- **Orquestração**: Airflow, Prefect, Dagster
- **Visualização**: Superset, Grafana, Tableau

## 🎨 Design

- **Tema Matrix**: Fundo escuro, texto verde, tipografia Courier
- **Responsivo**: Compatível com desktop e mobile
- **Acessível**: Seguindo padrões WCAG
- **Interativo**: Calculadoras, comparações e filtros

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Framework CSS**: Bootstrap 5.3
- **Fontes**: Courier Prime (Google Fonts)
- **Ícones**: Font Awesome
- **Tema**: Matrix-inspired custom CSS

## 📁 Estrutura do Projeto

```
├── assets/
│   ├── css/
│   │   └── matrix-theme.css
│   └── js/
│       ├── main.js
│       ├── theme-toggle.js
│       └── ...
├── entrar-hadoop/
│   ├── introducao/
│   ├── distribuicoes/
│   ├── primeiros-passos/
│   └── roadmap/
├── sair-hadoop/
│   ├── alternativas/
│   ├── migracao/
│   ├── comparacoes/
│   └── stacks-modernas/
├── tecnologias/
│   ├── processamento/
│   ├── streaming/
│   ├── armazenamento/
│   └── ...
├── cursos/
├── blog/
└── index.html
```

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/binhara/hadoop.com.br.git
```

2. Abra o arquivo `index.html` em um servidor web local ou navegador

3. Para desenvolvimento local, recomenda-se usar um servidor HTTP simples:
```bash
# Python 3
python -m http.server 8080

# Node.js (http-server)
npx http-server -p 8080
```

4. Acesse: `http://localhost:8080`

## 📱 Páginas Principais

- **Homepage**: `/` - Escolha entre as duas pílulas
- **Entrar no Hadoop**: `/entrar-hadoop/` - Guias para iniciantes
- **Sair do Hadoop**: `/sair-hadoop/` - Alternativas modernas
- **Tecnologias**: `/tecnologias/` - Catálogo completo
- **Cursos**: `/cursos/` - Treinamentos especializados
- **Blog**: `/blog/` - Artigos e novidades

## 🎯 Público-Alvo

- **Iniciantes**: Profissionais começando com Big Data
- **Experientes**: Arquitetos avaliando migração
- **Estudantes**: Aprendendo tecnologias de dados
- **Empresas**: Decidindo sobre stack tecnológica

## 🔄 Atualizações Recentes

- ✅ Sistema de theme toggle desabilitado (tema Matrix fixo)
- ✅ Páginas de comparação com calculadora de ROI
- ✅ Integração de novas plataformas (Snowflake, Databricks, Gaio Data OS)
- ✅ Melhorias de contraste e acessibilidade
- ✅ Navegação completa entre seções

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Autor**: binhara
- **Email**: binhara@gmail.com
- **GitHub**: [@binhara](https://github.com/binhara)
- **Website**: [hadoop.com.br](https://hadoop.com.br)

---

**Escolha sua pílula e explore o universo do Big Data! 🟢🔵**