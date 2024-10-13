import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Hash password (if needed)
  const hashedPassword = await bcrypt.hash('your_password_here', 10);
  // Create roles
  //Create permissions
  //Assign roles to users
 
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
