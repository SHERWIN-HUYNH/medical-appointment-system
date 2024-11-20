import { DoctorScheduleRespository } from '@/repositories/doctorSchedule'
import { AppointmentStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const appointmentCounts = await prisma.appointment.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  })

  // Format kết quả
  const result = appointmentCounts.map((group) => ({
    status: group.status,
    count: group._count.id,
  }))
  console.log(result)
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
