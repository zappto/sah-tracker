import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const AMOUNT = 1_100_000
const MEMBER_NAMES = ['fajar', 'zull', 'nafan', 'alif', 'vicar', 'zovan', 'sapto', 'fatih']
const POCKET_UTAMA = 'Dana Utama'

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
    await prisma.member.createMany({
      data: MEMBER_NAMES.map((name) => ({
        name,
        setor: AMOUNT,
        sisa: AMOUNT,
      })),
    })
    console.log(`Seeded ${MEMBER_NAMES.length} members (Rp${(AMOUNT / 1_000_000).toLocaleString('id-ID')}.000 each)`)
  }

  const existingTx = await prisma.transaction.findFirst()
  if (!existingTx) {
    await prisma.transaction.createMany({
      data: MEMBER_NAMES.map((name) => ({
        type: 'income',
        desc: `Setor ${name}`,
        amount: AMOUNT,
        time: '00.00 · Awal',
        pocket: POCKET_UTAMA,
        dicatat: name,
      })),
    })
    console.log(`Seeded ${MEMBER_NAMES.length} initial income transactions`)
  }

  const utama = await prisma.pocket.findUnique({ where: { name: POCKET_UTAMA } })
  if (!utama) {
    await prisma.pocket.create({
      data: {
        name: POCKET_UTAMA,
        total: AMOUNT * MEMBER_NAMES.length,
        spent: 0,
        icon: 'Wallet',
      },
    })
    console.log(`Seeded pocket: ${POCKET_UTAMA} (Rp${((AMOUNT * MEMBER_NAMES.length) / 1_000_000).toLocaleString('id-ID')}.000)`)
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
