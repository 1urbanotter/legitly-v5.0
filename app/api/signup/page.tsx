// app/api/signup/route.tsx

import { NextResponse } from 'next/server'

import connectMongo from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request: Request) {
  try {
    await connectMongo()

    const { firstName, lastName, email, password } = await request.json()

    // Check if the email is already registered
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      )
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash: password, // Make sure to hash the password before saving
    })

    await newUser.save()

    // Generate a token for the new user
    const token = newUser.generateToken()

    return NextResponse.json({ token }, { status: 201 })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 })
  }
}
