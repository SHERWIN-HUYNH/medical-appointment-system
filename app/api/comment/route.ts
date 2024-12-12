import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  badRequestResponse,
} from '@/helpers/response'
import { CommentRespository } from '@/repositories/comment'
import { Comment } from '@/types/interface'
import { COMMENT_NOT_FOUND, FAILED_DELETE_COMMENT, FAILED_DELETE_COMMENT_AGAIN, FAILED_GET_COMMENT, SUCCESS_DELETE_COMMENT } from '@/validation/messageCode/apiMessageCode/comment'

export async function GET() {
  try {
    const comments = await CommentRespository.getListComments()
    if (!comments || comments.length === 0) {
      return notFoundResponse(COMMENT_NOT_FOUND)
    }
    return successResponse(comments)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching comments:', error.message)
    } else {
      console.error('Unknown error fetching comments:', JSON.stringify(error))
    }
    return internalServerErrorResponse(FAILED_GET_COMMENT)
  }
}

export async function DELETE(req: Request) {
  const { commentValues }: { commentValues: Comment } = await req.json()

  try {
    const checkComment = await CommentRespository.getCommentById(commentValues.id)
    if (!checkComment) {
      return notFoundResponse(COMMENT_NOT_FOUND)
    }
    await CommentRespository.deleteComment({ commentData: commentValues })
    return successResponse(SUCCESS_DELETE_COMMENT)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting comment:', error.message)
    } else {
      console.error('Unknown error deleting comment:', JSON.stringify(error))
    }
    return internalServerErrorResponse(FAILED_DELETE_COMMENT)
  }
}

export async function POST(req: Request) {
  const commentData = await req.json()
  const existingComment = await CommentRespository.checkExistingCommentByAppointment(
    commentData.doctorId,
    commentData.userId,
    commentData.appointmentId,
  )

  if (existingComment) {
    return badRequestResponse(FAILED_DELETE_COMMENT_AGAIN)
  }
  const comment = await CommentRespository.createComment(commentData)
  return successResponse(comment)
}
