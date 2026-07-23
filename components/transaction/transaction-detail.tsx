'use client'

import Image from 'next/image'
import { ArrowUpRight, ArrowDownRight, Tag, User, Clock, Image as ImageIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatRp } from '@/lib/utils'
import type { ITransaction } from '@/lib/types/dashboard'

import { useDashboard } from '@/hooks/use-dashboard'

interface TransactionDetailProps {
  transaction: ITransaction | null
  onClose: () => void
}

export function TransactionDetail({ transaction, onClose }: TransactionDetailProps) {
  const { data } = useDashboard()
  
  if (!transaction) return null

  const isIncome = transaction.type === 'income'

  return (
    <Dialog open={!!transaction} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xs p-0 gap-0 overflow-hidden bg-bg-app border-none">
        <DialogHeader className="p-4 bg-white border-b border-border-subtle">
          <DialogTitle className="text-center text-sm font-semibold">Detail Transaksi</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 bg-white flex flex-col items-center border-b border-border-subtle">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl mb-3 ${isIncome ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
            {isIncome ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownRight className="h-6 w-6" />}
          </div>
          <p className="text-sm text-text-muted font-medium mb-1">{isIncome ? 'Uang Masuk' : 'Pengeluaran'}</p>
          <p className={`text-2xl font-mono font-bold ${isIncome ? 'text-success' : 'text-danger'}`}>
            {isIncome ? '+' : '-'}{formatRp(transaction.amount)}
          </p>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="rounded-sm bg-white border border-border-subtle p-3 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-4">
              <p className="text-xs text-text-muted">Keterangan</p>
              <p className="text-xs font-medium text-text-primary text-right">{transaction.desc}</p>
            </div>
            
            <div className="flex justify-between items-center gap-4">
              <p className="text-xs text-text-muted">Pocket</p>
              <div className="inline-flex items-center gap-1 rounded-sm bg-primary-50 px-1.5 py-0.5 text-xs font-medium text-primary-700">
                <Tag className="h-3 w-3" />
                {transaction.pocket}
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <p className="text-xs text-text-muted">Dicatat oleh</p>
              <div className="flex items-center gap-1 text-xs font-medium text-text-primary">
                <User className="h-3 w-3 text-text-muted" />
                {(() => {
                  const memberExists = data?.members.some(m => m.name === transaction.dicatat)
                  return memberExists && transaction.dicatat ? transaction.dicatat : '-'
                })()}
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <p className="text-xs text-text-muted">Waktu</p>
              <div className="flex items-center gap-1 text-xs font-medium text-text-primary">
                <Clock className="h-3 w-3 text-text-muted" />
                {transaction.time}
              </div>
            </div>
          </div>

          {transaction.image && (
            <div className="rounded-sm bg-white border border-border-subtle overflow-hidden">
              <div className="p-2 border-b border-border-subtle bg-surface-secondary flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-text-muted" />
                <p className="text-xs font-medium text-text-muted">Bukti Foto</p>
              </div>
              <div className="relative w-full aspect-square bg-slate-100">
                <Image 
                  src={transaction.image} 
                  alt="Bukti transaksi" 
                  fill
                  className="object-contain"
                  unoptimized 
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
