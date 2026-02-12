// @ts-check
const { test, expect } = require('@playwright/test');
const { VIEWPORTS, getComputedDiagnostics, formatDiagnostics } = require('./helpers');

/** Selectors to audit for border-box. */
const BOX_SIZING_SELECTORS = ['header', 'main', 'footer', 'section', 'nav', 'article', 'aside', 'div'];

test.describe('Computed Style & Box-Model Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('box-sizing is border-box on layout elements', async ({ page }) => {
    const violations = await page.evaluate((selectors) => {
      const issues = [];
      for (const sel of selectors) {
        const elements = document.querySelectorAll(sel);
        for (const el of elements) {
          const cs = window.getComputedStyle(el);
          if (cs.boxSizing !== 'border-box') {
            issues.push({
              selector: sel,
              tagName: el.tagName.toLowerCase(),
              className: el.className,
              boxSizing: cs.boxSizing,
            });
          }
        }
      }
      return issues;
    }, BOX_SIZING_SELECTORS);

    if (violations.length > 0) {
      const details = violations.slice(0, 5).map(
        (v) => `<${v.tagName}> class="${v.className}" has box-sizing: ${v.boxSizing}`
      ).join('\n');
      expect(violations, `box-sizing violations:\n${details}`).toHaveLength(0);
    }
  });

  test('no collapsed flex/grid children with visible content', async ({ page }) => {
    const collapsed = await page.evaluate(() => {
      const issues = [];
      const containers = document.querySelectorAll('*');
      for (const el of containers) {
        const cs = window.getComputedStyle(el);
        if (cs.display !== 'flex' && cs.display !== 'grid' &&
            cs.display !== 'inline-flex' && cs.display !== 'inline-grid') continue;

        for (const child of el.children) {
          const childCs = window.getComputedStyle(child);
          if (childCs.display === 'none' || childCs.visibility === 'hidden') continue;

          const rect = child.getBoundingClientRect();
          const hasContent = child.textContent.trim().length > 0 || child.children.length > 0;
          if (hasContent && (rect.width === 0 || rect.height === 0)) {
            issues.push({
              parent: el.tagName.toLowerCase() + (el.className ? `.${el.className.split(' ')[0]}` : ''),
              child: child.tagName.toLowerCase() + (child.className ? `.${child.className.split(' ')[0]}` : ''),
              parentDisplay: cs.display,
              childWidth: rect.width,
              childHeight: rect.height,
            });
          }
        }
      }
      return issues;
    });

    if (collapsed.length > 0) {
      const details = collapsed.slice(0, 5).map(
        (c) => `${c.child} inside ${c.parent} (${c.parentDisplay}): ${c.childWidth}x${c.childHeight}`
      ).join('\n');
      expect(collapsed, `Collapsed flex/grid children:\n${details}`).toHaveLength(0);
    }
  });

  for (const [name, size] of Object.entries(VIEWPORTS)) {
    test(`spacing consistency - no margin bleed (${name})`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/', { waitUntil: 'networkidle' });

      const bleedIssues = await page.evaluate(() => {
        const issues = [];
        const sections = document.querySelectorAll('section, article, main');
        for (const section of sections) {
          const sectionRect = section.getBoundingClientRect();
          for (const child of section.children) {
            const cs = window.getComputedStyle(child);
            if (cs.display === 'none') continue;

            const childRect = child.getBoundingClientRect();
            if (childRect.left < sectionRect.left - 1 || childRect.right > sectionRect.right + 1) {
              issues.push({
                section: section.tagName.toLowerCase() + (section.className ? `.${section.className.split(' ')[0]}` : ''),
                child: child.tagName.toLowerCase() + (child.className ? `.${child.className.split(' ')[0]}` : ''),
                sectionLeft: sectionRect.left,
                sectionRight: sectionRect.right,
                childLeft: childRect.left,
                childRight: childRect.right,
              });
            }
          }
        }
        return issues;
      });

      if (bleedIssues.length > 0) {
        for (const issue of bleedIssues.slice(0, 3)) {
          const diag = await getComputedDiagnostics(page, issue.child.split('.')[0]);
          issue.diagnostics = formatDiagnostics(diag);
        }
      }

      expect(
        bleedIssues,
        `Margin/padding bleed detected at ${name}:\n${JSON.stringify(bleedIssues.slice(0, 5), null, 2)}`
      ).toHaveLength(0);
    });
  }
});
