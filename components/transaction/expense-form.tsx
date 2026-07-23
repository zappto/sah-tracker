'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { useDashboard } from '@/hooks/use-dashboard'
import { useCreateTransaction } from '@/hooks/use-mutations'
import { FloatingInput } from '@/components/ui/floating-input'
import { ImagePlus, PiggyBank, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { formatRp } from '@/lib/utils'

const TABUNGAN_UTAMA = 'Dana Utama'

interface ExpenseFormProps {
  onSuccess?: () => void
}

export function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const [pocket, setPocket] = useState(TABUNGAN_UTAMA)
  const [amountDisplay, setAmountDisplay] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState<string | undefined>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)
  const { data } = useDashboard()
  const createTx = useCreateTransaction()

  const formatRupiah = (val: string) => {
    const digits = val.replace(/\D/g, '')
    return digits ? `Rp ${Number(digits).toLocaleString('id-ID')}` : ''
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new window.Image()
    img.onload = () => {
      const MAX = 120
      let w = img.width,
        h = img.height
      if (w > h && w > MAX) {
        h = Math.round((h * MAX) / w)
        w = MAX
      } else if (h > MAX) {
        w = Math.round((w * MAX) / h)
        h = MAX
      }
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      ctx.drawImage(img, 0, 0, w, h)
      setImage(c.toDataURL('image/jpeg', 0.5))
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSubmit = async () => {
    const e: Record<string, string> = {}
    const amount = parseInt(amountDisplay.replace(/\D/g, ''), 10) || 0
    if (amount < 1) e.amount = 'Masukkan nominal'
    setErrors(e)
    if (Object.keys(e).length > 0) return

    await createTx.mutateAsync({
      type: 'expense',
      desc: desc.trim() || `Belanja ${pocket}`,
      amount,
      pocket,
      image,
    })

    onSuccess?.()
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-text-muted mb-1.5">Pocket</p>
        <Select
          value={pocket || null}
          onValueChange={(v) => {
            setPocket(v ?? TABUNGAN_UTAMA)
            setErrors((prev) => {
              const r = { ...prev }
              delete r.pocket
              return r
            })
          }}>
          <SelectTrigger className={errors.pocket ? 'border-danger' : ''}>
            {(() => {
              const sel = data?.pockets.find((p) => p.name === pocket)
              return sel ? (
                <>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-bg text-primary">
                    <PiggyBank className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-text-primary text-left">{sel.name}</span>
                  <span className="text-xs font-mono text-text-muted">{formatRp(sel.total - sel.spent)}</span>
                </>
              ) : (
                <>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-text-muted">
                    <PiggyBank className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-sm text-text-muted text-left">Pilih pocket</span>
                </>
              )
            })()}
          </SelectTrigger>
          <SelectContent>
            {data?.pockets.map((p) => {
              const remaining = p.total - p.spent
              return (
                <SelectItem key={p.id} value={p.name} className="py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-bg text-primary">
                    <PiggyBank className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{p.name}</p>
                    <p className="text-caption text-text-muted font-mono">Sisa {formatRp(remaining)}</p>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        {errors.pocket && (
          <p className="mt-1.5 text-caption text-danger" role="alert">
            {errors.pocket}
          </p>
        )}
      </div>

      <FloatingInput
        id="expense-amount"
        label="Jumlah"
        type="text"
        inputMode="numeric"
        value={amountDisplay}
        onChange={(e) => {
          setAmountDisplay(formatRupiah(e.target.value))
          setErrors((prev) => {
            const r = { ...prev }
            delete r.amount
            return r
          })
        }}
        error={errors.amount}
      />

      <FloatingInput id="expense-desc" label="Keterangan (opsional)" value={desc} onChange={(e) => setDesc(e.target.value)} />

      <div>
        <p className="text-xs text-text-muted mb-1.5">Bukti (opsional)</p>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        {image ? (
          <div className="relative w-full rounded-sm border border-border-input bg-white p-3">
            <Image src={image} alt="Bukti belanja" width={0} height={0} sizes="100vw" className="h-24 w-full rounded-sm object-contain" unoptimized />
            <button
              type="button"
              onClick={() => setImage(undefined)}
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 border border-border-subtle text-text-muted hover:text-text-primary">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-dashed border-border-input bg-white px-4 py-6 text-sm text-text-muted hover:text-text-primary hover:border-border-active transition-colors">
            <ImagePlus className="h-5 w-5" />
            Ketuk untuk upload foto
          </button>
        )}
      </div>

      <Button type="submit" disabled={createTx.isPending} className="w-full h-11 text-base">
        {createTx.isPending ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Menyimpan...</>
        ) : (
          'Belanja'
        )}
      </Button>
    </form>
  )
}
