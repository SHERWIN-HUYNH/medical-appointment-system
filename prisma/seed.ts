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
  const user = await prisma.user.create({
    data: {
      name: 'TrungHuynh',
      email: '1234@example.com',
      password: hashedPassword,
      phone: '12345678901',
      roleId: 2
  }})

  // Tạo hồ sơ bệnh nhân với đầy đủ thông tin
  const profile = await prisma.profile.create({
    data: {
      name: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
      privacyConsent: 'Yes',
      gender: 'MALE', // Giá trị enum phải đúng với schema
      birthDate: new Date('1990-01-01'), // Giá trị ngày sinh có thể null
      address: '123 Street Name, City, Country',
      occupation: 'Software Engineer',
      emergencyContactName: 'Nguyen Van B',
      emergencyContactNumber: '0123456789',
      insuranceProvider: 'Insurance Inc.',
      insurancePolicyNumber: '123456789',
      allergies: 'None',
      currentMedication: 'None',
      pastMedicalHistory: 'None',
      identificationType: 'Passport',
      identificationNumber: 'A123456789',
      identificationDocumentId: 'DOC123456',
      identificationDocumentUrl: 'http://example.com/doc.pdf',
      primaryPhysician: 'Dr. John Doe',
      treatmentConsent: 'Yes',
      disclosureConsent: 'Yes',
      userId: 2, 
    }
  });
  // Create a new user
  console.log('USER',user)
  console.log('Profile:', profile);
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
