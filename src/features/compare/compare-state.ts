import type { Catalog, Solution } from '../../content/schema'

export function parseComparedSolutions(search: string, sourceCatalog: Catalog): { solutions: Solution[]; missingIds: string[] } {
  const requested = (new URLSearchParams(search).get('solutions') ?? '').split(',').map((id) => id.trim()).filter(Boolean)
  const solutions: Solution[] = []
  const missingIds: string[] = []
  for (const id of [...new Set(requested)]) {
    const solution = sourceCatalog.solutionsById.get(id)
    if (solution && solutions.length < 3) solutions.push(solution)
    else if (solution) continue
    else missingIds.push(id)
  }
  return { solutions, missingIds }
}
