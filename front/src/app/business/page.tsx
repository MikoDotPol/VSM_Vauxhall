'use client';
import Link from 'next/link';
export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold mb-2">Кабинет владельца бизнеса</h1>
        <p className="text-gray-500 text-sm mb-4">MVP-заглушка. Здесь будут: публикация товаров, приём заказов, статистика по зоне.</p>
        <Link href="/login" className="text-blue-600 text-sm hover:underline"> Назад</Link>
      </div>
    </div>
  );
}