// app/components/dashboard/DashboardHeader.tsx

'use client'

import { CaseButton as Button } from '@/components/ui/CaseButton'
import { User } from '@/types/user'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('token')
    router.push('/')
  }

  return (
    <div className='mb-6 ml-6 mr-6 flex flex-col items-start justify-between gap-4 sm:flex-col sm:items-center md:flex-row'>
      <div>
        <h1 className='text-raisin font-dm-serif text-5xl font-semibold sm:text-4xl'>
          Welcome back, {user.firstName}
        </h1>
        <p className='mt-1 text-sky-200'>
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <Button
          variant='destructive'
          aria-label='Sign out of Legitly and return to home page'
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Link href='/case/new' passHref>
          <Button
            variant='destructive'
            size='lg'
            aria-label='Create new case'
            icon={<PlusCircle className='h-5 w-5' />}
          >
            Create Case
          </Button>
        </Link>
      </div>
    </div>
  )
}
