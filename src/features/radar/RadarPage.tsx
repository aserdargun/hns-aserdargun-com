import { useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { catalog } from '../../content/catalog'
import type { Locale } from '../../content/schema'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { parseComparedSolutions } from '../compare/compare-state'
import { MobileRadarList } from './MobileRadarList'
import { RadarTable } from './RadarTable'
import { RadarToolbar } from './RadarToolbar'
import { emptyRadarFilters, filterSolutions, parseRadarSearch, serializeRadarSearch } from './radar-state'

export function RadarPage({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const mobile = useMediaQuery('(max-width: 780px)')
  const location = useLocation()
  const navigate = useNavigate()
  const filters = useMemo(() => parseRadarSearch(location.search), [location.search])
  const selectedSolutions = parseComparedSolutions(location.search, catalog).solutions
  const selected = new Set(selectedSolutions.map((solution) => solution.id))
  const results = filterSolutions(catalog.solutions, filters)
  const visible = embedded ? results.slice(0, 5) : results
  const Heading = embedded ? 'h2' : 'h1'
  const headingId = embedded ? 'radar-preview-heading' : 'radar-heading'
  const canCompare = selected.size >= 2
  const compareUrl = `/${locale}/compare?solutions=${[...selected].join(',')}`

  const update = (nextFilters: typeof filters, nextSelection = selected) => {
    const params = new URLSearchParams(serializeRadarSearch(nextFilters))
    if (nextSelection.size) params.set('solutions', [...nextSelection].join(','))
    const search = params.toString()
    navigate(`${location.pathname}${search ? `?${search}` : ''}${location.hash}`, { replace: true })
  }
  const updateFilters = (next: typeof filters) => update(next)
  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else if (next.size < 3) next.add(id)
    update(filters, next)
  }

  return <section className={embedded ? 'radar-page is-embedded' : 'radar-page'} aria-labelledby={headingId}>
    <header className="radar-header">
      <div>
        <p className="section-kicker">{locale === 'tr' ? 'Kaynak-temelli gözlem' : 'Source-backed observation'}</p>
        <Heading id={headingId}>{locale === 'tr' ? 'Çözümler Radarı' : 'Solutions Radar'}</Heading>
      </div>
      {!embedded && <p>{locale === 'tr'
        ? 'Filtrele, kanıtı aç ve iki ya da üç çözümü katman katman karşılaştır.'
        : 'Filter, disclose evidence, and compare two or three solutions layer by layer.'}</p>}
    </header>
    <div className="radar-actions">
      <RadarToolbar locale={locale} filters={filters} onChange={updateFilters} resultCount={results.length} />
      <div className="comparison-action">
        <span role="status">{selected.size}/3 {locale === 'tr' ? 'seçili' : 'selected'}</span>
        <Link className={canCompare ? 'compare-link' : 'compare-link is-disabled'}
          aria-disabled={!canCompare} tabIndex={canCompare ? undefined : -1}
          onClick={(event) => { if (!canCompare) event.preventDefault() }} to={compareUrl}>
          {locale === 'tr' ? `Seçilenleri karşılaştır (${selected.size})` : `Compare selected (${selected.size})`}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
    {selected.size > 0 && <div className="selected-solutions" aria-label={locale === 'tr' ? 'Seçilen çözümler' : 'Selected solutions'}>
      {selectedSolutions.map((solution) => <button key={solution.id} type="button" onClick={() => toggle(solution.id)}
        aria-label={`${solution.name} — ${locale === 'tr' ? 'seçimden çıkar' : 'remove selection'}`}>
        {solution.name} <span aria-hidden="true">×</span>
      </button>)}
      <button type="button" onClick={() => update(filters, new Set())}>{locale === 'tr' ? 'Seçimi temizle' : 'Clear selection'}</button>
    </div>}
    {!visible.length ? <div className="radar-empty">
      <p>{locale === 'tr' ? 'Bu filtrelerle eşleşen çözüm yok.' : 'No solutions match these filters.'}</p>
      <button type="button" onClick={() => updateFilters(emptyRadarFilters)}>{locale === 'tr' ? 'Filtreleri sıfırla' : 'Reset filters'}</button>
    </div> : mobile
      ? <MobileRadarList locale={locale} solutions={visible} selected={selected} onToggle={toggle} />
      : <RadarTable locale={locale} solutions={visible} selected={selected} onToggle={toggle} />}
    {embedded && <Link className="full-radar-link" to={`/${locale}/radar${location.search}`}>
      {locale === 'tr' ? `${catalog.solutions.length} çözümün tümünü incele` : `Inspect all ${catalog.solutions.length} solutions`} →
    </Link>}
  </section>
}
