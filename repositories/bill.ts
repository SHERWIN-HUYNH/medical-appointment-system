import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export class BillRespository {
    static async create(billData: any) {
        try {
            const newBill = await prisma.bill.create({
                data: billData
            })
        } catch (error) {
            
        }
    }
}