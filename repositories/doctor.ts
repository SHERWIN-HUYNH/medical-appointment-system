import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export class DoctorRespository{
    static async  getDoctorById(doctorId: string) {
        const doctor = await prisma.doctor.findFirst({
            where: {
                id:doctorId
            }
        })
        if(!doctor) {
            throw new Error("NOT FOUND DOCTOR")
        }
        return doctor
    }
}