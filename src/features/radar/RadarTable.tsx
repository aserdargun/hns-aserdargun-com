import { SourceLink } from '../../components/SourceLink'
import { StatusMark } from '../../components/StatusMark'
import { catalog } from '../../content/catalog'
import { harnessLayers, type Locale, type Solution } from '../../content/schema'
import { getLocalizedText } from '../../content/selectors'
import { evidenceKindLabels, labelFor, layerNames, layerStateLabels, maturityLabels, radarStateLabels, solutionClassLabels } from '../../i18n/domain-labels'
import { evidenceKinds } from './radar-state'

export function LayerCoverage({ solution, locale }: { solution: Solution; locale: Locale }) {
  const label = harnessLayers.map((layer) => `${getLocalizedText(layerNames[layer], locale)}: ${labelFor(layerStateLabels, solution.layers[layer].state, locale)}`).join(', ')
  return <div className="layer-coverage" role="img" aria-label={label}>{harnessLayers.map((layer) => <span key={layer} className={`layer-${solution.layers[layer].state}`} title={`${getLocalizedText(layerNames[layer], locale)}: ${labelFor(layerStateLabels, solution.layers[layer].state, locale)}`} />)}</div>
}

export function EvidenceCell({ solution, locale }: { solution: Solution; locale: Locale }) {
  return <div className="evidence-kinds">{evidenceKinds(solution).map((kind) => <StatusMark key={kind} status={kind}>{getLocalizedText(evidenceKindLabels[kind], locale)}</StatusMark>)}</div>
}

export function EvidenceDisclosure({ solution, locale }: { solution: Solution; locale: Locale }) {
  return <details className="radar-disclosure"><summary>{locale === 'tr' ? 'Kanıtı aç' : 'Open evidence'}</summary><p>{getLocalizedText(solution.radarRationale, locale)}</p><div>{solution.sourceIds.map((id) => { const source = catalog.sourcesById.get(id); return source ? <SourceLink key={id} source={source} locale={locale} /> : null })}</div></details>
}

type Props = { locale: Locale; solutions: Solution[]; selected: Set<string>; onToggle: (id: string) => void }
export function RadarTable({ locale, solutions, selected, onToggle }: Props) {
  return <div className="radar-table-wrap"><div className="layer-legend" aria-label={locale === 'tr' ? 'Harness katmanları' : 'Harness layers'}>{harnessLayers.map((layer) => <span key={layer}>{getLocalizedText(layerNames[layer], locale)}</span>)}</div><table className="radar-table"><thead><tr><th><span className="sr-only">{locale === 'tr' ? 'Seç' : 'Select'}</span></th><th>{locale === 'tr' ? 'Çözüm' : 'Solution'}</th><th>{locale === 'tr' ? 'Sınıf' : 'Class'}</th><th>{locale === 'tr' ? 'Katman kapsamı' : 'Layer coverage'}</th><th>{locale === 'tr' ? 'Olgunluk' : 'Maturity'}</th><th>Radar</th><th>{locale === 'tr' ? 'İncelendi' : 'Reviewed'}</th><th>{locale === 'tr' ? 'Kanıt' : 'Evidence'}</th></tr></thead><tbody>{solutions.map((solution) => <tr key={solution.id} className={selected.has(solution.id) ? 'is-selected' : ''}>
    <td><input type="checkbox" aria-label={`${solution.name} — ${locale === 'tr' ? 'karşılaştırma için seç' : 'select for comparison'}`} checked={selected.has(solution.id)} disabled={!selected.has(solution.id) && selected.size >= 3} onChange={() => onToggle(solution.id)} /></td>
    <th scope="row"><a href={solution.canonicalUrl} target="_blank" rel="noreferrer">{solution.name} ↗</a><small>{solution.organization}</small></th><td>{labelFor(solutionClassLabels, solution.class, locale)}</td><td><LayerCoverage solution={solution} locale={locale} /></td><td>{labelFor(maturityLabels, solution.maturity, locale)}</td><td><StatusMark status={solution.radar}>{labelFor(radarStateLabels, solution.radar, locale)}</StatusMark></td><td>{solution.lastReviewedAt}</td><td><EvidenceCell solution={solution} locale={locale} /><EvidenceDisclosure solution={solution} locale={locale} /></td>
  </tr>)}</tbody></table></div>
}
