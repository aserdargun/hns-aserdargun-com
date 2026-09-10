import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = ['/', '/radar', '/compare?solutions=deepseek-harness,langgraph', '/knowledge', '/patterns', '/timeline', '/methodology']

for (const viewport of [{ width: 1536, height: 1024 }, { width: 390, height: 844 }]) {
  for (const locale of ['en', 'tr']) {
    for (const route of routes) {
      test(`${locale}${route} at ${viewport.width}px has no WCAG A/AA axe violations`, async ({ page }) => {
        await page.setViewportSize(viewport)
        await page.goto(`/${locale}${route}`)
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
        expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
      })
    }
  }
}
