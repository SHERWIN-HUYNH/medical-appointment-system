import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const doctor = await prisma.doctor.findFirst({
    where: {
      id: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
    },
  });
  const Comment = [
    {
      createdAt: new Date('2024-10-01'),
      content: 'Dịch vụ rất tốt, bác sĩ tận tâm.',
      rating: 5,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Không hài lòng với thời gian chờ.',
      rating: 2,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Phục vụ chu đáo, nhân viên thân thiện.',
      rating: 4,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Dịch vụ ổn nhưng cần cải thiện khâu đặt lịch.',
      rating: 3,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Rất hài lòng, sẽ quay lại lần sau.',
      rating: 5,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Không hài lòng với dịch vụ.',
      rating: 1,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Tư vấn kỹ càng, điều trị hiệu quả.',
      rating: 4,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Bác sĩ rất tận tâm và chuyên nghiệp.',
      rating: 5,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Cần cải thiện về mặt thời gian phục vụ.',
      rating: 3,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
    {
      createdAt: new Date('2024-10-01'),
      content: 'Khá hài lòng với kết quả điều trị.',
      rating: 4,
      doctorId: 'fcf7baa3-f8bc-4615-b03c-1ef507234105',
      userId: '729b26c6-6f86-4f3b-9240-0cedec2fd60c',
    },
  ];
  for (const comment of Comment) {
    await prisma.comment.create({
      data: {
        createdAt: comment.createdAt,
        content: comment.content,
        rating: comment.rating,
        doctorId: comment.doctorId,
        userId: comment.userId,
      },
    });
    console.log('DATA DOCTOR', doctor);
  }
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
