# LCARS UI Installation Guide

## Prerequisites

- Node.js 14+ (for npm)
- Modern browser (Chrome 90+, Firefox 88+, Safari 15+, Edge 90+)
- Or older browser with polyfill support

## Installation

### via npm

```bash
npm install lcars-ui
```

### via yarn

```bash
yarn add lcars-ui
```

### via pnpm

```bash
pnpm add lcars-ui
```

## Basic Usage

### 1. Import Components

In your JavaScript/TypeScript file:

```javascript
// Import all components
import "lcars-ui";

// Or import specific components
import "lcars-ui/dist/lcars-ui.js";
```

### 2. Import Polyfills (Optional - for older browsers)

If you need to support older browsers:

```javascript
// Load polyfills first
import "lcars-ui/polyfills";

// Then import components
import "lcars-ui";
```

### 3. Add Theme Styles

Import the theme CSS in your HTML or JavaScript:

**In HTML:**

```html
<link rel="stylesheet" href="node_modules/lcars-ui/src/styles/theme.css" />
```

**In JavaScript (with bundler):**

```javascript
import "lcars-ui/src/styles/theme.css";
```

### 4. Use Components

```html
<div data-theme="2357">
  <lcars-panel label="System Status">
    <p>All systems operational</p>
  </lcars-panel>

  <lcars-button>Engage</lcars-button>
</div>
```

## Using with Build Tools

### Vite

```javascript
// main.js
import "lcars-ui";
import "lcars-ui/src/styles/theme.css";
```

### Webpack

```javascript
// index.js
import "lcars-ui";
import "lcars-ui/src/styles/theme.css";
```

### esbuild

```javascript
// app.js
import "lcars-ui";
import "lcars-ui/src/styles/theme.css";
```

## Using without Build Tools

### Via CDN (Future)

Coming soon - CDN links for direct browser usage

### Local Development

For local development without a bundler, you can use the source files directly:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/lcars-ui/src/styles/theme.css" />
  </head>
  <body>
    <lcars-panel>Content</lcars-panel>

    <script type="module">
      import "./node_modules/lcars-ui/src/components/lcars-panel/lcars-panel.js";
      import "./node_modules/lcars-ui/src/components/lcars-button/lcars-button.js";
    </script>
  </body>
</html>
```

## TypeScript Support

TypeScript definitions are included automatically. No additional setup needed!

```typescript
import "lcars-ui";

// TypeScript knows about the custom elements
const panel = document.createElement("lcars-panel");
panel.setAttribute("variant", "info");
```

## Browser Support

### Modern Browsers (Native Support)

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

### Older Browsers (With Polyfills)

Import polyfills before components:

```javascript
import "lcars-ui/polyfills";
import "lcars-ui";
```

Supported with polyfills:

- Chrome 49+
- Firefox 45+
- Safari 10+
- Edge (Legacy) 16+

## Troubleshooting

### Components not rendering

**Problem:** Custom elements don't appear on the page

**Solution:**

- Ensure you imported the component library
- Check browser console for errors
- Verify browser supports Web Components (or load polyfills)

### Theme colors not applied

**Problem:** Components use wrong colors or no colors

**Solution:**

- Import theme.css stylesheet
- Verify data-theme="2357" is set on container
- Check CSS custom property values in DevTools

### TypeScript errors

**Problem:** TypeScript doesn't recognize custom elements

**Solution:**

- Ensure types are included in package
- Check tsconfig.json includes node_modules types
- Import the library in a .ts file to load type definitions

### Module not found errors

**Problem:** Bundler can't find lcars-ui modules

**Solution:**

- Run `npm install` to ensure package is installed
- Check import paths match package.json exports
- Verify bundler supports ES modules

## Next Steps

- Read the [Theming Guide](./theming.md) to customize colors
- Check [Accessibility Guide](./accessibility.md) for WCAG compliance
- Browse [Component Documentation](../components/) for API details
- View [examples/](../../examples/) for complete usage examples

## Getting Help

- GitHub Issues: [https://github.com/JawsomeJason/lcars-ui/issues](https://github.com/JawsomeJason/lcars-ui/issues)
- Documentation: See `docs/` directory
- Examples: See `examples/` directory
