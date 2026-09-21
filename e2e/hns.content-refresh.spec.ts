import { expect, test } from '@playwright/test'

for (const locale of ['en', 'tr']) {
  for (const width of [320, 1440]) {
    test(`weekly archive and portfolio context ${locale} at ${width}px`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.setViewportSize({ width, height: 1000 })
      await page.goto(`/${locale}`)
      const archive = page.getByRole('navigation', { name: locale === 'tr' ? 'Haftalık arşiv' : 'Weekly archive' })
      await expect(archive.getByRole('link', { name: '2026-W39' })).toHaveAttribute('aria-current', 'page')
      await archive.getByRole('link', { name: '2026-W36' }).click()
      await expect(page.getByRole('note')).toContainText('2026-09-21')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(locale === 'tr' ? 'Harness, sistemin kendisine dönüşüyor.' : 'The harness is becoming the system.')
      await page.reload()
      await expect(archive.getByRole('link', { name: '2026-W36' })).toHaveAttribute('aria-current', 'page')
      await archive.getByRole('link', { name: '2026-W39' }).click()
      const footer = page.getByRole('contentinfo')
      for (const code of ['llm', 'ctx', 'sec', 'evl', 'arl', 'dpl', 'cul', 'aos', 'mem']) {
        await expect(footer.locator(`a[href="https://${code}.aserdargun.com/"]`)).toHaveCount(1)
      }
      await expect(footer).toContainText(locale === 'tr' ? 'çalışan ajan sistemi yayını değildir' : 'not a working agent-system release')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      expect(errors).toEqual([])
    })
  }
}
