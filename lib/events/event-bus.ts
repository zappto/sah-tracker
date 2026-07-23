import type { IFinanceEvent } from './event-types'

type TSubscriber = (event: IFinanceEvent) => void

const subscribers = new Set<TSubscriber>()

export function subscribe(fn: TSubscriber): () => void {
  subscribers.add(fn)
  return () => {
    subscribers.delete(fn)
  }
}

export function publish(event: IFinanceEvent): void {
  subscribers.forEach((fn) => {
    try {
      fn(event)
    } catch {
      // subscriber error — skip
    }
  })
}
