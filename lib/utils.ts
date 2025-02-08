// /lib/utils.ts

import * as jose from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Class name combination helper
export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// Middleware configuration
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const protectedRoutes = ['/dashboard', '/case/new']

  if (
    !token &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token) {
    try {
      const { payload } = await jose.jwtVerify(token, secret)
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set('x-user-id', payload.userId as string)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.error('JWT verification error:', error)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/case/:path*', '/case/new'],
}
