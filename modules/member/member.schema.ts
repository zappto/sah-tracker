import { z } from 'zod'

export const createMemberSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  setor: z.number().min(0).default(0),
  sisa: z.number().min(0).default(0),
  avatar: z.string().optional(),
})

export const updateMemberSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi').optional(),
  setor: z.number().min(0).optional(),
  sisa: z.number().min(0).optional(),
  avatar: z.string().optional().nullable(),
})

export type TCreateMemberInput = z.infer<typeof createMemberSchema>
export type TUpdateMemberInput = z.infer<typeof updateMemberSchema>
