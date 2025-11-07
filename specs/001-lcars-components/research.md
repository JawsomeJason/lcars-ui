# Research: LCARS UI Component Library

**Phase**: 0 (Outline & Research)
**Date**: 2025-11-07
**Feature**: 001-lcars-components

## Research Topics

### 1. LCARS Visual Design Patterns

**Decision**: Implement authentic LCARS styling using CSS Grid, custom properties, and geometric shapes

**Rationale**:

- LCARS (Library Computer Access/Retrieval System) has distinctive visual characteristics:
  - **Geometry**: Rectangular panels with rounded "elbows" used as dividers
    between panels or contextual data and interactive buttons, rounded
    pill-shaped buttons (standalone) or rounded buttons on one or both of the ends of a button group, thick borders and dividing bars
  - **Color blocking**: Large areas of solid color with high contrast text
  - **Typography**: Sans-serif fonts (Google's Antonio font), uppercase headers,
    uppercase button labels, medium-to-large text sizes
  - **Layout**: Asymmetric grid arrangements, status bars along edges, panels of varying sizes
- CSS Grid provides precise control for complex LCARS layouts
- CSS custom properties enable dynamic theming (data-theme attribute)
- Large `border-radius` values create characteristic rounded "elbow" shapes for buttons
- Thick borders (`border-width: 4px+`) and color-blocked sections define panel boundaries
- No image dependencies keep bundle size minimal

**Alternatives Considered**:

- SVG-based components: More flexible shapes (like the inner scoop in the elbow) but higher DOM complexity and accessibility challenges
- Canvas rendering: Performance benefits but poor accessibility, no semantic HTML
- Image sprites: Inflexible, not themeable, poor scalability

**Implementation Notes**:

- Use CSS Grid for panel layouts and asymmetric arrangements
- Use CSS custom properties for all colors (enables theme switching)
- Use large `border-radius` values (e.g., `20px` or `50%`) for rounded "elbow" corners on buttons
- Use thick borders (e.g., `border-width: 4px`) to create bold dividing lines
- Rectangular panels: use `border-radius: 0` for square corners or small values (e.g., `8-12px`) for subtle rounding
- Use pseudo-elements (`::before`, `::after`) for decorative bars and dividers
- Typography: `font-family:  Helvetica, 'Antonio', Arial, sans-serif`

### 2. Web Components Best Practices (Custom Elements v1 + Shadow DOM)

**Decision**: Use autonomous custom elements with closed Shadow DOM, CSS custom properties for theme inheritance

**Rationale**:

- **Autonomous custom elements** (vs customized built-ins): Better browser support, clearer semantics
- **Closed Shadow DOM**: Prevents external style bleeding, enforces encapsulation (FR-008)
- **CSS custom properties inheritance**: Even in closed Shadow DOM, CSS variables inherit from parent, enabling theme cascading (FR-009)
- **Lifecycle callbacks**: Use `connectedCallback` for initialization, `attributeChangedCallback` for reactive attributes
- **observedAttributes**: Declare watched attributes for data-theme and component-specific props

**Alternatives Considered**:

- Open Shadow DOM: Allows external style manipulation, violates encapsulation goal
- No Shadow DOM: Global style conflicts, violates FR-008
- Light DOM + scoped CSS: No true encapsulation, requires CSS Modules or similar

**Implementation Notes**:

```javascript
class LcarsPanel extends HTMLElement {
  static observedAttributes = ["data-theme"];

  constructor() {
    super();
    this.attachShadow({ mode: "closed" }); // Closed Shadow DOM
  }

  connectedCallback() {
    this.render();
    this.applyTheme();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-theme" && oldValue !== newValue) {
      this.applyTheme();
    }
  }

  applyTheme() {
    // Theme colors inherited via CSS custom properties
    // Check data-theme on this element or closest parent with data-theme
  }
}

customElements.define("lcars-panel", LcarsPanel);
```

### 3. Theme Inheritance Strategy (data-theme attribute)

**Decision**: Use CSS custom properties defined at `:host` level, check `data-theme` on component or traverse up DOM tree

**Rationale**:

- CSS custom properties naturally inherit through Shadow DOM boundary
- Set theme colors as CSS variables at document or container level
- Components read inherited variables, no JavaScript theme detection needed for most cases
- For explicit `data-theme` checking: use `this.closest('[data-theme]')` in JavaScript to find nearest themed ancestor
- Default theme (2357) set on `:root` as fallback

**Alternatives Considered**:

- JavaScript-only theme passing (props): Doesn't cascade to nested components naturally
- Context API pattern: Overly complex for simple color theming
- CSS classes on components: Breaks Shadow DOM encapsulation, requires global styles

**Implementation Notes**:

```css
/* Global theme definition (in main CSS or via JS) */
:root,
[data-theme="2357"] {
  --lcars-pale-canary: #ff9;
  --lcars-golden-tanoi: #fc6;
  --lcars-neon-carrot: #f93;
  --lcars-eggplant: #646;
  --lcars-lilac: #c9c;
  --lcars-anakiwa: #9cf;
  --lcars-mariner: #36c;
  --lcars-baltic-blue: #069;
}

/* Component Shadow DOM styles */
:host {
  /* Inherit theme colors from parent */
  --panel-bg: var(--lcars-golden-tanoi);
  --panel-border: var(--lcars-neon-carrot);
}
```

### 4. TypeScript Declaration File Generation

**Decision**: Use JSDoc comments in JavaScript source + `tsc --declaration --allowJs --emitDeclarationOnly` to generate .d.ts files

**Rationale**:

- Keeps source simple (vanilla JS, no TypeScript build step for source)
- TypeScript compiler can generate accurate .d.ts from well-documented JSDoc
- Provides IntelliSense for TypeScript users without TypeScript source complexity
- esbuild handles JavaScript bundling (fast), tsc only for type generation (separate step)

**Alternatives Considered**:

- Full TypeScript source: Adds build complexity, slower compilation for MVP
- Manual .d.ts writing: Error-prone, maintenance burden, gets out of sync
- No type definitions: Poor DX for TypeScript users (large portion of npm ecosystem)

**Implementation Notes**:

```javascript
/**
 * LCARS Panel component for displaying content in LCARS-styled containers
 * @element lcars-panel
 *
 * @attr {string} data-theme - Theme name (e.g., "2357")
 * @attr {string} variant - Panel style variant ("standard" | "alert" | "info")
 *
 * @csspart panel - The main panel container
 * @csspart header - The panel header section
 *
 * @cssprop --panel-bg - Background color
 * @cssprop --panel-border - Border color
 */
class LcarsPanel extends HTMLElement {
  // ... implementation
}
```

Generate types:

```bash
tsc src/**/*.js --declaration --allowJs --emitDeclarationOnly --outDir dist/types
```

### 5. Polyfill Strategy (Custom Elements, Shadow DOM, Popover, Invokers)

**Decision**: Use conditional polyfill loading with feature detection, bundle polyfills separately, document browser support matrix

**Rationale**:

- **@webcomponents/webcomponentsjs**: Industry-standard polyfill for Custom Elements v1 and Shadow DOM
- **Conditional loading**: Only load polyfills if `customElements` or `attachShadow` unavailable
- **Popover/Invoker polyfills**: Only load if components use these APIs (likely not in MVP panel/button)
- Separate polyfill bundle: Users can choose to exclude if targeting modern browsers only
- Document browser support clearly (modern browsers native, older browsers via polyfills)

**Alternatives Considered**:

- No polyfills: Excludes older browser users, violates SC-003 (older browser support)
- Always bundle polyfills: Unnecessary bytes for 95%+ of users on modern browsers
- Multiple build targets: Complex, larger distribution surface, maintenance burden

**Implementation Notes**:

```javascript
// src/polyfills/index.js
export async function loadPolyfills() {
  const promises = [];

  // Custom Elements + Shadow DOM
  if (!("customElements" in window) || !("attachShadow" in Element.prototype)) {
    promises.push(
      import(
        "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"
      ).then(() =>
        import("@webcomponents/webcomponentsjs/webcomponents-bundle.js")
      )
    );
  }

  // Popover API (if used in components)
  if (!("popover" in HTMLElement.prototype)) {
    // promises.push(import('popover-polyfill'));
  }

  await Promise.all(promises);
}

// Usage in main entry point
// await loadPolyfills();
// Then register components
```

### 6. npm Package Structure and Build Process

**Decision**: Use esbuild for bundling, dual exports (ESM + types), minimal package.json config, document installation and usage

**Rationale**:

- **esbuild**: Extremely fast bundler, handles ES modules, minification, tree-shaking
- **ESM only**: Modern standard, supported by all target browsers and Node 14+
- **package.json exports field**: Explicit entry points, better for tree-shaking
- **Separate polyfill entry**: `lcars-ui/polyfills` for users who need it
- **Type definitions**: Include in package, point to via `types` field

**Alternatives Considered**:

- Rollup: Slower than esbuild, more complex config
- Webpack: Overkill for library bundling, slow
- Multiple module formats (UMD/CJS): Adds bundle complexity, not needed with ESM ubiquity

**Implementation Notes**:

```json
// package.json
{
  "name": "lcars-ui",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/lcars-ui.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "default": "./dist/lcars-ui.js"
    },
    "./polyfills": {
      "default": "./dist/polyfills.js"
    }
  },
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "node build.js",
    "dev": "node build.js --watch"
  },
  "devDependencies": {
    "esbuild": "^0.19.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

Build script (build.js):

```javascript
import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "esm",
  outfile: "dist/lcars-ui.js",
  minify: true,
  sourcemap: true,
});

// Separate polyfill bundle
await esbuild.build({
  entryPoints: ["src/polyfills/index.js"],
  bundle: true,
  format: "esm",
  outfile: "dist/polyfills.js",
  minify: true,
});
```

### 7. Accessibility Implementation (WCAG 2.1 AA for Web Components)

**Decision**: Use semantic HTML in Shadow DOM, ARIA labels on custom elements, keyboard navigation via tabindex and event handlers, focus management, high contrast theme colors

**Rationale**:

- **Semantic HTML**: Use `<button>`, `<section>`, etc. inside Shadow DOM templates
- **ARIA on host element**: Add role, aria-label on custom element if semantics unclear
- **Keyboard navigation**: Ensure all interactive elements focusable (tabindex="0" where needed)
- **Focus management**: Trap focus in modals, restore focus on close
- **Color contrast**: Verify 2357 theme colors meet WCAG AA ratios (4.5:1 for text, 3:1 for UI components)
- **Focus indicators**: Clear :focus-visible styles (2px outline, high contrast color)

**Alternatives Considered**:

- Rely on browser defaults only: Insufficient for custom elements, poor UX
- Skip ARIA: Violates WCAG, excludes screen reader users (non-negotiable per Constitution)
- Use only aria-label without semantic HTML: Poor semantics, harder to maintain

**Implementation Notes**:

```javascript
// lcars-button component
class LcarsButton extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "closed" });
    this.shadowRoot.innerHTML = `
      <style>
        button {
          /* ... LCARS styles ... */
        }
        button:focus-visible {
          outline: 2px solid var(--lcars-anakiwa);
          outline-offset: 2px;
        }
      </style>
      <button part="button" type="button">
        <slot></slot>
      </button>
    `;

    // Forward keyboard events
    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", (e) => {
      this.dispatchEvent(
        new CustomEvent("lcars-click", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}
```

Color contrast verification for 2357 theme:

- pale-canary (#ff9 / #ffff99): High luminance, use with dark text
- golden-tanoi (#fc6 / #ffcc66): Medium-high luminance, dark text
- neon-carrot (#f93 / #ff9933): Medium luminance, requires contrast check
- eggplant (#646 / #664466): Low luminance, light text required
- baltic-blue (#069 / #006699): Low-medium luminance, light text required

## Summary

All technical unknowns resolved:

1. ✅ LCARS visual design: CSS Grid + custom properties + geometric shapes
2. ✅ Web Components approach: Autonomous custom elements + closed Shadow DOM
3. ✅ Theme inheritance: CSS custom properties + data-theme attribute traversal
4. ✅ TypeScript support: JSDoc + tsc for .d.ts generation
5. ✅ Polyfill strategy: Conditional loading with @webcomponents/webcomponentsjs
6. ✅ npm packaging: esbuild + ESM exports + types field
7. ✅ Accessibility: Semantic HTML + ARIA + keyboard nav + WCAG AA contrast

No blockers for Phase 1 design work. Ready to proceed with data model and component contracts.
