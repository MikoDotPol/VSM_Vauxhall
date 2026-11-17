'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Временный селект роли для тестирования роутинга (пока нет бэкенда)
  const [role, setRole] = useState('passenger'); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь позже будет запрос к API.
    // Пока просто имитируем успешный вход и роутинг по тегу.
    
    if (role === 'passenger') {
      router.push('/passenger');
    } else if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'business') {
      router.push('/business');
    } else if (role === 'analyst') {
      router.push('/analyst');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Транзит</h1>
          <p className="text-gray-500">Вход в цифровую среду вокзала</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* ВРЕМЕННЫЙ БЛОК ДЛЯ ТЕСТИРОВАНИЯ РОЛЕЙ */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Тестовая роль (тег)</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-gray-50"
            >
              <option value="passenger">Passenger (Пассажир)</option>
              <option value="admin">Admin (Администратор)</option>
              <option value="business">Business (Бизнес)</option>
              <option value="analyst">Analyst (Аналитик)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Войти
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}