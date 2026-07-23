import type { Metadata } from 'next'
import { LoginForm } from '@/components/admin/login-form'

export const metadata: Metadata = {
  title: 'Masuk — Trip Dashboard',
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[100dvh] bg-bg-app flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-heading-lg text-text-primary">dmalang&apos;s admin</h1>
          <p className="text-sm text-text-muted mt-2">Masuk sebagai admin</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
