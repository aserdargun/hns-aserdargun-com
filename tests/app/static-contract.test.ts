import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

describe('static delivery contract', () => {
  it('configures SPA fallback and security headers', async () => {
    const config = JSON.parse(await readFile('public/staticwebapp.config.json', 'utf8'))
    expect(config.navigationFallback.rewrite).toBe('/index.html')
    expect(config.globalHeaders['Content-Security-Policy']).toContain("default-src 'self'")
    expect(config.globalHeaders['X-Content-Type-Options']).toBe('nosniff')
  })

  it('publishes crawler and favicon assets', async () => {
    expect(await readFile('public/robots.txt', 'utf8')).toContain('Allow: /')
    expect(await readFile('public/favicon.svg', 'utf8')).toContain('HNS')
    expect(await readFile('index.html', 'utf8')).toContain('https://gray-pebble-0b586d903.5.azurestaticapps.net/')
  })

  it('keeps validation separate from the single Azure production workflow', async () => {
    const validation = await readFile('.github/workflows/ci.yml', 'utf8')
    const deployment = await readFile('.github/workflows/deploy-swa-hns-aserdargun-com.yml', 'utf8')

    expect(validation).not.toMatch(/static-web-apps-deploy|vercel/i)
    expect(deployment).toContain('branches: [main]')
    expect(deployment).toContain('group: swa-hns-aserdargun-com-production')
    expect(deployment).toContain('cancel-in-progress: false')
    expect(deployment).toContain('app_location: dist')
    expect(deployment).toContain('skip_app_build: true')
    expect(deployment).toContain('AZURE_STATIC_WEB_APPS_API_TOKEN_SWA_HNS_ASERDARGUN_COM')
    expect(deployment).toMatch(/actions\/checkout@[a-f0-9]{40}/)
    expect(deployment).toMatch(/actions\/setup-node@[a-f0-9]{40}/)
    expect(deployment).toMatch(/Azure\/static-web-apps-deploy@[a-f0-9]{40}/)
    expect(deployment).not.toMatch(/vercel/i)
  })
})
