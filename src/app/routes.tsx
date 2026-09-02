import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import type { Locale } from '../content/schema'
import { copy, t } from '../i18n/copy'
import { readStoredLocale } from '../i18n/locale'

function Placeholder({ page }: { page: string }) {
  return <section className="placeholder-page"><p className="section-kicker">HNS / {page}</p><h1>{page === 'Weekly' ? 'Harness Engineering Observatory' : page}</h1></section>
}

function NotFound({ locale }: { locale: Locale }) {
  return (
    <section className="not-found"><p className="section-kicker">404 / HNS</p><h1>{t(copy.notFound, locale)}</h1>
      <p>{t(copy.notFoundBody, locale)}</p><a href={`/${locale}`}>{t(copy.latestWeekly, locale)} →</a></section>
  )
}

function LocalizedRoutes({ locale }: { locale: Locale }) {
  return (
    <AppShell locale={locale}><Routes>
      <Route index element={<Placeholder page="Weekly" />} />
      <Route path="weekly/:week" element={<Placeholder page="Weekly" />} />
      <Route path="radar" element={<Placeholder page="Radar" />} />
      <Route path="compare" element={<Placeholder page="Compare" />} />
      <Route path="knowledge" element={<Placeholder page="Knowledge" />} />
      <Route path="patterns" element={<Placeholder page="Patterns" />} />
      <Route path="timeline" element={<Placeholder page="Timeline" />} />
      <Route path="methodology" element={<Placeholder page="Methodology" />} />
      <Route path="*" element={<NotFound locale={locale} />} />
    </Routes></AppShell>
  )
}

function RootRedirect() {
  const location = useLocation()
  return <Navigate replace to={`/${readStoredLocale()}${location.search}${location.hash}`} />
}

export function AppRoutes() {
  return <Routes><Route path="/" element={<RootRedirect />} /><Route path="/en/*" element={<LocalizedRoutes locale="en" />} /><Route path="/tr/*" element={<LocalizedRoutes locale="tr" />} /><Route path="*" element={<LocalizedRoutes locale="en" />} /></Routes>
}
