import { QueryProvider } from '@/providers/query-provider'
import { Header } from '@/components/dashboard/header'
import { SummaryCard } from '@/components/dashboard/summary-card'
import { MemberSection } from '@/components/member/member-section'
import { PocketSection } from '@/components/pocket/pocket-section'
import { TransactionSection } from '@/components/transaction/transaction-section'

export default function PublicDashboard() {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-bg-app">
        <Header />
        <main className="flex flex-col gap-6 px-4 pb-8 pt-4">
          <SummaryCard />
          <MemberSection />
          <PocketSection />
          <TransactionSection />
        </main>
      </div>
    </QueryProvider>
  )
}
