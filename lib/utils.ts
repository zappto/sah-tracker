import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pastelColors = [
  { bg: 'bg-pastel-rose', text: 'text-pastel-rose-text' },
  { bg: 'bg-pastel-sky', text: 'text-pastel-sky-text' },
  { bg: 'bg-pastel-emerald', text: 'text-pastel-emerald-text' },
  { bg: 'bg-pastel-amber', text: 'text-pastel-amber-text' },
  { bg: 'bg-pastel-violet', text: 'text-pastel-violet-text' },
  { bg: 'bg-pastel-cyan', text: 'text-pastel-cyan-text' },
  { bg: 'bg-pastel-orange', text: 'text-pastel-orange-text' },
  { bg: 'bg-pastel-teal', text: 'text-pastel-teal-text' },
]

export function getPastelColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return pastelColors[Math.abs(hash) % pastelColors.length]
}

export const formatRp = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`

export const formatRupiahInput = (value: string) => {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''
  return Number(digits).toLocaleString('id-ID')
}

export const unformatRupiah = (value: string) => value.replace(/\D/g, '')

export function smoothScrollTo(el: HTMLElement | null, target: number, duration: number) {
  if (!el) return
  const start = el.scrollLeft
  const diff = target - start
  const started = performance.now()

  function tick(now: number) {
    if (!el) return
    const t = Math.min((now - started) / duration, 1)
    const ease = 1 - Math.pow(1 - t, 3)
    el.scrollLeft = start + diff * ease
    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
