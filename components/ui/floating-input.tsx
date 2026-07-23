'use client'

import { useState, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  prefix?: string
}

export function FloatingInput({ label, error, id, className, prefix, ...inputProps }: FloatingInputProps) {
  const [focused, setFocused] = useState(false)

  const isFloating = focused || Boolean(inputProps.value ?? inputProps.defaultValue)

  return (
    <div>
      <div className="relative">
        {prefix && (
          <span
            className={`pointer-events-none absolute left-4 z-10 transition-all duration-150 ease-out ${
              isFloating
                ? 'top-0 -translate-y-1/2 text-xs bg-bg-app px-0.5'
                : 'top-1/2 -translate-y-1/2 text-base text-text-muted'
            }`}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          {...inputProps}
          className={cn(
            'w-full rounded-lg border bg-transparent pb-2 text-base text-text-primary outline-none transition-colors disabled:opacity-50',
            prefix ? 'pt-[10px] pl-12 pr-4' : 'px-4 pt-[10px]',
            error
              ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/30'
              : 'border-border-subtle focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30',
            className,
          )}
          onFocus={(e) => {
            setFocused(true)
            inputProps.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            inputProps.onBlur?.(e)
          }}
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute px-0.5 transition-all duration-150 ease-out ${
            isFloating
              ? `top-0 -translate-y-1/2 text-xs ${error ? 'text-danger' : 'text-primary-500'} bg-bg-app`
              : 'top-1/2 -translate-y-1/2 text-base text-text-muted'
          } ${prefix ? 'left-12' : 'left-4'}`}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 text-caption text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
