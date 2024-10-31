import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const appointment = await prisma.appointment.findMany({
    where:{
      serviceId:"e914e7ab-e249-476f-b524-6ee51c219f79",
      status:"PENDING"
    }
  })
 console.log('APPOINTMENT',appointment)
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
