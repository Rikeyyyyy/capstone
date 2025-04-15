import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    try {
      // Check if user exists
      const existsResult = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (existsResult.rows.length > 0) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      // Create new user
      const hashedPassword = await hash(password, 10);
      const result = await client.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, hashedPassword]
      );

      console.log('User created successfully:', result.rows[0].id);

      return NextResponse.json(
        { 
          message: 'User created successfully',
          userId: result.rows[0].id 
        },
        { status: 201 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 