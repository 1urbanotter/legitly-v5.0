import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Loading from '@/components/common/Loading'
import { CaseList } from '@/components/dashboard/CaseList'
import DashboardHeader from '@/components/dashboard/Header'
import { validateEnvironment } from '@/lib/config'
import { User as UserType } from '@/types/user'

// Validate critical environment variables at startup
const { JWT_SECRET } = validateEnvironment([
  'JWT_SECRET',
  'NEXT_PUBLIC_API_URL',
])

if (!process.env.NEXT_PUBLIC_API_URL || !process.env.JWT_SECRET) {
  throw new Error('Missing required environment variables')
}

const API_URL = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')

if (!API_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL environment variable is not set. ' +
      'Please check your .env.local file.'
  )
}

// Ensure environment variables are properly typed
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      NEXT_PUBLIC_API_URL: string
    }
  }
}

interface DecodedJwt {
  userId: string
  iat: number
  exp: number
}

async function getAuthenticatedUser(): Promise<UserType | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    console.error('No token found')
    return null // Return null instead of redirecting immediately
  }

  try {
    const decoded = verify(token, JWT_SECRET) as DecodedJwt

    if (!decoded || !decoded.userId) {
      console.error('Invalid token payload')
      return null // Return null instead of redirecting immediately
    }

    const response = await fetch(`${API_URL}/api/users/${decoded.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API Error:', errorData)
      throw new Error('Failed to fetch user data')
    }

    const userData = await response.json()
    return userData
  } catch (error) {
    console.error('Authentication error:', error)
    return null // Return null instead of redirecting immediately
  }
}

export default async function DashboardPage() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect('/login') // Redirect only if user is not authenticated
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto py-6'>
        <DashboardHeader user={user} />
        <CaseList userId={user._id} />
      </div>
    </div>
  )
}
