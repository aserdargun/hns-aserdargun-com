import { StatusMark } from '../../components/StatusMark'
import type { Locale, Solution } from '../../content/schema'
import { EvidenceCell, EvidenceDisclosure, LayerCoverage } from './RadarTable'

type Props = { locale: Locale; solutions: Solution[]; selected: Set<string>; onToggle: (id: string) => void }
export function MobileRadarList({ locale, solutions, selected, onToggle }: Props) {
  return <div className="mobile-radar-list">{solutions.map((solution) => <article key={solution.id} className={selected.has(solution.id) ? 'mobile-radar-row is-selected' : 'mobile-radar-row'}><div className="mobile-radar-heading"><input type="checkbox" aria-label={`${solution.name} — ${locale === 'tr' ? 'karşılaştırma için seç' : 'select for comparison'}`} checked={selected.has(solution.id)} disabled={!selected.has(solution.id) && selected.size >= 3} onChange={() => onToggle(solution.id)} /><div><h3>{solution.name}</h3><p>{solution.organization} · {solution.class.replaceAll('-', ' ')}</p></div><StatusMark status={solution.radar}>{solution.radar.toUpperCase()}</StatusMark></div><div className="mobile-radar-meta"><span>{locale === 'tr' ? 'İncelendi' : 'Reviewed'} {solution.lastReviewedAt}</span><EvidenceCell solution={solution} locale={locale} /></div><LayerCoverage solution={solution} locale={locale} /><EvidenceDisclosure solution={solution} locale={locale} /></article>)}</div>
}
