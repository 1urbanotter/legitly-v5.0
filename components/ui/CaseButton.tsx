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
      'active:scale-95 transition-transform duration-150 ease-in-out', // Active scale effect
      {
        // Primary Button
        'bg-neon_blue text-navy_blue font-semibold border-white_supreme border-2 hover:bg-neon_blue-700 focus-visible:ring-neon_blue-500 active:bg-neon_blue-800 sm:text-lg':
          variant === 'primary',
        // Secondary Button
        'bg-navy_blue text-white_supreme hover:bg-navy_blue-700 focus-visible:ring-navy_blue-500 active:bg-navy_blue-800':
          variant === 'secondary',
        // Destructive Button
        'bg-almost_red text-white_supreme hover:bg-almost_red-700 focus-visible:ring-almost_red-500 active:bg-almost_red-800':
          variant === 'destructive',
        // Outline Button
        'border-2 border-white_supreme bg-transparent text-white_supreme hover:bg-white_supreme hover:text-navy_blue focus-visible:ring-white_supreme active:bg-white_supreme/20':
          variant === 'outline',
        // Ghost Button
        'bg-transparent text-white_supreme hover:bg-navy_blue-700 focus-visible:ring-navy_blue-500 active:bg-navy_blue-800':
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
