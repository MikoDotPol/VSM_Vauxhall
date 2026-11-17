'use client';
import { useState, useEffect } from 'react';
import { apiRequest, Service } from '@/lib/api';
import { ArrowLeft, Coffee, ShoppingBag, Briefcase, Pill } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ICONS: Record<string, any> = {
  coffee: Coffee, shopping: ShoppingBag, briefcase: Briefcase, pill: Pill,
};

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [selected, setSelected] = useState<Service | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await apiRequest<Service[]>('/services/', 'GET');
      setServices(data);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-white shadow-sm p-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => router.back()} className="text-gray-600"><ArrowLeft size={20} /></button>
        <h1 className="font-bold text-gray-800">Услуги на вокзале</h1>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-3">
        {services.map(s => {
          const Icon = ICONS[s.icon] || ShoppingBag;
          return (
            <button key={s.id} onClick={() => setSelected(s)}
              className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition text-left">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon size={22} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{s.name}</p>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
              <span className="text-xs text-gray-400">{s.zone}</span>
            </button>
          );
        })}
      </main>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{selected.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{selected.description}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800 mb-4">
               Здесь будет меню {selected.name}. Интеграция с партнёром  в следующих итерациях.
            </div>
            <button onClick={() => setSelected(null)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
}