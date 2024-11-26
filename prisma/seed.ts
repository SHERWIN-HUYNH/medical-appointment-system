import { FacultyRepository } from '@/repositories/faculty'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.update({
    where: {
      id: '02822a38-de27-413e-89ee-8642ba558ce3',
    },
    data: {
      name: 'Huynh Trung',
      email: 'huynhchitrung020503@gmail.com',
      phone: 'chitrung020503',
      password: 'chitrung020503',
    },
  })
  console.log(user)
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
