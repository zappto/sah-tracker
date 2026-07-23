import { prisma } from '@/lib/db/prisma'
import type { TCreateMemberInput, TUpdateMemberInput } from './member.schema'

export function findAll() {
  return prisma.member.findMany({ orderBy: { name: 'asc' } })
}

export function findById(id: string) {
  return prisma.member.findUnique({ where: { id } })
}

export function findByName(name: string) {
  return prisma.member.findUnique({ where: { name } })
}

export function create(data: TCreateMemberInput) {
  return prisma.member.create({
    data: {
      name: data.name,
      setor: data.setor,
      sisa: data.sisa,
      avatar: data.avatar,
    },
  })
}

export function update(id: string, data: TUpdateMemberInput) {
  return prisma.member.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.setor !== undefined && { setor: data.setor }),
      ...(data.sisa !== undefined && { sisa: data.sisa }),
      ...(data.avatar !== undefined && { avatar: data.avatar }),
    },
  })
}

export function remove(id: string) {
  return prisma.member.delete({ where: { id } })
}

export function countTransactions(memberName: string) {
  return prisma.transaction.count({
    where: {
      OR: [{ dicatat: memberName }, { pocket: memberName }],
    },
  })
}
