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
    console.log("Pathname:", pathname);
    console.log("Token:", token);
    console.log("Role:", token?.roleName);
    if (publicPaths.some((path) => pathname.startsWith(path))) {
      console.log("Public path accessed:", pathname);
      return NextResponse.next()
    }
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    const restrictedPaths: Record<string, string[]> = {
      ADMIN: ['/admin'],
      USER: ['/patients', '/appointments', '/doctors',
        '/choose-faculty',
        '/choose-service',
        '/choose-profile'
        '/choose-doctor',
         '/service',
        '/faculty',]
    }

    if (token) {
      const matchedPaths = restrictedPaths[token.roleName as string] || [];
      if (matchedPaths.some((restrictedPath) => pathname.startsWith(restrictedPath))) {
        console.log("Restricted path accessed:", pathname);
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/403', req.url));
      }
      }
    return NextResponse.next()
  } catch (error) {
    console.error('Error in middleware:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export const config = {
  matcher: [
   '/admin/:path*',
    '/patients/:path*',
    '/appointments/:path*',
    '/doctors/:path*',
    '/choose-faculty/:path*',
    '/choose-service/:path*',
    '/choose-doctor/:path*',

  ],
}
