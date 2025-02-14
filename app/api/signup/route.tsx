// app/api/signup/route.tsx
import { NextRequest, NextResponse } from 'next/server'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { auth, db } from '@/lib/firebase'

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json()

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    await setDoc(doc(db, 'users', user.uid), {
      firstName,
      lastName,
      email,
    })

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Firebase signup error:', error)
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
