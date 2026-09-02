import { useEffect, type ReactNode } from 'react'
import type { Locale } from '../content/schema'
import { GlobalHeader } from './GlobalHeader'

export function AppShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">{locale === 'tr' ? 'İçeriğe geç' : 'Skip to content'}</a>
      <GlobalHeader locale={locale} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="global-footer">
        <p>HNS · {locale === 'tr' ? 'Kaynak-temelli, açık araştırma' : 'Source-backed, open research'}</p>
        <p>{locale === 'tr' ? 'Sıralama değildir.' : 'Not a ranking.'}</p>
      </footer>
    </div>
  )
}
