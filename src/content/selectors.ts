import type { Catalog, Claim, Locale, LocaleText, WeeklySnapshot } from './schema'

export function getLocalizedText(text: LocaleText, locale: Locale): string {
  return text[locale]
}

export function getLatestWeekly(catalog: Catalog): WeeklySnapshot {
  const latest = [...catalog.weekly].sort((a, b) => b.week.localeCompare(a.week))[0]
  if (!latest) throw new Error('Catalog has no weekly snapshots')
  return latest
}

export function getWeekly(catalog: Catalog, week: string): WeeklySnapshot | undefined {
  return catalog.weekly.find((snapshot) => snapshot.week === week)
}

export function getSolutionEvidence(catalog: Catalog, solutionId: string): Claim[] {
  const solution = catalog.solutionsById.get(solutionId)
  if (!solution) throw new Error(`Unknown solution: ${solutionId}`)

  return solution.claimIds.map((id) => {
    const claim = catalog.claimsById.get(id)
    if (!claim) throw new Error(`Unknown claim: ${id}`)
    return claim
  })
}
