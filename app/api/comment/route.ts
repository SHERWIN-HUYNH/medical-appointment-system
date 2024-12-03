import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  badRequestResponse,
} from '@/helpers/response'
import { CommentRespository } from '@/repositories/comment'
import { Comment } from '@/types/interface'

export async function GET() {
  try {
    const comments = await CommentRespository.getListComments()
    if (!comments || comments.length === 0) {
      return notFoundResponse('NOT FOUND COMMENT')
    }
    return successResponse(comments)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching comments:', error.message)
    } else {
      console.error('Unknown error fetching comments:', JSON.stringify(error))
    }
    return internalServerErrorResponse('FAIL TO GET LIST COMMENT')
  }
}

export async function DELETE(req: Request) {
  const { commentValues }: { commentValues: Comment } = await req.json()

  try {
    const checkComment = await CommentRespository.getCommentById(commentValues.id)
    if (!checkComment) {
      return notFoundResponse('NOT FOUND COMMENT')
    }
    await CommentRespository.deleteComment({ commentData: commentValues })
    return successResponse('DELETE PROFILE SUCCESSFULLY')
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting profile:', error.message)
    } else {
      console.error('Unknown error deleting profile:', JSON.stringify(error))
    }
    return internalServerErrorResponse('FAIL TO DELETE PROFILE')
  }
}

export async function POST(req: Request) {
  const commentData = await req.json()
  try {
    const existingComment = await CommentRespository.checkExistingCommentByAppointment(
      commentData.doctorId,
      commentData.userId,
      // commentData.appointmentId
    )

    if (existingComment) {
      return badRequestResponse('Bạn đã đánh giá bác sĩ này rồi')
    }

    const comment = await CommentRespository.createComment(commentData)
    return successResponse(comment)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating comment:', error.message)
    } else {
      console.error('Unknown error creating comment:', JSON.stringify(error))
    }
    return internalServerErrorResponse('Lỗi khi tạo đánh giá')
  }
}
