'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AUTH_CONFIG } from '@/constants/auth';
import { Button } from '@/components/ui/Button';

export default function Sidebar() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('menu1');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        // Clear any client-side state
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page
        router.push(AUTH_CONFIG.ROUTES.LOGIN);
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="h-screen w-64 bg-[#171717] text-white flex flex-col">
      {/* Menu Items */}
      <div className="flex-1 p-4 space-y-2">
        <Link 
          href="/dashboard/menu1"
          className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
            activeMenu === 'menu1' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setActiveMenu('menu1')}
        >
          <span>Menu 1</span>
        </Link>
        <Link 
          href="/dashboard/menu2"
          className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
            activeMenu === 'menu2' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setActiveMenu('menu2')}
        >
          <span>Menu 2</span>
        </Link>
        <Link 
          href="/dashboard/menu3"
          className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
            activeMenu === 'menu3' ? 'bg-gray-700' : ''
          }`}
          onClick={() => setActiveMenu('menu3')}
        >
          <span>Menu 3</span>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          isLoading={isLoggingOut}
          loadingText="Logging out..."
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
} 