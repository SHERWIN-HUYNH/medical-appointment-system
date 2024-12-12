import { ProfileRespository } from '@/repositories/profile'
import { Profile } from '@/types/interface'
import {
  badRequestResponse,
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '@/helpers/response'
import { FAILED_CREATE_PROFILE, FAILED_GET_PROFILES, FAILED_UPDATE_PROFILE, PROFILE_NOT_FOUND, SUCCESS_CREATE_PROFILE, SUCCESS_DELETE_PROFILE, SUCCESS_UPDATE_PROFILE, UNAUTHENTICATED } from '@/validation/messageCode/apiMessageCode/profile'

export async function POST(req: Request, context: { params: { userId: string } }) {
  const { profile }: { profile: Profile } = await req.json()
  const { userId } = context.params
  if (!userId) {
    return unauthorizedResponse(UNAUTHENTICATED)
  }
  const newProfile = await ProfileRespository.createProfile({
    profileData: profile,
    userId,
  })

  if (newProfile) {
    return successResponse(SUCCESS_CREATE_PROFILE)
  } else {
    return badRequestResponse(FAILED_CREATE_PROFILE)
  }
}

export async function PUT(req: Request, context: { params: { userId: string } }) {
  const { profile }: { profile: Profile } = await req.json()
  const { userId } = context.params
  if (!userId) {
    return unauthorizedResponse(UNAUTHENTICATED)
  }
  const checkprofile = await ProfileRespository.getListProfileByUserId(profile.id)
  if (!checkprofile) {
    return notFoundResponse(PROFILE_NOT_FOUND)
  }
  const updateProfile = await ProfileRespository.updateProfile({
    profileData: profile,
    userId: userId,
  })

  if (updateProfile) {
    return successResponse(SUCCESS_UPDATE_PROFILE)
  } else {
    return badRequestResponse(FAILED_UPDATE_PROFILE)
  }
}

export async function GET(request: Request, context: { params: { userId: string } }) {
  const { userId } = context.params
  if (!userId) {
    return unauthorizedResponse(UNAUTHENTICATED)
  }
  try {
    const profiles = await ProfileRespository.getListProfileByUserId(userId)
    if (!profiles || profiles.length === 0) {
      return notFoundResponse(PROFILE_NOT_FOUND)
    }
    return successResponse(profiles)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching profiles:', error.message)
    } else {
      console.error('Error fetching profiles:', error)
    }
    return internalServerErrorResponse(FAILED_GET_PROFILES)
  }
}

export async function DELETE(req: Request) {
  const { profileValues }: { profileValues: Profile } = await req.json()

  try {
    const checkProfile = await ProfileRespository.getProfileById(profileValues.id)
    if (!checkProfile) {
      return notFoundResponse(PROFILE_NOT_FOUND)
    }
    await ProfileRespository.deleteProfile({ profileData: profileValues })
    return successResponse(SUCCESS_DELETE_PROFILE)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting profile:', error.message)
      return internalServerErrorResponse(error.message)
    }
  }
}
