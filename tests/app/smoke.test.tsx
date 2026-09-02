import { render, screen } from '@testing-library/react'
import { App } from '../../src/app/App'

it('renders the HNS product identity', () => {
  render(<App />)

  expect(screen.getByRole('link', { name: /HNS — Harness Engineering Observatory/ })).toBeVisible()
})
