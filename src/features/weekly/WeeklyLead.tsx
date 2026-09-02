import type { Locale, WeeklySnapshot } from '../../content/schema'
import { getLocalizedText } from '../../content/selectors'

export function WeeklyLead({ locale, snapshot }: { locale: Locale; snapshot: WeeklySnapshot }) {
  const reviewed = new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${snapshot.cutoffDate}T00:00:00Z`))

  return (
    <header className="weekly-lead">
      <div className="weekly-meta">
        <a href={`/${locale}/weekly/${snapshot.week}`}>{snapshot.week} <span aria-hidden="true">⌄</span></a>
        <span>{locale === 'tr' ? 'İncelendi' : 'Reviewed'} {reviewed}</span>
      </div>
      <div className="weekly-lead-grid">
        <div>
          <h1>{getLocalizedText(snapshot.headline, locale)}</h1>
          <p>{getLocalizedText(snapshot.summary, locale)}</p>
        </div>
        <svg className="signal-loop" viewBox="0 0 520 180" role="img" aria-label={locale === 'tr' ? 'Harness sinyal döngüsü' : 'Harness signal loop'}>
          <g fill="none" stroke="currentColor">
            <path d="M28 36h190c50 0 50 108 0 108H92c-65 0-65-124 0-124h210" />
            <path d="M52 52h170c42 0 42 76 0 76H112c-50 0-50-92 0-92h220" />
            <path d="M78 69h138c31 0 31 42 0 42h-86c-34 0-34-58 0-58h232" />
            <path d="M228 90h245" />
            <path d="m304 84 7 6-7 6M362 84l7 6-7 6M420 84l7 6-7 6" />
          </g>
        </svg>
      </div>
    </header>
  )
}
