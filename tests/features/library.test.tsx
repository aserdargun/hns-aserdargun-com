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

  it('renders timeline entries in chronological order', () => {
    renderAt('/en/timeline')
    const dates = screen.getAllByRole('time').map((time) => time.getAttribute('datetime'))

    expect(dates).toEqual([...dates].sort())
  })

  it('uses natural Turkish terminology in Knowledge and Patterns', () => {
    const knowledge = renderAt('/tr/knowledge')
    expect(screen.getByRole('heading', { name: 'Harness anatomisi' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Bağlam ve bellek' })).toBeVisible()
    knowledge.unmount()

    renderAt('/tr/patterns')
    expect(screen.getByRole('heading', { name: 'Kalıcı yürütme' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Temiz bağlam devri' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Deterministik doğrulama' })).toBeVisible()
  })
})
