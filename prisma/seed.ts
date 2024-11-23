import { FacultyRepository } from '@/repositories/faculty'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const faculty = await FacultyRepository.getFacultyByDoctorId(
    '87d17887-308e-4e14-afb1-7360add65d6b',
  )
  console.log(faculty?.name)
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
