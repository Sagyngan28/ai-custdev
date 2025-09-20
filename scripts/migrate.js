const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function migrate() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in environment variables');
    console.log('Please set DATABASE_URL in your .env.local file');
    process.exit(1);
  }

  console.log('🔄 Connecting to Neon database...');
  
  try {
    const sql = neon(connectionString);
    
    // Read migration file
    const migrationPath = path.join(__dirname, '..', 'migrate.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📋 Running database migration...');
    
    // Remove comments and split by semicolon
    const cleanSQL = migrationSQL
      .split('\n')
      .filter(line => !line.trim().startsWith('--') && line.trim().length > 0)
      .join('\n');
    
    const statements = cleanSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        const preview = statement.replace(/\s+/g, ' ').substring(0, 60);
        console.log(`Executing: ${preview}...`);
        await sql(statement);
      }
    }
    
    console.log('✅ Database migration completed successfully!');
    console.log('🎉 Your database is ready for the AI CustDev Simulator');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

migrate();
