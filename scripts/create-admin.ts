import { Pool } from 'pg';
import { hash } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createAdmin() {
  const client = await pool.connect();
  try {
    // Admin credentials
    const adminEmail = 'admin@computama.com';
    const adminPassword = 'Admin@123'; // This will be the admin password
    
    // Hash the password
    const hashedPassword = await hash(adminPassword, 10);
    
    // Check if admin already exists
    const existingAdmin = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [adminEmail]
    );

    if (existingAdmin.rows.length > 0) {
      console.log('Admin user already exists!');
      return;
    }

    // Create admin user
    await client.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [adminEmail, hashedPassword]
    );

    console.log('Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

createAdmin().catch(console.error); 