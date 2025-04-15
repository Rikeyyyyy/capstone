'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#171717] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Menu 1 Content</h2>
          <p className="text-gray-400">Content for Menu 1 will be displayed here.</p>
        </div>
        <div className="bg-[#171717] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Menu 2 Content</h2>
          <p className="text-gray-400">Content for Menu 2 will be displayed here.</p>
        </div>
        <div className="bg-[#171717] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Menu 3 Content</h2>
          <p className="text-gray-400">Content for Menu 3 will be displayed here.</p>
        </div>
      </div>
    </div>
  );
} 