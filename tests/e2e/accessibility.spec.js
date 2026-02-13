// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { VIEWPORTS } = require('./helpers');

test.describe('Automated Accessibility (Axe-Core)', () => {

  test('reflow - no two-dimensional scrolling at 320px (WCAG 1.4.10)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 256 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(
      overflow.scrollWidth,
      `Reflow failure: content requires horizontal scroll at 320px (scrollWidth: ${overflow.scrollWidth}, clientWidth: ${overflow.clientWidth})`
    ).toBeLessThanOrEqual(overflow.clientWidth);
  });

  test('interactive elements meet 44x44 minimum target size (WCAG 2.5.5)', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/', { waitUntil: 'networkidle' });

    const undersized = await page.evaluate(() => {
      const MIN_SIZE = 44;
      const interactive = document.querySelectorAll(
        'a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex="0"]'
      );
      const issues = [];
      for (const el of interactive) {
        const cs = window.getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue;

        if (rect.width < MIN_SIZE || rect.height < MIN_SIZE) {
          issues.push({
            tag: el.tagName.toLowerCase(),
            text: el.textContent.trim().substring(0, 50),
            className: el.className ? el.className.toString().split(' ')[0] : '',
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }
      return issues;
    });

    if (undersized.length > 0) {
      const details = undersized.slice(0, 10).map(
        (e) => `<${e.tag}> "${e.text}" class="${e.className}": ${e.width}x${e.height}px`
      ).join('\n');
      expect(undersized, `Interactive elements below 44x44px target:\n${details}`).toHaveLength(0);
    }
  });

  for (const [name, size] of Object.entries(VIEWPORTS)) {
    test(`axe-core accessibility scan (${name})`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/', { waitUntil: 'networkidle' });

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const violations = results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length,
      }));

      if (violations.length > 0) {
        const summary = violations.map(
          (v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes} nodes)`
        ).join('\n');
        expect(violations, `Axe-core violations at ${name}:\n${summary}`).toHaveLength(0);
      }
    });
  }
});
