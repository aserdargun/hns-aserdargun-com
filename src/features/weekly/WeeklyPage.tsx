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
      <nav className="weekly-archive" aria-label={locale === 'tr' ? 'Haftalık arşiv' : 'Weekly archive'}>
        {[...catalog.weekly].sort((a, b) => b.week.localeCompare(a.week)).map((item) => <Link key={item.id} to={`/${locale}/weekly/${item.week}`} aria-current={item.week === snapshot.week ? 'page' : undefined}>{item.week}</Link>)}
      </nav>
      {snapshot.correctionNotes.length > 0 && <section className="weekly-corrections" role="note" aria-label={locale === 'tr' ? 'Düzeltmeler' : 'Corrections'}>
        <strong>{locale === 'tr' ? 'Düzeltme kaydı' : 'Correction log'}</strong>
        <ul>{snapshot.correctionNotes.map((note) => <li key={note.en}>{getLocalizedText(note, locale)}</li>)}</ul>
      </section>}
      <div className="weekly-content-grid">
        <WeeklyIndex locale={locale} snapshot={snapshot} />
        <IntelligenceRail locale={locale} claimIds={snapshot.signalClaimIds ?? snapshot.mostImportant.claimIds} />
      </div>
      <p className="catalog-context">{locale === 'tr' ? 'Aşağıdaki radar güncel katalogdur; arşiv haftasının tarihsel ürün durumunu temsil etmez.' : 'The radar below is the current catalog; it does not represent product state at the archived week.'}</p>
      <RadarPage locale={locale} embedded />
    </div>
  )
}
