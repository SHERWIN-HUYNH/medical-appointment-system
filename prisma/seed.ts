import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'duyen@gmail.com' },
  });

  if (!existingUser) {
    const user = await prisma.user.create({
      data: {
        name: 'Nguyễn Trần Thanh Tường',
        email: 'duyen@gmail.com',
        password: await bcrypt.hash('123456', 10),
        phone: '0123456789',
      },
    });
    console.log('User created:', user);
  } else {
    console.log('User with this email already exists. Skipping creation.');
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
