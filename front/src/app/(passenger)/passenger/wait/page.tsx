'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearch } from '@/contexts/SearchContext';
import { StationCombobox } from '@/components/passenger/StationCombobox';
import { ArrowLeft, Clock, Info, Coffee, ShoppingBag } from 'lucide-react';

const StationMapSVG = () => (
  <svg viewBox="0 0 800 400" className="w-full h-80 bg-gray-100 rounded-lg">
    <rect x="50" y="50" width="700" height="300" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" rx="8" />
    <rect x="350" y="350" width="100" height="20" fill="#3b82f6" rx="4" />
    <text x="400" y="365" textAnchor="middle" fontSize="12" fill="white">Вход</text>
    <rect x="100" y="100" width="250" height="150" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2" rx="8" />
    <text x="225" y="180" textAnchor="middle" fontSize="14" fill="#0369a1">Зал ожидания</text>
    <rect x="450" y="100" width="200" height="100" fill="#fef3c7" stroke="#fcd34d" strokeWidth="2" rx="8" />
    <text x="550" y="155" textAnchor="middle" fontSize="14" fill="#92400e">Кассы</text>
    <rect x="100" y="280" width="600" height="40" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" rx="4" />
    <text x="400" y="305" textAnchor="middle" fontSize="14" fill="#475569">Платформа 1</text>
    <circle cx="650" cy="250" r="20" fill="#fce7f3" stroke="#f472b6" strokeWidth="2" />
    <text x="650" y="255" textAnchor="middle" fontSize="10" fill="#9d174d">☕</text>
  </svg>
);

export default function WaitPage() {
  const { search, updateSearch } = useSearch();

  useEffect(() => {
    const updates: Record<string, string> = {};
    if (!search.station && search.fromStation) {
      updates.station = search.fromStation;
    }
    if (!search.waitTime && search.time) {
      updates.waitTime = search.time;
    }
    if (Object.keys(updates).length > 0) {
      updateSearch(updates);
    }
  }, [search.station, search.fromStation, search.waitTime, search.time, updateSearch]);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-8 space-y-6">
      
      {/* Кнопка назад и заголовок */}
      <div className="flex items-center gap-3">
        <Link href="/passenger" className="p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Ожидание поезда</h1>
      </div>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-2">
          <Clock size={20} /> Параметры ожидания
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Вокзал</label>
          <StationCombobox
            value={search.station}
            onChange={(val) => updateSearch({ station: val })}
            placeholder="Выберите вокзал"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Время прибытия / отправления</label>
          <input
            type="time"
            value={search.waitTime || ''}
            onChange={(e) => updateSearch({ waitTime: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">Схема вокзала</h2>
        {search.station ? (
          <StationMapSVG />
        ) : (
          <p className="text-gray-500 text-center py-12 bg-gray-50 rounded-lg">Выберите вокзал, чтобы увидеть схему</p>
        )}
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
          <Info size={20} /> Информация о вокзале
        </h2>
        <p className="text-gray-500 text-sm">Здесь будет отображаться информация о залах ожидания, кассах и правилах вокзала.</p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
          <Coffee size={20} /> Сервисы на вокзале
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-400">
            <Coffee size={18} /> Кофейня
          </div>
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-400">
            <ShoppingBag size={18} /> Магазины
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Интеграция с сервисами появится позже.</p>
      </section>
    </div>
  );
}