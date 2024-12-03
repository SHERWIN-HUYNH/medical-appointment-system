// middleware.ts

import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = req.nextUrl

    const publicPaths = [
      '/login',
      '/register',
      '/api/auth',
      '/api/auth/session',
      '/api/webhook/stripe',
      '/api/doctor',
      '/api/faculty',
      '/api/comment',
      '/api/service',
    ]
    if (publicPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.next()
    }
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    // if (pathname.startsWith('/api/') && !token) {
    //   return NextResponse.json(
    //     { message: 'Unauthorized: Please log in.' },
    //     { status: 401 },
    //   )
    // }
    const restrictedPaths: Record<string, string[]> = {
      ADMIN: ['/admin/'],
      USER: ['/patients', '/appointments', '/doctors'],
    }

    if (token) {
      for (const [role, paths] of Object.entries(restrictedPaths)) {
        if (token.roleName !== role && paths.some((path) => path.startsWith(pathname))) {
          return NextResponse.redirect(new URL('/403', req.url))
        }
      }
    }
  } catch (error) {
    console.error('Error in middleware:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/patients/:path*',
    '/appointments',
    '/appointments/:path*',
    '/doctors/:path*',
    '/api/:path*',
  ],
}
