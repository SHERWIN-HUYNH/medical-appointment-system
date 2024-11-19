import { z } from 'zod'

export const UpdateUserWithRolesSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  roleIds: z.array(z.string()).nonempty(),
})
