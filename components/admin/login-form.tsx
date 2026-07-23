'use client'

import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { loginSchema, type LoginFormData } from '@/lib/validation'
import { FloatingInput } from '@/components/ui/floating-input'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    const check = async () => {
      const { isLoggedIn } = await import('@/lib/auth')
      if (isLoggedIn()) {
        window.location.assign('/admin/dashboard')
      }
    }
    check()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '' },
  })

  const usernameValue = useWatch({ control, name: 'username' })

  const onSubmit = async () => {
    setApiError(null)
    await new Promise((resolve) => setTimeout(resolve, 800))
    const { login } = await import('@/lib/auth')
    login(usernameValue || 'admin')
    toast.success('Berhasil masuk')
    window.location.assign('/admin/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <FloatingInput
        id="username"
        label="Username"
        type="text"
        autoComplete="username"
        value={usernameValue}
        error={errors.username?.message}
        {...register('username')}
      />

      {apiError && (
        <div className="rounded-xl bg-danger-bg border border-danger/20 px-4 py-3" role="alert">
          <p className="text-caption text-danger font-medium">{apiError}</p>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full h-11 text-base">
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Memproses...
          </>
        ) : (
          'Masuk'
        )}
      </Button>
    </form>
  )
}
