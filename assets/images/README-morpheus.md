# Imagem do Morpheus - Implementação Atual

## Imagem Implementada
- **Arquivo**: `morpheus.png` (imagem real do Morpheus)
- **Localização**: `assets/images/morpheus.png`
- **Uso**: Background da seção acima dos botões das pílulas
- **Efeitos**: Filtros Matrix, drop-shadow verde, hover effects

## Implementação Atual

A imagem `morpheus.png` está sendo usada como background da seção `.morpheus-background-section` no `index.html`.

### Características da Implementação:
1. **Background Image**: A imagem é usada como `background-image` em CSS
2. **Posicionamento**: `background-position: center center`
3. **Dimensionamento**: `background-size: contain` (mantém proporções)
4. **Efeitos Matrix**: 
   - Drop-shadow verde
   - Filtros de cor para integração com tema
   - Hover effects com escala e brilho
5. **Overlay**: Citação do Morpheus sobreposta na parte inferior
6. **Responsivo**: Adapta-se a diferentes tamanhos de tela

### Estrutura CSS:
```css
.morpheus-background-section {
    background-image: url('../images/morpheus.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    filter: drop-shadow(0 0 20px #00ff00) sepia(20%) hue-rotate(90deg);
}
```

### Para Substituir a Imagem:
1. Substitua o arquivo `morpheus.png` por uma nova imagem
2. Mantenha o mesmo nome ou atualize o CSS
3. Dimensões recomendadas: 400x600px ou similar
4. Fundo transparente funciona melhor

### Efeitos Aplicados:
- **Drop-shadow verde**: Efeito de brilho Matrix
- **Sepia + Hue-rotate**: Integração com paleta de cores
- **Hover effects**: Escala e intensificação do brilho
- **Gradient overlay**: Escurece a parte inferior para melhor legibilidade
- **Animação da borda**: Pulsação sutil na citação

## Arquivos Relacionados:
- `morpheus.png` - Imagem principal (background)
- `morpheus-matrix.svg` - Versão SVG estilizada (não usada atualmente)
- `morpheus-pills.png` - Placeholder para versão alternativa