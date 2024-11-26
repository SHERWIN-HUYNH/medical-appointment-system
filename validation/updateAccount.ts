import { z } from 'zod'

export const UpdateAccountValidation = z.object({
  username: z.string().min(2, 'Tên phải ít nhất 6 kí tự'),
  email: z.string().email('Email không hợp lệ'),
  oldPassword: z.string().min(6, 'Mật khẩu phải chứa 6 kí tự'),
  phone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
    .max(15, 'Số điện thoại không quá 15 chữ số'),
  newPassword: z.string().min(6, {}),
})
