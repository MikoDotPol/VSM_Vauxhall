// src/app/passenger/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { apiRequest, Zone } from '@/lib/api';
import { MapPin, Coffee, Train, AlertCircle, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function PassengerDashboard() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем данные о залах ожидания при старте
  useEffect(() => {
    async function loadData() {
      const { data } = await apiRequest<Zone[]>('/zones/', 'GET');
      setZones(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20">
      {/* Шапка */}
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Добрый день, Пассажир!</h1>
          <p className="text-sm text-gray-500">Поезд 802 "Сапсан" | Отправление 14:30</p>
        </div>
        <Link href="/login" className="text-sm text-blue-600 hover:underline">Выйти</Link>
      </header>

      {/* Статус посадки (Пункт 4: Напоминания) */}
      <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg mb-6 flex items-start gap-3">
        <AlertCircle size={24} className="mt-1 flex-shrink-0" />
        <div>
          <h2 className="font-bold">Началась посадка на поезд!</h2>
          <p className="text-blue-100 text-sm">Ваш вагон №4. До отправления 25 минут.</p>
        </div>
      </div>

      {/* Занятость залов (Пункт 4) */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
          <MapPin size={20} /> Свободные места в залах
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
             <div className="animate-pulse bg-gray-200 h-24 rounded-xl"></div>
          ) : zones.map(zone => {
            const loadPercent = Math.round((zone.current_count / zone.capacity) * 100) || 0;
            const isCrowded = loadPercent > 70;
            return (
              <div key={zone.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800">{zone.name}</h3>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${isCrowded ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(loadPercent, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Заполнено на {loadPercent}%</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Навигация и Сервисы (Пункт 4: Заглушки) */}
      <section className="grid grid-cols-2 gap-4">
        <button className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 border border-gray-100">
          <Navigation size={32} className="text-blue-600" />
          <span className="font-medium text-gray-800">Навигация по вокзалу</span>
          <span className="text-xs text-gray-400">Построить маршрут</span>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-gray-50 border border-gray-100">
          <Coffee size={32} className="text-orange-500" />
          <span className="font-medium text-gray-800">Заказать кофе</span>
          <span className="text-xs text-gray-400">Шоколадница / Перекресток</span>
        </button>
      </section>

      {/* Заглушка для быстрого перехода к тестам API */}
      <div className="mt-8 text-center">
        <Link href="/debug" className="text-sm text-gray-400 hover:text-gray-600 underline">
          Перейти в панель отладки API
        </Link>
      </div>
    </div>
  );
}