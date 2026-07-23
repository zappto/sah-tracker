import { prisma } from '@/lib/db/prisma'
import { AppError } from '@/lib/errors/app-error'
import { publish } from '@/lib/events/event-bus'
import * as repo from './pocket.repository'
import type { TCreatePocketInput, TUpdatePocketInput } from './pocket.schema'

export async function getAll() {
  return repo.findAll()
}

export async function getById(id: string) {
  const pocket = await repo.findById(id)
  if (!pocket) throw AppError.notFound('Pocket tidak ditemukan')
  return pocket
}

export async function create(data: TCreatePocketInput) {
  const existing = await repo.findByName(data.name)
  if (existing) throw AppError.conflict('Nama pocket sudah ada')
  const result = await repo.create(data)
  publish({ type: 'FINANCE_UPDATED' })
  return result
}

export async function update(id: string, data: TUpdatePocketInput) {
  await getById(id)
  if (data.name) {
    const existing = await repo.findByName(data.name)
    if (existing && existing.id !== id) {
      throw AppError.conflict('Nama pocket sudah digunakan')
    }
  }
  const result = await repo.update(id, data)
  publish({ type: 'FINANCE_UPDATED' })
  return result
}

export async function remove(id: string) {
  const pocket = await getById(id)
  
  await prisma.$transaction(async (tx) => {
    await tx.transaction.updateMany({
      where: { pocket: pocket.name },
      data: { pocket: 'Tabungan Utama' },
    })
    
    await tx.pocket.delete({ where: { id } })
  })

  publish({ type: 'FINANCE_UPDATED' })
  return pocket
}
