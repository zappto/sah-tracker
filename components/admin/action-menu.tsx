import { Wallet, ShoppingCart, Users, Grip } from 'lucide-react'
import type { ComponentType } from 'react'

interface IMenuItem {
  label: string
  icon: ComponentType<{ className?: string }>
  bgClass: string
  iconClass: string
}

const menu: IMenuItem[] = [
  { label: 'Tambah Uang', icon: Wallet, bgClass: 'bg-emerald-50', iconClass: 'text-emerald-600' },
  { label: 'Belanja', icon: ShoppingCart, bgClass: 'bg-rose-50', iconClass: 'text-rose-600' },
  { label: 'Anggota', icon: Users, bgClass: 'bg-sky-50', iconClass: 'text-sky-600' },
]

interface ActionMenuProps {
  onAction?: (label: string) => void
}

export function ActionMenu({ onAction }: ActionMenuProps) {
  return (
    <section>
      <h2 className="flex items-center gap-1.5 text-sm font-semibold text-text-primary mb-3">
        <Grip className="h-4 w-4 text-primary-500" />
        Admin
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {menu.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onAction?.(item.label)}
              className="flex flex-col items-center gap-2 rounded-sm bg-white border border-border-subtle px-3 py-3.5 active:scale-[0.98] transition-transform"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-sm ${item.bgClass}`}>
                <Icon className={`h-5 w-5 ${item.iconClass}`} />
              </div>
              <span className="text-caption font-medium text-slate-600">{item.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
