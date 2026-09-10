import { useLocation, useNavigationType } from 'react-router-dom'
import { useEffect, useRef, type ReactNode } from 'react'
import type { Locale } from '../content/schema'
import { GlobalHeader } from './GlobalHeader'

export function AppShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { pathname, search, hash } = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef(pathname)

  useEffect(() => {
    document.documentElement.lang = locale
    const heading = document.querySelector('main h1')?.textContent
    document.title = `${heading || (locale === 'tr' ? 'Harness Engineering Gözlemevi' : 'Harness Engineering Observatory')} · HNS`
    const canonical = `https://hns.aserdargun.com${pathname}`
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
  }, [locale, pathname, search])

  useEffect(() => {
    if (hash) {
      let id = hash.slice(1)
      try { id = decodeURIComponent(id) } catch { /* Treat malformed escapes as a literal ID. */ }
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    } else if (previousPath.current !== pathname && navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    if (previousPath.current !== pathname) document.getElementById('main-content')?.focus({ preventScroll: true })
    previousPath.current = pathname
  }, [pathname, hash, navigationType])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">{locale === 'tr' ? 'İçeriğe geç' : 'Skip to content'}</a>
      <GlobalHeader key={pathname} locale={locale} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="global-footer">
        <p>HNS · {locale === 'tr' ? 'Kaynak-temelli, açık araştırma' : 'Source-backed, open research'}</p>
        <p>{locale === 'tr' ? 'Sıralama değildir.' : 'Not a ranking.'}</p>
      </footer>
    </div>
  )
}
