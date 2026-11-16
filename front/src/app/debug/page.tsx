// src/app/debug/page.tsx
'use client';
import { useState } from 'react';
import { apiRequest, Zone } from '@/lib/api';
import DebugConsole from '@/components/DebugConsole';

export default function DebugPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('зал');
  const [response, setResponse] = useState<string>('');

  const handleCreateZone = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, type, capacity: 100 };

    const { data, debug } = await apiRequest<Zone>('/zones/', 'POST', payload);

    setResponse(`Создана зона ID: ${data.id}, Имя: ${data.name}`);
    // Прокидываем в консоль
    window.dispatchEvent(new CustomEvent('api-debug', { detail: debug }));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Отладка API (Фронт ↔ Бэк)</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Тест POST запроса (/zones/)</h2>
        <form onSubmit={handleCreateZone} className="flex flex-col gap-4">
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Название зоны" className="border p-2 rounded" required
          />
          <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded">
            <option value="зал">Зал ожидания</option>
            <option value="платформа">Платформа</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Отправить POST запрос
          </button>
        </form>
        {response && <p className="mt-4 text-green-600 font-medium">{response}</p>}
      </div>

      {/* Вызов нашего компонента консоли */}
      <DebugConsole />
    </div>
  );
}