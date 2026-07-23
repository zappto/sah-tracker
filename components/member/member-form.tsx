'use client'

import { useState, useRef } from 'react'
import { Trash2 } from 'lucide-react'
import { useDashboard } from '@/lib/hooks/use-dashboard'
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

export function MemberForm({ open, onOpenChange, editMember, onMemberAdded }: MemberFormProps) {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState<string | undefined>()
  const [setorDisplay, setSetorDisplay] = useState('')
  const [sisaDisplay, setSisaDisplay] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { data, setData } = useDashboard()

  const isEdit = !!editMember

  const isDuplicate = data.members.some(
    (m) => m.name.toLowerCase() === name.trim().toLowerCase() && m.name !== editMember?.name,
  )

  const formatRupiah = (val: string) => {
    const digits = val.replace(/\D/g, '')
    return digits ? `Rp ${Number(digits).toLocaleString('id-ID')}` : ''
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new Image()
    img.onload = () => {
      const MAX = 120
      let w = img.width, h = img.height
      if (w > h && w > MAX) { h = Math.round(h * MAX / w); w = MAX }
      else if (h > MAX) { w = Math.round(w * MAX / h); h = MAX }
      const c = document.createElement('canvas')
      c.width = w; c.height = h
      const ctx = c.getContext('2d')!
      ctx.drawImage(img, 0, 0, w, h)
      setAvatar(c.toDataURL('image/jpeg', 0.5))
    }
    const reader = new FileReader()
    reader.onload = (ev) => { img.src = ev.target?.result as string }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed || isDuplicate) return
    const setor = parseInt(setorDisplay.replace(/\D/g, ''), 10) || 0
    const sisa = parseInt(sisaDisplay.replace(/\D/g, ''), 10) || 0

    if (isEdit) {
      const updated = data.members.map((m) =>
        m.name === editMember!.name ? { ...m, name: trimmed, setor, sisa, avatar } : m,
      )
      setData({ ...data, members: updated })
    } else {
      const newMember: IMember = { name: trimmed, setor, sisa, avatar }
      setData({ ...data, members: [newMember, ...data.members] })
      onMemberAdded?.(trimmed)
    }
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (!editMember) return
    const filtered = data.members.filter((m) => m.name !== editMember.name)
    setData({ ...data, members: filtered })
    setDeleteOpen(false)
    onOpenChange(false)
  }

  const formKey = editMember?.name ?? 'new'

  return (
    <Dialog open={open} onOpenChange={onOpenChange} key={formKey}>
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
                <img
                  src={avatar}
                  alt="Preview"
                  className="h-full w-full rounded-full object-cover ring-1 ring-border-subtle"
                />
                <button
                  type="button"
                  onClick={() => setAvatar(undefined)}
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

          <Button type="submit" disabled={!name.trim() || isDuplicate} className="w-full h-10">
            {isEdit ? 'Simpan Perubahan' : 'Tambah'}
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
                    Apakah kamu yakin ingin menghapus <strong>{editMember.name}</strong>? Data tidak bisa dikembalikan.
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
      </DialogContent>
    </Dialog>
  )
}
