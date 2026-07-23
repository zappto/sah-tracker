export interface ITransaction {
  type: 'income' | 'expense'
  desc: string
  amount: number
  time: string
  createdAt: string
  pocket: string
  dicatat: string
}

export const transactions: ITransaction[] = [
  {
    type: 'expense',
    desc: 'Makan Bajawa',
    amount: 350000,
    time: '2 jam lalu',
    createdAt: '2026-07-23T10:00:00Z',
    pocket: 'Makan',
    dicatat: 'Zapp',
  },
  {
    type: 'income',
    desc: 'Setor Zapp',
    amount: 5000000,
    time: '5 jam lalu',
    createdAt: '2026-07-23T07:00:00Z',
    pocket: 'Dana Utama',
    dicatat: 'Zapp',
  },
  {
    type: 'expense',
    desc: 'Kopi Flores',
    amount: 50000,
    time: '1 hari lalu',
    createdAt: '2026-07-22T12:00:00Z',
    pocket: 'Snack',
    dicatat: 'Alex',
  },
  {
    type: 'expense',
    desc: 'Bensin Bajawa',
    amount: 200000,
    time: '1 hari lalu',
    createdAt: '2026-07-22T10:00:00Z',
    pocket: 'Transport',
    dicatat: 'Fulan',
  },
  {
    type: 'income',
    desc: 'Setor Sarah',
    amount: 4000000,
    time: '2 hari lalu',
    createdAt: '2026-07-21T14:00:00Z',
    pocket: 'Dana Utama',
    dicatat: 'Sarah',
  },
  {
    type: 'expense',
    desc: 'Ngopi Legok',
    amount: 45000,
    time: '2 hari lalu',
    createdAt: '2026-07-21T10:00:00Z',
    pocket: 'Snack',
    dicatat: 'Zapp',
  },
  {
    type: 'expense',
    desc: 'Beli Rokok Alex',
    amount: 30000,
    time: '3 hari lalu',
    createdAt: '2026-07-20T16:00:00Z',
    pocket: 'Snack',
    dicatat: 'Zapp',
  },
  {
    type: 'expense',
    desc: 'Parkir Malang',
    amount: 10000,
    time: '3 hari lalu',
    createdAt: '2026-07-20T08:00:00Z',
    pocket: 'Transport',
    dicatat: 'Fulan',
  },
  {
    type: 'expense',
    desc: 'Makan Sop Buntut',
    amount: 120000,
    time: '4 hari lalu',
    createdAt: '2026-07-19T12:00:00Z',
    pocket: 'Makan',
    dicatat: 'Alex',
  },
]
