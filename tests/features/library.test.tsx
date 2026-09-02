import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../../src/app/App'

function renderAt(path: string) {
  window.history.replaceState({}, '', path)
  return render(<App />)
}

describe('research library', () => {
  it.each([
    ['/en/knowledge', 'Harness Anatomy'],
    ['/en/patterns', 'Harness–Model Coevolution'],
    ['/en/timeline', 'Timeline of harness evolution'],
    ['/en/methodology', 'Evidence, synthesis, and watch signals'],
  ])('renders %s', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { name: heading })).toBeVisible()
  })

  it('projects methodology and corrections policy in Turkish', () => {
    renderAt('/tr/methodology')
    expect(screen.getByText('Kanıt, sentez ve izleme sinyalleri')).toBeVisible()
    expect(screen.getByText(/sessizce yeniden yazılmaz/i)).toBeVisible()
  })
})
