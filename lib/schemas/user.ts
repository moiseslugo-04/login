import { z, ZodType } from 'zod'
import { InferSchema } from './utils'

const userLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})
const userRegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

const userResponse = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
})

export type UserLoginSchema = InferSchema<typeof userLoginSchema>
export type UserRegisterSchema = InferSchema<typeof userRegisterSchema>
export type UserResponse = InferSchema<typeof userResponse>
export { userLoginSchema, userRegisterSchema, userResponse }
