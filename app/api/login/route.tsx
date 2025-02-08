// app/api/login/route.tsx

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { NextResponse } from 'next/server'

import connectMongo from '@/lib/mongodb'
import User from '@/models/User'

interface IUser {
  _id: Types.ObjectId
  email: string
  passwordHash: string
}

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set')
}

export async function POST(request: Request) {
  try {
    await connectMongo()

    const body = await request.json()

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const { email, password } = body

    const user = (await User.findOne({ email })) as IUser | null

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET || 'your-default-secret',
      { expiresIn: '1d' }
    )

    return NextResponse.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
