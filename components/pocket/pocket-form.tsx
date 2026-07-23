'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Trash2 } from 'lucide-react'
import { pocketSchema, type PocketFormData } from '@/lib/validation'
import { FloatingInput } from '@/components/ui/floating-input'
import { IconPicker } from '@/components/pocket/icon-picker'
import { Button } from '@/components/ui/button'
import { useDashboard } from '@/lib/hooks/use-dashboard'
import { formatRp } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import type { IPocketData } from '@/lib/types/dashboard'

interface PocketFormProps {
  onSuccess?: () => void
  editPocket?: IPocketData
}

export function PocketForm({ onSuccess, editPocket }: PocketFormProps) {
  const [budgetDisplay, setBudgetDisplay] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [saldoError, setSaldoError] = useState('')
  const { data, setData } = useDashboard()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PocketFormData>({
    resolver: zodResolver(pocketSchema),
    defaultValues: { name: '', budget: '', icon: 'Wallet' },
  })

  const nameValue = watch('name')
  const iconValue = watch('icon')

  useEffect(() => {
    if (!editPocket) {
      reset({ name: '', budget: '', icon: 'Wallet' })
      setBudgetDisplay('')
      return
    }
    const rawBudget = editPocket.total.toString()
    reset({
      name: editPocket.name,
      budget: rawBudget,
      icon: editPocket.icon,
    })
    setBudgetDisplay(rawBudget && rawBudget !== '0' ? `Rp ${Number(rawBudget).toLocaleString('id-ID')}` : '')
  }, [editPocket, reset])

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    setValue('budget', raw)
    setBudgetDisplay(raw ? `Rp ${Number(raw).toLocaleString('id-ID')}` : '')
  }

  const TABUNGAN_UTAMA = 'Dana Utama'
  const isTabunganUtama = editPocket?.name === TABUNGAN_UTAMA

  const onSubmit = async () => {
    const name = getValues('name')
    const rawBudget = parseInt(getValues('budget') || '0', 10)
    const icon = getValues('icon') || 'Wallet'

    if (editPocket) {
      const updated = data.pockets.map((p) => (p.name === editPocket.name ? { ...p, name, total: rawBudget, icon } : p))
      setData({ ...data, pockets: updated })
    } else {
      const utama = data.pockets.find((p) => p.name === TABUNGAN_UTAMA)
      if (!utama || utama.total - utama.spent < rawBudget) {
        setSaldoError('Saldo Tabungan Utama tidak mencukupi')
        return
      }
      setSaldoError('')

      const updatedPockets = data.pockets.map((p) => (p.name === TABUNGAN_UTAMA ? { ...p, spent: p.spent + rawBudget } : p))
      const newPocket: IPocketData = { name, total: rawBudget, spent: 0, icon }
      setData({ ...data, pockets: [newPocket, ...updatedPockets] })
    }
    onSuccess?.()
  }

  const handleDelete = () => {
    if (!editPocket || isTabunganUtama) return
    const filtered = data.pockets.filter((p) => p.name !== editPocket.name)
    setData({ ...data, pockets: filtered })
    setDeleteOpen(false)
    onSuccess?.()
  }

  const isEdit = !!editPocket

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <FloatingInput id="pocket-name" label="Nama Pocket" value={nameValue} error={errors.name?.message} {...register('name')} />
      <FloatingInput
        id="pocket-budget"
        label={isEdit ? 'Total Dana' : 'Saldo Awal (opsional)'}
        type="text"
        inputMode="numeric"
        value={budgetDisplay}
        error={errors.budget?.message || saldoError}
        onChange={(e) => {
          setSaldoError('')
          handleBudgetChange(e)
        }}
      />
      {(() => {
        const utama = data.pockets.find((p) => p.name === TABUNGAN_UTAMA)
        if (!utama || isEdit) return null
        const saldo = utama.total - utama.spent
        return (
          <div className="flex items-center justify-between -mt-3 px-2">
            <span className="text-[11px] text-text-muted">Ambil dari Tabungan Utama</span>
            <span className="text-[11px] font-mono text-text-muted">{formatRp(saldo)}</span>
          </div>
        )
      })()}
      <IconPicker value={iconValue ?? 'Wallet'} onChange={(name) => setValue('icon', name)} />

      <Button type="submit" disabled={isSubmitting} className="w-full h-11 text-base">
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Menyimpan...
          </>
        ) : isEdit ? (
          'Simpan Perubahan'
        ) : (
          'Simpan Pocket'
        )}
      </Button>

      {isEdit && !isTabunganUtama && (
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger render={<Button variant="destructive" className="w-full h-11 text-base" />}>
            <Trash2 className="h-5 w-5" />
            Hapus Pocket
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Pocket?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah kamu yakin ingin menghapus pocket <strong>{editPocket.name}</strong>? Data tidak bisa dikembalikan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-danger text-white hover:bg-danger/90">
                Ya, Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </form>
  )
}
