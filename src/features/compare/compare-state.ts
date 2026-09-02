import type { Catalog, Solution } from '../../content/schema'

export function parseComparedSolutions(search: string, sourceCatalog: Catalog): { solutions: Solution[]; missingIds: string[] } {
  const requested = (new URLSearchParams(search).get('solutions') ?? '').split(',').filter(Boolean).slice(0, 3)
  const solutions: Solution[] = []
  const missingIds: string[] = []
  for (const id of [...new Set(requested)]) {
    const solution = sourceCatalog.solutionsById.get(id)
    if (solution) solutions.push(solution)
    else missingIds.push(id)
  }
  return { solutions, missingIds }
}
