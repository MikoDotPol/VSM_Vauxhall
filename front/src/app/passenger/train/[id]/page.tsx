'use client';
import { useState, useEffect } from 'react';
import { apiRequest, Train } from '@/lib/api';
import { ArrowLeft, Bell, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrainCard({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [train, setTrain] = useState<Train | null>(null);
  const [remindersOn, setRemindersOn] = useState(true);

  useEffect(() => {
    (async () => {
      const { id } = await params;
      const res = await apiRequest<Train>(`/trains/${id}`, 'GET');
      setTrain(res.data);
    })();
  }, [params]);

  if (!train) return <div className="p-6 text-gray-500">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-white shadow-sm p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.back()} className="text-gray-600"><ArrowLeft size={20} /></button>
        <h1 className="font-bold text-gray-800">Поезд №{train.number}</h1>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Направление</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{train.destination}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> Отправление</p>
              <p className="text-lg font-semibold text-gray-800">{train.departure_time}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12} /> Платформа</p>
              <p className="text-lg font-semibold text-gray-800">№{train.platform}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Bell size={18} /> Напоминания</h3>
            <button onClick={() => setRemindersOn(!remindersOn)}
              className={`w-12 h-6 rounded-full transition ${remindersOn ? 'bg-blue-600' : 'bg-gray-300'} relative`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${remindersOn ? 'left-6' : 'left-0.5'}`} />
            </button>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Начало посадки  за 30 мин</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Конец посадки  за 5 мин</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Отправление поезда</li>
          </ul>
          <p className="text-xs text-gray-400 mt-3">
            Если вы уже в поезде, напоминания не отправляются.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
          <p className="font-semibold mb-1">Статус:</p>
          <p>{train.status === 'boarding' ? 'Идёт посадка. Поторопитесь на платформу.' : 'Посадка ещё не началась.'}</p>
        </div>
      </main>
    </div>
  );
}