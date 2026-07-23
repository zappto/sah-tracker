'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { loginSchema, type LoginFormData } from '@/lib/validation'
import { FloatingInput } from '@/components/ui/floating-input'

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const emailValue = useWatch({ control, name: 'email' })
  const passwordValue = useWatch({ control, name: 'password' })

  const onSubmit = async () => {
    setApiError(null)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success('Berhasil masuk')
    router.push('/admin/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="relative">
        <FloatingInput
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={emailValue}
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="relative">
        <FloatingInput
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={passwordValue}
          error={errors.password?.message}
          {...register('password')}
          className="pr-11"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-text-muted hover:text-text-secondary transition-colors"
          aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {apiError && (
        <div className="rounded-xl bg-danger-bg border border-danger/20 px-4 py-3" role="alert">
          <p className="text-caption text-danger font-medium">{apiError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary-500 py-3.5 text-base font-medium text-white transition-all hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Memproses...
          </>
        ) : (
          'Masuk'
        )}
      </button>
    </form>
  )
}
