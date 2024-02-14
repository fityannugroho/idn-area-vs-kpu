import type { Config } from 'drizzle-kit'
import { env } from '@/utils/env'

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DB_URL,
  },
} satisfies Config
