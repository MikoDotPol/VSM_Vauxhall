'use client';

import { Search, Map, Clock, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/passenger', label: 'Билеты', icon: Search },
  { href: '/passenger/wait', label: 'Ожидание', icon: Clock }, // <-- Вот наша новая вкладка
  { href: '/passenger/map', label: 'Карта', icon: Map },
  { href: '/passenger/account', label: 'Аккаунт', icon: User }, // заглушка
  { href: '/passenger/settings', label: 'Настройки', icon: Settings, disabled: true},
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="max-w-4xl mx-auto flex justify-around items-center text-xs">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          
          // Если вкладка — заглушка, рендерим неактивную кнопку
          if (tab.disabled) {
            return (
              <button
                key={tab.href}
                disabled
                className="flex flex-col items-center gap-1 text-gray-400 opacity-40 cursor-not-allowed"
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          }

          // Иначе — рабочая ссылка с подсветкой
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}