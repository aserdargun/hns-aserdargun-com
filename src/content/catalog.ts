import claims from '../../content/claims.json'
import knowledge from '../../content/knowledge.json'
import patterns from '../../content/patterns.json'
import solutions from '../../content/solutions.json'
import sources from '../../content/sources.json'
import timeline from '../../content/timeline.json'
import ecosystem from '../../content/ecosystem.json'
import { parseCatalog } from './schema'

const weeklyModules = import.meta.glob('../../content/weekly/*.json', { eager: true, import: 'default' })

export const rawCatalog = {
  sources,
  solutions,
  claims,
  weekly: Object.values(weeklyModules) as import('./schema').WeeklySnapshot[],
  ecosystem,
  knowledge,
  patterns,
  timeline,
}

export const catalog = parseCatalog(rawCatalog)
