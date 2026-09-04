import { SourceLink } from '../../components/SourceLink'
import { catalog } from '../../content/catalog'
import type { Locale } from '../../content/schema'
import { getLocalizedText } from '../../content/selectors'

export function TimelinePage({ locale }: { locale: Locale }) {
  const timeline = [...catalog.timeline].sort((first, second) => first.date.localeCompare(second.date))
  return <section className="library-page"><header className="library-header"><p className="section-kicker">{locale === 'tr' ? 'Zaman çizgisi' : 'Timeline'}</p><h1>{locale === 'tr' ? 'Harness evriminin zaman çizgisi' : 'Timeline of harness evolution'}</h1><p>{locale === 'tr' ? 'Resmî yayınlar, mimari dönemeçler ve HNS gözlem anları.' : 'Official releases, architectural turns, and HNS observation points.'}</p></header><ol className="timeline-rail">{timeline.map((entry) => <li key={entry.id}><time dateTime={entry.date}>{entry.date}</time><article><h2>{getLocalizedText(entry.title, locale)}</h2><p>{getLocalizedText(entry.summary, locale)}</p><div>{entry.sourceIds.map((id) => { const source = catalog.sourcesById.get(id); return source ? <SourceLink key={id} source={source} locale={locale} /> : null })}</div></article></li>)}</ol></section>
}
