import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const doctor = await prisma.doctor.findFirst({
    where:{
      id:'fcf7baa3-f8bc-4615-b03c-1ef507234105'
    }
  })
  console.log('DATA DOCTOR',doctor)
}

// Execute the main function and catch any errors
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
