# LCARS UI Component Library

Authentic Star Trek LCARS interface components built with native Web Components.

## Table of Contents

- Overview
- Features
- Installation
- Quickstart
- Components
- Theming
- Accessibility
- Browser Support & Polyfills
- TypeScript Support
- Performance
- Contributing
- Roadmap
- License

## Overview

LCARS UI provides reusable UI primitives styled in the LCARS 2357 palette. Components are implemented as Custom Elements with Shadow DOM. The theme system uses CSS custom properties and inherits via the `data-theme` attribute.

## Features

- ✨ Authentic LCARS visual design
- 🎨 2357 color theme via CSS variables
- 🔧 Native Web Components (Custom Elements + Shadow DOM)
- ♿ WCAG 2.1 AA accessibility patterns
- 📘 TypeScript definitions included
- 🌐 Optional polyfills for older browsers
- 📦 Tiny bundle (≈2.1KB gzipped)

## Installation

See the full Installation Guide at `docs/guides/installation.md`. TL;DR:

```bash
npm install lcars-ui
```

Then import the library (registers all components):

```javascript
import "lcars-ui";
```

Optional: include theme CSS (via bundler or link tag):

```javascript
import "lcars-ui/src/styles/theme.css";
```

## Quickstart

A minimal page using the default 2357 theme:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>LCARS</title>
    <link rel="stylesheet" href="node_modules/lcars-ui/src/styles/theme.css" />
  </head>
  <body>
    <div data-theme="2357">
      <lcars-panel label="System Status">
        <p>All systems operational</p>
      </lcars-panel>
      <lcars-button id="engage" variant="primary">ENGAGE</lcars-button>
    </div>

    <script type="module">
      import "lcars-ui";
      document.getElementById("engage").addEventListener("lcars-click", () => {
        alert("Engaging at maximum warp!");
      });
    </script>
  </body>
</html>
```

More examples: `examples/` directory.

## Components

- `<lcars-panel>` — LCARS-styled container with variants and label
- `<lcars-button>` — Interactive button with keyboard support and variants

Component docs: `docs/components/`.

## Theming

- Default theme: 2357. Apply on a container with `data-theme="2357"` and children inherit.
- Customize via CSS variables (examples in `docs/guides/theming.md`).

```css
:root {
  --lcars-mariner: #4477dd; /* Primary interactive */
  --lcars-golden-tanoi: #ffdd77; /* Primary background */
}
```

## Accessibility

Components follow WCAG 2.1 AA practices:

- Keyboard navigation: Tab focus, Enter/Space to activate buttons
- Visible focus indicators (`:focus-visible` outline)
- Semantic HTML under the hood
- ARIA label support for icon-only buttons

Details: `docs/guides/accessibility.md`.

## Browser Support & Polyfills

- Modern browsers: Chrome 90+, Firefox 88+, Safari 15+, Edge 90+
- Older browsers: import `lcars-ui/polyfills` before `lcars-ui`

```javascript
import "lcars-ui/polyfills";
import "lcars-ui";
```

## TypeScript Support

Type definitions are included. Importing the library exposes custom element typings and event types.

```typescript
import "lcars-ui";
const btn = document.querySelector("lcars-button");
btn?.addEventListener("lcars-click", (e: CustomEvent) => {
  console.log(e.detail.originalEvent);
});
```

## Performance

- Main bundle ≈ 6.4KB (≈2.1KB gzipped)
- No runtime dependencies

## Contributing

This repository follows a spec-first workflow. See `specs/` for plans, contracts, and tasks. Keep changes aligned with the constitution (no automated tests; manual validation via examples).

## Roadmap

- Additional components: displays, dividers, headers, elbows
- More LCARS-era themes (2364, 2371, 2379)
- High-contrast and reduced motion options

## License

MIT
