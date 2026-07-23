'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'

interface ActionDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function ActionDrawer({ open, onClose, title, children }: ActionDrawerProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)

    return () => {
      const restoredTop = parseInt(document.body.style.top || '0', 10) * -1
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, restoredTop || 0)
      document.removeEventListener('keydown', handler)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30"
            onClick={onClose}
          />
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 inset-x-0 rounded-t-2xl bg-white shadow-xl max-h-[85dvh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 rounded-t-2xl">
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <h3 className="text-heading-md text-text-primary">{title}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="mx-auto w-10 h-1 bg-border-subtle rounded-full mb-3" />
            </div>
            <div className="px-5 pb-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
