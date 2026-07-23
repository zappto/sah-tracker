import type { IDashboardData } from '@/lib/types/dashboard'

export const demoData: IDashboardData = {
  summary: { total: 15000000, income: 18000000, expense: 3000000 },
  members: [
    { name: 'Zapp', setor: 5000000, sisa: 3200000 },
    { name: 'Fulan', setor: 5000000, sisa: 1800000 },
    { name: 'Alex', setor: 3000000, sisa: 2500000 },
    { name: 'Sarah', setor: 4000000, sisa: 3900000 },
    { name: 'Budi', setor: 2000000, sisa: 1500000 },
    { name: 'Citra', setor: 3500000, sisa: 2800000 },
    { name: 'Doni', setor: 4500000, sisa: 4200000 },
    { name: 'Eka', setor: 2500000, sisa: 500000 },
    { name: 'Fitri', setor: 3000000, sisa: 3000000 },
  ],
  pockets: [
    { name: 'Dana Utama', total: 10000000, spent: 2550000, icon: 'Wallet' },
    { name: 'Makan', total: 3000000, spent: 400000, icon: 'Utensils' },
    { name: 'Snack', total: 500000, spent: 50000, icon: 'Cookie' },
    { name: 'Transport', total: 2000000, spent: 200000, icon: 'Car' },
    { name: 'Minuman', total: 1000000, spent: 350000, icon: 'Coffee' },
    { name: 'Parkir', total: 500000, spent: 150000, icon: 'Navigation' },
    { name: 'Hiburan', total: 1500000, spent: 750000, icon: 'Gamepad2' },
    { name: 'Pulsa', total: 300000, spent: 100000, icon: 'Smartphone' },
    { name: 'Lainnya', total: 1000000, spent: 0, icon: 'Layers' },
  ],
  transactions: [
    { type: 'expense', desc: 'Makan Bajawa', amount: 350000, time: '2 jam lalu', createdAt: '2026-07-23T10:00:00Z', pocket: 'Makan', dicatat: 'Zapp' },
    { type: 'income', desc: 'Setor Zapp', amount: 5000000, time: '5 jam lalu', createdAt: '2026-07-23T07:00:00Z', pocket: 'Dana Utama', dicatat: 'Zapp' },
    { type: 'expense', desc: 'Kopi Flores', amount: 50000, time: '1 hari lalu', createdAt: '2026-07-22T12:00:00Z', pocket: 'Snack', dicatat: 'Alex' },
    { type: 'expense', desc: 'Bensin Bajawa', amount: 200000, time: '1 hari lalu', createdAt: '2026-07-22T10:00:00Z', pocket: 'Transport', dicatat: 'Fulan' },
    { type: 'income', desc: 'Setor Sarah', amount: 4000000, time: '2 hari lalu', createdAt: '2026-07-21T14:00:00Z', pocket: 'Dana Utama', dicatat: 'Sarah' },
    { type: 'expense', desc: 'Ngopi Legok', amount: 45000, time: '2 hari lalu', createdAt: '2026-07-21T10:00:00Z', pocket: 'Snack', dicatat: 'Zapp' },
    { type: 'expense', desc: 'Beli Rokok Alex', amount: 30000, time: '3 hari lalu', createdAt: '2026-07-20T16:00:00Z', pocket: 'Snack', dicatat: 'Zapp' },
    { type: 'expense', desc: 'Parkir Malang', amount: 10000, time: '3 hari lalu', createdAt: '2026-07-20T08:00:00Z', pocket: 'Transport', dicatat: 'Fulan' },
    { type: 'expense', desc: 'Makan Sop Buntut', amount: 120000, time: '4 hari lalu', createdAt: '2026-07-19T12:00:00Z', pocket: 'Makan', dicatat: 'Alex' },
  ],
}
