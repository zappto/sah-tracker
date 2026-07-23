import { AppError } from '@/lib/errors/app-error'
import { publish } from '@/lib/events/event-bus'
import * as repo from './member.repository'
import type { TCreateMemberInput, TUpdateMemberInput } from './member.schema'

export async function getAll() {
  return repo.findAll()
}

export async function getById(id: string) {
  const member = await repo.findById(id)
  if (!member) throw AppError.notFound('Member tidak ditemukan')
  return member
}

export async function create(data: TCreateMemberInput) {
  const existing = await repo.findByName(data.name)
  if (existing) throw AppError.conflict('Nama member sudah ada')
  const result = await repo.create(data)
  publish({ type: 'FINANCE_UPDATED' })
  return result
}

export async function update(id: string, data: TUpdateMemberInput) {
  await getById(id)
  if (data.name) {
    const existing = await repo.findByName(data.name)
    if (existing && existing.id !== id) {
      throw AppError.conflict('Nama member sudah digunakan')
    }
  }
  const result = await repo.update(id, data)
  publish({ type: 'FINANCE_UPDATED' })
  return result
}

export async function remove(id: string) {
  const member = await getById(id)
  const txCount = await repo.countTransactions(member.name)
  if (txCount > 0) {
    throw AppError.conflict(
      'Member memiliki riwayat transaksi dan tidak dapat dihapus',
    )
  }
  const result = await repo.remove(id)
  publish({ type: 'FINANCE_UPDATED' })
  return result
}
