import { prisma } from '@/lib/db/prisma'
import { AppError } from '@/lib/errors/app-error'
import { publish } from '@/lib/events/event-bus'
import * as repo from './transaction.repository'
import type { TCreateTransactionInput } from './transaction.schema'

export async function getAll() {
  return repo.findAll()
}

export async function getById(id: string) {
  const tx = await repo.findById(id)
  if (!tx) throw AppError.notFound('Transaksi tidak ditemukan')
  return tx
}

export async function create(data: TCreateTransactionInput) {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const displayTime = `${timeStr} · Hari ini`

  const result = await prisma.$transaction(async () => {
    const tx = await prisma.transaction.create({
      data: {
        type: data.type,
        desc: data.desc,
        amount: data.amount,
        pocket: data.pocket,
        dicatat: data.dicatat,
        image: data.image,
        time: displayTime,
      },
    })

    if (data.type === 'income') {
      if (data.dicatat) {
        await prisma.member.update({
          where: { name: data.dicatat },
          data: {
            setor: { increment: data.amount },
            sisa: { increment: data.amount },
          },
        })
      }
      if (data.pocket !== 'Tabungan Utama' && data.pocket !== 'Dana Utama') {
        await prisma.pocket.update({
          where: { name: data.pocket },
          data: { total: { increment: data.amount } },
        })
      }
    } else {
      if (data.pocket !== 'Tabungan Utama' && data.pocket !== 'Dana Utama') {
        await prisma.pocket.update({
          where: { name: data.pocket },
          data: { spent: { increment: data.amount } },
        })
      }
    }

    return tx
  })
  publish({ type: 'FINANCE_UPDATED' })
  return result
}
