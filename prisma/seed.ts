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
  const users = ['fajar', 'zull']
  let usersCreated = 0
  for (const username of users) {
    const existing = await prisma.user.findUnique({ where: { username } })
    if (!existing) {
      await prisma.user.create({ data: { username } })
      usersCreated++
    }
  }
  if (usersCreated > 0) console.log(`Seeded ${usersCreated} users`)

  let membersCreated = 0
  for (const name of MEMBER_NAMES) {
    const existing = await prisma.member.findUnique({ where: { name } })
    if (!existing) {
      await prisma.member.create({
        data: { name, setor: AMOUNT, sisa: AMOUNT },
      })
      membersCreated++
    }
  }
  if (membersCreated > 0) console.log(`Seeded ${membersCreated} members (Rp${(AMOUNT / 1_000_000).toLocaleString('id-ID')}.000 each)`)

  let txCreated = 0
  for (const name of MEMBER_NAMES) {
    const existingTx = await prisma.transaction.findFirst({
      where: { desc: `Setor ${name}`, type: 'income', pocket: POCKET_UTAMA }
    })
    if (!existingTx) {
      await prisma.transaction.create({
        data: {
          type: 'income',
          desc: `Setor ${name}`,
          amount: AMOUNT,
          time: '00.00 · Awal',
          pocket: POCKET_UTAMA,
          dicatat: name,
        },
      })
      txCreated++
    }
  }
  if (txCreated > 0) console.log(`Seeded ${txCreated} initial income transactions`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
