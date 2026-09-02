import { Link, useParams } from 'react-router-dom'
import { catalog } from '../../content/catalog'
import type { Locale } from '../../content/schema'
import { getLatestWeekly, getWeekly } from '../../content/selectors'
import { IntelligenceRail } from './IntelligenceRail'
import { WeeklyIndex } from './WeeklyIndex'
import { WeeklyLead } from './WeeklyLead'

export function WeeklyPage({ locale }: { locale: Locale }) {
  const { week } = useParams()
  const snapshot = week ? getWeekly(catalog, week) : getLatestWeekly(catalog)
  if (!snapshot) {
    return <section className="weekly-missing"><h1>{locale === 'tr' ? 'Hafta bulunamadı' : 'Week not found'}</h1><Link to={`/${locale}`}>{locale === 'tr' ? 'Son haftalığa dön' : 'Return to latest weekly'} →</Link></section>
  }

  return (
    <div className="weekly-page">
      <WeeklyLead locale={locale} snapshot={snapshot} />
      <div className="weekly-content-grid">
        <WeeklyIndex locale={locale} snapshot={snapshot} />
        <IntelligenceRail locale={locale} />
      </div>
      <section className="radar-entry" aria-labelledby="radar-entry-title">
        <div><p className="section-kicker">{locale === 'tr' ? 'Canlı araştırma yüzeyi' : 'Live research surface'}</p><h2 id="radar-entry-title">{locale === 'tr' ? 'Çözümler Radarı' : 'Solutions Radar'}</h2></div>
        <p>{locale === 'tr' ? '12 çözümü yedi harness katmanı, kanıt türü ve güncellik üzerinden inceleyin.' : 'Inspect 12 solutions across seven harness layers, evidence type, and freshness.'}</p>
        <Link to={`/${locale}/radar`}>{locale === 'tr' ? 'Radarı aç' : 'Open the radar'} →</Link>
      </section>
    </div>
  )
}
