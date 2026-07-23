'use client'

import { useState } from 'react'
import { ChevronDown, Users } from 'lucide-react'
import { cn, getPastelColor } from '@/lib/utils'
import { useDashboard } from '@/hooks/use-dashboard'

interface MemberSelectProps {
  value: string
  onChange: (name: string) => void
  error?: string
}

export function MemberSelect({ value, onChange, error }: MemberSelectProps) {
  const { data } = useDashboard()
  const [open, setOpen] = useState(false)

  const selected = data?.members.find((m) => m.name === value)

  return (
    <div className="relative">
      <p className="text-sm font-medium text-text-primary mb-2">Member</p>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn('w-full flex items-center gap-3 rounded-lg border bg-transparent px-4 py-3 text-left transition-colors', error ? 'border-danger' : 'border-border-subtle')}
        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>
        {selected ? (
          <>
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getPastelColor(selected.name).bg} ${getPastelColor(selected.name).text}`}>
              {selected.name[0]}
            </div>
            <span className="flex-1 text-sm font-medium text-text-primary">{selected.name}</span>
          </>
        ) : (
          <>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-text-muted">
              <Users className="h-4 w-4" />
            </div>
            <span className="flex-1 text-sm text-text-muted">Pilih member</span>
          </>
        )}
        <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="mt-1 rounded-lg border border-border-subtle bg-white max-h-52 overflow-y-auto">
          {!data || data.members.length === 0 ? (
            <p className="px-4 py-3 text-sm text-text-muted">Belum ada member</p>
          ) : (
            data?.members.map((member) => {
              const active = value === member.name
              const color = getPastelColor(member.name)
              return (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => {
                    onChange(member.name)
                    setOpen(false)
                  }}
                  className={cn('w-full flex items-center gap-3 px-4 py-3 text-left transition-colors', active ? 'bg-primary-50' : 'hover:bg-surface-secondary')}
                  style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${color.bg} ${color.text}`}>{member.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{member.name}</p>
                    <p className="text-caption text-text-muted font-mono">Dana Rp {member.setor.toLocaleString('id-ID')}</p>
                  </div>
                  {active && <div className="h-2 w-2 rounded-full bg-primary-500 shrink-0" />}
                </button>
              )
            })
          )}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-caption text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
