import { catalog } from '../src/content/catalog'

const counts = [
  `sources=${catalog.sources.length}`,
  `solutions=${catalog.solutions.length}`,
  `claims=${catalog.claims.length}`,
  `weekly=${catalog.weekly.length}`,
  `patterns=${catalog.patterns.length}`,
]

console.log(`content: valid | ${counts.join(' ')}`)
