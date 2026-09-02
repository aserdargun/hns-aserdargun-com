import { StatusMark } from '../../components/StatusMark'
import type { Locale } from '../../content/schema'

const sections = {
  evidence: {
    title: { tr: 'Kanıt, sentez ve izleme sinyalleri', en: 'Evidence, synthesis, and watch signals' },
    body: { tr: 'Kanıt doğrudan birincil kaynağa dayanır. Sentez, kaynaklar üzerinde açıkça etiketlenmiş editoryal yorumdur. İzleme sinyali ise henüz yerleşik sonuca dönüşmemiş erken gelişmedir.', en: 'Evidence is directly supported by a primary source. Synthesis is explicitly labeled editorial interpretation across sources. A watch signal is an early development that has not yet become an established conclusion.' },
  },
  source: {
    title: { tr: 'Kaynak politikası', en: 'Source policy' },
    body: { tr: 'Ürün belgeleri, mühendislik yazıları ve resmî kod depoları tercih edilir. Her kayıt yayın tarihi biliniyorsa onu ve son kontrol tarihini taşır.', en: 'Product documentation, engineering publications, and official repositories are preferred. Every record carries a publication date when known and a last-checked date.' },
  },
  freshness: {
    title: { tr: 'Güncellik', en: 'Freshness' },
    body: { tr: 'Radar konumu ve iddialar tarihli inceleme anlarına bağlıdır. Yeni bir sürüm, önceki kanıtı otomatik olarak geçersiz kılmaz; yeniden inceleme gerektirir.', en: 'Radar positions and claims are tied to dated review moments. A new release does not automatically invalidate prior evidence; it triggers re-review.' },
  },
  corrections: {
    title: { tr: 'Düzeltmeler ve arşiv', en: 'Corrections and archive' },
    body: { tr: 'Yayınlanmış haftalık anlık görüntü sessizce yeniden yazılmaz. Hata bulunduğunda tarihli bir düzeltme notu eklenir ve önceki bağlam korunur.', en: 'A published weekly snapshot is never silently rewritten. When an error is found, a dated correction note is added while preserving prior context.' },
  },
  radar: {
    title: { tr: 'Radar yorumu', en: 'Radar interpretation' },
    body: { tr: 'ADOPT, TRIAL, ASSESS, WATCH, HOLD ve EXPERIMENT bağlama bağlı araştırma konumlarıdır. Bir ürünün evrensel kalitesi ya da satın alma tavsiyesi değildir.', en: 'ADOPT, TRIAL, ASSESS, WATCH, HOLD, and EXPERIMENT are context-dependent research positions. They are not universal product quality grades or buying advice.' },
  },
  ranking: {
    title: { tr: 'Bir sıralama değildir', en: 'This is not a ranking' },
    body: { tr: 'HNS toplam puan üretmez. Kapsam, kanıt güveni, güncellik ve olgunluk ayrı boyutlar olarak tutulur; bilinmeyen değer tarafsız biçimde “bilinmiyor” kalır.', en: 'HNS produces no aggregate score. Coverage, evidence confidence, freshness, and maturity remain separate dimensions; an unknown value stays neutrally unknown.' },
  },
} as const

export function MethodologyPage({ locale }: { locale: Locale }) {
  return <section className="library-page methodology-page"><header className="library-header"><p className="section-kicker">HNS / {locale === 'tr' ? 'Açık yöntem' : 'Open method'}</p><h1>{locale === 'tr' ? 'Nasıl biliyoruz?' : 'How do we know?'}</h1><p>{locale === 'tr' ? 'Her görünür kararın sınıflandırma, kaynak ve güncellik sözleşmesi.' : 'The classification, source, and freshness contract behind every visible decision.'}</p></header><div className="method-signals"><StatusMark status="evidence">{locale === 'tr' ? 'Kanıt' : 'Evidence'}</StatusMark><StatusMark status="synthesis">{locale === 'tr' ? 'Sentez' : 'Synthesis'}</StatusMark><StatusMark status="watch-signal">{locale === 'tr' ? 'İzleme sinyali' : 'Watch signal'}</StatusMark></div><div className="method-grid">{Object.values(sections).map((section, index) => <article key={section.title.en}><span>0{index + 1}</span><h2>{section.title[locale]}</h2><p>{section.body[locale]}</p></article>)}</div></section>
}
