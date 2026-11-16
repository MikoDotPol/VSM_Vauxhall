'use client';
import { useRouter } from 'next/navigation';
import { User, ShieldCheck, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const roles = [
    { id: 'passenger', title: 'Пассажир', desc: 'Расписание, навигация, услуги', icon: <User size={36} />, color: 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100' },
    { id: 'business', title: 'Владелец бизнеса', desc: 'Заказы, загрузка зон', icon: <Briefcase size={36} />, color: 'bg-orange-50 border-orange-200 text-orange-900 hover:bg-orange-100' },
    { id: 'admin', title: 'Административный доступ', desc: 'Управление вокзалом', icon: <ShieldCheck size={36} />, color: 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-1 text-gray-800">Умный вокзал ВСМ</h1>
        <p className="text-center text-gray-500 mb-8">Выберите роль для входа (MVP)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roles.map(r => (
            <button key={r.id} onClick={() => router.push(`/${r.id}`)}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all text-center ${r.color}`}>
              {r.icon}
              <span className="font-semibold">{r.title}</span>
              <span className="text-xs opacity-70">{r.desc}</span>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">
          Linear сотрудник упразднён. Админ-доступ открывает панель управления.
        </p>
      </div>
    </div>
  );
}