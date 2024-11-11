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

  const doctors = [
    {
      name: 'Dr. Trần Thanh Tường',
      academicTitle: 'Giáo sư',
      image: 'https://th.bing.com/th/id/OIP.q4L1sG9zTVtR-uhWParTOQHaHa?w=212&h=212&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      isActive: true,
      description: 'Giáo sư có nhiều năm kinh nghiệm',
      facultyId: '35390041-7a13-49d4-9f65-9c6563f2b5b7',
    },
    {
      name: 'Dr. Trần Thanh Tường',
      academicTitle: 'Giáo sư',
      image: 'https://th.bing.com/th/id/OIP.q4L1sG9zTVtR-uhWParTOQHaHa?w=212&h=212&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      isActive: true,
      description: 'Giáo sư có nhiều năm kinh nghiệm',
      facultyId: '35390041-7a13-49d4-9f65-9c6563f2b5b7',
    },
  ];

  for (const doctor of doctors) {
    await prisma.doctor.create({
      data: doctor,
    });
  }

  console.log('Doctors created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
