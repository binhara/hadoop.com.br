# Sistema de Monitoramento de Performance - Portal Big Data

## 📊 Visão Geral

O sistema de monitoramento de performance foi implementado de forma **não intrusiva** por padrão. Todos os sistemas estão ativos e coletando dados, mas os alertas visuais estão desabilitados para não incomodar os usuários.

## 🔧 Configuração Padrão (Modo Silencioso)

Por padrão, o sistema opera em **modo silencioso**:
- ✅ Monitoramento ativo (Core Web Vitals, Uptime, Erros)
- ✅ Coleta de dados e métricas
- ✅ Relatórios automáticos
- ❌ Alertas visuais desabilitados
- ❌ Notificações do browser desabilitadas
- ❌ Popups de feedback desabilitados
- ✅ Logs no console apenas para desenvolvedores

## 🎛️ Como Habilitar Alertas

### Opção 1: Via Console do Browser
```javascript
// Habilitar todos os alertas
performanceConfig.enableAllFeatures();

// Apenas alertas visuais
performanceConfig.enableVisualAlerts();

// Apenas notificações do browser
performanceConfig.enableNotifications();

// Modo desenvolvedor (apenas console)
performanceConfig.setDeveloperMode();

// Ver ajuda completa
performanceConfig.showHelp();
```

### Opção 2: Via Dashboard
1. Pressione `Ctrl+Shift+M` para abrir o dashboard
2. Vá para a aba "Alerts"
3. Configure os thresholds e habilite os tipos de alerta desejados

## 📱 Interfaces Disponíveis

### Dashboard Principal
- **Atalho**: `Ctrl+Shift+M`
- **Funcionalidade**: Interface completa com todas as métricas
- **Abas**: Overview, Core Web Vitals, Uptime, Errors, Reports, Alerts

### Monitor de Performance
- **Atalho**: `Ctrl+Shift+P`
- **Funcionalidade**: Monitor detalhado das Core Web Vitals
- **Recursos**: Exportação de relatórios, limpeza de dados

### Indicador de Status
- **Localização**: Canto inferior direito (aparece brevemente)
- **Funcionalidade**: Indicador discreto do status geral
- **Interação**: Clique para abrir o dashboard

## 🧪 Página de Testes

Acesse `/test-performance-monitoring.html` para:
- Verificar se todos os sistemas estão funcionando
- Testar alertas e notificações
- Simular erros e problemas de performance
- Exportar dados de teste

## 📋 Sistemas Incluídos

### 1. Core Web Vitals Monitor
- **Métricas**: LCP, FID, CLS, TTFB, FCP
- **Thresholds**: Configuráveis via dashboard
- **Alertas**: Baseados nos padrões do Google

### 2. Uptime Monitor
- **Endpoints**: Homepage, assets críticos, APIs
- **Frequência**: Verificação a cada minuto
- **Recursos**: Detecção de outages, tempo de resposta

### 3. Error Tracking System
- **Tipos**: JavaScript, Promise rejections, Network, Resources
- **Contexto**: Session tracking, user agent, viewport
- **Feedback**: Modal de feedback para erros críticos (desabilitado por padrão)

### 4. Performance Reports Generator
- **Frequência**: Hourly, Daily, Weekly, Monthly
- **Formatos**: JSON, HTML, CSV
- **Análise**: Recomendações automáticas baseadas nas métricas

### 5. Alerts System
- **Canais**: Console, Visual overlays, Browser notifications, Analytics
- **Severidade**: Critical, Warning, Low
- **Filtros**: Anti-spam, deduplicação

## ⚙️ Configurações Avançadas

### Modos Predefinidos

```javascript
// Modo silencioso (padrão)
performanceConfig.setSilentMode();

// Modo desenvolvedor
performanceConfig.setDeveloperMode();

// Modo produção
performanceConfig.setProductionMode();

// Resetar para padrões
performanceConfig.resetToDefaults();
```

### Configurações Específicas

```javascript
// Habilitar apenas logs no console
performanceConfig.settings.alerts.console = true;

// Desabilitar completamente o monitoramento de uptime
performanceConfig.disableMonitoring('uptime');

// Habilitar auto-show do dashboard
performanceConfig.enableDashboardAutoShow();
```

## 📊 Métricas Coletadas

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s (good), < 4s (needs improvement)
- **FID** (First Input Delay): < 100ms (good), < 300ms (needs improvement)
- **CLS** (Cumulative Layout Shift): < 0.1 (good), < 0.25 (needs improvement)
- **TTFB** (Time to First Byte): < 800ms (good), < 1.8s (needs improvement)
- **FCP** (First Contentful Paint): < 1.8s (good), < 3s (needs improvement)

### System Health
- **Uptime**: Percentual de disponibilidade
- **Error Rate**: Taxa de erros por sessão
- **Response Time**: Tempo médio de resposta
- **Memory Usage**: Uso de memória JavaScript

## 🔍 Troubleshooting

### Sistema não está funcionando?
1. Abra o console do browser (F12)
2. Digite: `performanceConfig.showHelp()`
3. Verifique se há erros no console
4. Acesse `/test-performance-monitoring.html` para diagnóstico

### Alertas não aparecem?
```javascript
// Verificar status dos alertas
performanceConfig.getSettings();

// Habilitar alertas visuais
performanceConfig.enableVisualAlerts();

// Verificar se há alertas recentes
performanceAlertsSystem.getAlertHistory();
```

### Dashboard não abre?
- Verifique se o atalho `Ctrl+Shift+M` está funcionando
- Tente: `performanceMonitoringDashboard.show()`
- Verifique se não há conflitos com outros scripts

## 📈 Relatórios e Exportação

### Gerar Relatório Manual
```javascript
// Relatório da última hora
performanceReportsGenerator.generateCustomReport(3600000);

// Exportar dados atuais
performanceMonitoringDashboard.exportData();
```

### Relatórios Automáticos
- **Hourly**: A cada hora
- **Daily**: 9:00 AM todos os dias
- **Weekly**: Segunda-feira 9:00 AM
- **Monthly**: Dia 1 de cada mês 9:00 AM

## 🛡️ Privacidade e Dados

- Todos os dados são armazenados localmente (localStorage)
- Nenhum dado pessoal é coletado
- Dados são automaticamente limpos após 7-30 dias
- Analytics apenas para métricas agregadas (se habilitado)

## 🚀 Performance Impact

O sistema foi otimizado para ter impacto mínimo:
- **JavaScript**: ~50KB total (comprimido)
- **CPU**: < 1% em operação normal
- **Memory**: < 5MB de uso adicional
- **Network**: Apenas verificações de uptime (HEAD requests)

## 📞 Suporte

Para problemas ou dúvidas:
1. Consulte a página de testes: `/test-performance-monitoring.html`
2. Execute `performanceConfig.showHelp()` no console
3. Verifique os logs no console do browser
4. Exporte os dados para análise: `performanceMonitoringDashboard.exportData()`

---

**Nota**: O sistema está configurado para ser completamente não intrusivo por padrão. Os usuários finais não verão alertas ou notificações, mas desenvolvedores e administradores podem habilitar essas funcionalidades conforme necessário.