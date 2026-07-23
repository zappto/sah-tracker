'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Trash2, Loader2 } from 'lucide-react'
import { useDashboard } from '@/hooks/use-dashboard'
import { useCreateMember, useUpdateMember, useDeleteMember } from '@/hooks/use-mutations'
import { FloatingInput } from '@/components/ui/floating-input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import type { IMember } from '@/lib/types/dashboard'

interface MemberFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editMember?: IMember | null
  onMemberAdded?: (name: string) => void
}

const formatRupiah = (val: string) => {
  const digits = val.replace(/\D/g, '')
  return digits ? `Rp ${Number(digits).toLocaleString('id-ID')}` : ''
}

export function MemberForm({ open, onOpenChange, editMember, onMemberAdded }: MemberFormProps) {
  const [name, setName] = useState('')
  const [avatar, _setAvatar] = useState<string | undefined>()
  const [setorDisplay, setSetorDisplay] = useState('')
  const [sisaDisplay, setSisaDisplay] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { data } = useDashboard()
  const createMember = useCreateMember()
  const updateMember = useUpdateMember()
  const deleteMember = useDeleteMember()

  const isEdit = !!editMember

  useEffect(() => {
    let mounted = true
    if (open && mounted) {
      setTimeout(() => {
        if (!mounted) return
        if (editMember) {
          setName(editMember.name)
          setSetorDisplay(formatRupiah(editMember.setor.toString()))
          setSisaDisplay(formatRupiah(editMember.sisa.toString()))
          _setAvatar(editMember.avatar)
        } else {
          setName('')
          setSetorDisplay('')
          setSisaDisplay('')
          _setAvatar(undefined)
        }
      }, 0)
    }
    return () => { mounted = false }
  }, [open, editMember])

  const isDuplicate = data?.members.some(
    (m) => m.name.toLowerCase() === name.trim().toLowerCase() && m.id !== editMember?.id,
  )

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new window.Image()
    img.onload = () => {
      const MAX = 120
      let w = img.width, h = img.height
      if (w > h && w > MAX) { h = Math.round(h * MAX / w); w = MAX }
      else if (h > MAX) { w = Math.round(w * MAX / h); h = MAX }
      const c = document.createElement('canvas')
      c.width = w; c.height = h
      const ctx = c.getContext('2d')!
      ctx.drawImage(img, 0, 0, w, h)
      _setAvatar(c.toDataURL('image/jpeg', 0.5))
    }
    const reader = new FileReader()
    reader.onload = (ev) => { img.src = ev.target?.result as string }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSubmit = async () => {
    const trimmed = name.trim()
    if (!trimmed || isDuplicate) return
    const rawSetor = parseInt(setorDisplay.replace(/\D/g, ''), 10) || 0
    const rawSisa = parseInt(sisaDisplay.replace(/\D/g, ''), 10) || 0

    if (isEdit && editMember) {
      await updateMember.mutateAsync({
        id: editMember.id,
        data: { name: trimmed, setor: rawSetor, sisa: rawSisa, avatar: avatar ?? null },
      })
    } else {
      await createMember.mutateAsync({ name: trimmed, setor: rawSetor, sisa: rawSisa, avatar })
      onMemberAdded?.(trimmed)
    }
    onOpenChange(false)
  }

  const handleDelete = async () => {
    if (!editMember) return
    await deleteMember.mutateAsync(editMember.id)
    setDeleteOpen(false)
    setTimeout(() => onOpenChange(false), 150)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Anggota' : 'Tambah Anggota'}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
          className="flex flex-col gap-4 pt-1"
        >
          <div className="flex items-center gap-3">
            {avatar ? (
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src={avatar}
                  alt="Preview"
                  width={48}
                  height={48}
                  className="h-full w-full rounded-full object-cover ring-1 ring-border-subtle"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => _setAvatar(undefined)}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-white text-[10px] leading-none"
                  aria-label="Hapus foto"
                >×</button>
              </div>
            ) : (
              <div className="h-12 w-12 shrink-0 rounded-full bg-surface-secondary flex items-center justify-center text-text-muted text-sm font-medium">
                {name ? name[0].toUpperCase() : '?'}
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              {avatar ? 'Ganti Foto' : 'Upload Foto'}
            </button>
          </div>

          <FloatingInput
            id="member-name"
            label="Nama Anggota"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            error={isDuplicate ? 'Nama sudah ada' : undefined}
          />

          {isEdit && (
            <>
              <FloatingInput
                id="member-setor"
                label="Total Setor"
                type="text"
                inputMode="numeric"
                value={setorDisplay}
                onChange={(e) => setSetorDisplay(formatRupiah(e.target.value))}
              />
              <FloatingInput
                id="member-sisa"
                label="Sisa Saldo"
                type="text"
                inputMode="numeric"
                value={sisaDisplay}
                onChange={(e) => setSisaDisplay(formatRupiah(e.target.value))}
              />
            </>
          )}

          <Button type="submit" disabled={!name.trim() || isDuplicate || createMember.isPending || updateMember.isPending} className="w-full h-10">
            {createMember.isPending || updateMember.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</>
            ) : isEdit ? (
              'Simpan Perubahan'
            ) : (
              'Tambah'
            )}
          </Button>

          {isEdit && (
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialogTrigger render={<Button variant="destructive" className="w-full h-10" />}>
                <Trash2 className="h-4 w-4" />
                Hapus Anggota
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah kamu yakin ingin menghapus <strong>{editMember?.name}</strong>? Data tidak bisa dikembalikan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-danger text-white hover:bg-danger/90" disabled={deleteMember.isPending}>
                    {deleteMember.isPending ? 'Menghapus...' : 'Ya, Hapus'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
