'use client'

import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Trash2 } from 'lucide-react'
import { pocketSchema, type PocketFormData } from '@/lib/validation'
import { FloatingInput } from '@/components/ui/floating-input'
import { IconPicker } from '@/components/pocket/icon-picker'
import { Button } from '@/components/ui/button'
import { useDashboard } from '@/hooks/use-dashboard'
import { useCreatePocket, useUpdatePocket, useDeletePocket } from '@/hooks/use-mutations'
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
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [saldoError, setSaldoError] = useState('')
  const { data } = useDashboard()
  const createPocket = useCreatePocket()
  const updatePocket = useUpdatePocket()
  const deletePocket = useDeletePocket()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PocketFormData>({
    resolver: zodResolver(pocketSchema),
    defaultValues: { name: '', budget: '', icon: 'Wallet' },
  })

  const nameValue = useWatch({ control, name: 'name' })
  const iconValue = useWatch({ control, name: 'icon' })
  const rawBudgetValue = useWatch({ control, name: 'budget' })
  const budgetDisplay = rawBudgetValue ? `Rp ${Number(rawBudgetValue).toLocaleString('id-ID')}` : ''

  useEffect(() => {
    if (!editPocket) {
      reset({ name: '', budget: '', icon: 'Wallet' })
      return
    }
    reset({
      name: editPocket.name,
      budget: editPocket.total.toString(),
      icon: editPocket.icon,
    })
  }, [editPocket, reset])

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('budget', e.target.value.replace(/\D/g, ''))
  }

  const onSubmit = async () => {

    const name = getValues('name')
    const rawBudget = parseInt(getValues('budget') || '0', 10)
    const icon = getValues('icon') || 'Wallet'

    if (editPocket) {
      const diff = rawBudget - editPocket.total
      if (diff > 0 && (data?.tabunganUtama ?? 0) < diff) {
        setSaldoError('Saldo Dana Utama tidak mencukupi')
        return
      }
      setSaldoError('')

      await updatePocket.mutateAsync({
        id: editPocket.id,
        data: { name, total: rawBudget, icon },
      })
    } else {
      const tabunganUtama = data?.tabunganUtama ?? 0
      if (rawBudget > 0 && tabunganUtama < rawBudget) {
        setSaldoError('Saldo Dana Utama tidak mencukupi')
        return
      }
      setSaldoError('')

      await createPocket.mutateAsync({ name, total: rawBudget, icon })
    }
    onSuccess?.()
  }

  const handleDelete = async () => {
    if (!editPocket) return
    await deletePocket.mutateAsync(editPocket.id)
    setDeleteOpen(false)
    setTimeout(() => onSuccess?.(), 150)
  }

  const isEdit = !!editPocket
  const isPending = createPocket.isPending || updatePocket.isPending || deletePocket.isPending

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
        if (isEdit || data?.tabunganUtama === undefined) return null
        const saldo = data.tabunganUtama
        return (
          <div className="flex items-center justify-between -mt-3 px-2">
            <span className="text-[11px] text-text-muted">Ambil dari Dana Utama</span>
            <span className="text-[11px] font-mono text-text-muted">{formatRp(saldo)}</span>
          </div>
        )
      })()}
      <IconPicker value={iconValue ?? 'Wallet'} onChange={(name) => setValue('icon', name)} />

      <Button type="submit" disabled={isSubmitting || isPending} className="w-full h-11 text-base">
        {isPending ? (
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

      {isEdit && (
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
              <AlertDialogAction onClick={handleDelete} className="bg-danger text-white hover:bg-danger/90" disabled={deletePocket.isPending}>
                {deletePocket.isPending ? 'Menghapus...' : 'Ya, Hapus'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </form>
  )
}
