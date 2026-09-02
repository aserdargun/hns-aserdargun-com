import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../../src/app/App'

function renderAt(path: string) {
  window.history.replaceState({}, '', path)
  return render(<App />)
}

describe('localized routes', () => {
  beforeEach(() => localStorage.clear())

  it('redirects root to English and renders the product identity', async () => {
    renderAt('/')
    expect(await screen.findByRole('heading', { name: 'Harness Engineering Observatory' })).toBeVisible()
    expect(window.location.pathname).toBe('/en')
  })

  it('switches locale without losing route or query', async () => {
    const user = userEvent.setup()
    renderAt('/en/radar?state=trial')
    await user.click(await screen.findByRole('link', { name: 'TR' }))
    expect(window.location.pathname + window.location.search).toBe('/tr/radar?state=trial')
  })

  it('renders a localized not-found page', async () => {
    renderAt('/tr/bilinmeyen')
    expect(await screen.findByRole('heading', { name: 'Sayfa bulunamadı' })).toBeVisible()
  })
})
