import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '@/helpers/response'
import { ProfileRespository } from '@/repositories/profile'

export async function GET(request: Request, context: { params: { userId: string } }) {
  const { userId } = context.params
  if (!userId) {
    return unauthorizedResponse('UNAUTHENTICATED')
  }
  try {
    const profiles = await ProfileRespository.getListProfileNoAppoinmentByUserId(userId)
    if (!profiles || profiles.length === 0) {
      return notFoundResponse('NOT FOUND PROFILE')
    }
    return successResponse(profiles)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching profiles:', error.message)
    }
    return internalServerErrorResponse('FAIL TO GET LIST PROFILE')
  }
}
