import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '@/helpers/response';
import { CommentRespository } from '@/repositories/comment';
import { Comment } from '@/types/interface';

export async function GET() {
  try {
    const comments = await CommentRespository.getListComments();
    if (!comments || comments.length === 0) {
      return notFoundResponse('NOT FOUND COMMENT');
    }
    return successResponse(comments);
  } catch (error: any) {
    console.error('Error fetching comments:', error.message || error);
    return internalServerErrorResponse('FAIL TO GET LIST COMMENT');
  }
}

export async function DELETE(req: Request) {
  const { commentValues }: { commentValues: Comment } = await req.json();

  try {
    const checkComment = await CommentRespository.getCommentById(commentValues.id);
    if (!checkComment) {
      return notFoundResponse('NOT FOUND COMMENT');
    }
    await CommentRespository.deleteComment({ commentData: commentValues });
    return successResponse('DELETE PROFILE SUCCESSFULLY');
  } catch (error: any) {
    console.error('Error deleting profile:', error.message || error);
    return internalServerErrorResponse('FAIL TO DELETE PROFILE');
  }
}
