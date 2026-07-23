import { prisma } from '@/lib/db/prisma'
import type { TCreatePocketInput, TUpdatePocketInput } from './pocket.schema'

export function findAll() {
  return prisma.pocket.findMany({ orderBy: { name: 'asc' } })
}

export function findById(id: string) {
  return prisma.pocket.findUnique({ where: { id } })
}

export function findByName(name: string) {
  return prisma.pocket.findUnique({ where: { name } })
}

export function create(data: TCreatePocketInput) {
  return prisma.pocket.create({
    data: {
      name: data.name,
      total: data.total,
      spent: data.spent,
      icon: data.icon,
    },
  })
}

export function update(id: string, data: TUpdatePocketInput) {
  return prisma.pocket.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.total !== undefined && { total: data.total }),
      ...(data.spent !== undefined && { spent: data.spent }),
      ...(data.icon !== undefined && { icon: data.icon }),
    },
  })
}

export function remove(id: string) {
  return prisma.pocket.delete({ where: { id } })
}

export function countExpenses(pocketName: string) {
  return prisma.transaction.count({
    where: { pocket: pocketName },
  })
}
