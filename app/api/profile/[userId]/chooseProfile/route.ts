import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '@/helpers/response'
import { ProfileRespository } from '@/repositories/profile'
import {
  FAILED_GET_PROFILES,
  PROFILE_NOT_FOUND,
} from '@/validation/messageCode/apiMessageCode/profile'
import { UNAUTHENTICATED } from '@/validation/messageCode/commonMessageCode'

export async function GET(request: Request, context: { params: { userId: string } }) {
  const { userId } = context.params
  if (!userId) {
    return unauthorizedResponse(UNAUTHENTICATED)
  }
  try {
    const profiles = await ProfileRespository.getListProfileNoAppoinmentByUserId(userId)
    if (!profiles || profiles.length === 0) {
      return notFoundResponse(PROFILE_NOT_FOUND)
    }
    return successResponse(profiles)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching profiles:', error.message)
    }
    return internalServerErrorResponse(FAILED_GET_PROFILES)
  }
}
