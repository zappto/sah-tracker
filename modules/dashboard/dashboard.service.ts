import * as memberRepo from '@/modules/member/member.repository'
import * as pocketRepo from '@/modules/pocket/pocket.repository'
import * as transactionRepo from '@/modules/transaction/transaction.repository'
import type { IDashboardData, IMember, IPocketData, ITransaction, ISummary } from '@/lib/types/dashboard'

function toNum(v: unknown): number {
  return typeof v === 'number' ? v : Number(v)
}

function mapMember(m: Awaited<ReturnType<typeof memberRepo.findAll>>[number]): IMember {
  return {
    id: m.id,
    name: m.name,
    setor: toNum(m.setor),
    sisa: toNum(m.sisa),
    ...(m.avatar ? { avatar: m.avatar } : {}),
  }
}

function mapPocket(p: Awaited<ReturnType<typeof pocketRepo.findAll>>[number]): IPocketData {
  return {
    id: p.id,
    name: p.name,
    total: toNum(p.total),
    spent: toNum(p.spent),
    icon: p.icon,
  }
}

function mapTransaction(tx: Awaited<ReturnType<typeof transactionRepo.findAll>>[number]): ITransaction {
  return {
    id: tx.id,
    type: tx.type as 'income' | 'expense',
    desc: tx.desc,
    amount: toNum(tx.amount),
    time: tx.time,
    createdAt: tx.createdAt instanceof Date ? tx.createdAt.toISOString() : String(tx.createdAt),
    pocket: tx.pocket,
    dicatat: tx.dicatat,
    ...(tx.image ? { image: tx.image } : {}),
  }
}

function calcSummary(transactions: ITransaction[]): ISummary {
  let income = 0
  let expense = 0
  for (const tx of transactions) {
    if (tx.type === 'income') income += tx.amount
    else expense += tx.amount
  }
  return { total: income - expense, income, expense }
}

export async function getDashboard(): Promise<IDashboardData> {
  const [dbMembers, dbPockets, dbTransactions] = await Promise.all([
    memberRepo.findAll(),
    pocketRepo.findAll(),
    transactionRepo.findAll(),
  ])

  const members = dbMembers.map(mapMember)
  const pockets = dbPockets.map(mapPocket)
  const transactions = dbTransactions.map(mapTransaction)

  const summary = calcSummary(transactions)
  
  // Calculate Tabungan Utama: total income (from all members, etc.) minus total allocated to pockets
  const totalAllocated = pockets.reduce((sum, p) => sum + p.total, 0)
  const tabunganUtama = summary.income - totalAllocated

  return {
    summary,
    tabunganUtama,
    members,
    pockets,
    transactions,
  }
}
