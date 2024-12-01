import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const doctorSchedule = await prisma.doctorSchedule.findFirst({
    where: {
      doctorId: '3663a05b-138a-443d-a7bc-6f04730d4753',
      scheduleId: 'ae84fb6c-7ce4-488e-97db-7e3da16cf7d8',
    },
  })
  console.log(doctorSchedule)
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
