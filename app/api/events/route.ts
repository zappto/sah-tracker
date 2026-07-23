import { addClient, removeClient } from '@/lib/events/sse-manager'

export const dynamic = 'force-dynamic'

export async function GET() {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      addClient(controller)
    },
    cancel(controller) {
      removeClient(controller)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
