// lib/auth.ts

import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export async function requireAuth(req: NextApiRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return { error: 'Unauthorized', status: 401 };
  }

  return { token };
}
