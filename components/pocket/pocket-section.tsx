'use client'

import { useState } from 'react'
import { Wallet, Utensils, Cookie, Car, Layers, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import type { ComponentType } from 'react'
import { formatRp } from '@/lib/utils'

interface IPocket {
  name: string
  total: number
  spent: number
  icon: ComponentType<{ className?: string }>
}

const pockets: IPocket[] = [
  { name: 'Dana Utama', total: 10000000, spent: 2550000, icon: Wallet },
  { name: 'Makan', total: 3000000, spent: 400000, icon: Utensils },
  { name: 'Snack', total: 500000, spent: 0, icon: Cookie },
  { name: 'Transport', total: 2000000, spent: 200000, icon: Car },
  { name: 'Minuman', total: 1000000, spent: 350000, icon: Utensils },
  { name: 'Parkir', total: 500000, spent: 150000, icon: Car },
  { name: 'Hiburan', total: 1500000, spent: 750000, icon: Wallet },
  { name: 'Pulsa', total: 300000, spent: 100000, icon: Wallet },
  { name: 'Lainnya', total: 1000000, spent: 0, icon: Wallet },
]

export function PocketSection() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? pockets : pockets.slice(0, 4)

  return (
    <section>
      <h2 className="flex items-center gap-1.5 text-sm font-semibold text-text-primary mb-3">
        <Layers className="h-4 w-4 text-primary-500" />
        Pocket
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((pocket) => {
            const Icon = pocket.icon
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
                <div className="flex flex-col gap-1.5 rounded-sm border border-border-subtle bg-white px-3 py-2.5">
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
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      {pockets.length > 4 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="ml-auto mt-2 flex items-center gap-1 text-caption font-medium text-primary-500"
        >
          {showAll ? 'Show less' : 'Show more'}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      )}
    </section>
  )
}
