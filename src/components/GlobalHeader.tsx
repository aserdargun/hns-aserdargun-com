import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import type { Locale } from '../content/schema'
import { copy, t } from '../i18n/copy'
import { LanguageSwitch } from './LanguageSwitch'

const routes = [
  ['', 'weekly'], ['/radar', 'radar'], ['/compare', 'compare'], ['/knowledge', 'knowledge'],
  ['/patterns', 'patterns'], ['/timeline', 'timeline'], ['/methodology', 'methodology'],
] as const

export function GlobalHeader({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="global-header">
      <div className="brand-group">
        <Link className="brand-mark" to={`/${locale}`} aria-label={`HNS — ${t(copy.product, locale)}`}>HNS</Link>
        <span className="brand-divider" aria-hidden="true" />
        <span className="product-name">{t(copy.product, locale)}</span>
      </div>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
        {t(copy.menu, locale)} <span aria-hidden="true">{menuOpen ? '×' : '＋'}</span>
      </button>
      <nav id="primary-navigation" className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Primary">
        {routes.map(([path, key]) => (
          <NavLink key={key} end={path === ''} to={`/${locale}${path}`} onClick={() => setMenuOpen(false)}>
            {t(copy.navigation[key], locale)}
          </NavLink>
        ))}
      </nav>
      <LanguageSwitch locale={locale} />
    </header>
  )
}
