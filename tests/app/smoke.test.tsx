import { render, screen } from '@testing-library/react'
import { App } from '../../src/app/App'

it('renders the HNS product identity', () => {
  render(<App />)

  expect(screen.getByRole('link', { name: /HNS — Harness Engineering Observatory/ })).toBeVisible()
})

it('exposes Patterns in primary navigation and localizes its accessible name', () => {
  window.history.replaceState({}, '', '/tr')
  render(<App />)

  expect(screen.getByRole('navigation', { name: 'Ana gezinme' })).toBeVisible()
  expect(screen.getByRole('link', { name: 'Desenler' })).toHaveAttribute('href', '/tr/patterns')
})
