import { Link, useParams } from 'react-router-dom'
import { catalog } from '../../content/catalog'
import type { Locale } from '../../content/schema'
import { getLatestWeekly, getWeekly } from '../../content/selectors'
import { IntelligenceRail } from './IntelligenceRail'
import { WeeklyIndex } from './WeeklyIndex'
import { WeeklyLead } from './WeeklyLead'
import { RadarPage } from '../radar/RadarPage'

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
      <RadarPage locale={locale} embedded />
    </div>
  )
}
