import startCronJob from '@/helpers/cron-job'
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'; 
export async function GET(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }
  try {
    await startCronJob()
    console.log('Cron job run successfully')
    return NextResponse.json({ data: 'Cron job run ', status: 200 })
  } catch (error) {
    console.error('Scheduler error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
