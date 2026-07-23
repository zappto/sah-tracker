'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/http/api-client'
import type { IDashboardData } from '@/lib/types/dashboard'

export function useDashboard() {
  return useQuery<IDashboardData>({
    queryKey: ['dashboard'],
    queryFn: () => api.get<IDashboardData>('/dashboard'),
    staleTime: 30 * 1000,
  })
}
