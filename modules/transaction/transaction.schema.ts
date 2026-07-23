import { z } from 'zod'

export const createTransactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  desc: z.string().min(1, 'Deskripsi harus diisi'),
  amount: z.number().min(1, 'Jumlah minimal 1'),
  pocket: z.string().min(1, 'Pocket harus diisi'),
  dicatat: z.string().default(''),
  image: z.string().optional(),
})

export type TCreateTransactionInput = z.infer<typeof createTransactionSchema>
