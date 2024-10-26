import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export  class CommentRepository
{
    static async getListComments(){
        try {
            const comments = await prisma.comment.findMany({
            });
            return comments; 
          } catch (error) {
            console.error("Lỗi khi truy xuất hồ sơ bệnh nhân: ", error);
            throw error;
          } finally {
            await prisma.$disconnect(); 
          }
    }
    static async  getCommentsByUserName(userName: string) {
        try {
          const comments = await prisma.comment.findMany({
            where: {user: {
                name: userName,
              },
            },
            include: {
              user: {
                select: {
                  name: true,
                },
              },
              doctor: {
                select: {
                  name: true,
                },
              },
            },
          });
          return comments;
        } catch (error) {
          console.error('Error fetching comments:', error);
          throw error;
        }
      }

      async  deleteCommentById(id: string) {
        try {
          const deletedComment = await prisma.comment.delete({
            where: {
              id: id,
            },
          });
          return deletedComment;
        } catch (error) {
          console.error("Lỗi khi xóa đánh giá:", error);
          throw new Error("Không thể xóa đánh giá với id đã cho");
        }
      }
}