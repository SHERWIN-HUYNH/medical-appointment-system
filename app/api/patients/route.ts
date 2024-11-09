import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileService } from '@/repositories/profile';
import { Profile } from '@/types/interface';

export async function POST(req: Request, res: Response) {
  const { profile, userId }: { profile: Profile; userId: string } = await req.json();
  console.log('PROFILE: ', profile);
  const newProfile = await ProfileService.createProfile({
    profileData: profile,
    userId,
  });

  if (newProfile) {
    return new Response(
      JSON.stringify({
        message: 'CREATE PROFILE SUCCESSFULLY',
        status: 200,
      }),
    );
  } else {
    return new Response(
      JSON.stringify({
        message: 'CREATE PROFILE FAILED',
        status: 400,
      }),
    );
  }
}
