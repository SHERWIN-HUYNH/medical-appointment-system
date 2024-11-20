import { Profile } from '@/types/interface';
import { ProfileRespository } from '@/repositories/profile';

export async function POST(req: Request) {
  const { profile, userId }: { profile: Profile; userId: string } = await req.json();
  console.log('PROFILE: ', profile);
  const newProfile = await ProfileRespository.createProfile({
    profileData: profile,
    userId,
  })

  if (newProfile) {
    return new Response(
      JSON.stringify({
        message: 'CREATE PROFILE SUCCESSFULLY',
        status: 200,
      }),
    )
  } else {
    return new Response(
      JSON.stringify({
        message: 'CREATE PROFILE FAILED',
        status: 400,
      }),
    )
  }
}