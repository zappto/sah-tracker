'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { QueryProvider } from '@/providers/query-provider'
import {
  ArrowUpRight, ArrowDownRight, User, Tag, Receipt, ArrowLeft, Loader2
} from 'lucide-react'
import { api } from '@/lib/http/api-client'
import { TransactionDetail } from '@/components/transaction/transaction-detail'
import type { IDashboardData, ITransaction } from '@/lib/types/dashboard'

const formatRp = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`

function TransactionsPageInner() {
  const [selectedTx, setSelectedTx] = useState<ITransaction | null>(null)
  
  const { data, isLoading } = useQuery<IDashboardData>({
    queryKey: ['dashboard'],
    queryFn: () => api.get<IDashboardData>('/dashboard'),
    staleTime: 30 * 1000,
  })

  const sorted = data
    ? [...data.transactions].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : []

  return (
    <div className="min-h-screen bg-bg-app">
      <header className="sticky top-0 z-10 bg-bg-app/80 backdrop-blur-md">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted active:scale-95 transition-transform">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
            <Receipt className="h-4 w-4 text-primary-500" />
            Semua Transaksi
          </h1>
        </div>
      </header>
      <main className="px-4 pb-8 pt-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {sorted.map((tx) => (
              <button 
                key={tx.id} 
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
                        {(() => {
                          const memberExists = data?.members.some(m => m.name === tx.dicatat)
                          return memberExists && tx.dicatat ? tx.dicatat : '-'
                        })()}
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
            ))}
          </div>
        )}
      </main>
      
      <TransactionDetail transaction={selectedTx} onClose={() => setSelectedTx(null)} />
    </div>
  )
}

export default function TransactionsPage() {
  return (
    <QueryProvider>
      <TransactionsPageInner />
    </QueryProvider>
  )
}
