import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = ['/', '/radar', '/compare?solutions=deepseek-harness,langgraph', '/knowledge', '/patterns', '/timeline', '/methodology']

for (const locale of ['en', 'tr']) {
  for (const route of routes) {
    test(`${locale}${route} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(`/${locale}${route}`)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
      const material = results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
      expect(material, JSON.stringify(material, null, 2)).toEqual([])
    })
  }
}
