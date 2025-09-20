import { defineConfig } from "drizzle-kit";

// Working configuration for drizzle-kit v0.20.18
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://user:password@localhost:5432/ai_custdev",
  },
});
