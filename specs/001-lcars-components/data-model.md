# Data Model: LCARS UI Component Library

**Phase**: 1 (Design & Contracts)
**Date**: 2025-11-07
**Feature**: 001-lcars-components

## Overview

This document defines the data structures and component models for the LCARS UI component library. Since this is a UI component library with no backend or persistent storage, the "data model" consists of component properties, attributes, CSS custom properties, and events.

## Component Model: LcarsPanel

**Purpose**: Display content in an LCARS-styled container with themed background and borders

**Element Name**: `<lcars-panel>`

### Attributes

| Attribute    | Type   | Required | Default    | Validation                          | Description                                         |
| ------------ | ------ | -------- | ---------- | ----------------------------------- | --------------------------------------------------- |
| `data-theme` | string | No       | "2357"     | Must be valid theme name            | Theme identifier (inherited from parent if not set) |
| `variant`    | string | No       | "standard" | One of: "standard", "alert", "info" | Visual style variant affecting color scheme         |
| `label`      | string | No       | null       | Any string                          | Optional header label text                          |

### CSS Parts (Shadow DOM)

| Part      | Description                            | Use Case                                       |
| --------- | -------------------------------------- | ---------------------------------------------- |
| `panel`   | The main container element             | Style the overall panel container from outside |
| `header`  | The header section (if label provided) | Style the panel header separately              |
| `content` | The content slot container             | Style the content area                         |

### CSS Custom Properties

| Property                | Default                     | Description                           |
| ----------------------- | --------------------------- | ------------------------------------- |
| `--panel-bg`            | `var(--lcars-golden-tanoi)` | Panel background color                |
| `--panel-border`        | `var(--lcars-neon-carrot)`  | Panel border color                    |
| `--panel-border-width`  | `4px`                       | Border thickness                      |
| `--panel-border-radius` | `12px`                      | Corner radius (elbows)                |
| `--panel-padding`       | `1rem`                      | Internal padding                      |
| `--panel-header-bg`     | `var(--lcars-neon-carrot)`  | Header background (if label provided) |
| `--panel-header-color`  | `#000`                      | Header text color                     |

### Events

| Event | Type | Detail | Bubbles | Composed | Description                          |
| ----- | ---- | ------ | ------- | -------- | ------------------------------------ |
| N/A   | -    | -      | -       | -        | Panel is non-interactive (no events) |

### Slots

| Slot      | Description              |
| --------- | ------------------------ |
| (default) | Panel content (any HTML) |

### State

| State   | Type   | Description                                                      |
| ------- | ------ | ---------------------------------------------------------------- |
| `theme` | string | Current theme name (derived from data-theme attribute or parent) |

### Lifecycle

1. **Construction**: `constructor()` - Create Shadow DOM (closed), initialize internal state
2. **Connection**: `connectedCallback()` - Render template, apply theme, set up mutation observers (if needed)
3. **Attribute Change**: `attributeChangedCallback(name, oldValue, newValue)` - React to data-theme or variant changes
4. **Disconnection**: `disconnectedCallback()` - Clean up observers (if any)

### Validation Rules

- `variant` must be one of: "standard", "alert", "info"
  - Invalid values → default to "standard", log warning
- `data-theme` if provided must be a known theme name
  - Unknown theme → fall back to "2357", log warning
- `label` accepts any string, HTML-escaped for XSS safety

## Component Model: LcarsButton

**Purpose**: Interactive button control with LCARS styling and accessibility

**Element Name**: `<lcars-button>`

### Attributes

| Attribute    | Type    | Required | Default   | Validation                               | Description                                         |
| ------------ | ------- | -------- | --------- | ---------------------------------------- | --------------------------------------------------- |
| `data-theme` | string  | No       | "2357"    | Must be valid theme name                 | Theme identifier (inherited from parent if not set) |
| `disabled`   | boolean | No       | false     | Boolean attribute                        | Disables button interaction                         |
| `variant`    | string  | No       | "primary" | One of: "primary", "secondary", "danger" | Visual style variant                                |
| `size`       | string  | No       | "medium"  | One of: "small", "medium", "large"       | Button size                                         |

### CSS Parts (Shadow DOM)

| Part     | Description                 | Use Case                      |
| -------- | --------------------------- | ----------------------------- |
| `button` | The internal button element | Style the button from outside |

### CSS Custom Properties

| Property                  | Default                    | Description                |
| ------------------------- | -------------------------- | -------------------------- |
| `--button-bg`             | `var(--lcars-mariner)`     | Button background color    |
| `--button-bg-hover`       | `var(--lcars-anakiwa)`     | Background on hover        |
| `--button-bg-active`      | `var(--lcars-baltic-blue)` | Background on click/active |
| `--button-bg-disabled`    | `var(--lcars-eggplant)`    | Background when disabled   |
| `--button-color`          | `#fff`                     | Button text color          |
| `--button-color-disabled` | `#999`                     | Text color when disabled   |
| `--button-border-radius`  | `20px`                     | Rounded pill shape         |
| `--button-padding`        | `0.5rem 1.5rem`            | Internal padding           |
| `--button-font-size`      | `1rem`                     | Text size                  |
| `--button-min-width`      | `80px`                     | Minimum button width       |

### Events

| Event         | Type        | Detail                          | Bubbles | Composed | Description                                 |
| ------------- | ----------- | ------------------------------- | ------- | -------- | ------------------------------------------- |
| `lcars-click` | CustomEvent | `{ originalEvent: MouseEvent }` | true    | true     | Fired when button is clicked (not disabled) |

### Slots

| Slot      | Description               |
| --------- | ------------------------- |
| (default) | Button label text/content |

### State

| State      | Type    | Description                                       |
| ---------- | ------- | ------------------------------------------------- |
| `theme`    | string  | Current theme name (derived from data-theme)      |
| `disabled` | boolean | Whether button is disabled                        |
| `variant`  | string  | Visual variant ("primary", "secondary", "danger") |
| `size`     | string  | Size variant ("small", "medium", "large")         |

### Lifecycle

1. **Construction**: `constructor()` - Create Shadow DOM (closed), bind event handlers
2. **Connection**: `connectedCallback()` - Render template, apply theme, set up keyboard handlers
3. **Attribute Change**: `attributeChangedCallback(name, oldValue, newValue)` - React to disabled, variant, size, data-theme changes
4. **Disconnection**: `disconnectedCallback()` - Clean up event listeners

### Validation Rules

- `variant` must be one of: "primary", "secondary", "danger"
  - Invalid → default to "primary", log warning
- `size` must be one of: "small", "medium", "large"
  - Invalid → default to "medium", log warning
- `disabled` is boolean attribute (presence = true, absence = false)

### Accessibility

- Internal `<button>` element ensures semantic HTML
- `disabled` attribute passed to internal button
- Keyboard navigation: Enter/Space trigger click
- Focus indicator: 2px outline in `--lcars-anakiwa` color
- ARIA: Inherits button semantics from internal element
- Label: Slot content serves as accessible label

## Theme Model: 2357 Color Palette

**Purpose**: Define the Star Trek LCARS 2357-era color scheme

**Type**: CSS Custom Properties

### Color Definitions

| Color Name   | Hex Value | RGB                | Use Case                        | Contrast Notes                     |
| ------------ | --------- | ------------------ | ------------------------------- | ---------------------------------- |
| pale-canary  | #ffff99   | rgb(255, 255, 153) | Highlights, alerts              | High luminance, use with dark text |
| golden-tanoi | #ffcc66   | rgb(255, 204, 102) | Primary backgrounds, headers    | Medium-high luminance, dark text   |
| neon-carrot  | #ff9933   | rgb(255, 153, 51)  | Accents, borders                | Medium luminance, test contrast    |
| eggplant     | #664466   | rgb(102, 68, 102)  | Disabled states, shadows        | Low luminance, light text required |
| lilac        | #cc99cc   | rgb(204, 153, 204) | Secondary highlights            | Medium luminance                   |
| anakiwa      | #99ccff   | rgb(153, 204, 255) | Info states, focus indicators   | Medium-high luminance              |
| mariner      | #3366cc   | rgb(51, 102, 204)  | Primary interactive (buttons)   | Medium luminance, light text       |
| baltic-blue  | #006699   | rgb(0, 102, 153)   | Active states, deep backgrounds | Low-medium luminance, light text   |

### CSS Variable Structure

```css
:root,
[data-theme="2357"] {
  /* 2357 Theme Colors */
  --lcars-pale-canary: #ffff99;
  --lcars-golden-tanoi: #ffcc66;
  --lcars-neon-carrot: #ff9933;
  --lcars-eggplant: #664466;
  --lcars-lilac: #cc99cc;
  --lcars-anakiwa: #99ccff;
  --lcars-mariner: #3366cc;
  --lcars-baltic-blue: #006699;

  /* Semantic color assignments */
  --lcars-primary-bg: var(--lcars-golden-tanoi);
  --lcars-primary-border: var(--lcars-neon-carrot);
  --lcars-interactive: var(--lcars-mariner);
  --lcars-interactive-hover: var(--lcars-anakiwa);
  --lcars-interactive-active: var(--lcars-baltic-blue);
  --lcars-disabled: var(--lcars-eggplant);
  --lcars-alert: var(--lcars-pale-canary);
  --lcars-info: var(--lcars-anakiwa);
}
```

### Theme Inheritance Logic

1. Component checks for `data-theme` attribute on itself
2. If not found, traverses up DOM tree using `this.closest('[data-theme]')`
3. If still not found, uses default theme "2357" from `:root`
4. CSS custom properties automatically inherit through Shadow DOM boundary
5. Components reference theme colors via `var(--lcars-*)` in their Shadow styles

## Utility Models

### ThemeManager (Helper Utility)

**Purpose**: Detect and manage theme inheritance for components

**Type**: JavaScript utility class/functions

**Methods**:

```typescript
/**
 * Get the effective theme for an element
 * @param {HTMLElement} element - The element to check
 * @returns {string} Theme name (e.g., "2357")
 */
function getEffectiveTheme(element: HTMLElement): string;

/**
 * Apply theme to component Shadow DOM
 * @param {ShadowRoot} shadowRoot - Component's shadow root
 * @param {string} themeName - Theme to apply
 */
function applyTheme(shadowRoot: ShadowRoot, themeName: string): void;
```

**Implementation Strategy**:

- Check `element.dataset.theme` first
- If not found, use `element.closest('[data-theme]')?.dataset.theme`
- Fall back to "2357" if no theme found
- No-op for theme application (CSS variables handle it automatically)

## Relationships

```text
[Document/Container with data-theme="2357"]
  │
  ├─> [lcars-panel] (inherits theme)
  │     └─> [Shadow DOM]
  │           ├─> [style] (uses --lcars-* variables)
  │           └─> [slot] (can contain other components)
  │                 └─> [lcars-button] (inherits theme from panel or container)
  │                       └─> [Shadow DOM]
  │                             ├─> [style] (uses --lcars-* variables)
  │                             └─> [button] (semantic HTML)
  │
  └─> [lcars-button] (sibling, inherits theme from same container)
```

## Validation Summary

| Entity              | Validation Rules                            | Error Handling                       |
| ------------------- | ------------------------------------------- | ------------------------------------ |
| LcarsPanel.variant  | Must be "standard", "alert", or "info"      | Default to "standard" + console.warn |
| LcarsButton.variant | Must be "primary", "secondary", or "danger" | Default to "primary" + console.warn  |
| LcarsButton.size    | Must be "small", "medium", or "large"       | Default to "medium" + console.warn   |
| Theme colors        | Must be valid CSS color values              | Use fallback from :root              |
| data-theme          | Must reference known theme name             | Fall back to "2357" + console.warn   |

## Extension Points (Future)

For MVP (Phase 1), only `lcars-panel` and `lcars-button` are implemented. Future components may include:

- `lcars-display` - Read-only text display with LCARS styling
- `lcars-divider` - Decorative separator bar
- `lcars-header` - Section header component
- `lcars-elbow` - Distinctive rounded corner element

These will follow the same data model patterns (attributes, CSS parts, custom properties, events).
