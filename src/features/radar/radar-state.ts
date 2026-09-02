import { catalog } from '../../content/catalog'
import { EvidenceKindSchema, RadarStateSchema, SolutionClassSchema, type EvidenceKind, type Solution } from '../../content/schema'

export type RadarSort = 'radar' | 'name' | 'reviewed'
export type RadarFilters = {
  classes: string[]
  radar: string[]
  evidence: string[]
  organizations: string[]
  openSource: string[]
  freshness: string[]
  query: string
  sort: RadarSort
}

export const emptyRadarFilters: RadarFilters = {
  classes: [], radar: [], evidence: [], organizations: [], openSource: [], freshness: [], query: '', sort: 'radar',
}

const validOrganizations = new Set(catalog.solutions.map((solution) => solution.organization))
const validOpen = new Set(['yes', 'no', 'partial'])
const validFreshness = new Set(['30', '90', 'stale'])
const validSort = new Set<RadarSort>(['radar', 'name', 'reviewed'])

function list(params: URLSearchParams, key: string, valid: (value: string) => boolean) {
  return (params.get(key) ?? '').split(',').filter((value) => value && valid(value))
}

export function parseRadarSearch(search: string): RadarFilters {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const sort = params.get('sort')
  return {
    classes: list(params, 'class', (value) => SolutionClassSchema.safeParse(value).success),
    radar: list(params, 'radar', (value) => RadarStateSchema.safeParse(value).success),
    evidence: list(params, 'evidence', (value) => EvidenceKindSchema.safeParse(value).success),
    organizations: list(params, 'organization', (value) => validOrganizations.has(value)),
    openSource: list(params, 'open', (value) => validOpen.has(value)),
    freshness: list(params, 'freshness', (value) => validFreshness.has(value)),
    query: (params.get('query') ?? '').trim(),
    sort: sort && validSort.has(sort as RadarSort) ? sort as RadarSort : 'radar',
  }
}

export function serializeRadarSearch(filters: RadarFilters): string {
  const params = new URLSearchParams()
  const entries: Array<[string, string[]]> = [
    ['class', filters.classes], ['radar', filters.radar], ['evidence', filters.evidence],
    ['organization', filters.organizations], ['open', filters.openSource], ['freshness', filters.freshness],
  ]
  for (const [key, values] of entries) if (values.length) params.set(key, values.join(','))
  if (filters.query) params.set('query', filters.query)
  if (filters.sort !== 'radar') params.set('sort', filters.sort)
  const result = params.toString()
  return result ? `?${result}` : ''
}

const radarOrder = new Map(['adopt', 'trial', 'assess', 'experiment', 'watch', 'hold'].map((value, index) => [value, index]))

export function evidenceKinds(solution: Solution): EvidenceKind[] {
  const kinds = solution.claimIds.map((id) => catalog.claimsById.get(id)?.kind)
    .filter((kind): kind is EvidenceKind => kind !== undefined)
  return [...new Set(kinds)]
}

export function filterSolutions(solutions: Solution[], filters: RadarFilters): Solution[] {
  const query = filters.query.toLocaleLowerCase('en')
  const matches = solutions.filter((solution) => {
    const kinds = evidenceKinds(solution)
    return (!filters.classes.length || filters.classes.includes(solution.class))
      && (!filters.radar.length || filters.radar.includes(solution.radar))
      && (!filters.evidence.length || filters.evidence.some((kind) => kinds.includes(kind as EvidenceKind)))
      && (!filters.organizations.length || filters.organizations.includes(solution.organization))
      && (!filters.openSource.length || filters.openSource.includes(solution.openSource))
      && (!query || `${solution.name} ${solution.organization} ${solution.summary.en} ${solution.summary.tr}`.toLocaleLowerCase('en').includes(query))
  })

  return matches.map((solution, index) => ({ solution, index })).sort((a, b) => {
    const compared = filters.sort === 'name'
      ? a.solution.name.localeCompare(b.solution.name)
      : filters.sort === 'reviewed'
        ? b.solution.lastReviewedAt.localeCompare(a.solution.lastReviewedAt)
        : (radarOrder.get(a.solution.radar) ?? 99) - (radarOrder.get(b.solution.radar) ?? 99) || a.solution.name.localeCompare(b.solution.name)
    return compared || a.index - b.index
  }).map(({ solution }) => solution)
}
