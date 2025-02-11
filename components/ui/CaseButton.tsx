// components/ui/CaseButton.tsx
'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { forwardRef, ReactNode } from 'react'

interface CaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  asChild?: boolean
  href?: string
}

export const CaseButton = forwardRef<HTMLButtonElement, CaseButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'lg',
      icon,
      className,
      asChild,
      ...props
    },
    ref
  ) => {
    const classNames = clsx(
      'inline-flex items-center justify-center rounded-lg font-semibold font-dm-serif transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'active:scale-95 transition-transform duration-150 ease-in-out',
      {
        // Primary Button
        'text-raisin bg-sky border-silver block rounded-md border-2 px-4 py-2 font-dm-serif font-bold hover:bg-sky-700 focus:ring-sky-500 active:bg-sky-800 sm:text-lg':
          variant === 'primary',
        // Secondary Button
        'bg-raisin text-silver hover:bg-raisin-700 focus-visible:ring-raisin-500 active:bg-raisin-800':
          variant === 'secondary',
        // Destructive Button
        'bg-space border-2 border-sky-300 text-white text-xl hover:bg-sky-300 focus-visible:ring-space-900 active:bg-cement-800 rounded-lg shadow-lg':
          variant === 'destructive',
        // Outline Button
        'border-2 border-silver bg-transparent text-silver hover:bg-silver hover:text-space roubded-md focus-visible:ring-silver active:bg-silver/20':
          variant === 'outline',
        // Ghost Button
        'bg-transparent text-silver hover:bg-space-700 focus-visible:ring-space-500 active:bg-space-800':
          variant === 'ghost',
      },
      {
        // Size Variants
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4 py-2': size === 'md',
        'h-12 px-6 text-lg': size === 'lg',
      },
      className
    )

    if (asChild) {
      const { href = '#', onClick, ...linkProps } = props
      return (
        <Link
          href={href}
          className={classNames}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          onClick={onClick}
          {...(linkProps as any)}
        >
          {icon && <span className='mr-2'>{icon}</span>}
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classNames} {...props}>
        {icon && <span className='mr-2'>{icon}</span>}
        {children}
      </button>
    )
  }
)

CaseButton.displayName = 'CaseButton'
