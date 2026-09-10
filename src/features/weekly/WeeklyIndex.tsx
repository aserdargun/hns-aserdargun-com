import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useId, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SourceLink } from '../../components/SourceLink'
import { StatusMark } from '../../components/StatusMark'
import { catalog } from '../../content/catalog'
import type { Locale, WeeklySnapshot } from '../../content/schema'
import { getLocalizedText } from '../../content/selectors'

const labels = {
  important: { tr: 'En önemli gelişme', en: 'Most important development' },
  watch: { tr: 'İzlenecek çözümler', en: 'Solutions to watch' },
  pattern: { tr: 'Haftanın deseni', en: 'Pattern of the week' },
  research: { tr: 'Haftanın araştırması', en: 'Research of the week' },
  experiment: { tr: 'Deney adayı', en: 'Experiment candidate' },
}

function Module({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  const [open, setOpen] = useState(false)
  const bodyId = useId()
  const mobile = useMediaQuery('(max-width: 760px)')
  const expanded = !mobile || open
  return (
    <section className={`weekly-module${wide ? ' is-wide' : ''}`}>
      {mobile ? <button type="button" aria-controls={bodyId} aria-expanded={expanded} onClick={() => setOpen((value) => !value)}>
        <span>{label}</span><span className={open ? 'disclosure-chevron is-open' : 'disclosure-chevron'} aria-hidden="true">›</span>
      </button> : <h2 className="weekly-module-label">{label}</h2>}
      <div id={bodyId} hidden={!expanded} className={expanded ? 'weekly-module-body' : 'weekly-module-body is-collapsed'}>{children}</div>
    </section>
  )
}

export function WeeklyIndex({ locale, snapshot }: { locale: Locale; snapshot: WeeklySnapshot }) {
  const pattern = catalog.patternsById.get(snapshot.patternOfWeek)
  const importantClaims = snapshot.mostImportant.claimIds.map((id) => catalog.claimsById.get(id)).filter(Boolean)

  const importantSourceIds = [...new Set(importantClaims.flatMap((claim) => claim?.sourceIds ?? []))]

  return (
    <div className="weekly-index">
      <h2 className="weekly-index-mobile-title">{locale === 'tr' ? 'Bu hafta' : 'This week'}</h2>
      <Module label={getLocalizedText(labels.important, locale)} wide>
        <StatusMark status="synthesis">{locale === 'tr' ? 'Sentez' : 'Synthesis'}</StatusMark>
        <h2>{getLocalizedText(snapshot.mostImportant.title, locale)}</h2>
        <p>{getLocalizedText(snapshot.mostImportant.body, locale)}</p>
        <details className="module-sources"><summary>{locale === 'tr' ? 'Kanıt kaynakları' : 'Evidence sources'} ({importantSourceIds.length})</summary>
          {importantSourceIds.map((id) => {
            const source = catalog.sourcesById.get(id)
            return source ? <SourceLink key={id} source={source} locale={locale} /> : null
          })}
        </details>
      </Module>
      <Module label={getLocalizedText(labels.watch, locale)}>
        <ul className="watch-list">
          {snapshot.solutionsToWatch.map((id) => {
            const solution = catalog.solutionsById.get(id)
            return solution ? <li key={id}><StatusMark status="watch-signal"><Link to={`/${locale}/radar?query=${id}`}>{solution.name}</Link></StatusMark></li> : null
          })}
        </ul>
      </Module>
      <Module label={getLocalizedText(labels.pattern, locale)}>
        <StatusMark status="evidence">{locale === 'tr' ? 'Kanıt' : 'Evidence'}</StatusMark>
        {pattern && <><h2>{getLocalizedText(pattern.title, locale)}</h2><p>{getLocalizedText(pattern.summary, locale)}</p></>}
        <Link className="module-link" to={`/${locale}/patterns#${snapshot.patternOfWeek}`}>{locale === 'tr' ? 'Deseni incele' : 'Explore pattern'} →</Link>
      </Module>
      <Module label={getLocalizedText(labels.research, locale)}>
        <StatusMark status="evidence">{locale === 'tr' ? 'Kanıt' : 'Evidence'}</StatusMark>
        <h2>{getLocalizedText(snapshot.researchOfWeek.title, locale)}</h2>
        <p>{getLocalizedText(snapshot.researchOfWeek.body, locale)}</p>
        <details className="module-sources"><summary>{locale === 'tr' ? 'Araştırmayı aç' : 'Open research source'}</summary>
          {snapshot.researchOfWeek.sourceIds.map((id) => {
            const source = catalog.sourcesById.get(id)
            return source ? <SourceLink key={id} source={source} locale={locale} /> : null
          })}
        </details>
      </Module>
      <Module label={getLocalizedText(labels.experiment, locale)}>
        <StatusMark status="synthesis">{locale === 'tr' ? 'Sentez' : 'Synthesis'}</StatusMark>
        <h2>{getLocalizedText(snapshot.experimentCandidate.title, locale)}</h2>
        <p>{getLocalizedText(snapshot.experimentCandidate.body, locale)}</p>
      </Module>
    </div>
  )
}
