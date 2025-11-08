# Quickstart Guide: LCARS UI Component Library

**Version**: 0.1.0
**Last Updated**: 2025-11-07

## Overview

The LCARS UI Component Library provides authentic Star Trek LCARS interface components for web applications. This quickstart will have you rendering your first LCARS component in under 5 minutes.

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

### Step 1: Import Components

Import the library in your JavaScript/TypeScript file:

```javascript
// Import the library (registers all components)
import "lcars-ui";
```

### Step 2: Use in HTML

Once imported, components are available as custom HTML elements:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LCARS Interface</title>
  </head>
  <body>
    <!-- Apply theme to container -->
    <div data-theme="2357">
      <h1>USS Enterprise - Main Computer</h1>

      <!-- LCARS Panel -->
      <lcars-panel label="System Status">
        <p>All systems operational</p>
        <p>Warp drive: Online</p>
        <p>Shields: 100%</p>
      </lcars-panel>

      <!-- LCARS Buttons -->
      <lcars-button variant="primary">Engage</lcars-button>
      <lcars-button variant="danger">Red Alert</lcars-button>
    </div>

    <script type="module" src="./main.js"></script>
  </body>
</html>
```

### Step 3: Add Event Listeners (Optional)

Handle button clicks in JavaScript:

```javascript
// main.js
import "lcars-ui";

const button = document.querySelector("lcars-button");
button.addEventListener("lcars-click", (event) => {
  console.log("Button clicked!", event.detail);
  alert("Engaging warp drive!");
});
```

## Theming

### Default Theme (2357)

The 2357 theme is applied by default. You can explicitly set it on any container:

```html
<div data-theme="2357">
  <!-- All components inside inherit this theme -->
  <lcars-panel>Content</lcars-panel>
  <lcars-button>Action</lcars-button>
</div>
```

### Theme Colors

The 2357 theme includes these colors:

| Color Name   | Hex     | Usage                |
| ------------ | ------- | -------------------- |
| pale-canary  | #ffff99 | Alerts, highlights   |
| golden-tanoi | #ffcc66 | Primary backgrounds  |
| neon-carrot  | #ff9933 | Accents, borders     |
| eggplant     | #664466 | Disabled states      |
| lilac        | #cc99cc | Secondary highlights |
| anakiwa      | #99ccff | Info states, focus   |
| mariner      | #3366cc | Interactive elements |
| baltic-blue  | #006699 | Active states        |

### Customizing Theme Colors

Override theme colors with CSS custom properties:

```css
:root {
  --lcars-mariner: #4477dd; /* Custom blue for buttons */
  --lcars-golden-tanoi: #ffdd77; /* Custom background */
}
```

## Component Examples

### LCARS Panel

#### Basic Panel

```html
<lcars-panel>
  <p>Standard panel content</p>
</lcars-panel>
```

#### Panel with Label

```html
<lcars-panel label="Communications">
  <p>Incoming transmission from Starfleet Command</p>
</lcars-panel>
```

#### Panel Variants

```html
<!-- Info panel -->
<lcars-panel variant="info" label="Information">
  <p>Sensors detect no anomalies</p>
</lcars-panel>

<!-- Alert panel -->
<lcars-panel variant="alert" label="Warning">
  <p>Hull breach detected on Deck 12!</p>
</lcars-panel>
```

#### Styled Panel

```html
<style>
  lcars-panel {
    --panel-border-width: 6px;
    --panel-padding: 2rem;
    --panel-border-radius: 16px;
  }
</style>

<lcars-panel>
  <p>Custom styled panel</p>
</lcars-panel>
```

### LCARS Button

#### Button Variants

```html
<!-- Primary action -->
<lcars-button variant="primary">Engage</lcars-button>

<!-- Secondary action -->
<lcars-button variant="secondary">Cancel</lcars-button>

<!-- Dangerous action -->
<lcars-button variant="danger">Eject Core</lcars-button>
```

#### Button Sizes

```html
<lcars-button size="small">Small</lcars-button>
<lcars-button size="medium">Medium</lcars-button>
<lcars-button size="large">Large</lcars-button>
```

#### Disabled Button

```html
<lcars-button disabled>Offline</lcars-button>
```

#### Button with Event Handler

```javascript
const btn = document.querySelector("lcars-button");

btn.addEventListener("lcars-click", (event) => {
  console.log("Clicked!", event.detail.originalEvent);
  // Perform action
});
```

## Complete Example

Here's a complete LCARS interface example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>LCARS Console</title>
    <style>
      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        background: #000;
        color: #fff;
        padding: 2rem;
      }

      .console {
        max-width: 1200px;
        margin: 0 auto;
      }

      .controls {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="console" data-theme="2357">
      <h1>USS ENTERPRISE NCC-1701-D</h1>

      <lcars-panel label="SHIP STATUS" variant="info">
        <p><strong>Warp Drive:</strong> Online</p>
        <p><strong>Shields:</strong> 100%</p>
        <p><strong>Weapons:</strong> Armed</p>
        <p><strong>Life Support:</strong> Nominal</p>
      </lcars-panel>

      <lcars-panel label="NAVIGATION">
        <p><strong>Heading:</strong> 270 Mark 15</p>
        <p><strong>Speed:</strong> Warp 5</p>
        <p><strong>Destination:</strong> Sector 001</p>
      </lcars-panel>

      <lcars-panel label="ALERTS" variant="alert">
        <p>⚠️ Borg vessel detected at long range</p>
      </lcars-panel>

      <div class="controls">
        <lcars-button id="engage" size="large">ENGAGE</lcars-button>
        <lcars-button id="shields" variant="secondary"
          >RAISE SHIELDS</lcars-button
        >
        <lcars-button id="alert" variant="danger">RED ALERT</lcars-button>
      </div>
    </div>

    <script type="module">
      import "lcars-ui";

      document.getElementById("engage").addEventListener("lcars-click", () => {
        alert("Engaging at maximum warp!");
      });

      document.getElementById("shields").addEventListener("lcars-click", () => {
        alert("Shields raised to maximum!");
      });

      document.getElementById("alert").addEventListener("lcars-click", () => {
        alert("Red alert! All hands to battle stations!");
      });
    </script>
  </body>
</html>
```

## Browser Support

### Modern Browsers (Native Support)

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

### Older Browsers (Requires Polyfills)

For older browser support, load polyfills before importing components:

```javascript
// Load polyfills first (for older browsers)
import "lcars-ui/polyfills";

// Then import components
import "lcars-ui";
```

## TypeScript Support

The library includes TypeScript declaration files for full IntelliSense:

```typescript
import "lcars-ui";

// TypeScript knows about custom elements
const panel: HTMLElement = document.createElement("lcars-panel");
panel.setAttribute("variant", "info");

// Event types are available
const button = document.querySelector("lcars-button");
button?.addEventListener("lcars-click", (event: CustomEvent) => {
  console.log(event.detail.originalEvent);
});
```

## Next Steps

- **Component Documentation**: See `/docs/components/` for detailed API references
- **Theming Guide**: See `/docs/guides/theming.md` for advanced theme customization
- **Accessibility Guide**: See `/docs/guides/accessibility.md` for WCAG compliance tips
- **Examples**: Explore `/examples/` directory for more complex use cases

## Getting Help

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Read component contracts in `/specs/001-lcars-components/contracts/`
- **Examples**: Check `/examples/` for working demos

## Version

Current version: **0.1.0** (MVP)

- ✅ LCARS Panel component
- ✅ LCARS Button component
- ✅ 2357 theme support
- ✅ TypeScript definitions
- ✅ Browser polyfills

Future versions will include additional components (displays, dividers, headers, elbows) and more themes.

---

**Live long and prosper!** 🖖
