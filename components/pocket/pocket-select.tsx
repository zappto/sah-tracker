'use client'

import { useState } from 'react'
import { ChevronDown, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDashboard } from '@/hooks/use-dashboard'
import type { ComponentType } from 'react'
import {
  Wallet as WalletIcon, Utensils, Cookie, Car, Coffee, Navigation, Gamepad2, Smartphone, Layers,
} from 'lucide-react'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Wallet: WalletIcon, Utensils, Cookie, Car, Coffee, Navigation, Gamepad2, Smartphone, Layers,
}

function resolveIcon(name: string) {
  return iconMap[name] || WalletIcon
}

interface PocketSelectProps {
  value: string
  onChange: (name: string) => void
  error?: string
}

export function PocketSelect({ value, onChange, error }: PocketSelectProps) {
  const { data, isLoading } = useDashboard()
  const [open, setOpen] = useState(false)
  const selected = data?.pockets.find((p) => p.name === value)

  return (
    <div className="relative">
      <p className="text-sm font-medium text-text-primary mb-2">Pocket</p>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center gap-3 rounded-lg border bg-transparent px-4 py-3 text-left transition-colors',
          error ? 'border-danger' : 'border-border-subtle',
        )}
        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
      >
        {selected ? (
          <>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              {(() => { const Icon = resolveIcon(selected.icon); return <Icon className="h-4 w-4" /> })()}
            </div>
            <span className="flex-1 text-sm font-medium text-text-primary">{selected.name}</span>
          </>
        ) : (
          <>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-text-muted">
              <Wallet className="h-4 w-4" />
            </div>
            <span className="flex-1 text-sm text-text-muted">Pilih pocket</span>
          </>
        )}
        <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="mt-1 rounded-lg border border-border-subtle bg-white max-h-52 overflow-y-auto">
            {data?.pockets.map((pocket) => {
            const active = value === pocket.name
            const Icon = resolveIcon(pocket.icon)
            return (
              <button
                key={pocket.name}
                type="button"
                onClick={() => { onChange(pocket.name); setOpen(false) }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                  active ? 'bg-primary-50' : 'hover:bg-surface-secondary',
                )}
                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{pocket.name}</p>
                  <p className="text-caption text-text-muted font-mono">Rp {pocket.total.toLocaleString('id-ID')}</p>
                </div>
                {active && <div className="h-2 w-2 rounded-full bg-primary-500 shrink-0" />}
              </button>
            )
          })}
        </div>
      )}

      {error && <p className="mt-1.5 text-caption text-danger" role="alert">{error}</p>}
    </div>
  )
}
