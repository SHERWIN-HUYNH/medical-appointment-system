import { hashPassword } from '@/helpers/hash';
import {
  conflictResponse,
  createdResponse,
  internalServerErrorResponse,
} from '@/helpers/response';
import { UserRepository } from '@/repositories/user';
import { RegisterSchema } from '@/validation/register';
import { UserRole } from '@prisma/client';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { name, email, password, phone } = RegisterSchema.parse(body);

    const user = await UserRepository.getUserByEmail(email);
    if (user) {
      return conflictResponse('User already exists.');
    }
    const hashedPassword = await hashPassword(password);
    await UserRepository.insert({
      name,
      email,
      password: hashedPassword,
      phone,
      roleName: UserRole.USER,
    });

    return createdResponse({
      message: 'User created successfully.',
    });
  } catch (error) {
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
  }
};
