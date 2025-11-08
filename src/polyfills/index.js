/**
 * LCARS Polyfill Loader
 * Conditionally loads polyfills for older browsers
 */

/**
 * Load necessary polyfills based on feature detection
 * Only loads what's missing in the current browser
 *
 * @returns {Promise<void>}
 */
export async function loadPolyfills() {
  const promises = [];

  // Check for Custom Elements and Shadow DOM support
  const needsWebComponents =
    !("customElements" in window) || !("attachShadow" in Element.prototype);

  if (needsWebComponents) {
    console.warn(
      "[LCARS] Loading Web Components polyfills for older browser support"
    );

    // Load webcomponents polyfill bundle
    promises.push(
      import("@webcomponents/webcomponentsjs/webcomponents-bundle.js")
    );
  }

  // Future: Add conditional loading for Popover API and Invoker API
  // if components utilize these emerging APIs
  /*
  if (!("popover" in HTMLElement.prototype)) {
    // promises.push(import('popover-polyfill'));
  }
  */

  // Wait for all polyfills to load
  await Promise.all(promises);

  // Wait for custom elements to be defined if polyfill was loaded
  if (needsWebComponents && window.WebComponents) {
    await window.WebComponents.ready;
  }
}

/**
 * Check if polyfills are needed
 * @returns {boolean}
 */
export function needsPolyfills() {
  return (
    !("customElements" in window) || !("attachShadow" in Element.prototype)
  );
}
