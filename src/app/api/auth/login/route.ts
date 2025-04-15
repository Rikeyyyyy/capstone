import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { pool } from '../../../../lib/db';

export async function POST(request: Request) {
  console.log('Login API route called');
  
  try {
    const body = await request.json();
    console.log('Request body:', { ...body, password: '[REDACTED]' });

    const { email, password } = body;

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Connecting to database...');
    let client;
    try {
      client = await pool.connect();
      console.log('Database connected successfully');

      console.log('Querying database for user:', email);
      const result = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        console.log('User not found:', email);
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      const user = result.rows[0];
      console.log('User found, checking password');
      
      try {
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
          console.log('Invalid password for user:', email);
          return NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
          );
        }
      } catch (compareError) {
        console.error('Password comparison error:', compareError);
        return NextResponse.json(
          { error: 'Password verification failed' },
          { status: 500 }
        );
      }

      console.log('Generating JWT token for user:', email);
      const token = sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      console.log('Creating response with cookie');
      const response = NextResponse.json(
        { message: 'Login successful' },
        { status: 200 }
      );

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
      });

      console.log('Login successful for user:', email);
      return response;
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database error: ' + (dbError instanceof Error ? dbError.message : 'Unknown error') },
        { status: 500 }
      );
    } finally {
      if (client) {
        client.release();
        console.log('Database connection released');
      }
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
} 