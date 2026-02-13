// @ts-check
const { test, expect } = require('@playwright/test');
const { VIEWPORTS, LAYOUT_SELECTORS, getComputedDiagnostics, formatDiagnostics } = require('./helpers');

test.describe('Viewport & Overflow Constraints', () => {
  for (const [name, size] of Object.entries(VIEWPORTS)) {
    test.describe(`${name} (${size.width}x${size.height})`, () => {

      test.beforeEach(async ({ page }) => {
        await page.setViewportSize(size);
        await page.goto('/', { waitUntil: 'networkidle' });
      });

      test('no horizontal scrollbar (scrollWidth === clientWidth)', async ({ page }) => {
        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        expect(
          overflow.scrollWidth,
          `Horizontal leakage detected at ${name}: scrollWidth (${overflow.scrollWidth}) !== clientWidth (${overflow.clientWidth})`
        ).toBeLessThanOrEqual(overflow.clientWidth);
      });

      test('layout containers do not exceed parent width', async ({ page }) => {
        const violations = await page.evaluate((selectors) => {
          const issues = [];
          for (const sel of selectors) {
            const elements = document.querySelectorAll(sel);
            for (const el of elements) {
              const parent = el.parentElement;
              if (!parent) continue;
              const elRect = el.getBoundingClientRect();
              const parentRect = parent.getBoundingClientRect();
              if (elRect.width > parentRect.width + 1) {
                issues.push({
                  selector: sel,
                  elementWidth: elRect.width,
                  parentWidth: parentRect.width,
                });
              }
            }
          }
          return issues;
        }, LAYOUT_SELECTORS);

        if (violations.length > 0) {
          for (const v of violations.slice(0, 5)) {
            const diag = await getComputedDiagnostics(page, v.selector);
            v.diagnostics = formatDiagnostics(diag);
          }
        }

        expect(
          violations,
          `Boundary violations found:\n${JSON.stringify(violations, null, 2)}`
        ).toHaveLength(0);
      });
    });
  }
});
