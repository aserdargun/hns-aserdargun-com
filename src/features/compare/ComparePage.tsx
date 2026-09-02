import { Link, useLocation } from 'react-router-dom'
import { catalog } from '../../content/catalog'
import type { Locale } from '../../content/schema'
import { ComparisonMatrix } from './ComparisonMatrix'
import { parseComparedSolutions } from './compare-state'

export function ComparePage({ locale }: { locale: Locale }) {
  const location = useLocation(); const { solutions, missingIds } = parseComparedSolutions(location.search, catalog)
  const title = solutions.map((solution) => solution.name).join(' vs ')
  return <section className="compare-page"><header className="compare-header"><p className="section-kicker">{locale === 'tr' ? 'Paylaşılabilir katman görünümü' : 'Shareable layer view'}</p><h1>{title || (locale === 'tr' ? 'Harness karşılaştırması' : 'Harness comparison')}</h1><p>{locale === 'tr' ? 'Kapsam, kanıt ve olgunluk ayrı tutulur. Bilinmeyen değerler eksik kanıt olarak gösterilir.' : 'Coverage, evidence, and maturity stay separate. Unknown values remain visibly unknown.'}</p></header>
    {missingIds.length > 0 && <p className="comparison-warning" role="status">{locale === 'tr' ? 'Bulunamayan çözüm kimliği' : 'Missing solution ID'}: {missingIds.join(', ')}</p>}
    {solutions.length < 2 ? <div className="comparison-empty"><p>{locale === 'tr' ? 'Karşılaştırma için Radar’dan iki veya üç çözüm seçin.' : 'Select two or three solutions in Radar to compare.'}</p><Link to={`/${locale}/radar`}>{locale === 'tr' ? 'Radar’da çözümleri seç' : 'Choose solutions in Radar'} →</Link></div> : <ComparisonMatrix locale={locale} solutions={solutions} />}
  </section>
}
