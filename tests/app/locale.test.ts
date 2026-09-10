import { describe, expect, it, vi } from 'vitest'
import { localizedPath, readStoredLocale, rememberLocale } from '../../src/i18n/locale'

describe('locale routing', () => {
  it('changes the locale prefix and preserves query and hash', () => {
    expect(localizedPath('/en/radar?state=trial#results', 'tr')).toBe('/tr/radar?state=trial#results')
  })

  it('uses English when the stored locale is invalid', () => {
    localStorage.setItem('hns-locale', 'de')
    expect(readStoredLocale()).toBe('en')
  })
})

it('continues routing when browser storage is blocked', () => {
  const read = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('Blocked', 'SecurityError') })
  expect(readStoredLocale()).toBe('en')
  read.mockRestore()
  const write = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Full', 'QuotaExceededError') })
  expect(() => rememberLocale('tr')).not.toThrow()
  write.mockRestore()
})
