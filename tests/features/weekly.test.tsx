import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../../src/app/App'

function renderWeekly(path = '/en') {
  window.history.replaceState({}, '', path)
  return render(<App />)
}

describe('Weekly Intelligence', () => {
  beforeEach(() => localStorage.clear())

  it('shows the latest synthesis and all five intelligence modules', () => {
    renderWeekly()
    expect(screen.getByRole('heading', { name: 'The harness is becoming the system.' })).toBeVisible()
    for (const name of ['Most important development', 'Solutions to watch', 'Pattern of the week', 'Research of the week', 'Experiment candidate']) {
      expect(screen.getByText(name)).toBeVisible()
    }
  })

  it('identifies synthesis separately from evidence and watch signals', () => {
    renderWeekly()
    expect(screen.getAllByText('Synthesis').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Evidence').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Watch signal').length).toBeGreaterThan(0)
  })

  it('discloses module content with an accessible mobile-compatible control', async () => {
    const user = userEvent.setup()
    renderWeekly('/tr')
    const control = screen.getByRole('button', { name: /En önemli gelişme/ })
    await user.click(control)
    expect(screen.getByText('Harness katmanları ayrı ürün sınıflarına dönüşüyor')).toBeVisible()
  })
})
