'use client'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { demoData } from '@/lib/data/demo'
import type { IDashboardData } from '@/lib/types/dashboard'

const STORAGE_KEY = 'st-dashboard'

const UTAMA = { name: 'Dana Utama', total: 0, spent: 0, icon: 'Wallet' }

function ensureUtama(d: IDashboardData): IDashboardData {
  if (!d.pockets.some((p) => p.name === 'Dana Utama')) {
    return { ...d, pockets: [UTAMA, ...d.pockets] }
  }
  return d
}

export function useDashboard() {
  const [rawData, setData] = useLocalStorage<IDashboardData>(STORAGE_KEY, demoData)
  const data = ensureUtama(rawData)
  const guardedSetData = (d: IDashboardData) => setData(ensureUtama(d))
  return { data, setData: guardedSetData }
}

export function seedDashboard() {
  if (typeof window === 'undefined') return
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData))
  }
}
