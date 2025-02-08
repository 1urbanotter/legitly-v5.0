'use client'

import { CaseButton as Button } from '@/components/ui/CaseButton'
import { User } from '@/types/user'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  // Define the handleLogout function
  const handleLogout = () => {
    // Delete the authentication cookie
    deleteCookie('token')

    // Redirect the user to the home page
    router.push('/')
  }

  return (
    <header className='mb-8'>
      <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h1 className='font-dm-serif text-5xl font-semibold text-white_supreme sm:text-4xl'>
            Welcome back, {user.firstName}
          </h1>
          <p className='mt-1 text-neon_blue'>
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
            variant='primary'
            aria-label='Create new case'
            onClick={() => (window.location.href = '/case/new')}
          >
            New Case
          </Button>
          <Button
            variant='primary'
            aria-label='Sign out of Legitly and return to home page'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
