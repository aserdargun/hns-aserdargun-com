import { useState } from 'react'
import type { Locale } from '../content/schema'
import { catalog } from '../content/catalog'
import { evidenceKindLabels } from '../i18n/domain-labels'
import { SourceLink } from './SourceLink'
import { StatusMark } from './StatusMark'

export function ClaimEvidence({ claimIds, locale }: { claimIds: string[]; locale: Locale }) {
  return <div className="claim-evidence">{claimIds.map((id) => {
    const claim = catalog.claimsById.get(id)
    if (!claim) return null
    return <article key={id}>
      <StatusMark status={claim.kind}>{evidenceKindLabels[claim.kind][locale]}</StatusMark>
      <p>{claim.text[locale]}</p>
      <p className="claim-confidence"><strong>{locale === 'tr' ? 'Güven ve sınırlar' : 'Confidence and limits'}:</strong> {claim.confidence[locale]}</p>
      <p><small>{locale === 'tr' ? 'İncelendi' : 'Reviewed'} <time dateTime={claim.reviewedAt}>{claim.reviewedAt}</time></small></p>
      {claim.sourceIds.map((sourceId) => {
        const source = catalog.sourcesById.get(sourceId)
        return source ? <SourceLink key={sourceId} source={source} locale={locale} /> : null
      })}
    </article>
  })}</div>
}

export function LayerEvidence({ claimIds, locale }: { claimIds: string[]; locale: Locale }) {
  const [open, setOpen] = useState(false)
  return <details className="layer-evidence" onToggle={(event) => setOpen(event.currentTarget.open)}>
    <summary>{locale === 'tr' ? 'Katmanın kanıtı' : 'Layer evidence'} ({claimIds.length})</summary>
    {open && <ClaimEvidence claimIds={claimIds} locale={locale} />}
  </details>
}
