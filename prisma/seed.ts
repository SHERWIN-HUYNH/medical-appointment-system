import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const doctorSchedules = await prisma.doctorSchedule.findMany({
    where: {
      doctorId: '3a9fb4f8-68ca-41d6-8f4a-bb916775543b',
    },
    select: {
      isAvailable: true,
      schedule: true,
    },
    orderBy: {
      schedule: {
        date: 'asc',
      },
    },
  });

  console.log('Doctors created.', doctorSchedules);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
