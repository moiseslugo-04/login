import { z, ZodType } from 'zod'

export type InferSchema<T extends ZodType> = T extends z.ZodType<infer U>
  ? U
  : never
