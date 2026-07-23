'use client'

import { useRef, useState, useCallback } from 'react'
import { Star, Banknote, ArrowUpRight, CircleDollarSign, Users } from 'lucide-react'
import { formatRp, getPastelColor, smoothScrollTo } from '@/lib/utils'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

interface IMember {
  name: string
  setor: number
  sisa: number
}

const members: IMember[] = [
  { name: 'Zapp', setor: 5000000, sisa: 3200000 },
  { name: 'Fulan', setor: 5000000, sisa: 1800000 },
  { name: 'Alex', setor: 3000000, sisa: 2500000 },
  { name: 'Sarah', setor: 4000000, sisa: 3900000 },
  { name: 'Budi', setor: 2000000, sisa: 1500000 },
  { name: 'Citra', setor: 3500000, sisa: 2800000 },
  { name: 'Doni', setor: 4500000, sisa: 4200000 },
  { name: 'Eka', setor: 2500000, sisa: 500000 },
  { name: 'Fitri', setor: 3000000, sisa: 3000000 },
]

export function MemberSection() {
  const [pinned, setPinned] = useLocalStorage<string[]>('st-pinned-members', [])
  const scrollRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)

  const goToSlide = (idx: number, animated: boolean) => {
    const el = scrollRef.current
    if (!el) return
    setSlide(idx)
    if (animated) {
      smoothScrollTo(el, idx * el.clientWidth, 1000)
    } else {
      el.scrollLeft = idx * el.clientWidth
    }
  }

  const togglePin = (name: string) => {
    const next = pinned.includes(name) ? pinned.filter((n) => n !== name) : [...pinned, name]
    setPinned(next)
    goToSlide(0, true)
  }

  const sorted = [...members].sort((a, b) => {
    const aP = pinned.includes(a.name) ? 0 : 1
    const bP = pinned.includes(b.name) ? 0 : 1
    if (aP !== bP) return aP - bP
    return members.indexOf(a) - members.indexOf(b)
  })

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setSlide(Math.min(idx, sorted.length - 1))
  }, [sorted.length])

  return (
    <section>
      <h2 className="flex items-center gap-1.5 text-sm font-semibold text-text-primary mb-3">
        <Users className="h-4 w-4 text-primary-500" />
        Uang Member
      </h2>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-2"
      >
        {sorted.map((member) => {
          const isPinned = pinned.includes(member.name)
          return (
            <div key={member.name} className="w-full shrink-0 snap-start">
              <MemberCard member={member} isPinned={isPinned} onPin={() => togglePin(member.name)} />
            </div>
          )
        })}
      </div>
      {sorted.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {sorted.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i, false)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-3 bg-primary-500' : 'w-1.5 bg-border-subtle'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function MemberCard({ member, isPinned, onPin }: { member: IMember; isPinned: boolean; onPin: () => void }) {
  const color = getPastelColor(member.name)
  const terpakai = member.setor - member.sisa
  const pct = (terpakai / member.setor) * 100

  return (
    <div className="rounded-sm bg-white border border-border-subtle px-4 py-3 relative">
      <button
        type="button"
        onClick={onPin}
        className="absolute top-0 right-0 flex items-center justify-center w-10 h-10"
        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
        aria-label={isPinned ? 'Unpin member' : 'Pin member'}
      >
        <Star className={`h-4 w-4 ${isPinned ? 'fill-primary-500 text-primary-500' : 'text-text-muted'}`} />
      </button>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color.bg} ${color.text} text-sm font-semibold`}>{member.name[0]}</div>
        <p className="text-sm font-semibold text-text-primary">{member.name}</p>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Banknote className="h-3.5 w-3.5 text-text-muted" />
          <span className="text-xs font-mono text-text-muted">{formatRp(member.setor)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowUpRight className="h-3.5 w-3.5 text-danger" />
          <span className="text-xs font-mono text-danger">{formatRp(terpakai)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CircleDollarSign className={`h-3.5 w-3.5 ${member.sisa > 0 ? 'text-success' : 'text-text-muted'}`} />
          <span className={`text-xs font-mono font-medium ${member.sisa > 0 ? 'text-success' : 'text-text-muted'}`}>{formatRp(member.sisa)}</span>
        </div>
      </div>
      <div className="mt-2 h-1 w-full rounded-sm bg-slate-200 overflow-hidden">
        <div className="h-full rounded-sm bg-danger transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  )
}
