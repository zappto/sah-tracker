'use client'

import { useRef, useCallback, useSyncExternalStore } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const cache = useRef({ raw: '' as string | null, parsed: defaultValue })

  const getSnapshot = useCallback((): T => {
    const raw = localStorage.getItem(key)
    const c = cache.current
    if (raw === c.raw) return c.parsed
    try {
      const parsed: T = raw !== null ? JSON.parse(raw) : defaultValue
      cache.current = { raw, parsed }
      return parsed
    } catch {
      cache.current = { raw, parsed: defaultValue }
      return defaultValue
    }
  }, [key, defaultValue])

  const getServerSnapshot = useCallback((): T => defaultValue, [defaultValue])

  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('storage', onStoreChange)
    return () => window.removeEventListener('storage', onStoreChange)
  }, [])

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setValue = useCallback((val: T) => {
    const raw = JSON.stringify(val)
    cache.current = { raw, parsed: val }
    localStorage.setItem(key, raw)
    window.dispatchEvent(new StorageEvent('storage', { key, newValue: raw }))
  }, [key])

  return [value, setValue]
}
