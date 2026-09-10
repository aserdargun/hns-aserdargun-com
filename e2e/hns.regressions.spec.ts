import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('weekly watch links open matching radar records and expose all cited sources', async ({ page }) => {
  await page.goto('/en')
  await expect(page.locator('h1')).toHaveCount(1)
  await page.getByText('Evidence sources (4)', { exact: true }).click()
  await expect(page.locator('.module-sources').first().locator('a')).toHaveCount(4)
  await page.locator('.watch-list').getByRole('link', { name: 'Microsoft Agent Framework Harness' }).click()
  await expect(page.getByRole('checkbox', { name: /Microsoft Agent Framework/ })).toBeVisible()
})

test('multiword search, selection, reload, language change and edit selection stay consistent', async ({ page }) => {
  await page.goto('/en/radar')
  const search = page.getByRole('searchbox', { name: 'Search solutions' })
  await search.pressSequentially('LM Studio')
  await expect(search).toHaveValue('LM Studio')
  await page.getByRole('checkbox', { name: /Bionic/ }).check()
  await expect(page.getByRole('link', { name: 'Compare selected (1)' })).toHaveAttribute('aria-disabled', 'true')
  await search.fill('LangGraph')
  await page.getByRole('checkbox', { name: /LangGraph/ }).check()
  await page.reload()
  await expect(page.getByRole('checkbox', { name: /LangGraph/ })).toBeChecked()
  await page.getByRole('link', { name: 'TR', exact: true }).click()
  await expect(page.getByRole('checkbox', { name: /LangGraph/ })).toBeChecked()
  await page.getByRole('link', { name: 'Seçilenleri karşılaştır (2)' }).click()
  await expect(page.getByRole('rowheader', { name: 'Çalıştırma', exact: true })).toBeVisible()
  await page.getByRole('link', { name: /Seçimi düzenle/ }).click()
  await expect(page.getByRole('checkbox', { name: /Bionic/ })).toBeChecked()
  await expect(page.getByRole('checkbox', { name: /LangGraph/ })).toBeChecked()
  await page.getByRole('button', { name: /Bionic — seçimden çıkar/ }).click()
  await expect(page.getByRole('checkbox', { name: /Bionic/ })).not.toBeChecked()
})

test('mobile filters, evidence confidence and keyboard menu work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.clock.setFixedTime(new Date('2026-09-10T12:00:00Z'))
  await page.goto('/en/radar')
  await page.getByRole('combobox', { name: /^Organization/ }).selectOption('LM Studio')
  await page.getByRole('combobox', { name: /^Review freshness/ }).selectOption('90')
  await expect(page.getByRole('checkbox', { name: /Bionic/ })).toBeVisible()
  await page.getByText('Inspect seven layers', { exact: true }).click()
  await expect(page.locator('.layer-breakdown dt')).toHaveCount(7)
  await page.locator('.layer-breakdown .layer-evidence summary').first().click()
  await expect(page.locator('.layer-breakdown').getByText('Confidence and limits:', { exact: true }).first()).toBeVisible()
  await page.locator('.mobile-radar-list').getByText('Open evidence', { exact: true }).click()
  await page.locator('.mobile-radar-list').getByText('Claims and confidence limits (6)', { exact: true }).click()
  await expect(page.getByText('Confidence and limits:', { exact: true }).first()).toBeVisible()
  const menu = page.getByRole('button', { name: 'Menu', exact: true })
  await menu.click()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toBeFocused()
  await page.getByRole('button', { name: 'Reset filters', exact: true }).click()
  await expect(page.getByRole('checkbox')).toHaveCount(22)
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(result.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([])
})

test('three-selection limit and zero-result recovery preserve removable choices', async ({ page }) => {
  await page.goto('/en/radar?solutions=langgraph,claude-code,deepseek-harness')
  await expect(page.getByRole('checkbox', { name: /Bionic/ })).toBeDisabled()
  await page.getByRole('searchbox').fill('nonexistent-solution')
  await expect(page.getByText('No solutions match these filters.')).toBeVisible()
  await page.getByRole('button', { name: 'LangGraph — remove selection', exact: true }).click()
  await page.getByRole('button', { name: 'Reset filters', exact: true }).first().click()
  await expect(page.getByRole('checkbox', { name: /Bionic/ })).toBeEnabled()
  await page.getByRole('link', { name: 'Compare selected (2)' }).click()
  await page.goBack()
  await expect(page.getByRole('checkbox', { name: /Claude Code/ })).toBeChecked()
})

test('pattern deep links scroll to the requested entry and route navigation updates title and focus', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 1024 })
  await page.goto('/en')
  await page.getByRole('link', { name: 'Explore pattern →' }).click()
  const hash = new URL(page.url()).hash.slice(1)
  await expect(page.locator(`[id="${hash}"]`)).toBeInViewport()
  await page.getByRole('link', { name: 'Radar', exact: true }).click()
  await expect(page).toHaveTitle('Solutions Radar · HNS')
  await expect(page.locator('main')).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

for (const locale of ['en', 'tr']) {
  test(`${locale} all surfaces fit a narrow mobile viewport without runtime errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
    await page.setViewportSize({ width: 320, height: 740 })
    for (const route of ['', '/radar', '/compare?solutions=lmstudio-bionic,langgraph,claude-code', '/knowledge', '/patterns', '/timeline', '/methodology', '/missing', '/weekly/2099-W01']) {
      await page.goto(`/${locale}${route}`)
      await expect(page.locator('h1')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true)
      await expect(page.locator('vite-error-overlay')).toHaveCount(0)
    }
    expect(errors).toEqual([])
  })
}

test('storage denial does not break landing or language navigation', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError') } })
  })
  await page.goto('/')
  await expect(page).toHaveURL('/en')
  await page.getByRole('link', { name: 'TR', exact: true }).click()
  await expect(page).toHaveURL('/tr')
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
})
