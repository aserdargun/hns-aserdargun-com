import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import type { Locale } from '../content/schema'
import { copy, t } from '../i18n/copy'
import { LanguageSwitch } from './LanguageSwitch'

const routes = [
  ['', 'weekly'], ['/radar', 'radar'], ['/compare', 'compare'], ['/knowledge', 'knowledge'],
  ['/patterns', 'patterns'], ['/timeline', 'timeline'], ['/methodology', 'methodology'],
] as const

export function GlobalHeader({ locale }: { locale: Locale }) {
  const location = useLocation()
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [menuOpen])

  return (
    <header ref={header} className="global-header" onKeyDown={(event) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() } }}>
      <div className="brand-group">
        <Link className="brand-mark" to={`/${locale}`} aria-label={`HNS — ${t(copy.product, locale)}`}>HNS</Link>
        <span className="brand-divider" aria-hidden="true" />
        <span className="product-name">{t(copy.product, locale)}</span>
      </div>
      <button ref={menuButton} className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
        {t(copy.menu, locale)}
        <svg aria-hidden="true" viewBox="0 0 24 24">
          {menuOpen ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
      <nav id="primary-navigation" className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label={locale === 'tr' ? 'Ana gezinme' : 'Primary navigation'}>
        {routes.map(([path, key]) => (
          <NavLink key={key} className={path === '' && location.pathname.startsWith(`/${locale}/weekly/`) ? 'active' : undefined} aria-current={path === '' && location.pathname.startsWith(`/${locale}/weekly/`) ? 'page' : undefined} end={path === ''} to={`/${locale}${path}`} onClick={() => setMenuOpen(false)}>
            {t(copy.navigation[key], locale)}
          </NavLink>
        ))}
      </nav>
      <LanguageSwitch locale={locale} />
    </header>
  )
}
