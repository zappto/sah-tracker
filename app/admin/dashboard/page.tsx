'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '@/lib/auth'
import { QueryProvider } from '@/providers/query-provider'
import { Header } from '@/components/dashboard/header'
import { SummaryCard } from '@/components/dashboard/summary-card'
import { ActionMenu } from '@/components/admin/action-menu'
import { ActionDrawer } from '@/components/admin/action-drawer'
import { PocketForm } from '@/components/pocket/pocket-form'
import { IncomeForm } from '@/components/transaction/income-form'
import { ExpenseForm } from '@/components/transaction/expense-form'
import { MemberForm } from '@/components/member/member-form'
import { MemberSection } from '@/components/member/member-section'
import { PocketSection } from '@/components/pocket/pocket-section'
import { TransactionSection } from '@/components/transaction/transaction-section'
import { useDashboard } from '@/lib/hooks/use-dashboard'
import type { IPocketData, IMember } from '@/lib/types/dashboard'

type TDrawerMode =
  | { mode: 'income-create'; title: string }
  | { mode: 'expense-create'; title: string }
  | { mode: 'pocket-create'; title: string }
  | { mode: 'pocket-edit'; title: string; pocket: IPocketData }

export default function AdminDashboardPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/admin/login')
    } else {
      setReady(true)
    }
  }, [router])

  const [drawer, setDrawer] = useState<TDrawerMode | null>(null)
  const [memberDialogOpen, setMemberDialogOpen] = useState(false)
  const [editMember, setEditMember] = useState<IMember | null>(null)
  const [blinkMember, setBlinkMember] = useState<string | null>(null)
  const { data } = useDashboard()

  const handleAction = useCallback((label: string) => {
    if (label === 'Tambah Uang') {
      setDrawer({ mode: 'income-create', title: 'Tambah Uang' })
    } else if (label === 'Belanja') {
      setDrawer({ mode: 'expense-create', title: 'Belanja' })
    } else if (label === 'Anggota') {
      setEditMember(null)
      setMemberDialogOpen(true)
    }
  }, [])

  const openCreateDrawer = () => setDrawer({ mode: 'pocket-create', title: 'Buat Pocket Baru' })
  const openEditDrawer = (name: string) => {
    const pocket = data.pockets.find((p) => p.name === name)
    if (pocket) setDrawer({ mode: 'pocket-edit', title: `Edit ${pocket.name}`, pocket })
  }
  const closeDrawer = () => setDrawer(null)

  const handleMemberAdded = useCallback((name: string) => {
    setBlinkMember(name)
    setTimeout(() => setBlinkMember(null), 1500)
  }, [])

  if (!ready) return null

  return (
    <QueryProvider>
      <div className="min-h-screen bg-bg-app">
        <Header adminName="dmalang" />
        <main className="flex flex-col gap-6 px-4 pt-4">
          <SummaryCard />
          <ActionMenu onAction={handleAction} />
          <MemberSection blinkMember={blinkMember} onEditMember={(m) => { setEditMember(m); setMemberDialogOpen(true) }} />
          <PocketSection onAddPocket={openCreateDrawer} onEditPocket={openEditDrawer} />
          <TransactionSection />
        </main>
        <ActionDrawer open={!!drawer} onClose={closeDrawer} title={drawer?.title ?? ''}>
          {drawer?.mode === 'income-create' && <IncomeForm key="income" onSuccess={closeDrawer} />}
          {drawer?.mode === 'expense-create' && <ExpenseForm key="expense" onSuccess={closeDrawer} />}
          {drawer?.mode === 'pocket-create' && <PocketForm key="new" onSuccess={closeDrawer} />}
          {drawer?.mode === 'pocket-edit' && <PocketForm key={drawer.pocket.name} editPocket={drawer.pocket} onSuccess={closeDrawer} />}
        </ActionDrawer>
        <MemberForm open={memberDialogOpen} onOpenChange={setMemberDialogOpen} editMember={editMember} onMemberAdded={handleMemberAdded} />
      </div>
    </QueryProvider>
  )
}
