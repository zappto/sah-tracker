import { describe, it, expect, vi } from 'vitest'
import { subscribe, publish } from '@/lib/events/event-bus'

describe('event-bus', () => {
  it('calls subscriber on publish', () => {
    const fn = vi.fn()
    subscribe(fn)
    publish({ type: 'FINANCE_UPDATED' })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith({ type: 'FINANCE_UPDATED' })
  })

  it('passes payload to subscriber', () => {
    const fn = vi.fn()
    subscribe(fn)
    publish({ type: 'FINANCE_UPDATED', payload: { memberId: 'abc' } })
    expect(fn).toHaveBeenCalledWith({ type: 'FINANCE_UPDATED', payload: { memberId: 'abc' } })
  })

  it('calls multiple subscribers', () => {
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    subscribe(fn1)
    subscribe(fn2)
    publish({ type: 'FINANCE_UPDATED' })
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
  })

  it('unsubscribes correctly', () => {
    const fn = vi.fn()
    const unsubscribe = subscribe(fn)
    unsubscribe()
    publish({ type: 'FINANCE_UPDATED' })
    expect(fn).not.toHaveBeenCalled()
  })

  it('handles subscriber errors gracefully', () => {
    const throwingFn = () => { throw new Error('subscriber error') }
    const safeFn = vi.fn()

    subscribe(throwingFn)
    subscribe(safeFn)

    expect(() => publish({ type: 'FINANCE_UPDATED' })).not.toThrow()
    expect(safeFn).toHaveBeenCalledTimes(1)
  })

  it('subscriber can unsubscribe itself', () => {
    const fn = vi.fn()
    const unsub = subscribe(() => {
      fn()
      unsub()
    })
    publish({ type: 'FINANCE_UPDATED' })
    publish({ type: 'FINANCE_UPDATED' })
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
