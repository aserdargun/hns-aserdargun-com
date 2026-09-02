import { Link, useLocation } from 'react-router-dom'
import type { Locale } from '../content/schema'
import { localizedPath, rememberLocale } from '../i18n/locale'

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const location = useLocation()
  const current = `${location.pathname}${location.search}${location.hash}`

  return (
    <div className="language-switch" aria-label={locale === 'tr' ? 'Dil' : 'Language'}>
      <Link aria-current={locale === 'tr' ? 'page' : undefined} onClick={() => rememberLocale('tr')} to={localizedPath(current, 'tr')}>
        TR
      </Link>
      <span aria-hidden="true">/</span>
      <Link aria-current={locale === 'en' ? 'page' : undefined} onClick={() => rememberLocale('en')} to={localizedPath(current, 'en')}>
        EN
      </Link>
    </div>
  )
}
