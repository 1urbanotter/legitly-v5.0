// app/api/login/route.tsx
import { NextRequest, NextResponse } from 'next/server'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/lib/firebase'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    return NextResponse.json(
      { message: 'Login successful', userId: user.uid },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Firebase login error:', error)
    return NextResponse.json({ message: error.message }, { status: 401 })
  }
}
