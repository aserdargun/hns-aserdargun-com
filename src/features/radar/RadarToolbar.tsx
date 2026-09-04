import { catalog } from '../../content/catalog'
import type { Locale } from '../../content/schema'
import { evidenceKindLabels, labelFor, openSourceLabels, radarStateLabels, solutionClassLabels } from '../../i18n/domain-labels'
import type { RadarFilters, RadarSort } from './radar-state'

type Props = { locale: Locale; filters: RadarFilters; onChange: (filters: RadarFilters) => void; resultCount: number }
export function RadarToolbar({ locale, filters, onChange, resultCount }: Props) {
  const organizations = [...new Set(catalog.solutions.map((solution) => solution.organization))].sort()
  const updateOne = (key: 'classes' | 'radar' | 'evidence' | 'organizations' | 'openSource', value: string) => onChange({ ...filters, [key]: value ? [value] : [] })
  return <div className="radar-toolbar"><div className="radar-filter-grid">
    <label>{locale === 'tr' ? 'Sınıf' : 'Class'}<select value={filters.classes[0] ?? ''} onChange={(event) => updateOne('classes', event.target.value)}><option value="">{locale === 'tr' ? 'Tümü' : 'All'}</option>{Object.keys(solutionClassLabels).map((value) => <option key={value} value={value}>{labelFor(solutionClassLabels, value as keyof typeof solutionClassLabels, locale)}</option>)}</select></label>
    <label>{locale === 'tr' ? 'Radar konumu' : 'Radar position'}<select value={filters.radar[0] ?? ''} onChange={(event) => updateOne('radar', event.target.value)}><option value="">{locale === 'tr' ? 'Tümü' : 'All'}</option>{Object.keys(radarStateLabels).map((value) => <option key={value} value={value}>{labelFor(radarStateLabels, value as keyof typeof radarStateLabels, locale)}</option>)}</select></label>
    <label>{locale === 'tr' ? 'Kanıt türü' : 'Evidence type'}<select value={filters.evidence[0] ?? ''} onChange={(event) => updateOne('evidence', event.target.value)}><option value="">{locale === 'tr' ? 'Tümü' : 'All'}</option>{Object.keys(evidenceKindLabels).map((value) => <option key={value} value={value}>{labelFor(evidenceKindLabels, value as keyof typeof evidenceKindLabels, locale)}</option>)}</select></label>
    <label>{locale === 'tr' ? 'Kuruluş' : 'Organization'}<select value={filters.organizations[0] ?? ''} onChange={(event) => updateOne('organizations', event.target.value)}><option value="">{locale === 'tr' ? 'Tümü' : 'All'}</option>{organizations.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
    <label>{locale === 'tr' ? 'Açık kaynak' : 'Open source'}<select value={filters.openSource[0] ?? ''} onChange={(event) => updateOne('openSource', event.target.value)}><option value="">{locale === 'tr' ? 'Tümü' : 'All'}</option>{Object.keys(openSourceLabels).map((value) => <option key={value} value={value}>{labelFor(openSourceLabels, value as keyof typeof openSourceLabels, locale)}</option>)}</select></label>
    <label>{locale === 'tr' ? 'Sıralama' : 'Sort'}<select value={filters.sort} onChange={(event) => onChange({ ...filters, sort: event.target.value as RadarSort })}><option value="radar">Radar</option><option value="name">{locale === 'tr' ? 'Ad' : 'Name'}</option><option value="reviewed">{locale === 'tr' ? 'İnceleme tarihi' : 'Reviewed date'}</option></select></label>
  </div><label className="radar-search"><span className="sr-only">{locale === 'tr' ? 'Çözüm ara' : 'Search solutions'}</span><input type="search" value={filters.query} placeholder={locale === 'tr' ? 'Çözüm ara…' : 'Search solutions…'} onChange={(event) => onChange({ ...filters, query: event.target.value })} /><span>{resultCount}</span></label></div>
}
