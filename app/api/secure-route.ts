// pages/api/secure-route.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await requireAuth(req)

  if (authResult.error) {
    return res.status(authResult.status).json({ message: authResult.error })
  }

  // Proceed with your API logic
  res.status(200).json({ message: 'You are authenticated!' })
}
