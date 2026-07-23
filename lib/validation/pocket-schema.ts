import { z } from 'zod'

export const pocketSchema = z.object({
  name: z.string().min(1, 'Nama pocket harus diisi'),
  budget: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
})

export type PocketFormData = z.infer<typeof pocketSchema>
