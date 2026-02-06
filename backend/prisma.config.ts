import { defineConfig, env } from '@prisma/config';
import 'dotenv/config'; // <--- Add this line to load the .env file

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
