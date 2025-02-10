import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    try {
      const exists = await prisma.user.findFirst({
        where: { email }
      });

      if (exists) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      return NextResponse.json(
        { error: 'Error checking user existence' },
        { status: 500 }
      );
    }

    // Create new user
    try {
      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      console.log('User created successfully:', user.id);

      return NextResponse.json(
        { 
          message: 'User created successfully',
          userId: user.id 
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { error: 'Error creating user in database' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 