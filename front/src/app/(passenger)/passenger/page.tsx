'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Train, Search, LogOut } from 'lucide-react';
import TripCard from '@/components/passenger/TripCard';
import { StationCombobox } from '@/components/passenger/StationCombobox';
import { useSearch } from '@/contexts/SearchContext';
import { MOCK_SCHEDULE } from '@/lib/mockData';

export default function PassengerPage() {
  const router = useRouter();
  const { search, updateSearch } = useSearch(); 
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<typeof MOCK_SCHEDULE | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setResults(MOCK_SCHEDULE);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="text-blue-600" size={24} />
            <span className="font-bold text-gray-800 text-lg">Транзит</span>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Купить билет</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Откуда</label>
                <StationCombobox
                  value={search.fromStation}
                  onChange={(val) => updateSearch({ fromStation: val })}
                  placeholder="Станция отправления"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Куда</label>
                <StationCombobox
                  value={search.toStation}
                  onChange={(val) => updateSearch({ toStation: val })}
                  placeholder="Станция назначения"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date" required value={search.date}
                    onChange={(e) => updateSearch({ date: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Время (необязательно)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="time" value={search.time}
                    onChange={(e) => updateSearch({ time: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit" disabled={isSearching}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Search size={18} />
              {isSearching ? 'Поиск...' : 'Найти билеты'}
            </button>
          </form>
        </section>

        {results && (
          <section className="space-y-4 pb-8">
            <h2 className="text-lg font-bold text-gray-800">Найденные рейсы</h2>
            {results.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}