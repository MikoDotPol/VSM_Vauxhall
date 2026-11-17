'use client';

import { Train, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopHeader() {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Train className="text-blue-600" size={24} />
          <span className="font-bold text-gray-800 text-lg">Транзит</span>
        </div>
        <button
          onClick={() => router.push('/login')}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut size={16} />
          Выйти
        </button>
      </div>
    </header>
  );
}