# Component API Contract: lcars-panel

**Component**: `<lcars-panel>`
**Version**: 0.1.0
**Type**: Web Component (Custom Element)

## Interface

### HTML Usage

```html
<!-- Basic usage -->
<lcars-panel>
  <p>Content goes here</p>
</lcars-panel>

<!-- With theme -->
<lcars-panel data-theme="2357">
  <p>Themed panel content</p>
</lcars-panel>

<!-- With variant and label -->
<lcars-panel variant="alert" label="Warning">
  <p>Alert message</p>
</lcars-panel>

<!-- Nested in themed container -->
<div data-theme="2357">
  <lcars-panel>
    <p>Inherits theme from parent</p>
  </lcars-panel>
</div>
```

### JavaScript Usage

```javascript
// Import component
import "lcars-ui/components/lcars-panel";

// Create programmatically
const panel = document.createElement("lcars-panel");
panel.setAttribute("variant", "info");
panel.setAttribute("label", "Information");
panel.textContent = "Dynamic content";
document.body.appendChild(panel);

// Access via query selector
const existingPanel = document.querySelector("lcars-panel");
console.log(existingPanel.getAttribute("variant")); // "standard"
```

## Attributes

### `data-theme`

- **Type**: `string`
- **Required**: No
- **Default**: `"2357"` (inherited from parent or root)
- **Valid Values**: Any registered theme name (currently only `"2357"`)
- **Description**: Specifies the color theme for the panel
- **Behavior**: If not set on component, traverses up DOM to find closest `[data-theme]` ancestor. Falls back to `:root` theme if none found.

**Example**:

```html
<lcars-panel data-theme="2357">Content</lcars-panel>
```

### `variant`

- **Type**: `string`
- **Required**: No
- **Default**: `"standard"`
- **Valid Values**: `"standard"` | `"alert"` | `"info"`
- **Description**: Visual style variant affecting color scheme
- **Behavior**:
  - `"standard"`: Uses default theme colors (golden-tanoi background)
  - `"alert"`: Uses alert colors (pale-canary accents)
  - `"info"`: Uses info colors (anakiwa accents)
  - Invalid value → defaults to `"standard"` and logs warning

**Example**:

```html
<lcars-panel variant="alert">Alert panel</lcars-panel>
<lcars-panel variant="info">Info panel</lcars-panel>
```

### `label`

- **Type**: `string`
- **Required**: No
- **Default**: `null` (no header)
- **Valid Values**: Any string
- **Description**: Optional header label text displayed above panel content
- **Behavior**: If provided, renders a header section with label text. Text is HTML-escaped for security.

**Example**:

```html
<lcars-panel label="Systems Status">
  <p>All systems operational</p>
</lcars-panel>
```

## CSS Parts (Shadow Parts)

Parts allow external styling of internal Shadow DOM elements using `::part()` selector.

### `panel`

- **Element**: Main container `<div>`
- **Description**: The outer panel container
- **Use Case**: Style overall panel dimensions, layout, or shadows

**Example**:

```css
lcars-panel::part(panel) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
}
```

### `header`

- **Element**: Header container `<div>` (only if `label` attribute provided)
- **Description**: The header section containing the label
- **Use Case**: Style header separately from content area

**Example**:

```css
lcars-panel::part(header) {
  text-transform: uppercase;
  font-weight: bold;
}
```

### `content`

- **Element**: Content wrapper `<div>`
- **Description**: The container wrapping the default slot
- **Use Case**: Style content area padding, alignment, or overflow

**Example**:

```css
lcars-panel::part(content) {
  padding: 2rem;
  overflow-y: auto;
}
```

## CSS Custom Properties (CSS Variables)

These properties can be set on the component or any ancestor to customize appearance.

### `--panel-bg`

- **Type**: CSS color
- **Default**: `var(--lcars-golden-tanoi)` (from theme)
- **Description**: Panel background color

### `--panel-border`

- **Type**: CSS color
- **Default**: `var(--lcars-neon-carrot)` (from theme)
- **Description**: Panel border color

### `--panel-border-width`

- **Type**: CSS length
- **Default**: `4px`
- **Description**: Border thickness

### `--panel-border-radius`

- **Type**: CSS length
- **Default**: `12px`
- **Description**: Corner radius for "elbow" effect

### `--panel-padding`

- **Type**: CSS length
- **Default**: `1rem`
- **Description**: Internal content padding

### `--panel-header-bg`

- **Type**: CSS color
- **Default**: `var(--lcars-neon-carrot)` (from theme)
- **Description**: Header background color (if label provided)

### `--panel-header-color`

- **Type**: CSS color
- **Default**: `#000`
- **Description**: Header text color

**Example**:

```css
lcars-panel {
  --panel-bg: #ffcc66;
  --panel-border: #ff9933;
  --panel-border-width: 6px;
  --panel-padding: 1.5rem;
}
```

## Slots

### Default Slot

- **Name**: (unnamed/default)
- **Description**: Panel content (any HTML)
- **Required**: No (panel can be empty)

**Example**:

```html
<lcars-panel>
  <h2>Title</h2>
  <p>Paragraph content</p>
  <button>Button</button>
</lcars-panel>
```

## Events

This component does not emit any custom events (it is non-interactive).

## Accessibility

### ARIA

- Component uses semantic HTML internally (`<div>` with appropriate styling)
- No implicit ARIA role (panel is purely visual container)
- Screen readers treat content as part of document flow

### Keyboard Navigation

- Panel itself is not keyboard-interactive (container only)
- Focus passes through to slotted interactive content

### Best Practices

- Use `label` attribute for meaningful panel headers
- Ensure slotted content has proper headings and semantic structure
- If panel represents a significant section, consider wrapping in `<section>` or `<article>` outside the component

## TypeScript Definition

```typescript
declare global {
  interface HTMLElementTagNameMap {
    "lcars-panel": LcarsPanel;
  }
}

export declare class LcarsPanel extends HTMLElement {
  static readonly observedAttributes: string[];

  /**
   * Theme identifier
   */
  "data-theme"?: string;

  /**
   * Visual style variant
   */
  variant?: "standard" | "alert" | "info";

  /**
   * Optional header label text
   */
  label?: string;

  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void;
}
```

## Browser Support

- **Modern browsers** (native): Chrome 90+, Firefox 88+, Safari 15+, Edge 90+
- **Older browsers** (with polyfills): IE 11+, older Chrome/Firefox/Safari versions

## Package Import

```javascript
// Import component (auto-registers)
import "lcars-ui/components/lcars-panel";

// Or import all components
import "lcars-ui";
```

## Versioning

This contract follows semantic versioning:

- **MAJOR**: Breaking changes to attributes, slots, or events
- **MINOR**: New attributes, CSS properties, or parts (backward-compatible)
- **PATCH**: Bug fixes, documentation updates

Current version: **0.1.0** (initial MVP)
