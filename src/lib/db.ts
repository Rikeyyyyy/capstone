import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

console.log('Connecting to database with URL:', process.env.DATABASE_URL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Disable SSL for local development
  ssl: false
});

// Test the connection
pool.connect()
  .then(client => {
    console.log('Database connected successfully');
    // Test a simple query
    return client.query('SELECT current_database(), current_user')
      .then(result => {
        console.log('Database info:', result.rows[0]);
        client.release();
      });
  })
  .catch(err => {
    console.error('Database connection error:', err);
    console.error('Error details:', {
      code: err.code,
      message: err.message,
      stack: err.stack
    });
  });

export { pool }; 