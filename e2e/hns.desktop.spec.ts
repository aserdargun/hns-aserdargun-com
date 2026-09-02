import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 1536, height: 1024 } })

test('desktop research workflow is navigable and shareable', async ({ page }) => {
  await page.goto('/en')
  await expect(page.getByRole('heading', { name: 'The harness is becoming the system.' })).toBeVisible()
  await expect(page.getByText('Evidence').first()).toBeVisible()
  await expect(page.getByText('Synthesis').first()).toBeVisible()
  await expect(page.getByText('Watch signal').first()).toBeVisible()

  await page.getByRole('link', { name: 'Radar', exact: true }).click()
  await expect(page).toHaveURL('/en/radar')
  await page.getByLabel('Radar position').selectOption('trial')
  await page.getByRole('checkbox', { name: /DeepSeek Harness/ }).check()
  await page.getByRole('checkbox', { name: /Microsoft Agent Framework/ }).check()
  await page.getByText('Open evidence').first().click()
  await expect(page.locator('details[open]').first()).toBeVisible()
  await page.getByRole('link', { name: 'Compare selected (2)' }).click()
  await expect(page).toHaveURL(/\/en\/compare\?solutions=deepseek-harness%2Cmicrosoft-agent-framework|\/en\/compare\?solutions=deepseek-harness,microsoft-agent-framework/)
  await expect(page.getByRole('rowheader', { name: 'Execution', exact: true })).toBeVisible()
  await expect(page.getByText(/overall score/i)).toHaveCount(0)

  await page.getByRole('link', { name: 'TR' }).click()
  await expect(page).toHaveURL(/\/tr\/compare\?solutions=/)
  await expect(page.getByRole('rowheader', { name: 'Çalıştırma', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true)
})

for (const viewport of [
  { label: 'desktop', width: 1280, height: 720 },
  { label: 'tablet portrait', width: 768, height: 1024 },
  { label: 'mobile', width: 390, height: 844 },
  { label: '200 percent zoom equivalent', width: 640, height: 360 },
]) {
  test(`${viewport.label} viewport remains operable without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/en')
    await expect(page.getByRole('heading', { name: 'The harness is becoming the system.' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true)
  })
}

test('keyboard focus is visible and skip navigation reaches main content', async ({ page }) => {
  await page.goto('/en')
  await page.keyboard.press('Tab')

  const skipLink = page.getByRole('link', { name: 'Skip to content' })
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('reduced-motion preference disables smooth scrolling and material transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en')

  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  const chevron = page.locator('.disclosure-chevron').first()
  expect(Number.parseFloat(await chevron.evaluate((node) => getComputedStyle(node).transitionDuration))).toBeLessThanOrEqual(0.00001)
})
