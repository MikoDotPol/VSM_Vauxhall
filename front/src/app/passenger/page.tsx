'use client';
import { useState, useEffect } from 'react';
import { apiRequest, Train, Zone } from '@/lib/api';
import { Train as TrainIcon, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PassengerHome() {
  const router = useRouter();
  const [trains, setTrains] = useState<Train[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    (async () => {
      const [t, z] = await Promise.all([
        apiRequest<Train[]>('/trains/', 'GET'),
        apiRequest<Zone[]>('/zones/', 'GET'),
      ]);
      setTrains(t.data);
      setZones(z.data);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <p className="text-xs text-gray-500">Умный вокзал ВСМ</p>
          <h1 className="text-lg font-bold text-gray-800">Мои поездки</h1>
        </div>
        <Link href="/login" className="text-sm text-blue-600 hover:underline">Выйти</Link>
      </header>

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        {/* Мои поезда */}
        <section>
          <h2 className="text-sm font-semibold text-gray-600 uppercase mb-2 flex items-center gap-2">
            <TrainIcon size={16} /> Ближайшие поезда
          </h2>
          <div className="space-y-3">
            {trains.map(t => (
              <button key={t.id} onClick={() => router.push(`/passenger/train/${t.id}`)}
                className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                <div className="text-left">
                  <p className="text-xs text-gray-500">Поезд №{t.number}  {t.destination}</p>
                  <p className="text-lg font-bold text-gray-800">{t.departure_time}</p>
                  <p className="text-xs text-gray-500">Платформа {t.platform}</p>
                </div>
                <div className="flex items-center gap-2">
                  {t.status === 'boarding' ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Посадка</span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Ожидание</span>
                  )}
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Занятость залов */}
        <section>
          <h2 className="text-sm font-semibold text-gray-600 uppercase mb-2 flex items-center gap-2">
            <MapPin size={16} /> Занятость залов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {zones.map(z => {
              const p = z.capacity ? Math.round((z.current_count / z.capacity) * 100) : 0;
              const busy = p > 70;
              return (
                <div key={z.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-gray-800 text-sm">{z.name}</p>
                    <span className={`text-xs font-semibold ${busy ? 'text-red-600' : 'text-green-600'}`}>{p}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${busy ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(p, 100)}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{z.current_count} / {z.capacity} чел.</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Быстрые ссылки */}
        <section className="grid grid-cols-2 gap-3">
          <Link href="/passenger/map" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition">
            <MapPin size={24} className="text-blue-600" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">Карта вокзала</p>
              <p className="text-xs text-gray-500">Построить маршрут</p>
            </div>
          </Link>
          <Link href="/passenger/services" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition">
            <span className="text-2xl"></span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Услуги</p>
              <p className="text-xs text-gray-500">Кофе, еда, заказы</p>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}