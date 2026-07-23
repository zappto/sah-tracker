'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function useSSE() {
  const queryClient = useQueryClient()

  useEffect(() => {
    let evtSource: EventSource | null = null

    function connect() {
      evtSource = new EventSource('/api/events')

      evtSource.addEventListener('FINANCE_UPDATED', () => {
        queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      })

      evtSource.onerror = () => {
        evtSource?.close()
        setTimeout(connect, 3000)
      }
    }

    connect()
    return () => evtSource?.close()
  }, [queryClient])
}
