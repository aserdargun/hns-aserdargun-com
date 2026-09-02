import { SourceLink } from '../../components/SourceLink'
import { StatusMark } from '../../components/StatusMark'
import { catalog } from '../../content/catalog'
import type { EvidenceKind, Locale } from '../../content/schema'
import { getLocalizedText } from '../../content/selectors'

const signalIds = ['codex-environment-feedback', 'weekly-layer-convergence', 'deepseek-radar-trial']
const kindLabel: Record<EvidenceKind, { tr: string; en: string }> = {
  evidence: { tr: 'Kanıt', en: 'Evidence' }, synthesis: { tr: 'Sentez', en: 'Synthesis' },
  'watch-signal': { tr: 'İzleme sinyali', en: 'Watch signal' },
}

export function IntelligenceRail({ locale }: { locale: Locale }) {
  return (
    <aside className="intelligence-rail" aria-labelledby="intelligence-heading">
      <h2 id="intelligence-heading">{locale === 'tr' ? 'İstihbarat akışı' : 'Intelligence rail'}</h2>
      {signalIds.map((id) => {
        const claim = catalog.claimsById.get(id)
        const source = claim ? catalog.sourcesById.get(claim.sourceIds[0]) : undefined
        if (!claim || !source) return null
        return (
          <article key={id} className="rail-item">
            <StatusMark status={claim.kind}>{getLocalizedText(kindLabel[claim.kind], locale)}</StatusMark>
            <p>{getLocalizedText(claim.text, locale)}</p>
            <SourceLink source={source} locale={locale} />
          </article>
        )
      })}
    </aside>
  )
}
