import { ProfileRespository } from '@/repositories/profile'
import { Profile } from '@/types/interface'
import {
  badRequestResponse,
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '@/helpers/response'

export async function POST(req: Request, context: { params: { userId: string } }) {
  const { profile }: { profile: Profile } = await req.json()
  const { userId } = context.params
  if (!userId) {
    return unauthorizedResponse('UNAUTHENTICATED')
  }
  const newProfile = await ProfileRespository.createProfile({
    profileData: profile,
    userId,
  })

  if (newProfile) {
    return successResponse('CREATE PROFILE SUCCESSFULLY')
  } else {
    return badRequestResponse('FAIL TO CREATE PROFILE')
  }
}

export async function PUT(req: Request, context: { params: { userId: string } }) {
  const { profile }: { profile: Profile } = await req.json()
  const { userId } = context.params
  if (!userId) {
    return unauthorizedResponse('UNAUTHENTICATED')
  }
  const checkprofile = await ProfileRespository.getListProfileByUserId(profile.id)
  if (!checkprofile) {
    return notFoundResponse('NOT FOUND PROFILE')
  }
  const updateProfile = await ProfileRespository.updateProfile({
    profileData: profile,
    userId: userId,
  })

  if (updateProfile) {
    return successResponse('UPDATE PROFILE SUCCESSFULLY')
  } else {
    return badRequestResponse('FAIL TO UPDATE PROFILE')
  }
}

export async function GET(request: Request, context: { params: { userId: string } }) {
  const { userId } = context.params
  if (!userId) {
    return unauthorizedResponse('UNAUTHENTICATED')
  }
  try {
    const profiles = await ProfileRespository.getListProfileByUserId(userId)
    if (!profiles || profiles.length === 0) {
      return notFoundResponse('NOT FOUND PROFILE')
    }
    return successResponse(profiles)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching profiles:', error.message)
    } else {
      console.error('Error fetching profiles:', error)
    }
    return internalServerErrorResponse('FAIL TO GET LIST PROFILE')
  }
}

export async function DELETE(req: Request) {
  const { profileValues }: { profileValues: Profile } = await req.json()

  try {
    const checkProfile = await ProfileRespository.getProfileById(profileValues.id)
    if (!checkProfile) {
      return notFoundResponse('NOT FOUND PROFILE')
    }
    await ProfileRespository.deleteProfile({ profileData: profileValues })
    return successResponse('DELETE PROFILE SUCCESSFULLY')
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting profile:', error.message)
      return internalServerErrorResponse(error.message)
    }
  }
}
