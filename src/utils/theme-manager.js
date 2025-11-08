/**
 * Theme Manager Utility
 * Handles theme detection and inheritance for LCARS components
 */

/**
 * Get the effective theme for an element
 * Checks the element itself, then traverses up the DOM tree to find
 * the nearest parent with a data-theme attribute
 *
 * @param {HTMLElement} element - The element to check
 * @returns {string} Theme name (e.g., "2357")
 */
export function getEffectiveTheme(element) {
  // Check if element has data-theme attribute
  if (element.dataset.theme) {
    return element.dataset.theme;
  }

  // Traverse up to find closest parent with data-theme
  const themedParent = element.closest("[data-theme]");
  if (themedParent) {
    return themedParent.dataset.theme;
  }

  // Fall back to default theme
  return "2357";
}

/**
 * Apply theme to component Shadow DOM
 * Note: CSS custom properties automatically inherit through Shadow DOM,
 * so this function primarily validates the theme name
 *
 * @param {ShadowRoot} shadowRoot - Component's shadow root
 * @param {string} themeName - Theme to apply
 */
export function applyTheme(shadowRoot, themeName) {
  // Validate theme name
  const validThemes = ["2357"];

  if (!validThemes.includes(themeName)) {
    console.warn(
      `[LCARS] Unknown theme "${themeName}". Falling back to "2357".`
    );
    return;
  }

  // CSS custom properties handle the actual theming through inheritance
  // No explicit DOM manipulation needed
}

/**
 * Watch for theme changes on an element
 * Returns a cleanup function to stop watching
 *
 * @param {HTMLElement} element - Element to watch
 * @param {Function} callback - Called when theme changes
 * @returns {Function} Cleanup function
 */
export function watchThemeChanges(element, callback) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        callback(getEffectiveTheme(element));
      }
    }
  });

  observer.observe(element, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // Return cleanup function
  return () => observer.disconnect();
}
