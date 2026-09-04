import type {
  EvidenceKind,
  HarnessLayer,
  LayerState,
  Locale,
  LocaleText,
  RadarState,
  Solution,
  SolutionClass,
} from '../content/schema'
import { getLocalizedText } from '../content/selectors'

export const layerNames: Record<HarnessLayer, LocaleText> = {
  execution: { tr: 'Çalıştırma', en: 'Execution' },
  tools: { tr: 'Araçlar', en: 'Tools' },
  context: { tr: 'Bağlam', en: 'Context' },
  lifecycle: { tr: 'Yaşam döngüsü', en: 'Lifecycle' },
  observability: { tr: 'Gözlemlenebilirlik', en: 'Observability' },
  verification: { tr: 'Doğrulama', en: 'Verification' },
  governance: { tr: 'Yönetişim', en: 'Governance' },
}

export const layerStateLabels: Record<LayerState, LocaleText> = {
  supported: { tr: 'Destekleniyor', en: 'Supported' },
  partial: { tr: 'Kısmi', en: 'Partial' },
  unknown: { tr: 'Bilinmiyor', en: 'Unknown' },
}

export const evidenceKindLabels: Record<EvidenceKind, LocaleText> = {
  evidence: { tr: 'Kanıt', en: 'Evidence' },
  synthesis: { tr: 'Sentez', en: 'Synthesis' },
  'watch-signal': { tr: 'İzleme sinyali', en: 'Watch signal' },
}

export const radarStateLabels: Record<RadarState, LocaleText> = {
  adopt: { tr: 'Benimse', en: 'Adopt' },
  trial: { tr: 'Dene', en: 'Trial' },
  assess: { tr: 'Değerlendir', en: 'Assess' },
  watch: { tr: 'İzle', en: 'Watch' },
  hold: { tr: 'Beklet', en: 'Hold' },
  experiment: { tr: 'Deney', en: 'Experiment' },
}

export const solutionClassLabels: Record<SolutionClass, LocaleText> = {
  'coding-harness': { tr: "Kodlama harness'ı", en: 'Coding harness' },
  'agent-harness': { tr: "Ajan harness'ı", en: 'Agent harness' },
  'managed-harness': { tr: 'Yönetilen harness', en: 'Managed harness' },
  'general-harness': { tr: 'Genel amaçlı harness', en: 'General harness' },
  'agent-framework': { tr: 'Ajan çatısı', en: 'Agent framework' },
  'agent-runtime': { tr: 'Ajan çalışma zamanı', en: 'Agent runtime' },
  'agent-orchestrator': { tr: 'Ajan orkestratörü', en: 'Agent orchestrator' },
  'execution-runtime': { tr: 'Çalıştırma ortamı', en: 'Execution runtime' },
  'software-agent-sdk': { tr: "Yazılım ajanı SDK'sı", en: 'Software agent SDK' },
  'minimal-coding-harness': { tr: "Minimal kodlama harness'ı", en: 'Minimal coding harness' },
}

export const lifecycleLabels: Record<Solution['lifecycle'], LocaleText> = {
  experimental: { tr: 'Deneysel', en: 'Experimental' },
  'developer-preview': { tr: 'Geliştirici önizlemesi', en: 'Developer preview' },
  emerging: { tr: 'Gelişmekte', en: 'Emerging' },
  production: { tr: 'Üretim', en: 'Production' },
}

export const openSourceLabels: Record<Solution['openSource'], LocaleText> = {
  yes: { tr: 'Evet', en: 'Yes' },
  partial: { tr: 'Kısmen', en: 'Partial' },
  no: { tr: 'Hayır', en: 'No' },
}

export const maturityLabels: Record<Solution['maturity'], LocaleText> = {
  experimental: { tr: 'Deneysel', en: 'Experimental' },
  preview: { tr: 'Önizleme', en: 'Preview' },
  growing: { tr: 'Gelişen', en: 'Growing' },
  established: { tr: 'Yerleşik', en: 'Established' },
}

export function labelFor<T extends string>(labels: Record<T, LocaleText>, value: T, locale: Locale) {
  return getLocalizedText(labels[value], locale)
}
