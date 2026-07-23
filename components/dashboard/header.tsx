import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-bg-app/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="flex items-center gap-2 text-heading-md text-text-primary">
          <Image src="/icon-malang.png" alt="DMALANG&apos;S" width={28} height={28} className="rounded-full" />
          DMALANG&apos;S
        </h1>
        <Link href="/admin/login" className="inline-flex items-center gap-1.5 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white active:scale-95 transition-transform">
          Login
        </Link>
      </div>
    </header>
  )
}
