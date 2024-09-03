// middleware.ts

import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token && req.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Unauthorized hello' }, { status: 401 });
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export const config = {
  matcher: ['/api/:path*'],
};
