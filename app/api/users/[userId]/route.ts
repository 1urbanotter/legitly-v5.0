// app/api/users/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase'

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId
    const userRef = doc(db, 'users', userId)
    const userSnapshot = await getDoc(userRef)

    if (!userSnapshot.exists()) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const userData = userSnapshot.data()

    return NextResponse.json({ user: userData }, { status: 200 })
  } catch (error: any) {
    console.error('Firebase user fetching error:', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
