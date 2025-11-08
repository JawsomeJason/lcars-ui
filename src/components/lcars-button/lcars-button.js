/**
 * LCARS Button Component
 * Interactive button control with LCARS styling and accessibility
 *
 * @element lcars-button
 *
 * @attr {string} data-theme - Theme identifier (e.g., "2357")
 * @attr {boolean} disabled - Disables button interaction
 * @attr {string} variant - Visual style variant ("primary" | "secondary" | "danger")
 * @attr {string} size - Button size ("small" | "medium" | "large")
 *
 * @fires lcars-click - Fired when button is clicked (not disabled)
 *
 * @csspart button - The internal button element
 *
 * @cssprop --button-bg - Button background color
 * @cssprop --button-bg-hover - Background on hover
 * @cssprop --button-bg-active - Background on click/active
 * @cssprop --button-bg-disabled - Background when disabled
 * @cssprop --button-color - Button text color
 * @cssprop --button-color-disabled - Text color when disabled
 * @cssprop --button-border-radius - Rounded pill shape
 * @cssprop --button-padding - Internal padding
 * @cssprop --button-font-size - Text size
 * @cssprop --button-min-width - Minimum button width
 */

import { getEffectiveTheme } from "../../utils/theme-manager.js";

const styles = `
.button {
  display: inline-block;
  background-color: var(--button-bg, var(--lcars-mariner));
  color: var(--button-color, #fff);
  border: none;
  border-radius: var(--button-border-radius, 20px);
  padding: var(--button-padding, 0.5rem 1.5rem);
  font-size: var(--button-font-size, 1rem);
  font-family: inherit;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  min-width: var(--button-min-width, 80px);
  transition: background-color 0.2s ease, transform 0.1s ease;
  user-select: none;
}

.button:hover:not(:disabled) {
  background-color: var(--button-bg-hover, var(--lcars-anakiwa));
}

.button:active:not(:disabled) {
  background-color: var(--button-bg-active, var(--lcars-baltic-blue));
  transform: translateY(1px);
}

.button:focus-visible {
  outline: 2px solid var(--lcars-anakiwa);
  outline-offset: 2px;
}

.button:disabled {
  background-color: var(--button-bg-disabled, var(--lcars-eggplant));
  color: var(--button-color-disabled, #999);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Variant: Primary (default) */
.button--primary {
  --button-bg: var(--lcars-mariner);
  --button-bg-hover: var(--lcars-anakiwa);
  --button-bg-active: var(--lcars-baltic-blue);
}

/* Variant: Secondary */
.button--secondary {
  --button-bg: var(--lcars-lilac);
  --button-bg-hover: var(--lcars-anakiwa);
  --button-bg-active: var(--lcars-mariner);
  --button-color: #000;
}

/* Variant: Danger */
.button--danger {
  --button-bg: var(--lcars-neon-carrot);
  --button-bg-hover: var(--lcars-pale-canary);
  --button-bg-active: var(--lcars-eggplant);
  --button-color: #000;
}

/* Size: Small */
.button--small {
  --button-padding: 0.375rem 1rem;
  --button-font-size: 0.875rem;
  --button-min-width: 60px;
}

/* Size: Medium (default) */
.button--medium {
  /* Uses default values */
}

/* Size: Large */
.button--large {
  --button-padding: 0.75rem 2rem;
  --button-font-size: 1.125rem;
  --button-min-width: 100px;
}
`;

export class LcarsButton extends HTMLElement {
  static observedAttributes = ["data-theme", "disabled", "variant", "size"];

  constructor() {
    super();
    this.attachShadow({ mode: "closed" });
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  connectedCallback() {
    this.render();
    this.applyTheme();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.cleanupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "data-theme") {
      this.applyTheme();
    } else {
      // Re-render for other attribute changes
      this.render();
    }
  }

  applyTheme() {
    const theme = getEffectiveTheme(this);
    // Theme colors applied via CSS custom properties
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector("button");
    if (button) {
      button.addEventListener("click", this._handleClick);
      button.addEventListener("keydown", this._handleKeydown);
    }
  }

  cleanupEventListeners() {
    const button = this.shadowRoot.querySelector("button");
    if (button) {
      button.removeEventListener("click", this._handleClick);
      button.removeEventListener("keydown", this._handleKeydown);
    }
  }

  _handleClick(event) {
    if (this.hasAttribute("disabled")) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent("lcars-click", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event },
      })
    );
  }

  _handleKeydown(event) {
    // Handle Enter and Space as click
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._handleClick(event);
    }
  }

  render() {
    const variant = this.getAttribute("variant") || "primary";
    const size = this.getAttribute("size") || "medium";
    const disabled = this.hasAttribute("disabled");

    // Validate variant
    const validVariants = ["primary", "secondary", "danger"];
    if (!validVariants.includes(variant)) {
      console.warn(
        `[LCARS Button] Invalid variant "${variant}". Using "primary".`
      );
    }

    // Validate size
    const validSizes = ["small", "medium", "large"];
    if (!validSizes.includes(size)) {
      console.warn(`[LCARS Button] Invalid size "${size}". Using "medium".`);
    }

    const variantClass = validVariants.includes(variant) ? variant : "primary";
    const sizeClass = validSizes.includes(size) ? size : "medium";

    const template = `
      <style>${styles}</style>
      <button
        part="button"
        class="button button--${variantClass} button--${sizeClass}"
        type="button"
        ${disabled ? "disabled" : ""}
      >
        <slot></slot>
      </button>
    `;

    this.shadowRoot.innerHTML = template;

    // Re-setup event listeners after re-render
    if (this.isConnected) {
      this.setupEventListeners();
    }
  }
}

// Register custom element
customElements.define("lcars-button", LcarsButton);
