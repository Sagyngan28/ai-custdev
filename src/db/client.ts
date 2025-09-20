import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// For development, you can use a mock connection string
// In production, replace with your actual Neon database URL
const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/ai_custdev';

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
