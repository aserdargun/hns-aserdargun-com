import { useMemo, useState } from 'react'
import type { Catalog, Locale, Source } from '../../content/schema'

type SourceRow = { source: Source; claimCount: number; used: boolean }

function buildRows(catalog: Catalog): SourceRow[] {
  const claimCountBySource = new Map<string, number>()
  for (const claim of catalog.claimsById.values()) {
    for (const sourceId of claim.sourceIds) {
      claimCountBySource.set(sourceId, (claimCountBySource.get(sourceId) ?? 0) + 1)
    }
  }

  return [...catalog.sources]
    .map((source) => {
      const claimCount = claimCountBySource.get(source.id) ?? 0
      return { source, claimCount, used: claimCount > 0 }
    })
    .sort((a, b) => b.claimCount - a.claimCount || a.source.title.localeCompare(b.source.title))
}

const KIND_LABELS: Record<Source['kind'], { tr: string; en: string }> = {
  'official-engineering': { tr: 'Resmî mühendislik yazısı', en: 'Official engineering' },
  'official-docs': { tr: 'Resmî belge', en: 'Official documentation' },
  'official-repository': { tr: 'Resmî kod deposu', en: 'Official repository' },
}

const ACCESS_LABELS: Record<Source['access'], { tr: string; en: string }> = {
  available: { tr: 'Erişilebilir', en: 'Available' },
  unavailable: { tr: 'Erişilemiyor', en: 'Unavailable' },
  superseded: { tr: 'Güncel değil', en: 'Superseded' },
}

export function SourcesPage({ catalog, locale }: { catalog: Catalog; locale: Locale }) {
  const [query, setQuery] = useState('')
  const rows = useMemo(() => {
    const all = buildRows(catalog)
    const needle = query.trim().toLowerCase()
    if (!needle) return all
    return all.filter(({ source }) =>
      [source.title, source.publisher, source.id].some((value) => value.toLowerCase().includes(needle)),
    )
  }, [catalog, query])

  const total = buildRows(catalog).length
  const used = buildRows(catalog).filter((row) => row.used).length

  return (
    <section className="library-page sources-page">
      <header className="library-header">
        <p className="section-kicker">HNS / {locale === 'tr' ? 'Kaynak dizini' : 'Source index'}</p>
        <h1>{locale === 'tr' ? 'Kaynaklar' : 'Sources'}</h1>
        <p>
          {locale === 'tr'
            ? 'Her kaynak, dayandığı iddia sayısıyla birlikte listelenir. Bir kaynağa henüz iddia bağlanmadıysa bu kayıt açıkça işaretlenir.'
            : 'Every source is listed with the number of claims it supports. A source not yet attached to a claim is marked explicitly.'}
        </p>
      </header>

      <p className="sources-summary">
        {locale === 'tr'
          ? `${total} kayıt · ${used} kaynak en az bir iddiaya bağlı · ${total - used} kaynak henüz iddiaya bağlanmadı`
          : `${total} records · ${used} sources support at least one claim · ${total - used} sources are not yet attached to a claim`}
      </p>

      <label className="sources-search">
        <span>{locale === 'tr' ? 'Kaynak ara' : 'Search sources'}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === 'tr' ? 'başlık, yayıncı veya kimlik' : 'title, publisher or id'}
        />
      </label>

      <ul className="sources-list">
        {rows.map(({ source, claimCount, used: isUsed }) => (
          <li key={source.id} className="sources-row" data-used={isUsed ? 'true' : 'false'}>
            <div className="sources-row-head">
              <h2>
                <a href={source.url} rel="noreferrer noopener" target="_blank">
                  {source.title}
                </a>
              </h2>
              <p className="sources-row-meta">
                <span>{source.publisher}</span>
                <span>{KIND_LABELS[source.kind][locale]}</span>
                <span className="sources-row-access">{ACCESS_LABELS[source.access][locale]}</span>
              </p>
            </div>
            <p className="sources-row-summary">{source.summary[locale]}</p>
            <p className="sources-row-dates">
              {source.publishedAt ? (
                <>
                  <span>
                    {locale === 'tr' ? 'Yayın' : 'Published'} <time dateTime={source.publishedAt}>{source.publishedAt}</time>
                  </span>
                </>
              ) : (
                <span>{locale === 'tr' ? 'Yayın tarihi bilinmiyor' : 'Publication date unknown'}</span>
              )}
              <span>
                {locale === 'tr' ? 'Son kontrol' : 'Checked'} <time dateTime={source.checkedAt}>{source.checkedAt}</time>
              </span>
            </p>
            <p className="sources-row-claims">
              {isUsed ? (
                <>
                  {claimCount} {locale === 'tr' ? 'iddiayı destekliyor' : claimCount === 1 ? 'claim supported' : 'claims supported'}
                </>
              ) : (
                locale === 'tr'
                  ? 'Henüz bir iddiaya bağlanmadı — kayıt olarak tutuluyor, kanıt olarak kullanılmıyor.'
                  : 'Not yet attached to a claim — kept as a record, not used as evidence.'
              )}
            </p>
          </li>
        ))}
      </ul>

      {rows.length === 0 ? (
        <p className="sources-empty">{locale === 'tr' ? 'Eşleşen kaynak yok.' : 'No matching source.'}</p>
      ) : null}
    </section>
  )
}
