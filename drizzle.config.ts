import { defineConfig } from "drizzle-kit";

// Fixed for drizzle-kit v0.20.18 compatibility

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

