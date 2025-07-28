# Banner Integration - Portal Big Data

## Overview

This directory contains banner images for the three specified partners integrated into the Portal Big Data website:

1. **DSS Brasil** (dssbr.com.br) - Data Science & Big Data specialists
2. **GU Big Data** (gubigdata.com.br) - Consultoria & Treinamentos
3. **O Workshop** (oworkshop.com.br) - Eventos & Treinamentos Tech

## Banner Files

- `dssbr-banner.jpg` - DSS Brasil banner (300x120px SVG)
- `gubigdata-banner.jpg` - GU Big Data banner (300x120px SVG)
- `oworkshop-banner.jpg` - O Workshop banner (300x120px SVG)
- `placeholder.jpg` - Fallback banner for errors (300x120px SVG)

## Banner System Features

### Automatic Banner Management
- **Rotation**: Banners rotate every 30 seconds when multiple banners are available for a position
- **Positioning**: Banners are strategically placed in sidebar and content areas
- **Responsive**: Banners adapt to different screen sizes
- **Fallback**: Automatic fallback to placeholder if banner fails to load

### Analytics & Tracking
- **Impression Tracking**: Tracks when banners are displayed
- **Click Tracking**: Tracks when users click on banners
- **Viewability Tracking**: Tracks when banners are actually visible to users
- **UTM Parameters**: All partner links include proper UTM tracking parameters

### Partner Configuration

#### DSS Brasil
- **URL**: https://dssbr.com.br?utm_source=hadoop.com.br&utm_medium=banner&utm_campaign=partner_integration
- **Positions**: sidebar-top, content-top
- **Priority**: 1 (highest)
- **Theme**: Blue gradient with Matrix elements

#### GU Big Data
- **URL**: https://gubigdata.com.br?utm_source=hadoop.com.br&utm_medium=banner&utm_campaign=partner_integration
- **Positions**: sidebar-middle, content-middle
- **Priority**: 2
- **Theme**: Green gradient with Matrix elements

#### O Workshop
- **URL**: https://oworkshop.com.br?utm_source=hadoop.com.br&utm_medium=banner&utm_campaign=partner_integration
- **Positions**: sidebar-bottom, content-bottom
- **Priority**: 3
- **Theme**: Red gradient with Matrix elements

## Implementation Details

### HTML Containers
Banner containers are placed throughout the site using these CSS classes:
- `.banner-header` - Top of page banners
- `.banner-sidebar-top` - Top sidebar banners
- `.banner-sidebar-middle` - Middle sidebar banners
- `.banner-sidebar-bottom` - Bottom sidebar banners
- `.banner-content-top` - Top content area banners
- `.banner-content-middle` - Middle content area banners
- `.banner-content-bottom` - Bottom content area banners
- `.banner-footer` - Footer banners

### JavaScript Integration
The banner system is automatically initialized when the DOM is ready. It:
1. Loads banner configuration
2. Sets up banner containers
3. Displays banners in appropriate positions
4. Starts rotation timer
5. Sets up event listeners for tracking

### CSS Styling
Custom CSS provides:
- Matrix theme integration
- Hover effects
- Responsive design
- Loading animations
- Partner-specific styling

## Testing

Use `test-banners.html` to verify banner integration:
1. Open the test page in a browser
2. Verify all three partner banners are displayed
3. Test banner clicks and tracking
4. Check responsive behavior
5. View analytics statistics

## Analytics Data

The system tracks:
- **Impressions**: When banners are loaded and displayed
- **Clicks**: When users click on banner links
- **Hovers**: When users hover over banners
- **Viewability**: When banners are actually visible in viewport

Data is stored in localStorage and can be accessed via:
```javascript
window.bannerSystem.getBannerStats()
window.bannerSystem.generateReport()
```

## Maintenance

### Adding New Partners
1. Add banner image to this directory
2. Update banner configuration in `assets/js/banner-system.js`
3. Test integration using test page

### Updating Partner Information
1. Modify banner configuration in `assets/js/banner-system.js`
2. Update banner images if needed
3. Test changes

### Analytics Reporting
Banner analytics can be exported for partner reporting:
```javascript
const report = window.bannerSystem.generateReport();
console.log(JSON.stringify(report, null, 2));
```

## Requirements Compliance

This implementation satisfies task 10.3 requirements:
- ✅ Implementar banners para dssbr.com.br
- ✅ Adicionar banners para gubigdata.com.br
- ✅ Integrar banners para oworkshop.com.br
- ✅ Configurar links e tracking apropriados

All partner banners are properly integrated with tracking, analytics, and responsive design following the Portal Big Data Matrix theme.