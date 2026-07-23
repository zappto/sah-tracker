import { prisma } from '@/lib/db/prisma'
import type { TCreateTransactionInput } from './transaction.schema'

export function findAll() {
  return prisma.transaction.findMany({ orderBy: { createdAt: 'desc' } })
}

export function findById(id: string) {
  return prisma.transaction.findUnique({ where: { id } })
}

export function create(data: TCreateTransactionInput) {
  return prisma.transaction.create({
    data: {
      type: data.type,
      desc: data.desc,
      amount: data.amount,
      pocket: data.pocket,
      dicatat: data.dicatat,
      image: data.image,
      time: '',
    },
  })
}

export function addIncomeToMember(name: string, amount: number) {
  return prisma.member.update({
    where: { name },
    data: {
      setor: { increment: amount },
      sisa: { increment: amount },
    },
  })
}

export function addPocketTotal(name: string, amount: number) {
  return prisma.pocket.update({
    where: { name },
    data: { total: { increment: amount } },
  })
}

export function addPocketSpent(name: string, amount: number) {
  return prisma.pocket.update({
    where: { name },
    data: { spent: { increment: amount } },
  })
}
