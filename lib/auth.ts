// lib/auth.ts
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { User } from '@/types/user'

interface DecodedJwt {
  userId: string
}

export async function getAuthenticatedUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-default-secret' // Replace with your actual secret
    const decoded = verify(token, secret) as DecodedJwt

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${decoded.userId}`
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.status}`)
    }
    const user: User = await res.json()
    return user
  } catch (error) {
    console.error('Authentication error:', error)
    redirect('/login')
    return null // unreachable, but satisfies typescript
  }
}
