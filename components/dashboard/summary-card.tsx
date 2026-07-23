import { Wallet, TrendingDown, TrendingUp } from 'lucide-react'
import { formatRp } from '@/lib/utils'

export function SummaryCard() {
  return (
    <div className="rounded-md border border-border-subtle bg-white overflow-hidden shadow-sm">
      <div className="h-1 bg-primary-500" />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-0.5">
          <Wallet className="h-4 w-4 text-primary-500" />
          <span className="text-sm text-text-muted">Sisa Dana Acara</span>
        </div>
        <p className="text-4xl font-semibold tracking-tight text-text-primary font-mono">{formatRp(12450000)}</p>
      </div>
      <div className="flex border-t border-border-subtle">
        <div className="flex flex-1 items-center gap-3 border-r border-border-subtle p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-bg">
            <TrendingDown className="h-4 w-4 text-success" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-muted">Uang Masuk</p>
            <p className="text-sm font-mono font-medium text-text-primary">{formatRp(15000000)}</p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-3 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-danger-bg">
            <TrendingUp className="h-4 w-4 text-danger" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-muted">Uang Keluar</p>
            <p className="text-sm font-mono font-medium text-text-primary">{formatRp(2550000)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
