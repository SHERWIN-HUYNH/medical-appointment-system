import { PrismaClient } from '@prisma/client'
import { Comment } from '@/types/interface'

const prisma = new PrismaClient()

export class CommentRespository {
  static async getListComments() {
    try {
      const comments = await prisma.comment.findMany({
        include: {
          doctor: {
            select: { name: true },
          },
          user: {
            select: { name: true },
          },
        },
      })
      const formattedComments = comments.map((comment) => ({
        ...comment,
        doctorName: comment.doctor?.name || 'Không xác định',
        userName: comment.user?.name || 'Không xác định',
      }))

      return formattedComments
    } catch (error) {
      console.error('Lỗi khi truy xuất đánh giá của bệnh nhân: ', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
  static async getCommentsByUserDoctor(name: string) {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          doctor: {
            name: name,
          },
        },
        include: {
          doctor: {
            select: {
              name: true,
            },
          },
        },
      })
      return comments
    } catch (error) {
      console.error('Lỗi truy xuất đánh gia theo tên bác sĩ', error)
      throw error
    }
  }
  static async getCommentById(id: string) {
    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id: id,
        },
      })
      return comment
    } catch (error) {
      console.error('Lỗi khi truy xuất đánh giá: ', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }
  static async deleteComment({ commentData }: { commentData: Comment }) {
    try {
      const deletedComment = await prisma.comment.delete({
        where: {
          id: commentData.id,
        },
      })
      return deletedComment
    } catch (error) {
      console.error('Lỗi khi xóa đánh giá:', error)
      throw new Error('Không thể xóa đánh giá với id đã cho')
    }
  }

  static async createComment(commentData: Comment) {
    try {
      const currentDate = new Date().toISOString().split('T')[0] // Lấy chỉ phần ngày YYYY-MM-DD

      const comment = await prisma.comment.create({
        data: {
          content: commentData.content,
          rating: commentData.rating,
          doctorId: commentData.doctorId,
          userId: commentData.userId,
          createdAt: new Date(currentDate), // Lưu chỉ ngày không có giờ
        },
      })
      return comment
    } catch (error) {
      console.error('Lỗi khi tạo đánh giá:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }
  }

  static async checkExistingCommentByAppointment(doctorId: string, userId: string) {
    try {
      const comment = await prisma.comment.findFirst({
        where: {
          doctorId: doctorId,
          userId: userId,
          // appointmentId: appointmentId,
        },
      });
      return comment;
    } catch (error) {
      console.error('Lỗi khi kiểm tra đánh giá:', error);
      throw error;
    }
  }
}
