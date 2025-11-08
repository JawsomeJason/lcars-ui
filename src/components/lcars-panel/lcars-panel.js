/**
 * LCARS Panel Component
 * Display content in an LCARS-styled container with themed background and borders
 *
 * @element lcars-panel
 *
 * @attr {string} data-theme - Theme identifier (e.g., "2357")
 * @attr {string} variant - Visual style variant ("standard" | "alert" | "info")
 * @attr {string} label - Optional header label text
 *
 * @csspart panel - The main container element
 * @csspart header - The header section (if label provided)
 * @csspart content - The content slot container
 *
 * @cssprop --panel-bg - Panel background color
 * @cssprop --panel-border - Panel border color
 * @cssprop --panel-border-width - Border thickness
 * @cssprop --panel-border-radius - Corner radius (elbows)
 * @cssprop --panel-padding - Internal padding
 * @cssprop --panel-header-bg - Header background (if label provided)
 * @cssprop --panel-header-color - Header text color
 */

import { getEffectiveTheme } from "../../utils/theme-manager.js";

const styles = `
.panel {
  display: block;
  background-color: var(--panel-bg, var(--lcars-golden-tanoi));
  border: var(--panel-border-width, 4px) solid var(--panel-border, var(--lcars-neon-carrot));
  border-radius: var(--panel-border-radius, 12px);
  padding: 0;
  overflow: hidden;
}

.panel__header {
  background-color: var(--panel-header-bg, var(--lcars-neon-carrot));
  color: var(--panel-header-color, #000);
  padding: 0.5rem var(--panel-padding, 1rem);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

.panel__content {
  padding: var(--panel-padding, 1rem);
  color: #000;
}

.panel--alert {
  --panel-bg: var(--lcars-pale-canary);
  --panel-border: var(--lcars-neon-carrot);
  --panel-header-bg: var(--lcars-neon-carrot);
}

.panel--info {
  --panel-bg: var(--lcars-anakiwa);
  --panel-border: var(--lcars-mariner);
  --panel-header-bg: var(--lcars-mariner);
  --panel-header-color: #fff;
}

.panel--info .panel__content {
  color: #000;
}

.panel--standard {
  /* Uses default CSS custom property values */
}
`;

export class LcarsPanel extends HTMLElement {
  static observedAttributes = ["data-theme", "variant", "label"];

  constructor() {
    super();
    this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this.render();
    this.applyTheme();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "data-theme") {
      this.applyTheme();
    } else {
      // Re-render for variant or label changes
      this.render();
    }
  }

  applyTheme() {
    const theme = getEffectiveTheme(this);
    // Theme colors are applied via CSS custom properties
    // which automatically inherit through Shadow DOM
  }

  render() {
    const variant = this.getAttribute("variant") || "standard";
    const label = this.getAttribute("label");

    // Validate variant
    const validVariants = ["standard", "alert", "info"];
    if (!validVariants.includes(variant)) {
      console.warn(
        `[LCARS Panel] Invalid variant "${variant}". Using "standard".`
      );
    }

    const template = `
      <style>${styles}</style>
      <div part="panel" class="panel panel--${validVariants.includes(variant) ? variant : "standard"}">
        ${label ? `<div part="header" class="panel__header">${this.escapeHtml(label)}</div>` : ""}
        <div part="content" class="panel__content">
          <slot></slot>
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = template;
  }

  /**
   * Escape HTML to prevent XSS in label attribute
   * @param {string} html - String to escape
   * @returns {string} Escaped string
   */
  escapeHtml(html) {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  }
}

// Register custom element
customElements.define("lcars-panel", LcarsPanel);
