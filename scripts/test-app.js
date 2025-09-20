const { neon } = require('@neondatabase/serverless');

async function testDatabase() {
  console.log('🔍 Testing database connection...');
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log('❌ DATABASE_URL not found');
    return false;
  }

  try {
    const sql = neon(connectionString);
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected successfully');
    console.log(`   Current time: ${result[0].current_time}`);
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    return false;
  }
}

async function testTables() {
  console.log('🔍 Testing database tables...');
  
  const connectionString = process.env.DATABASE_URL;
  const sql = neon(connectionString);
  
  const tables = ['surveys', 'questions', 'options', 'segments', 'results'];
  
  for (const table of tables) {
    try {
      await sql(`SELECT COUNT(*) FROM ${table}`);
      console.log(`✅ Table '${table}' exists`);
    } catch (error) {
      console.log(`❌ Table '${table}' missing or error:`, error.message);
      return false;
    }
  }
  
  return true;
}

async function testGLMConfig() {
  console.log('🔍 Testing GLM configuration...');
  
  const apiKey = process.env.GLM_API_KEY;
  const apiUrl = process.env.GLM_API_URL;
  
  if (!apiKey) {
    console.log('⚠️  GLM_API_KEY not found - will use fallback mode');
    return false;
  }
  
  if (!apiUrl) {
    console.log('⚠️  GLM_API_URL not found - using default');
  }
  
  console.log('✅ GLM configuration found');
  console.log(`   API URL: ${apiUrl || 'default'}`);
  console.log(`   API Key: ${apiKey.substring(0, 10)}...`);
  
  return true;
}

async function testAPI() {
  console.log('🔍 Testing API endpoints...');
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    // Test if server is running with health check
    const response = await fetch(`${baseUrl}/api/health`);
    if (response.status === 200) {
      console.log('✅ API server is responding');
      return true;
    } else {
      console.log(`⚠️  Unexpected API response: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ API server not responding:', error.message);
    console.log('   Make sure to run: npm run dev');
    return false;
  }
}

async function runTests() {
  console.log('🧪 AI CustDev Simulator - System Test\n');
  
  // Load environment variables
  require('dotenv').config({ path: '.env.local' });
  
  const tests = [
    { name: 'Database Connection', test: testDatabase },
    { name: 'Database Tables', test: testTables },
    { name: 'GLM Configuration', test: testGLMConfig },
    { name: 'API Endpoints', test: testAPI }
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const { name, test } of tests) {
    console.log(`\n📋 ${name}`);
    try {
      const result = await test();
      if (result) passed++;
    } catch (error) {
      console.log(`❌ ${name} failed:`, error.message);
    }
  }
  
  console.log(`\n📊 Test Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! Your AI CustDev Simulator is ready to use.');
  } else {
    console.log('⚠️  Some tests failed. Check the setup guide in SETUP.md');
  }
  
  console.log('\n🚀 To start the application: npm run dev');
  console.log('🌐 Then open: http://localhost:3000');
}

runTests().catch(console.error);
