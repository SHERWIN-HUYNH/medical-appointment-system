import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Hash password (if needed)
  const hashedPassword = await bcrypt.hash('your_password_here', 10);

  // Create a new user
  const user = await prisma.user.create({
    data: {
      name: 'Chi Trung',
      email: 'trung@example.com',
      password: hashedPassword, // Assuming password is hashed
      phoneNumber: '+1234567890', // Optional, modify based on your schema
    },
  });

  console.log('User created:', user);
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
