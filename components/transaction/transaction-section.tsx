'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowDownRight, User, Tag, Receipt, ArrowRight } from 'lucide-react'
import { formatRp } from '@/lib/utils'
import { useDashboard } from '@/hooks/use-dashboard'
import { TransactionDetail } from './transaction-detail'
import type { ITransaction } from '@/lib/types/dashboard'

export function TransactionSection() {
  const { data } = useDashboard()
  const [selectedTx, setSelectedTx] = useState<ITransaction | null>(null)
  
  if (!data) return null
  
  const sorted = [...data.transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const displayed = sorted.slice(0, 5)

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
          <Receipt className="h-4 w-4 text-primary-500" />
          Transaksi Terbaru
        </h2>
        {sorted.length > 5 && (
          <Link href="/transactions" className="flex items-center gap-1 text-caption font-medium text-primary-500">
            All Transaksi
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {displayed.length > 0 ? (
          displayed.map((tx, i) => (
            <button 
              key={i} 
              type="button"
              onClick={() => setSelectedTx(tx)}
              className="rounded-sm bg-white border border-border-subtle px-3 py-2.5 text-left active:scale-[0.98] transition-transform w-full"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tx.type === 'income' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
                  {tx.type === 'income' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-caption font-medium text-text-primary">{tx.desc}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1 rounded-sm bg-primary-50 px-1.5 py-0.5 text-caption font-medium text-primary-700 leading-none">
                      <Tag className="h-2.5 w-2.5" />
                      {tx.pocket}
                    </span>
                    <span className="flex items-center gap-1 text-caption text-text-muted leading-none">
                      <User className="h-2.5 w-2.5" />
                      {tx.dicatat}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-caption font-mono font-medium ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                    {tx.type === 'income' ? '+' : '-'}
                    {formatRp(tx.amount)}
                  </p>
                  <p className="text-caption text-text-muted mt-0.5 leading-none">{tx.time}</p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="rounded-sm bg-white border border-dashed border-border-subtle px-3 py-6 flex items-center justify-center">
            <p className="text-sm font-medium text-text-muted">Belum ada data member atau transaksi</p>
          </div>
        )}
      </div>
      
      <TransactionDetail transaction={selectedTx} onClose={() => setSelectedTx(null)} />
    </section>
  )
}
