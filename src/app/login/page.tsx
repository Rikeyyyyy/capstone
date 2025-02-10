'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { validatePassword } from '@/utils/validation';
import { AUTH_CONFIG } from '@/constants/auth';
import { THEME } from '@/constants/theme';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const validation = validatePassword(formData.password);
    if (!validation.isValid) {
      setError(validation.message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        router.push(AUTH_CONFIG.ROUTES.DASHBOARD);
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 sm:p-8">
      <div className="max-w-md w-full space-y-6 bg-[#171717] p-8 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-indigo-500/10 hover:translate-y-[-2px]">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              label="Email address"
              type="email"
              id="email-address"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/50 p-3 rounded-lg animate-shake">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            loadingText="Signing in..."
          >
            Sign in
          </Button>
        </form>

        <div className="text-center">
          <Link 
            href={AUTH_CONFIG.ROUTES.REGISTER}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-all duration-200 ease-in-out hover:underline transform hover:scale-[1.02]"
          >
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
} 