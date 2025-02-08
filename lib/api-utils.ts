// lib/api-utils.ts

import { NextResponse } from 'next/server'

export const createErrorResponse = (message: string, status: number) => {
  console.error(`API Error (${status}):`, message)
  return NextResponse.json({ message }, { status })
}
