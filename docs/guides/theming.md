# LCARS Theming Guide

## Overview

The LCARS UI Component Library uses CSS custom properties (variables) for theming. This guide explains how theme inheritance works and how to customize themes.

## The 2357 Theme

The default theme is "2357", representing the Star Trek: The Next Generation era color palette.

### Color Palette

| Color Name   | Hex Value | RGB                | Usage                           |
| ------------ | --------- | ------------------ | ------------------------------- |
| pale-canary  | `#ffff99` | rgb(255, 255, 153) | Alerts, highlights              |
| golden-tanoi | `#ffcc66` | rgb(255, 204, 102) | Primary backgrounds, headers    |
| neon-carrot  | `#ff9933` | rgb(255, 153, 51)  | Accents, borders                |
| eggplant     | `#664466` | rgb(102, 68, 102)  | Disabled states, shadows        |
| lilac        | `#cc99cc` | rgb(204, 153, 204) | Secondary highlights            |
| anakiwa      | `#99ccff` | rgb(153, 204, 255) | Info states, focus indicators   |
| mariner      | `#3366cc` | rgb(51, 102, 204)  | Primary interactive (buttons)   |
| baltic-blue  | `#006699` | rgb(0, 102, 153)   | Active states, deep backgrounds |

## Applying Themes

### Using data-theme Attribute

Apply the theme to any container element:

```html
<div data-theme="2357">
  <lcars-panel>Content</lcars-panel>
  <lcars-button>Action</lcars-button>
</div>
```

All child components automatically inherit the theme.

### Default Theme

If no `data-theme` is specified, components use the 2357 theme as the default (defined at `:root`).

```html
<!-- No theme specified - uses default 2357 -->
<lcars-panel>This uses 2357 theme by default</lcars-panel>
```

### Theme Inheritance

Themes cascade from parent to child. Components check:

1. Their own `data-theme` attribute
2. The closest parent with `[data-theme]`
3. Fall back to `:root` default (2357)

```html
<div data-theme="2357">
  <lcars-panel>Uses 2357 from parent</lcars-panel>

  <div>
    <lcars-panel>Still uses 2357 (inherits through DOM)</lcars-panel>
  </div>
</div>
```

## Customizing Theme Colors

### Override Specific Colors

You can override theme colors using CSS custom properties:

```css
:root {
  --lcars-mariner: #4477dd; /* Custom blue for buttons */
  --lcars-golden-tanoi: #ffdd77; /* Custom background */
}
```

### Component-Specific Customization

Override colors for specific components:

```css
lcars-panel {
  --panel-bg: #ffcc66;
  --panel-border: #ff9933;
  --panel-border-width: 6px;
}
```

### Per-Instance Customization

Use inline styles for individual component instances:

```html
<lcars-panel style="--panel-bg: #ff9; --panel-border: #f93;">
  Custom colored panel
</lcars-panel>
```

## Available CSS Custom Properties

### Theme-Level Properties

Defined at `:root` or `[data-theme="2357"]`:

- `--lcars-pale-canary`
- `--lcars-golden-tanoi`
- `--lcars-neon-carrot`
- `--lcars-eggplant`
- `--lcars-lilac`
- `--lcars-anakiwa`
- `--lcars-mariner`
- `--lcars-baltic-blue`

### Semantic Aliases

- `--lcars-primary-bg`
- `--lcars-primary-border`
- `--lcars-interactive`
- `--lcars-interactive-hover`
- `--lcars-interactive-active`
- `--lcars-disabled`
- `--lcars-alert`
- `--lcars-info`

### Component-Specific Properties

See individual component documentation for available properties:

- [lcars-panel](../components/lcars-panel.md)
- [lcars-button](../components/lcars-button.md)

## Examples

### Example 1: Global Theme Override

```css
:root {
  /* Make all panels brighter */
  --lcars-golden-tanoi: #ffdd88;
  --lcars-neon-carrot: #ffaa44;
}
```

### Example 2: Dark Mode Alternative

```css
[data-theme="2357-dark"] {
  --lcars-golden-tanoi: #886633;
  --lcars-neon-carrot: #664422;
  /* Adjust other colors for dark mode */
}
```

```html
<div data-theme="2357-dark">
  <!-- Components use dark theme -->
</div>
```

### Example 3: Per-Component Styling

```html
<style>
  .warning-panel {
    --panel-bg: var(--lcars-pale-canary);
    --panel-border: var(--lcars-neon-carrot);
    --panel-border-width: 8px;
  }
</style>

<lcars-panel class="warning-panel"> Important warning message </lcars-panel>
```

## Best Practices

1. **Apply themes at container level**: Use `data-theme` on parent containers, not individual components
2. **Use semantic aliases**: Prefer `--lcars-interactive` over `--lcars-mariner` for better maintainability
3. **Test color contrast**: Ensure customizations meet WCAG 2.1 AA standards (4.5:1 for text)
4. **Document custom themes**: If creating new themes, document the color choices and use cases
5. **Respect Shadow DOM**: CSS custom properties inherit through Shadow DOM boundaries, but other styles don't

## Shadow DOM and Theming

LCARS components use Shadow DOM with **closed** mode for encapsulation. CSS custom properties (theme colors) automatically inherit through the Shadow DOM boundary, enabling theme cascading while maintaining style isolation.

```html
<div style="--lcars-mariner: #4477dd;">
  <lcars-button>
    <!-- Button's Shadow DOM inherits the custom property -->
  </lcars-button>
</div>
```

## Future Themes

Currently, only the 2357 theme is available. Future versions may include:

- 2364 (later TNG era)
- 2371 (Voyager era)
- 2379 (Nemesis era)

Theme names will follow the Star Trek stardate convention.

## Troubleshooting

### Theme not applying

- Check that `data-theme` attribute is on a parent element
- Verify the theme name is valid ("2357")
- Inspect element in DevTools to see computed CSS custom property values

### Colors look wrong

- Verify you haven't overridden theme colors accidentally in global CSS
- Check for conflicting component-specific property definitions
- Ensure color values are valid CSS colors (hex, rgb, etc.)

### Shadow DOM preventing styling

- Remember: Only CSS custom properties inherit through Shadow DOM
- Use `::part()` pseudo-element for styling exposed shadow parts
- Don't try to style internal shadow elements directly

## See Also

- [Installation Guide](./installation.md)
- [Accessibility Guide](./accessibility.md)
- [Component Documentation](../components/)
