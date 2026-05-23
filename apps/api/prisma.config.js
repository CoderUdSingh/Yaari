import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});

// Run below to push the schema changes to the database after editing the schema.prisma file
// npx prisma db push --schema=prisma/schema.prisma
