declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    roleName: string
  }
  interface Session {
    user: User
    infor: {
      id: string
      name: string
      email: string
      roleName: string
    }
  }
}

import { NextRequest, NextResponse } from 'next/server'

export type NextAuthSession = {
  req: NextRequest
  res: NextResponse
}
