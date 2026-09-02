import claims from '../../content/claims.json'
import knowledge from '../../content/knowledge.json'
import patterns from '../../content/patterns.json'
import solutions from '../../content/solutions.json'
import sources from '../../content/sources.json'
import timeline from '../../content/timeline.json'
import weekly2026W36 from '../../content/weekly/2026-W36.json'
import { parseCatalog } from './schema'

export const rawCatalog = {
  sources,
  solutions,
  claims,
  weekly: [weekly2026W36],
  knowledge,
  patterns,
  timeline,
}

export const catalog = parseCatalog(rawCatalog)
