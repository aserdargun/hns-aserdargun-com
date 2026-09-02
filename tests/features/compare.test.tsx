import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../../src/app/App'

function renderCompare(path: string) {
  window.history.replaceState({}, '', path)
  return render(<App />)
}

describe('comparison', () => {
  it('compares two solutions by layer without inventing a total score', () => {
    renderCompare('/en/compare?solutions=deepseek-harness,langgraph')
    expect(screen.getByRole('heading', { name: /DeepSeek Harness.*LangGraph/ })).toBeVisible()
    expect(screen.getByRole('rowheader', { name: 'Execution' })).toBeVisible()
    expect(screen.queryByText(/overall score/i)).not.toBeInTheDocument()
  })

  it('keeps valid IDs and reports an invalid ID', () => {
    renderCompare('/en/compare?solutions=langgraph,missing')
    expect(screen.getByText(/missing/i)).toBeVisible()
    expect(screen.getByText('LangGraph')).toBeVisible()
  })

  it('invites a user with no selection back to the Radar', () => {
    renderCompare('/en/compare')
    expect(screen.getByRole('link', { name: /Choose solutions in Radar/ })).toHaveAttribute('href', '/en/radar')
  })
})
