'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Star, Banknote, ArrowUpRight, CircleDollarSign, Users, Plus } from 'lucide-react'
import { formatRp, getPastelColor, smoothScrollTo } from '@/lib/utils'
import { useDashboard } from '@/hooks/use-dashboard'
import type { IMember } from '@/lib/types/dashboard'

interface MemberSectionProps {
  blinkMember?: string | null
  onEditMember?: (member: IMember) => void
  onAddMember?: () => void
}

export function MemberSection({ blinkMember, onEditMember, onAddMember }: MemberSectionProps) {
  const { data } = useDashboard()
  const [pinned, setPinned] = useState<string[]>([])
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

  const sorted = data ? [...data.members].sort((a, b) => {
    const aP = pinned.includes(a.name) ? 0 : 1
    const bP = pinned.includes(b.name) ? 0 : 1
    if (aP !== bP) return aP - bP
    return data.members.indexOf(a) - data.members.indexOf(b)
  }) : []

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
        Member
      </h2>
      {sorted.length === 0 && onAddMember ? (
        <button
          type="button"
          onClick={onAddMember}
          className="flex flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-border-subtle bg-white px-3 py-6 w-full active:scale-[0.98] transition-transform text-text-muted hover:text-primary-500 hover:border-primary-300"
          style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
        >
          <Plus className="h-8 w-8 text-primary-400" />
          <span className="text-sm font-medium">Tambah Anggota</span>
        </button>
      ) : (
        <div ref={scrollRef} onScroll={handleScroll} className="overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-2">
          {sorted.map((member) => {
            const isPinned = pinned.includes(member.name)
            return (
              <div key={member.name} className="w-full shrink-0 snap-start">
                <MemberCard member={member} isPinned={isPinned} onPin={() => togglePin(member.name)} blink={blinkMember === member.name} onEdit={onEditMember} />
              </div>
            )
          })}
        </div>
      )}
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

function MemberCard({ member, isPinned, onPin, blink, onEdit }: { member: IMember; isPinned: boolean; onPin: () => void; blink?: boolean; onEdit?: (member: IMember) => void }) {
  const color = getPastelColor(member.name)
  const terpakai = member.setor - member.sisa
  const pct = (terpakai / member.setor) * 100

  const inner = (
    <>
      {onEdit ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onPin()
          }}
          className="absolute top-0 right-0 flex items-center justify-center w-10 h-10"
          style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
          aria-label={isPinned ? 'Unpin member' : 'Pin member'}>
          <Star className={`h-4 w-4 ${isPinned ? 'fill-primary-500 text-primary-500' : 'text-text-muted'}`} />
        </button>
      ) : (
        isPinned && (
          <div className="absolute top-0 right-0 flex items-center justify-center w-10 h-10">
            <Star className="h-4 w-4 fill-primary-500 text-primary-500" />
          </div>
        )
      )}
      <div className="flex items-center gap-3">
        {member.avatar ? (
          <Image src={member.avatar} alt={member.name} width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border-subtle" unoptimized />
        ) : (
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color.bg} ${color.text} text-sm font-semibold`}>{member.name[0]}</div>
        )}
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
    </>
  )

  if (!onEdit) return <div className={`rounded-sm bg-white border border-border-subtle px-4 py-3 relative ${blink ? 'animate-blink-member' : ''}`}>{inner}</div>

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onEdit(member)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onEdit(member)
      }}
      className={`rounded-sm bg-white border border-border-subtle px-4 py-3 relative cursor-pointer active:scale-[0.98] transition-transform ${blink ? 'animate-blink-member' : ''}`}
      style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>
      {inner}
    </div>
  )
}
