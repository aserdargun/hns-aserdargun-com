import { describe, expect, it } from 'vitest'
import { localizedPath, readStoredLocale } from '../../src/i18n/locale'

describe('locale routing', () => {
  it('changes the locale prefix and preserves query and hash', () => {
    expect(localizedPath('/en/radar?state=trial#results', 'tr')).toBe('/tr/radar?state=trial#results')
  })

  it('uses English when the stored locale is invalid', () => {
    localStorage.setItem('hns-locale', 'de')
    expect(readStoredLocale()).toBe('en')
  })
})
