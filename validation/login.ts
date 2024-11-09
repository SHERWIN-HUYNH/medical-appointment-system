import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  phoneNumber: z.string().min(10).optional(),
});
