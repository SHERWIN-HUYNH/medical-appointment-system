import { PrismaClient } from '@prisma/client';

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
  const facultyId = '051735cd-fb23-47cf-bfa9-9931131a58e6';

  // Create two services
  const service1 = await prisma.service.create({
    data: {
      name: 'Service 1',  // Name of the service
      price: 100.0,       // Price of the service
      description: 'Description for Service 1',  // Description of the service
      facultyId: facultyId,  // Setting the facultyId
    },
  });

  const service2 = await prisma.service.create({
    data: {
      name: 'Service 2',  // Name of the service
      price: 200.0,       // Price of the service
      description: 'Description for Service 2',  // Description of the service
      facultyId: facultyId,  // Setting the facultyId
    },
  });

}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
