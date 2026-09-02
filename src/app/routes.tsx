import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import type { Locale } from '../content/schema'
import { copy, t } from '../i18n/copy'
import { readStoredLocale } from '../i18n/locale'
import { WeeklyPage } from '../features/weekly/WeeklyPage'
import { RadarPage } from '../features/radar/RadarPage'
import { ComparePage } from '../features/compare/ComparePage'
import { KnowledgePage } from '../features/library/KnowledgePage'
import { PatternsPage } from '../features/library/PatternsPage'
import { TimelinePage } from '../features/library/TimelinePage'
import { MethodologyPage } from '../features/library/MethodologyPage'

function NotFound({ locale }: { locale: Locale }) {
  return (
    <section className="not-found"><p className="section-kicker">404 / HNS</p><h1>{t(copy.notFound, locale)}</h1>
      <p>{t(copy.notFoundBody, locale)}</p><a href={`/${locale}`}>{t(copy.latestWeekly, locale)} →</a></section>
  )
}

function LocalizedRoutes({ locale }: { locale: Locale }) {
  return (
    <AppShell locale={locale}><Routes>
      <Route index element={<WeeklyPage locale={locale} />} />
      <Route path="weekly/:week" element={<WeeklyPage locale={locale} />} />
      <Route path="radar" element={<RadarPage locale={locale} />} />
      <Route path="compare" element={<ComparePage locale={locale} />} />
      <Route path="knowledge" element={<KnowledgePage locale={locale} />} />
      <Route path="patterns" element={<PatternsPage locale={locale} />} />
      <Route path="timeline" element={<TimelinePage locale={locale} />} />
      <Route path="methodology" element={<MethodologyPage locale={locale} />} />
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
