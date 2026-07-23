import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const existingUsers = await prisma.user.findMany()
  if (existingUsers.length === 0) {
    await prisma.user.createMany({
      data: [{ username: 'fajar' }, { username: 'zull' }],
    })
    console.log('Seeded users: fajar, zull')
  }

  const existingMembers = await prisma.member.findMany()
  if (existingMembers.length === 0) {
    const memberNames = ['fajar', 'zull', 'nafan', 'alif', 'vicar', 'zovan', 'sapto', 'fatih']
    await prisma.member.createMany({
      data: memberNames.map((name) => ({
        name,
        setor: 1100000,
        sisa: 1100000,
      })),
    })
    console.log(`Seeded ${memberNames.length} members`)
  }

  const tabunganUtama = await prisma.pocket.findUnique({
    where: { name: 'Dana Utama' },
  })

  if (!tabunganUtama) {
    await prisma.pocket.create({
      data: {
        name: 'Dana Utama',
        total: 0,
        spent: 0,
        icon: 'Wallet',
      },
    })
    console.log('Seeded pocket: Dana Utama')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
