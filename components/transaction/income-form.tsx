'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useDashboard } from '@/hooks/use-dashboard'
import { useCreateTransaction } from '@/hooks/use-mutations'
import { FloatingInput } from '@/components/ui/floating-input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { getPastelColor } from '@/lib/utils'
import { Users } from 'lucide-react'

const TABUNGAN_UTAMA = 'Dana Utama'

interface IncomeFormProps {
  onSuccess?: () => void
}

export function IncomeForm({ onSuccess }: IncomeFormProps) {
  const [member, setMember] = useState('')
  const [amountDisplay, setAmountDisplay] = useState('')
  const [desc, setDesc] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { data } = useDashboard()
  const createTx = useCreateTransaction()

  const formatRupiah = (val: string) => {
    const digits = val.replace(/\D/g, '')
    return digits ? `Rp ${Number(digits).toLocaleString('id-ID')}` : ''
  }

  const handleSubmit = async () => {
    const e: Record<string, string> = {}
    if (!member) e.member = 'Pilih member'
    const amount = parseInt(amountDisplay.replace(/\D/g, ''), 10) || 0
    if (amount < 1) e.amount = 'Masukkan nominal'
    setErrors(e)
    if (Object.keys(e).length > 0) return

    await createTx.mutateAsync({
      type: 'income',
      desc: desc.trim() || `Setor ${member}`,
      amount,
      pocket: TABUNGAN_UTAMA,
      dicatat: member,
    })

    onSuccess?.()
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
      className="flex flex-col gap-4"
    >
      <div>
        <p className="text-sm font-medium text-text-primary mb-2">Member</p>
        <Select value={member || null} onValueChange={(v) => { setMember(v ?? ''); setErrors((prev) => { const r = { ...prev }; delete r.member; return r }) }}>
          <SelectTrigger className={errors.member ? 'border-danger' : ''}>
            {(() => {
              const sel = data?.members.find((m) => m.name === member)
              return sel ? (
                <>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getPastelColor(sel.name).bg} ${getPastelColor(sel.name).text}`}>
                    {sel.name[0]}
                  </div>
                  <span className="flex-1 text-sm font-medium text-text-primary text-left">{sel.name}</span>
                </>
              ) : (
                <>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-text-muted">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-sm text-text-muted text-left">Pilih member</span>
                </>
              )
            })()}
          </SelectTrigger>
          <SelectContent>
            {data?.members.map((m) => {
              const color = getPastelColor(m.name)
              return (
                <SelectItem key={m.id} value={m.name} className="py-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${color.bg} ${color.text}`}>
                    {m.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{m.name}</p>
                    <p className="text-caption text-text-muted font-mono">Setor Rp {m.setor.toLocaleString('id-ID')}</p>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        {errors.member && <p className="mt-1.5 text-caption text-danger" role="alert">{errors.member}</p>}
      </div>

      <FloatingInput
        id="income-amount"
        label="Jumlah"
        type="text"
        inputMode="numeric"
        value={amountDisplay}
        onChange={(e) => { setAmountDisplay(formatRupiah(e.target.value)); setErrors((prev) => { const r = { ...prev }; delete r.amount; return r }) }}
        error={errors.amount}
      />

      <FloatingInput
        id="income-desc"
        label="Keterangan (opsional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <Button type="submit" disabled={createTx.isPending} className="w-full h-11 text-base">
        {createTx.isPending ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Menyimpan...</>
        ) : (
          'Tambah Uang'
        )}
      </Button>
    </form>
  )
}
