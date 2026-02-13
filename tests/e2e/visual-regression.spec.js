// @ts-check
const { test, expect } = require('@playwright/test');
const { VIEWPORTS, getComputedDiagnostics, formatDiagnostics } = require('./helpers');

/** Interactive selectors to test for hover/active layout shift. */
const INTERACTIVE_SELECTORS = [
  'a[href]',
  'button',
  '[role="button"]',
  'input[type="submit"]',
];

test.describe('Visual Regression & State Stability', () => {

  for (const [name, size] of Object.entries(VIEWPORTS)) {
    test(`hover states do not cause layout shift (${name})`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/', { waitUntil: 'networkidle' });

      const shiftIssues = await page.evaluate(async (selectors) => {
        const issues = [];

        for (const sel of selectors) {
          const elements = document.querySelectorAll(sel);
          for (const el of Array.from(elements).slice(0, 10)) {
            const cs = window.getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden') continue;

            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) continue;

            const sibling = el.nextElementSibling;
            if (!sibling) continue;

            const siblingBefore = sibling.getBoundingClientRect();
            const elBefore = { width: rect.width, height: rect.height };

            el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            el.classList.add('hover');

            await new Promise((r) => requestAnimationFrame(r));

            const elAfter = el.getBoundingClientRect();
            const siblingAfter = sibling.getBoundingClientRect();

            el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
            el.classList.remove('hover');

            const elWidthDelta = Math.abs(elAfter.width - elBefore.width);
            const elHeightDelta = Math.abs(elAfter.height - elBefore.height);
            const siblingTopDelta = Math.abs(siblingAfter.top - siblingBefore.top);
            const siblingLeftDelta = Math.abs(siblingAfter.left - siblingBefore.left);

            if (siblingTopDelta > 1 || siblingLeftDelta > 1) {
              issues.push({
                selector: sel,
                element: el.tagName.toLowerCase() + (el.className ? `.${el.className.toString().split(' ')[0]}` : ''),
                elWidthDelta,
                elHeightDelta,
                siblingTopDelta,
                siblingLeftDelta,
              });
            }
          }
        }

        return issues;
      }, INTERACTIVE_SELECTORS);

      if (shiftIssues.length > 0) {
        const details = shiftIssues.slice(0, 5).map(
          (s) => `${s.element}: sibling shifted top=${s.siblingTopDelta}px left=${s.siblingLeftDelta}px`
        ).join('\n');

        for (const issue of shiftIssues.slice(0, 3)) {
          const diag = await getComputedDiagnostics(page, issue.selector);
          issue.diagnostics = formatDiagnostics(diag);
        }

        expect(shiftIssues, `Hover layout shift detected at ${name}:\n${details}`).toHaveLength(0);
      }
    });
  }

  test('page components render as visual snapshots', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/', { waitUntil: 'networkidle' });

    const componentsToSnapshot = ['header', 'footer', 'main'];

    for (const selector of componentsToSnapshot) {
      const element = page.locator(selector).first();
      const isVisible = await element.isVisible().catch(() => false);
      if (isVisible) {
        await expect(element).toHaveScreenshot(`${selector}-desktop.png`, {
          maxDiffPixelRatio: 0.01,
        });
      }
    }
  });
});
