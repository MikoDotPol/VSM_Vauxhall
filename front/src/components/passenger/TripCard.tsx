import { ArrowRight, MapPin, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TripCard({ trip }: { trip: any }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:border-blue-300 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
              {trip.trainType}
            </span>
            <span className="text-xs text-gray-500">Поезд №{trip.trainNumber}</span>
          </div>
          <div className="flex items-center gap-3 text-lg font-bold text-gray-800">
            <span>{trip.departureTime}</span>
            <ArrowRight size={18} className="text-gray-400" />
            <span>{trip.arrivalTime}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {trip.from} → {trip.to}
          </div>
          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <MapPin size={12} />
            {trip.station} · В пути: {trip.duration}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xl font-bold text-gray-900">{trip.price.toLocaleString('ru-RU')} ₽</span>
          <button
            onClick={() => router.push('/passenger/checkout')}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Выбрать
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}