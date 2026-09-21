import { readFileSync, readdirSync } from 'node:fs'
import { parseCatalog } from '../src/content/schema'

const directory = new URL('../content/', import.meta.url)
const read = (file: string): unknown => JSON.parse(readFileSync(new URL(file, directory), 'utf8'))
const catalog = parseCatalog({
  ...Object.fromEntries(['sources', 'claims', 'solutions', 'knowledge', 'patterns', 'timeline', 'ecosystem'].map((name) => [name, read(`${name}.json`)])),
  weekly: readdirSync(new URL('weekly/', directory)).filter((name) => name.endsWith('.json')).map((name) => read(`weekly/${name}`)),
})

const counts = [
  `sources=${catalog.sources.length}`,
  `solutions=${catalog.solutions.length}`,
  `claims=${catalog.claims.length}`,
  `weekly=${catalog.weekly.length}`,
  `patterns=${catalog.patterns.length}`,
]

console.log(`content: valid | ${counts.join(' ')}`)
