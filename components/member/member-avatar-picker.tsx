'use client'

import { cn, getPastelColor } from '@/lib/utils'
import { useDashboard } from '@/lib/hooks/use-dashboard'
import { Users } from 'lucide-react'

interface MemberAvatarPickerProps {
  value: string
  onChange: (name: string) => void
}

export function MemberAvatarPicker({ value, onChange }: MemberAvatarPickerProps) {
  const { data } = useDashboard()

  if (data.members.length === 0) {
    return (
      <div className="rounded-lg border border-border-subtle px-4 py-6 flex flex-col items-center gap-2 text-text-muted">
        <Users className="h-6 w-6" />
        <p className="text-sm">Belum ada member</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm font-medium text-text-primary mb-2">Member</p>
      <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5">
        {data.members.map((member) => {
          const selected = value === member.name
          const color = getPastelColor(member.name)
          return (
            <button
              key={member.name}
              type="button"
              onClick={() => onChange(member.name)}
              className={cn(
                'flex flex-col items-center gap-1 shrink-0 transition-all',
                selected ? 'opacity-100' : 'opacity-60 hover:opacity-80',
              )}
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                selected ? 'ring-2 ring-primary-500 ring-offset-2' : '',
                member.avatar ? '' : `${color.bg} ${color.text}`,
              )}>
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <span className="text-sm font-semibold">{member.name[0]}</span>
                )}
              </div>
              <span className={cn(
                'text-caption font-medium whitespace-nowrap',
                selected ? 'text-primary-600' : 'text-text-muted',
              )}>
                {member.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
