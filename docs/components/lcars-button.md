# Component API Contract: lcars-button

**Component**: `<lcars-button>`
**Version**: 0.1.0
**Type**: Web Component (Custom Element)

## Interface

### HTML Usage

```html
<!-- Basic usage -->
<lcars-button>Engage</lcars-button>

<!-- With theme -->
<lcars-button data-theme="2357">Fire Photon Torpedoes</lcars-button>

<!-- With variant and size -->
<lcars-button variant="danger" size="large">Eject Warp Core</lcars-button>

<!-- Disabled -->
<lcars-button disabled>Offline</lcars-button>

<!-- In themed container -->
<div data-theme="2357">
  <lcars-button>Inherits theme</lcars-button>
</div>
```

### JavaScript Usage

```javascript
// Import component
import "lcars-ui/components/lcars-button";

// Create programmatically
const button = document.createElement("lcars-button");
button.setAttribute("variant", "primary");
button.textContent = "Click Me";
button.addEventListener("lcars-click", (e) => {
  console.log("Button clicked!", e.detail);
});
document.body.appendChild(button);

// Toggle disabled state
const btn = document.querySelector("lcars-button");
btn.setAttribute("disabled", ""); // Disable
btn.removeAttribute("disabled"); // Enable
```

## Attributes

### `data-theme`

- **Type**: `string`
- **Required**: No
- **Default**: `"2357"` (inherited from parent or root)
- **Valid Values**: Any registered theme name (currently only `"2357"`)
- **Description**: Specifies the color theme for the button
- **Behavior**: If not set on component, traverses up DOM to find closest `[data-theme]` ancestor. Falls back to `:root` theme if none found.

**Example**:

```html
<lcars-button data-theme="2357">Themed Button</lcars-button>
```

### `variant`

- **Type**: `string`
- **Required**: No
- **Default**: `"primary"`
- **Valid Values**: `"primary"` | `"secondary"` | `"danger"`
- **Description**: Visual style variant affecting color scheme and semantic meaning
- **Behavior**:
  - `"primary"`: Main action (mariner blue background)
  - `"secondary"`: Secondary action (lilac/anakiwa accents)
  - `"danger"`: Destructive action (neon-carrot/pale-canary warnings)
  - Invalid value → defaults to `"primary"` and logs warning

**Example**:

```html
<lcars-button variant="primary">Confirm</lcars-button>
<lcars-button variant="secondary">Cancel</lcars-button>
<lcars-button variant="danger">Delete</lcars-button>
```

### `size`

- **Type**: `string`
- **Required**: No
- **Default**: `"medium"`
- **Valid Values**: `"small"` | `"medium"` | `"large"`
- **Description**: Button size variant
- **Behavior**:
  - `"small"`: Compact button (0.375rem padding, 0.875rem font)
  - `"medium"`: Standard button (0.5rem padding, 1rem font)
  - `"large"`: Prominent button (0.75rem padding, 1.125rem font)
  - Invalid value → defaults to `"medium"` and logs warning

**Example**:

```html
<lcars-button size="small">Small</lcars-button>
<lcars-button size="medium">Medium</lcars-button>
<lcars-button size="large">Large</lcars-button>
```

### `disabled`

- **Type**: Boolean attribute
- **Required**: No
- **Default**: `false` (button is enabled)
- **Valid Values**: Presence = `true`, Absence = `false`
- **Description**: Disables button interaction
- **Behavior**: When present:
  - Button cannot be clicked
  - Uses disabled styling (eggplant background, gray text)
  - Not focusable via keyboard
  - `lcars-click` event will not fire

**Example**:

```html
<lcars-button disabled>Offline</lcars-button>
```

## CSS Parts (Shadow Parts)

### `button`

- **Element**: Internal `<button>` element
- **Description**: The actual button element inside Shadow DOM
- **Use Case**: Style the button directly from outside

**Example**:

```css
lcars-button::part(button) {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

lcars-button::part(button):hover {
  transform: translateY(-2px);
}
```

## CSS Custom Properties (CSS Variables)

### `--button-bg`

- **Type**: CSS color
- **Default**: `var(--lcars-mariner)` (from theme)
- **Description**: Button background color (normal state)

### `--button-bg-hover`

- **Type**: CSS color
- **Default**: `var(--lcars-anakiwa)` (from theme)
- **Description**: Background color on hover

### `--button-bg-active`

- **Type**: CSS color
- **Default**: `var(--lcars-baltic-blue)` (from theme)
- **Description**: Background color when pressed/active

### `--button-bg-disabled`

- **Type**: CSS color
- **Default**: `var(--lcars-eggplant)` (from theme)
- **Description**: Background color when disabled

### `--button-color`

- **Type**: CSS color
- **Default**: `#fff`
- **Description**: Button text color (normal state)

### `--button-color-disabled`

- **Type**: CSS color
- **Default**: `#999`
- **Description**: Text color when disabled

### `--button-border-radius`

- **Type**: CSS length
- **Default**: `20px`
- **Description**: Corner radius (pill shape)

### `--button-padding`

- **Type**: CSS length
- **Default**: `0.5rem 1.5rem`
- **Description**: Internal padding (vertical horizontal)

### `--button-font-size`

- **Type**: CSS length
- **Default**: `1rem`
- **Description**: Text size

### `--button-min-width`

- **Type**: CSS length
- **Default**: `80px`
- **Description**: Minimum button width

**Example**:

```css
lcars-button {
  --button-bg: #3366cc;
  --button-bg-hover: #99ccff;
  --button-padding: 0.75rem 2rem;
  --button-border-radius: 25px;
}
```

## Slots

### Default Slot

- **Name**: (unnamed/default)
- **Description**: Button label text/content
- **Required**: No (button can be empty, though not recommended for accessibility)

**Example**:

```html
<lcars-button>
  <span>Click Me</span>
</lcars-button>

<!-- With icon (user-provided) -->
<lcars-button>
  <svg>...</svg>
  Launch
</lcars-button>
```

## Events

### `lcars-click`

- **Type**: `CustomEvent`
- **Bubbles**: `true`
- **Composed**: `true` (crosses Shadow DOM boundary)
- **Cancelable**: `false`
- **Detail**: `{ originalEvent: MouseEvent | KeyboardEvent }`
- **Description**: Fired when button is clicked (via mouse or keyboard)
- **Behavior**:
  - Only fires if button is NOT disabled
  - Triggered by: mouse click, Enter key, Space key
  - Original DOM event available in `detail.originalEvent`

**Example**:

```javascript
const button = document.querySelector("lcars-button");

button.addEventListener("lcars-click", (event) => {
  console.log("Button clicked!");
  console.log("Original event:", event.detail.originalEvent);

  // Perform action
  alert("Engaging warp drive!");
});
```

## Accessibility

### ARIA

- Component wraps a semantic `<button>` element (inherits native button semantics)
- Implicit role: `button`
- No additional ARIA attributes needed for basic usage
- Screen readers announce as "Button: [label text]"

### Keyboard Navigation

- **Focusable**: Yes (unless disabled)
- **Focus indicator**: 2px solid outline in `--lcars-anakiwa` color with 2px offset
- **Activation**:
  - `Enter` key: Triggers click
  - `Space` key: Triggers click
  - Both fire `lcars-click` event

### Focus Management

- Uses `:focus-visible` for keyboard-only focus indicators (no mouse focus ring)
- Disabled buttons are not focusable (`tabindex` automatically removed)

### Best Practices

- Always provide meaningful label text in default slot
- For icon-only buttons, add `aria-label` attribute on component:
  ```html
  <lcars-button aria-label="Close dialog">
    <svg>...</svg>
  </lcars-button>
  ```
- Use `disabled` attribute for unavailable actions (don't hide buttons)
- Use appropriate `variant` for semantic meaning (e.g., "danger" for destructive actions)

## TypeScript Definition

```typescript
declare global {
  interface HTMLElementTagNameMap {
    "lcars-button": LcarsButton;
  }
}

export interface LcarsClickEventDetail {
  originalEvent: MouseEvent | KeyboardEvent;
}

export declare class LcarsButton extends HTMLElement {
  static readonly observedAttributes: string[];

  /**
   * Theme identifier
   */
  "data-theme"?: string;

  /**
   * Visual style variant
   */
  variant?: "primary" | "secondary" | "danger";

  /**
   * Button size
   */
  size?: "small" | "medium" | "large";

  /**
   * Disabled state
   */
  disabled?: boolean;

  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void;
}

export interface LcarsButtonEventMap {
  "lcars-click": CustomEvent<LcarsClickEventDetail>;
}

declare global {
  interface HTMLElementEventMap extends LcarsButtonEventMap {}
}
```

## Browser Support

- **Modern browsers** (native): Chrome 90+, Firefox 88+, Safari 15+, Edge 90+
- **Older browsers** (with polyfills): IE 11+, older Chrome/Firefox/Safari versions

## Package Import

```javascript
// Import component (auto-registers)
import "lcars-ui/components/lcars-button";

// Or import all components
import "lcars-ui";
```

## Versioning

This contract follows semantic versioning:

- **MAJOR**: Breaking changes to attributes, slots, events, or event detail structure
- **MINOR**: New attributes, CSS properties, parts, or optional features (backward-compatible)
- **PATCH**: Bug fixes, documentation updates, internal improvements

Current version: **0.1.0** (initial MVP)
