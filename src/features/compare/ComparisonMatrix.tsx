import { SourceLink } from '../../components/SourceLink'
import { StatusMark } from '../../components/StatusMark'
import { catalog } from '../../content/catalog'
import { harnessLayers, type Locale, type Solution } from '../../content/schema'
import { getLocalizedText } from '../../content/selectors'

const names = {
  execution: { tr: 'Çalıştırma', en: 'Execution' }, tools: { tr: 'Araçlar', en: 'Tools' }, context: { tr: 'Bağlam', en: 'Context' },
  lifecycle: { tr: 'Yaşam döngüsü', en: 'Lifecycle' }, observability: { tr: 'Gözlemlenebilirlik', en: 'Observability' },
  verification: { tr: 'Doğrulama', en: 'Verification' }, governance: { tr: 'Yönetişim', en: 'Governance' },
}
const words = (value: string) => value.split('-').map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ')

type Row = { label: string; render: (solution: Solution) => React.ReactNode }

export function ComparisonMatrix({ locale, solutions }: { locale: Locale; solutions: Solution[] }) {
  const rows: Row[] = [
    { label: locale === 'tr' ? 'Sınıf' : 'Class', render: (solution) => words(solution.class) },
    { label: locale === 'tr' ? 'Yaşam döngüsü durumu' : 'Lifecycle status', render: (solution) => words(solution.lifecycle) },
    { label: locale === 'tr' ? 'Açık kaynak' : 'Open source', render: (solution) => words(solution.openSource) },
    { label: locale === 'tr' ? 'Çalıştırma ortamı' : 'Execution environment', render: () => <span className="unknown-value">{locale === 'tr' ? 'Kaynaklarda belirtilmemiş' : 'Not stated in registry'}</span> },
    ...harnessLayers.map((layer): Row => ({ label: getLocalizedText(names[layer], locale), render: (solution) => <StatusMark status={solution.layers[layer].state}>{words(solution.layers[layer].state)}</StatusMark> })),
    { label: locale === 'tr' ? 'Olgunluk' : 'Maturity', render: (solution) => words(solution.maturity) },
    { label: locale === 'tr' ? 'Radar konumu' : 'Radar position', render: (solution) => <StatusMark status={solution.radar}>{solution.radar.toUpperCase()}</StatusMark> },
    { label: locale === 'tr' ? 'Radar gerekçesi' : 'Radar rationale', render: (solution) => getLocalizedText(solution.radarRationale, locale) },
    { label: locale === 'tr' ? 'Son inceleme' : 'Last reviewed', render: (solution) => solution.lastReviewedAt },
    { label: locale === 'tr' ? 'Birincil kaynaklar' : 'Primary sources', render: (solution) => <div className="comparison-sources">{solution.sourceIds.map((id) => { const source = catalog.sourcesById.get(id); return source ? <SourceLink key={id} source={source} locale={locale} /> : null })}</div> },
  ]

  return <div className="comparison-matrix-wrap"><table className="comparison-matrix"><thead><tr><th>{locale === 'tr' ? 'Boyut' : 'Dimension'}</th>{solutions.map((solution) => <th key={solution.id} scope="col"><a href={solution.canonicalUrl} target="_blank" rel="noreferrer">{solution.name} ↗</a><small>{solution.organization}</small></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{solutions.map((solution) => <td key={solution.id}><span className="mobile-solution-name">{solution.name}</span>{row.render(solution)}</td>)}</tr>)}</tbody></table></div>
}
