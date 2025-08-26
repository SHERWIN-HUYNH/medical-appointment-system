import { z } from 'zod'
import {

  INVALID_EMAIL,
  MAX_lENGTH_PHONE,
  MIN_LENGTH_PHONE,
  NAME_LENGTH,
  PASSWORD_LENGTH,
} from './messageCode/authentication'

export const UpdateAccountValidation = z.object({
  username: z.string().min(2, NAME_LENGTH),
  email: z.string().email(INVALID_EMAIL),
  oldPassword: z.string().min(6, PASSWORD_LENGTH),
  phone: z.string().min(10, MIN_LENGTH_PHONE).max(11, MAX_lENGTH_PHONE),
  newPassword: z.string().min(6, {})
})
