# Sistema de Sugestões Inteligentes - Portal Big Data

## Visão Geral

O Sistema de Sugestões Inteligentes é um componente avançado que fornece recomendações personalizadas de conteúdo baseadas no comportamento do usuário, tecnologias visualizadas e caminhos de aprendizado.

## Funcionalidades Principais

### 1. Algoritmo de Recomendação de Conteúdo
- **Tecnologias Relacionadas**: Sugere tecnologias complementares, alternativas e relacionadas
- **Baseado em Categoria**: Recomenda conteúdo popular na mesma categoria
- **Personalizado**: Usa histórico de visualizações para sugestões personalizadas
- **Cursos Relacionados**: Sugere cursos baseados nas tecnologias visualizadas

### 2. Sistema de "Próximos Passos" no Aprendizado
- **Caminhos de Aprendizado**: Define jornadas estruturadas para diferentes perfis
- **Progressão Automática**: Identifica automaticamente o próximo passo baseado no progresso
- **Múltiplos Caminhos**: Suporte para diferentes jornadas (iniciante Hadoop, migração, etc.)

### 3. Sugestões Baseadas em Tecnologias Relacionadas
- **Matriz de Relacionamentos**: Define relacionamentos entre tecnologias
- **Alternativas**: Sugere tecnologias alternativas para casos de uso similares
- **Complementares**: Recomenda tecnologias que funcionam bem juntas
- **Pré-requisitos**: Identifica conhecimentos necessários

### 4. Sugestões de Cursos Baseadas no Conteúdo Visualizado
- **Matching Inteligente**: Correlaciona tecnologias visualizadas com cursos disponíveis
- **Filtragem por Nível**: Considera o nível de experiência inferido do usuário
- **Evita Duplicatas**: Não sugere cursos já visualizados ou inscritos

## Componentes Técnicos

### Estrutura de Dados

#### User Interactions
```javascript
{
    viewedPages: [
        {
            url: "/tecnologias/processamento/apache-spark/",
            timestamp: 1703123456789,
            type: "technology",
            category: "processamento",
            technology: "apache-spark"
        }
    ],
    searchQueries: ["spark", "kafka"],
    clickedSuggestions: [],
    enrolledCourses: [],
    preferences: {
        level: "intermediate",
        categories: [
            { name: "processamento", count: 5, lastViewed: 1703123456789 }
        ],
        technologies: [
            { name: "apache-spark", count: 3, lastViewed: 1703123456789 }
        ]
    }
}
```

#### Content Relationships
```javascript
{
    'apache-spark': {
        related: ['apache-flink', 'databricks', 'delta-lake'],
        alternatives: ['apache-flink', 'apache-storm'],
        complements: ['delta-lake', 'apache-kafka'],
        prerequisites: ['hadoop-fundamentals'],
        nextSteps: ['delta-lake-mastery', 'spark-streaming-advanced']
    }
}
```

#### Learning Paths
```javascript
{
    'hadoop-beginner': {
        name: 'Iniciante em Hadoop',
        description: 'Caminho completo para aprender Hadoop do zero',
        steps: [
            { id: 'big-data-concepts', title: 'Conceitos de Big Data', type: 'article' },
            { id: 'hadoop-fundamentals', title: 'Hadoop Fundamentals', type: 'course' }
        ]
    }
}
```

### Algoritmos de Recomendação

#### 1. Score de Relevância
- **Tecnologias Relacionadas**: 0.9
- **Próximos Passos**: 0.95
- **Alternativas**: 0.8
- **Complementares**: 0.85
- **Popular na Categoria**: 0.7
- **Personalizado**: 0.75
- **Cursos Relacionados**: 0.8

#### 2. Inferência de Caminho de Aprendizado
O sistema analisa as páginas visualizadas e calcula scores para cada caminho de aprendizado disponível, selecionando o mais provável baseado no comportamento do usuário.

#### 3. Filtragem e Deduplicação
- Remove sugestões duplicadas baseadas em URL ou título
- Limita a 8 sugestões principais
- Ordena por score de relevância

### Containers de Interface

#### Sidebar Suggestions (`#intelligent-suggestions`)
- Exibe até 4 sugestões principais
- Layout compacto para sidebar
- Inclui razão da recomendação

#### Main Suggestions (`#main-suggestions`)
- Grid responsivo com cards expandidos
- Mostra score de match
- Inclui mais detalhes sobre cada sugestão

#### Next Steps (`#next-steps`)
- Alert destacado com próximos passos
- Mostra nome do caminho de aprendizado
- Botão de ação principal

#### Learning Progress (`#learning-progress`)
- Barra de progresso visual
- Estatísticas de conclusão
- Próximo passo sugerido

## Integração

### Páginas Suportadas
- **Tecnologias**: Todas as páginas de tecnologia individual
- **Cursos**: Página principal de cursos
- **Homepage**: Sugestões gerais baseadas no histórico
- **Blog**: Artigos relacionados (futuro)

### Dependências
- `search-index.js`: Dados de tecnologias e cursos
- `Bootstrap 5.3`: Framework CSS
- `localStorage`: Persistência de dados do usuário

### Inicialização
```javascript
// Inicialização automática quando DOM carrega
document.addEventListener('DOMContentLoaded', function() {
    if (!window.location.pathname.includes('/buscar')) {
        window.intelligentSuggestions = new IntelligentSuggestions();
    }
});
```

## Personalização

### Adicionando Novos Relacionamentos
```javascript
// Em buildContentRelationships()
'nova-tecnologia': {
    related: ['tech1', 'tech2'],
    alternatives: ['alt1', 'alt2'],
    complements: ['comp1', 'comp2'],
    prerequisites: ['prereq1'],
    nextSteps: ['next1', 'next2']
}
```

### Criando Novos Caminhos de Aprendizado
```javascript
// Em defineLearningPaths()
'novo-caminho': {
    name: 'Nome do Caminho',
    description: 'Descrição do caminho',
    steps: [
        { id: 'step1', title: 'Passo 1', type: 'course' },
        { id: 'step2', title: 'Passo 2', type: 'technology' }
    ]
}
```

## Métricas e Analytics

### Tracking de Interações
- **Visualizações de Página**: Automático
- **Cliques em Sugestões**: Rastreado com ID da sugestão
- **Buscas**: Queries são armazenadas para melhorar recomendações
- **Inscrições em Cursos**: Tracked para evitar sugestões duplicadas

### Dados Coletados
- Páginas visualizadas (últimas 50)
- Queries de busca (últimas 50)
- Cliques em sugestões (últimos 100)
- Preferências inferidas (categorias e tecnologias)

## Performance

### Otimizações
- **Lazy Loading**: Sugestões carregam após o conteúdo principal
- **Caching**: Dados do usuário persistidos em localStorage
- **Debouncing**: Evita múltiplas execuções desnecessárias
- **Limite de Dados**: Mantém apenas dados recentes

### Compatibilidade
- **Navegadores**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Dispositivos**: Responsivo para desktop, tablet e mobile
- **Acessibilidade**: Suporte a leitores de tela e navegação por teclado

## Troubleshooting

### Problemas Comuns
1. **Sugestões não aparecem**: Verificar se `search-index.js` está carregado
2. **Dados não persistem**: Verificar se localStorage está habilitado
3. **Performance lenta**: Limpar dados antigos do localStorage
4. **Sugestões irrelevantes**: Verificar matriz de relacionamentos

### Debug
Use a página `test-intelligent-suggestions.html` para verificar o funcionamento do sistema e visualizar dados de debug.

## Roadmap Futuro

### Melhorias Planejadas
- **Machine Learning**: Algoritmos mais sofisticados de recomendação
- **A/B Testing**: Testes de diferentes algoritmos
- **Analytics Avançado**: Métricas de engajamento e conversão
- **API Integration**: Recomendações baseadas em dados externos
- **Social Features**: Recomendações baseadas em comunidade

### Integrações Futuras
- **Sistema de Comentários**: Recomendações baseadas em discussões
- **Avaliações**: Incorporar ratings de usuários
- **Certificações**: Sugerir próximos passos baseados em certificações
- **Projetos**: Recomendações de projetos práticos