/**
 * Diagnostic utilities for layout failure reporting.
 * Reports computed values of offending elements on any layout failure.
 */

/**
 * Collect computed diagnostics for a given element selector.
 * Returns: width, max-width, flex-basis, padding, margin, box-sizing.
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 * @returns {Promise<object>}
 */
async function getComputedDiagnostics(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: `Element not found: ${sel}` };
    const cs = window.getComputedStyle(el);
    return {
      selector: sel,
      tagName: el.tagName.toLowerCase(),
      width: cs.width,
      maxWidth: cs.maxWidth,
      flexBasis: cs.flexBasis,
      padding: cs.padding,
      margin: cs.margin,
      boxSizing: cs.boxSizing,
      display: cs.display,
      overflow: cs.overflow,
      boundingRect: el.getBoundingClientRect().toJSON(),
    };
  }, selector);
}

/**
 * Build a formatted diagnostic message for test failure output.
 * @param {object} diagnostics
 * @returns {string}
 */
function formatDiagnostics(diagnostics) {
  if (diagnostics.error) return diagnostics.error;
  const lines = [
    `Element: <${diagnostics.tagName}> (${diagnostics.selector})`,
    `  width: ${diagnostics.width}`,
    `  max-width: ${diagnostics.maxWidth}`,
    `  flex-basis: ${diagnostics.flexBasis}`,
    `  padding: ${diagnostics.padding}`,
    `  margin: ${diagnostics.margin}`,
    `  box-sizing: ${diagnostics.boxSizing}`,
    `  display: ${diagnostics.display}`,
    `  overflow: ${diagnostics.overflow}`,
    `  bounding-rect: ${JSON.stringify(diagnostics.boundingRect)}`,
  ];
  return lines.join('\n');
}

/** Standard viewport breakpoints for testing. */
const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

/** Top-level layout container selectors to audit. */
const LAYOUT_SELECTORS = ['header', 'main', 'footer', '.grid-container'];

module.exports = {
  getComputedDiagnostics,
  formatDiagnostics,
  VIEWPORTS,
  LAYOUT_SELECTORS,
};
