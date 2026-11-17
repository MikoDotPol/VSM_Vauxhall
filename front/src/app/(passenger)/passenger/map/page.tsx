'use client';
import { useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

const POINTS = [
  { id: 'entrance', label: 'Вход', x: 40, y: 40 },
  { id: 'hall', label: 'Главный зал', x: 180, y: 80 },
  { id: 'wait', label: 'Зал ожидания', x: 320, y: 140 },
  { id: 'platform3', label: 'Платформа 3', x: 460, y: 200 },
  { id: 'cafe', label: 'Кофейня', x: 220, y: 200 },
  { id: 'business', label: 'Бизнес-зал', x: 360, y: 60 },
];

export default function MapPage() {
  const [from, setFrom] = useState<string>('entrance');
  const [to, setTo] = useState<string>('platform3');

  const fromPoint = POINTS.find(p => p.id === from)!;
  const toPoint = POINTS.find(p => p.id === to)!;

  return (
    <div className="min-h-screen pb-16">
      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-4">
        
        {/* Кнопка назад и заголовок (теперь стилистически как на Ожидании) */}
        <div className="flex items-center gap-3">
          <Link href="/passenger" className="p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Навигация по вокзалу</h1>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500">Я сейчас здесь</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="w-full border p-2 rounded mt-1 text-gray-900">
              {POINTS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500">Мне нужно в</label>
            <select value={to} onChange={e => setTo(e.target.value)} className="w-full border p-2 rounded mt-1 text-gray-900">
              {POINTS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <svg viewBox="0 0 520 240" className="w-full h-72 bg-gray-50 rounded">
            <line x1="40" y1="40" x2="180" y2="80" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <line x1="180" y1="80" x2="320" y2="140" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <line x1="320" y1="140" x2="460" y2="200" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <line x1="180" y1="80" x2="360" y2="60" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <line x1="180" y1="80" x2="220" y2="200" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <line x1="220" y1="200" x2="320" y2="140" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />

            <line x1={fromPoint.x} y1={fromPoint.y} x2={toPoint.x} y2={toPoint.y} stroke="#3b82f6" strokeWidth="4" strokeDasharray="8 6" strokeLinecap="round" />

            {POINTS.map(p => (
              <g key={p.id}>
                <circle cx={p.x} cy={p.y} r="10" fill={p.id === from ? '#3b82f6' : p.id === to ? '#ef4444' : '#64748b'} stroke="white" strokeWidth="2" />
                <text x={p.x + 14} y={p.y + 4} fontSize="11" fill="#334155">{p.label}</text>
              </g>
            ))}
          </svg>
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
            <MapPin size={16} className="text-blue-600" />
            Маршрут: <b>{fromPoint.label}</b> → <b>{toPoint.label}</b>
          </p>
        </div>
      </main>
    </div>
  );
}