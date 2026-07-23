import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username harus diisi'),
})

export type TLoginInput = z.infer<typeof loginSchema>
