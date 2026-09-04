import { Link, useParams } from 'react-router-dom'
import { catalog } from '../../content/catalog'
import type { Locale } from '../../content/schema'
import { getLatestWeekly, getLocalizedText, getWeekly } from '../../content/selectors'
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
      {snapshot.correctionNotes.length > 0 && <section className="weekly-corrections" role="note" aria-label={locale === 'tr' ? 'Düzeltmeler' : 'Corrections'}>
        <strong>{locale === 'tr' ? 'Düzeltme kaydı' : 'Correction log'}</strong>
        <ul>{snapshot.correctionNotes.map((note) => <li key={note.en}>{getLocalizedText(note, locale)}</li>)}</ul>
      </section>}
      <div className="weekly-content-grid">
        <WeeklyIndex locale={locale} snapshot={snapshot} />
        <IntelligenceRail locale={locale} />
      </div>
      <RadarPage locale={locale} embedded />
    </div>
  )
}
