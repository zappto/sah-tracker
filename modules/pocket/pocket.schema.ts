import { z } from 'zod'

export const createPocketSchema = z.object({
  name: z.string().min(1, 'Nama pocket harus diisi'),
  total: z.number().min(0).default(0),
  spent: z.number().min(0).default(0),
  icon: z.string().default('Wallet'),
})

export const updatePocketSchema = z.object({
  name: z.string().min(1, 'Nama pocket harus diisi').optional(),
  total: z.number().min(0).optional(),
  spent: z.number().min(0).optional(),
  icon: z.string().optional(),
})

export type TCreatePocketInput = z.infer<typeof createPocketSchema>
export type TUpdatePocketInput = z.infer<typeof updatePocketSchema>
