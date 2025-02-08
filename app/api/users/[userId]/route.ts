// api/users/[userId]/route.ts

import { NextResponse } from 'next/server'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log('API Route - userId:', params.userId)

  try {
    await dbConnect()

    const user = await User.findById(params.userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const safeUser = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    return NextResponse.json(safeUser)
  } catch (error: unknown) {
    console.error('API Route error:', error)
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Unknown error'
            : 'Server error',
      },
      { status: 500 }
    )
  }
}
