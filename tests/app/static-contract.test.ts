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
  })

  it('does not introduce a deployment provider workflow', async () => {
    const workflow = await readFile('.github/workflows/ci.yml', 'utf8')
    expect(workflow).not.toMatch(/vercel|azure|deploy/i)
  })
})
