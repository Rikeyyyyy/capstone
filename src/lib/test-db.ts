const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  const client = await pool.connect();
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const result = await client.query('SELECT NOW()');
    console.log('Connection successful! Current time:', result.rows[0].now);

    // Test users table
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    
    if (tableExists.rows[0].exists) {
      console.log('Users table exists!');
      
      // Test inserting a test user
      const testEmail = 'test@example.com';
      const testPassword = 'test123';
      
      // Check if test user exists
      const userExists = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [testEmail]
      );
      
      if (userExists.rows.length === 0) {
        await client.query(
          'INSERT INTO users (email, password) VALUES ($1, $2)',
          [testEmail, testPassword]
        );
        console.log('Test user created successfully!');
      } else {
        console.log('Test user already exists!');
      }
      
      // Count users
      const countResult = await client.query('SELECT COUNT(*) FROM users');
      console.log(`Total users in database: ${countResult.rows[0].count}`);
    } else {
      console.log('Users table does not exist! Please create it first.');
    }
  } catch (error) {
    console.error('Error testing database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

testConnection().catch(console.error); 