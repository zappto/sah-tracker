'use client'

import { useState, type ComponentType } from 'react'
import { Wallet, Utensils, Cookie, Car, Coffee, Navigation, Gamepad2, Smartphone, Layers, ChevronDown, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { formatRp } from '@/lib/utils'
import { useDashboard } from '@/lib/hooks/use-dashboard'
import type { IPocketData } from '@/lib/types/dashboard'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Wallet, Utensils, Cookie, Car, Coffee, Navigation, Gamepad2, Smartphone, Layers,
}

function resolveIcon(name: string): ComponentType<{ className?: string }> {
  return iconMap[name] || Wallet
}

interface PocketSectionProps {
  onAddPocket?: () => void
  onEditPocket?: (name: string) => void
}

export function PocketSection({ onAddPocket, onEditPocket }: PocketSectionProps) {
  const { data } = useDashboard()
  const utama = data.pockets.find((p) => p.name === 'Dana Utama')
  const regularPockets = data.pockets.filter((p) => p.name !== 'Dana Utama')
  const [showAll, setShowAll] = useState(false)
  const sliced = showAll ? regularPockets : regularPockets.slice(0, 2)
  const displayPockets = utama ? [utama, ...sliced] : sliced
  const items: ({ type: 'pocket'; data: IPocketData } | { type: 'add' })[] = []
  displayPockets.forEach((p, i) => {
    if (i === 0) items.push({ type: 'add' })
    items.push({ type: 'pocket', data: p })
  })
  if (displayPockets.length < 1) items.push({ type: 'add' })

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
          <Layers className="h-4 w-4 text-primary-500" />
          Pocket
        </h2>
        {regularPockets.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-caption font-medium text-primary-500"
          >
            {showAll ? 'Show less' : 'Show more'}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => {
            if (item.type === 'add') {
              return (
                <motion.div
                  key="add-pocket"
                  layout
                  className="h-full"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <button
                    type="button"
                    onClick={onAddPocket}
                    className="flex flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-border-subtle bg-white px-3 py-2.5 w-full h-full active:scale-[0.98] transition-transform text-text-muted hover:text-primary-500 hover:border-primary-300"
                    style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                  >
                    <Plus className="h-6 w-6 text-primary-400" />
                    <span className="text-caption font-medium">Buat Pocket Baru</span>
                  </button>
                </motion.div>
              )
            }

            const pocket = item.data
            const Icon = resolveIcon(pocket.icon)
            const remaining = pocket.total - pocket.spent
            const spentPct = (pocket.spent / pocket.total) * 100
            const remainPct = ((pocket.total - pocket.spent) / pocket.total) * 100
            return (
              <motion.div
                key={pocket.name}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <button
                  type="button"
                  onClick={() => pocket.name !== 'Dana Utama' && onEditPocket?.(pocket.name)}
                  className={`w-full text-left ${pocket.name === 'Dana Utama' ? 'cursor-default' : 'active:scale-[0.98]'} transition-transform`}
                  style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className={`flex flex-col gap-1.5 rounded-sm border bg-white px-3 py-2.5 ${pocket.name === 'Dana Utama' ? 'border-primary-300 bg-primary-50/30' : 'border-border-subtle'}`}>
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 text-text-muted" />
                      <p className="text-xs font-semibold text-text-primary">{pocket.name}</p>
                    </div>
                    <p className={`text-xs font-mono font-medium ${remaining > 0 ? 'text-success' : 'text-danger'}`}>Sisa {formatRp(remaining)}</p>
                    <p className="text-caption font-mono text-danger -mt-0.5">Terpakai {formatRp(pocket.spent)}</p>
                    <div className="relative h-1.5 w-full rounded-sm bg-slate-200 overflow-hidden">
                      <div className="absolute left-0 h-full bg-primary-400 transition-all" style={{ width: `${Math.min(remainPct, 100)}%` }} />
                      <div className="absolute right-0 h-full bg-danger transition-all" style={{ width: `${Math.min(spentPct, 100)}%` }} />
                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}
