import {
  badRequestResponse,
  successResponse,
  unauthorizedResponse,
} from '@/helpers/response'
import { UserRepository } from '@/repositories/user'

export async function PUT(req: Request, context: { params: { userId: string } }) {
  const { userId } = context.params
  const { image }: { image: string } = await req.json()
  if (!userId) {
    return unauthorizedResponse('UNAUTHENTICATED')
  }
  const updateImage = await UserRepository.updateImage(userId, { image })
  if (updateImage) {
    return successResponse('UPDATE IMAGE SUCCESSFULLY')
  } else {
    return badRequestResponse('FAIL TO UPDATE IMAGE')
  }
}
