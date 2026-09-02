import { useState, type ReactNode } from 'react'
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
  return (
    <section className={`weekly-module${wide ? ' is-wide' : ''}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span>{label}</span><span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className={open ? 'weekly-module-body' : 'weekly-module-body is-collapsed'}>{children}</div>
    </section>
  )
}

export function WeeklyIndex({ locale, snapshot }: { locale: Locale; snapshot: WeeklySnapshot }) {
  const pattern = catalog.patternsById.get(snapshot.patternOfWeek)
  const importantClaims = snapshot.mostImportant.claimIds.map((id) => catalog.claimsById.get(id)).filter(Boolean)

  return (
    <div className="weekly-index">
      <Module label={getLocalizedText(labels.important, locale)} wide>
        <StatusMark status="synthesis">{locale === 'tr' ? 'Sentez' : 'Synthesis'}</StatusMark>
        <h2>{getLocalizedText(snapshot.mostImportant.title, locale)}</h2>
        <p>{getLocalizedText(snapshot.mostImportant.body, locale)}</p>
        <div className="module-sources">
          {importantClaims.flatMap((claim) => claim?.sourceIds ?? []).slice(0, 2).map((id) => {
            const source = catalog.sourcesById.get(id)
            return source ? <SourceLink key={id} source={source} locale={locale} /> : null
          })}
        </div>
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
        <div className="module-sources">
          {snapshot.researchOfWeek.sourceIds.map((id) => {
            const source = catalog.sourcesById.get(id)
            return source ? <SourceLink key={id} source={source} locale={locale} /> : null
          })}
        </div>
      </Module>
      <Module label={getLocalizedText(labels.experiment, locale)}>
        <StatusMark status="synthesis">{locale === 'tr' ? 'Sentez' : 'Synthesis'}</StatusMark>
        <h2>{getLocalizedText(snapshot.experimentCandidate.title, locale)}</h2>
        <p>{getLocalizedText(snapshot.experimentCandidate.body, locale)}</p>
      </Module>
    </div>
  )
}
