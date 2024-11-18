import { DoctorScheduleRespository } from '@/repositories/doctorSchedule';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  
  const facultyId = '051735cd-fb23-47cf-bfa9-9931131a58e6';


async function main() {
  const doctorId= '3663a05b-138a-443d-a7bc-6f04730d4753'
const scheduleId = 'e221d9ee-0323-4a4a-a966-d5847291f9b1'
const doctorSchedule = await prisma.doctorSchedule.findFirst({
  where: {
    scheduleId: scheduleId,
    doctorId: doctorId,
  },
});
console.log('doctorSchedule',doctorSchedule)
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