import { z } from 'zod'

export const LocaleSchema = z.enum(['tr', 'en'])
export type Locale = z.infer<typeof LocaleSchema>

export const LocaleTextSchema = z.object({
  tr: z.string().trim().min(1),
  en: z.string().trim().min(1),
})
export type LocaleText = z.infer<typeof LocaleTextSchema>

const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
const WeekSchema = z.string().regex(/^\d{4}-W\d{2}$/)

export const HarnessLayerSchema = z.enum([
  'execution',
  'tools',
  'context',
  'lifecycle',
  'observability',
  'verification',
  'governance',
])
export type HarnessLayer = z.infer<typeof HarnessLayerSchema>

export const harnessLayers = HarnessLayerSchema.options

export const LayerStateSchema = z.enum(['supported', 'partial', 'unknown'])
export type LayerState = z.infer<typeof LayerStateSchema>

export const EvidenceKindSchema = z.enum(['evidence', 'synthesis', 'watch-signal'])
export type EvidenceKind = z.infer<typeof EvidenceKindSchema>

export const RadarStateSchema = z.enum(['adopt', 'trial', 'assess', 'watch', 'hold', 'experiment'])
export type RadarState = z.infer<typeof RadarStateSchema>

export const SolutionClassSchema = z.enum([
  'coding-harness',
  'agent-harness',
  'managed-harness',
  'general-harness',
  'agent-framework',
  'agent-runtime',
  'agent-orchestrator',
  'execution-runtime',
  'software-agent-sdk',
  'minimal-coding-harness',
])
export type SolutionClass = z.infer<typeof SolutionClassSchema>

const SourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: z.string().url(),
  publishedAt: DateSchema.nullable(),
  checkedAt: DateSchema,
  kind: z.enum(['official-engineering', 'official-docs', 'official-repository']),
  access: z.enum(['available', 'unavailable', 'superseded']),
  summary: LocaleTextSchema,
})
export type Source = z.infer<typeof SourceSchema>

const ClaimSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  kind: EvidenceKindSchema,
  text: LocaleTextSchema,
  sourceIds: z.array(z.string()).min(1),
  subjectIds: z.array(z.string()),
  reviewedAt: DateSchema,
  confidence: LocaleTextSchema,
})
export type Claim = z.infer<typeof ClaimSchema>

const LayerCoverageSchema = z.object({
  state: LayerStateSchema,
  claimIds: z.array(z.string()),
})

const SolutionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(1),
  organization: z.string().trim().min(1),
  canonicalUrl: z.string().url(),
  class: SolutionClassSchema,
  lifecycle: z.enum(['experimental', 'developer-preview', 'emerging', 'production']),
  openSource: z.enum(['yes', 'no', 'partial']),
  languages: z.array(z.string().trim().min(1)),
  summary: LocaleTextSchema,
  layers: z.record(HarnessLayerSchema, LayerCoverageSchema),
  maturity: z.enum(['experimental', 'preview', 'growing', 'established']),
  radar: RadarStateSchema,
  radarRationale: LocaleTextSchema,
  radarEffectiveAt: DateSchema,
  lastRelease: DateSchema.nullable(),
  lastReviewedAt: DateSchema,
  sourceIds: z.array(z.string()).min(1),
  claimIds: z.array(z.string()).min(1),
})
export type Solution = z.infer<typeof SolutionSchema>

const WeeklyModuleSchema = z.object({
  title: LocaleTextSchema,
  body: LocaleTextSchema,
  claimIds: z.array(z.string()),
})

const WeeklySnapshotSchema = z.object({
  id: z.string(),
  week: WeekSchema,
  cutoffDate: DateSchema,
  headline: LocaleTextSchema,
  summary: LocaleTextSchema,
  mostImportant: WeeklyModuleSchema,
  solutionsToWatch: z.array(z.string()).min(1),
  patternOfWeek: z.string(),
  researchOfWeek: z.object({
    title: LocaleTextSchema,
    body: LocaleTextSchema,
    sourceIds: z.array(z.string()).min(1),
  }),
  experimentCandidate: z.object({
    title: LocaleTextSchema,
    body: LocaleTextSchema,
  }),
  correctionNotes: z.array(LocaleTextSchema),
})
export type WeeklySnapshot = z.infer<typeof WeeklySnapshotSchema>

const KnowledgeEntrySchema = z.object({
  id: z.string(),
  title: LocaleTextSchema,
  summary: LocaleTextSchema,
  sections: z.array(z.object({ title: LocaleTextSchema, body: LocaleTextSchema })).min(1),
  sourceIds: z.array(z.string()),
})
export type KnowledgeEntry = z.infer<typeof KnowledgeEntrySchema>

const PatternSchema = z.object({
  id: z.string(),
  title: LocaleTextSchema,
  summary: LocaleTextSchema,
  mechanism: LocaleTextSchema,
  tradeoffs: LocaleTextSchema,
  experiment: LocaleTextSchema,
  sourceIds: z.array(z.string()).min(1),
})
export type Pattern = z.infer<typeof PatternSchema>

const TimelineEntrySchema = z.object({
  id: z.string(),
  date: DateSchema,
  title: LocaleTextSchema,
  summary: LocaleTextSchema,
  sourceIds: z.array(z.string()).min(1),
})
export type TimelineEntry = z.infer<typeof TimelineEntrySchema>

const RawCatalogSchema = z
  .object({
    sources: z.array(SourceSchema).min(1),
    solutions: z.array(SolutionSchema).min(1),
    claims: z.array(ClaimSchema).min(1),
    weekly: z.array(WeeklySnapshotSchema).min(1),
    knowledge: z.array(KnowledgeEntrySchema).min(1),
    patterns: z.array(PatternSchema).min(1),
    timeline: z.array(TimelineEntrySchema).min(1),
  })
  .superRefine((value, context) => {
    const uniqueIds = (kind: string, ids: string[]) => {
      const seen = new Set<string>()
      for (const id of ids) {
        if (seen.has(id)) {
          context.addIssue({ code: 'custom', message: `Duplicate ${kind} id: ${id}` })
        }
        seen.add(id)
      }
      return seen
    }

    const sourceIds = uniqueIds('source', value.sources.map((item) => item.id))
    const solutionIds = uniqueIds('solution', value.solutions.map((item) => item.id))
    const claimIds = uniqueIds('claim', value.claims.map((item) => item.id))
    const patternIds = uniqueIds('pattern', value.patterns.map((item) => item.id))
    uniqueIds('weekly', value.weekly.map((item) => item.id))
    uniqueIds('knowledge', value.knowledge.map((item) => item.id))
    uniqueIds('timeline', value.timeline.map((item) => item.id))

    const requireIds = (owner: string, ids: string[], known: Set<string>) => {
      for (const id of ids) {
        if (!known.has(id)) {
          context.addIssue({ code: 'custom', message: `${owner} references unknown id: ${id}` })
        }
      }
    }

    for (const claim of value.claims) {
      requireIds(`Claim ${claim.id}`, claim.sourceIds, sourceIds)
      requireIds(`Claim ${claim.id}`, claim.subjectIds, solutionIds)
    }

    for (const solution of value.solutions) {
      requireIds(`Solution ${solution.id}`, solution.sourceIds, sourceIds)
      requireIds(`Solution ${solution.id}`, solution.claimIds, claimIds)
      for (const layer of harnessLayers) {
        const coverage = solution.layers[layer]
        requireIds(`Solution ${solution.id} layer ${layer}`, coverage.claimIds, claimIds)
        if (coverage.state !== 'unknown' && coverage.claimIds.length === 0) {
          context.addIssue({ code: 'custom', message: `Solution ${solution.id} layer ${layer} needs evidence` })
        }
      }
    }

    for (const snapshot of value.weekly) {
      requireIds(`Weekly ${snapshot.id}`, snapshot.solutionsToWatch, solutionIds)
      requireIds(`Weekly ${snapshot.id}`, snapshot.mostImportant.claimIds, claimIds)
      requireIds(`Weekly ${snapshot.id}`, snapshot.researchOfWeek.sourceIds, sourceIds)
      requireIds(`Weekly ${snapshot.id}`, [snapshot.patternOfWeek], patternIds)
    }

    for (const entry of value.knowledge) requireIds(`Knowledge ${entry.id}`, entry.sourceIds, sourceIds)
    for (const pattern of value.patterns) requireIds(`Pattern ${pattern.id}`, pattern.sourceIds, sourceIds)
    for (const entry of value.timeline) requireIds(`Timeline ${entry.id}`, entry.sourceIds, sourceIds)
  })

export type RawCatalog = z.infer<typeof RawCatalogSchema>

export type Catalog = RawCatalog & {
  sourcesById: Map<string, Source>
  solutionsById: Map<string, Solution>
  claimsById: Map<string, Claim>
  patternsById: Map<string, Pattern>
}

export function parseCatalog(input: unknown): Catalog {
  const value = RawCatalogSchema.parse(input)
  return {
    ...value,
    sourcesById: new Map(value.sources.map((item) => [item.id, item])),
    solutionsById: new Map(value.solutions.map((item) => [item.id, item])),
    claimsById: new Map(value.claims.map((item) => [item.id, item])),
    patternsById: new Map(value.patterns.map((item) => [item.id, item])),
  }
}
