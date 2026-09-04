import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../../src/app/App'
import { parseRadarSearch, serializeRadarSearch } from '../../src/features/radar/radar-state'

function renderRadar(path = '/en/radar') {
  window.history.replaceState({}, '', path)
  return render(<App />)
}

describe('Solutions Radar', () => {
  beforeEach(() => localStorage.clear())

  it('round-trips radar filters through URL search', () => {
    const filters = { classes: ['agent-harness'], radar: ['trial'], evidence: ['evidence'], organizations: [], openSource: [], freshness: [], query: 'deep', sort: 'radar' as const }
    expect(parseRadarSearch(serializeRadarSearch(filters))).toEqual(filters)
  })

  it('ignores invalid filter values', () => {
    expect(parseRadarSearch('?radar=best&class=nope').radar).toEqual([])
    expect(parseRadarSearch('?radar=best&class=nope').classes).toEqual([])
  })

  it('keeps selection when filters change and exposes compare count', async () => {
    const user = userEvent.setup()
    renderRadar()
    await user.click(screen.getByRole('checkbox', { name: /DeepSeek Harness/ }))
    await user.selectOptions(screen.getByLabelText('Radar position'), 'trial')
    expect(screen.getByRole('link', { name: 'Compare selected (1)' })).toBeVisible()
    expect(screen.getByRole('checkbox', { name: /DeepSeek Harness/ })).toBeChecked()
  })

  it('renders the seven named layers without an overall score', () => {
    renderRadar()
    expect(screen.getByText('Execution')).toBeVisible()
    expect(screen.getByText('Governance')).toBeVisible()
    expect(screen.queryByText(/overall score/i)).not.toBeInTheDocument()
  })

  it('uses the catalog count in the embedded Radar link', () => {
    window.history.replaceState({}, '', '/tr')
    render(<App />)

    expect(screen.getByRole('link', { name: '21 çözümün tümünü incele →' })).toBeVisible()
  })

  it('localizes Turkish filter and solution values', () => {
    renderRadar('/tr/radar')

    expect(screen.getByRole('option', { name: "Kodlama harness'ı" })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Benimse' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Kanıt' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Kısmen' })).toBeInTheDocument()
    expect(screen.getAllByText('Yerleşik').length).toBeGreaterThan(0)
    expect(screen.getAllByRole('img', { name: /Destekleniyor/ }).length).toBeGreaterThan(0)
  })
})
