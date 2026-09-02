import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 390, height: 844 }, isMobile: true })

test('mobile weekly to comparison workflow has no horizontal overflow', async ({ page }) => {
  await page.goto('/en')
  const menu = page.getByRole('button', { name: 'Menu' })
  await expect(menu).toBeVisible()
  const menuBox = await menu.boundingBox()
  expect(menuBox?.width).toBeGreaterThanOrEqual(44)
  expect(menuBox?.height).toBeGreaterThanOrEqual(44)

  const weeklyDisclosure = page.getByRole('button', { name: /Most important development/ })
  const disclosureBox = await weeklyDisclosure.boundingBox()
  expect(disclosureBox?.height).toBeGreaterThanOrEqual(44)
  await weeklyDisclosure.click()
  await expect(page.getByText('Harness layers are becoming explicit product classes')).toBeVisible()

  await menu.click()
  await page.getByRole('link', { name: 'Radar', exact: true }).click()
  await page.getByLabel('Radar position').selectOption('trial')
  await page.getByRole('checkbox', { name: /DeepSeek Harness/ }).check()
  await page.getByRole('checkbox', { name: /Microsoft Agent Framework/ }).check()
  await page.locator('.mobile-radar-list summary').first().click()
  await expect(page.locator('.mobile-radar-list details[open]').first()).toBeVisible()
  await page.getByRole('link', { name: 'Compare selected (2)' }).click()
  await expect(page.getByText('DeepSeek Harness', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('Microsoft Agent Framework Harness', { exact: true }).first()).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth)).toBe(true)
})
