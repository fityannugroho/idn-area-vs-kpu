import { z } from 'zod'

const schema = z.object({
  DB_URL: z.string().url(),
})

export type Env = z.infer<typeof schema>

export const env = schema.parse(process.env)
