'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/http/api-client'

type TCreateMemberInput = { name: string; setor?: number; sisa?: number; avatar?: string }
type TUpdateMemberInput = { name?: string; setor?: number; sisa?: number; avatar?: string | null }
type TCreatePocketInput = { name: string; total?: number; spent?: number; icon?: string }
type TUpdatePocketInput = { name?: string; total?: number; spent?: number; icon?: string }
type TCreateTransactionInput = { type: 'income' | 'expense'; desc: string; amount: number; pocket: string; dicatat?: string; image?: string }

export function useCreateMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: TCreateMemberInput) => api.post('/members', data as Record<string, unknown>),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard'] }),
  })
}

export function useUpdateMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdateMemberInput }) => api.patch(`/members/${id}`, data as Record<string, unknown>),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard'] }),
  })
}

export function useDeleteMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.del(`/members/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard'] }),
  })
}

export function useCreatePocket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: TCreatePocketInput) => api.post('/pockets', data as Record<string, unknown>),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard'] }),
  })
}

export function useUpdatePocket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdatePocketInput }) => api.patch(`/pockets/${id}`, data as Record<string, unknown>),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard'] }),
  })
}

export function useDeletePocket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.del(`/pockets/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard'] }),
  })
}

export function useCreateTransaction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: TCreateTransactionInput) => api.post('/transactions', data as Record<string, unknown>),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard'] }),
  })
}
