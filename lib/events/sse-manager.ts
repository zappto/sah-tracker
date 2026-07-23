import { subscribe } from './event-bus'
import type { IFinanceEvent } from './event-types'

const clients = new Set<ReadableStreamDefaultController<Uint8Array>>()
const encoder = new TextEncoder()

export function addClient(
  controller: ReadableStreamDefaultController<Uint8Array>,
): void {
  clients.add(controller)
  controller.enqueue(encoder.encode('event: connected\ndata: {}\n\n'))
}

export function removeClient(
  controller: ReadableStreamDefaultController<Uint8Array>,
): void {
  clients.delete(controller)
}

export function broadcast(event: IFinanceEvent): void {
  const data = `event: ${event.type}\ndata: ${JSON.stringify(event.payload ?? {})}\n\n`
  const encoded = encoder.encode(data)

  for (const controller of clients) {
    try {
      controller.enqueue(encoded)
    } catch {
      clients.delete(controller)
    }
  }
}

subscribe((event) => broadcast(event))
