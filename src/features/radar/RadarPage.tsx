import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { catalog } from '../../content/catalog'
import type { Locale } from '../../content/schema'
import { MobileRadarList } from './MobileRadarList'
import { RadarTable } from './RadarTable'
import { RadarToolbar } from './RadarToolbar'
import { emptyRadarFilters, filterSolutions, parseRadarSearch, serializeRadarSearch } from './radar-state'

export function RadarPage({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const location = useLocation(); const navigate = useNavigate()
  const filters = useMemo(() => parseRadarSearch(location.search), [location.search])
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const results = filterSolutions(catalog.solutions, filters); const visible = embedded ? results.slice(0, 5) : results
  const updateFilters = (next: typeof filters) => navigate(`${location.pathname}${serializeRadarSearch(next)}`, { replace: true })
  const toggle = (id: string) => setSelected((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else if (next.size < 3) next.add(id); return next })
  const compareUrl = `/${locale}/compare?solutions=${[...selected].join(',')}`
  return <section className={embedded ? 'radar-page is-embedded' : 'radar-page'} aria-labelledby={embedded ? 'radar-preview-heading' : 'radar-heading'}><header className="radar-header"><div><p className="section-kicker">{locale === 'tr' ? 'Kaynak-temelli gözlem' : 'Source-backed observation'}</p><h1 id={embedded ? 'radar-preview-heading' : 'radar-heading'}>{locale === 'tr' ? 'Çözümler Radarı' : 'Solutions Radar'}</h1></div>{!embedded && <p>{locale === 'tr' ? 'Filtrele, kanıtı aç ve iki ya da üç çözümü katman katman karşılaştır.' : 'Filter, disclose evidence, and compare two or three solutions layer by layer.'}</p>}</header><div className="radar-actions"><RadarToolbar locale={locale} filters={filters} onChange={updateFilters} resultCount={results.length} /><div className="comparison-action"><span>{selected.size} {locale === 'tr' ? 'seçili' : 'selected'}</span><Link className={selected.size ? 'compare-link' : 'compare-link is-disabled'} aria-disabled={!selected.size} to={compareUrl}>{locale === 'tr' ? `Seçilenleri karşılaştır (${selected.size})` : `Compare selected (${selected.size})`} <span aria-hidden="true">→</span></Link></div></div>{!visible.length ? <div className="radar-empty"><p>{locale === 'tr' ? 'Bu filtrelerle eşleşen çözüm yok.' : 'No solutions match these filters.'}</p><button type="button" onClick={() => updateFilters(emptyRadarFilters)}>{locale === 'tr' ? 'Filtreleri sıfırla' : 'Reset filters'}</button></div> : <><RadarTable locale={locale} solutions={visible} selected={selected} onToggle={toggle} /><MobileRadarList locale={locale} solutions={visible} selected={selected} onToggle={toggle} /></>}{embedded && <Link className="full-radar-link" to={`/${locale}/radar`}>{locale === 'tr' ? '12 çözümün tümünü incele' : 'Inspect all 12 solutions'} →</Link>}</section>
}
