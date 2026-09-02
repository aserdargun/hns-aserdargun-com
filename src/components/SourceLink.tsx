import type { Locale, Source } from '../content/schema'

export function SourceLink({ source, locale }: { source: Source; locale: Locale }) {
  const dates = [source.publishedAt, `${locale === 'tr' ? 'kontrol' : 'checked'} ${source.checkedAt}`].filter(Boolean).join(' · ')
  return (
    <a className="source-link" href={source.url} target="_blank" rel="noreferrer">
      <span>{source.publisher} — {source.title}</span><small>{dates}</small>
      <span className="external-mark" aria-hidden="true">↗</span>
      <span className="sr-only">{locale === 'tr' ? 'yeni sekmede açılır' : 'opens in a new tab'}</span>
    </a>
  )
}
