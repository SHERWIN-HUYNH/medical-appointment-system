import { Bill } from '@/types/interface'
import { BillStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export class BillRespository {
  static async createBill(billData: Bill) {
    try {
      const newBill = await prisma.bill.create({
        data: {
          price: billData.price,
          note: billData.note,
          status: billData.status as BillStatus,
          userId: billData.userId,
          appointmentId: billData.appointmentId,
        },
      })
      return newBill
    } catch (error) {
      throw new Error('Error creating bill', error as Error)
    }
  }
  static async cancelBill(billId: string) {
    try {
      const deletedBill = await prisma.bill.update({
        where: {
          id: billId,
        },
        data: {
          status: BillStatus.CANCELLED,
          updatedAt: new Date(),
        },
      })
      return deletedBill
    } catch (error) {
      throw new Error('Error canceling bill', error as Error)
    }
  }
  static async getAllBillsByUserId(userId: string) {
    try {
      const bills = await prisma.bill.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true,
          appointment: {
            include: {
              profile: true,
              doctorSchedule: {
                include: {
                  schedule: true,
                  doctor: {
                    include: {
                      faculty: true,
                    },
                  },
                },
              },
              Service: true,
            },
          },
        },
      })
      return bills
    } catch (error) {
      throw new Error('Error retrieving bills', error as Error)
    }
  }
}
