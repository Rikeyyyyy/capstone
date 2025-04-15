import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isRegisterPage = request.nextUrl.pathname === '/register';

  // Jika user sudah login dan mencoba akses login/register, redirect ke dashboard
  if (token && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Jika user belum login dan mencoba akses dashboard, redirect ke login
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
}; 