import { NextRequest, NextResponse } from 'next/server'
import cron from 'node-cron'

export async function POST(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }
  try {
    console.log('Running scheduler')
    cron.schedule('* * * * *', async () => {
      console.log('')
      console.log('######################################')
      console.log('#                                    #')
      console.log('# Running scheduler every 20 minutes #')
      console.log('#                                    #')
      console.log('######################################')
      console.log('')

      // Perform your action here
    })

    return NextResponse.json({ data: 'Cron job run ', status: 200 })
  } catch (error) {
    console.error('Scheduler error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
