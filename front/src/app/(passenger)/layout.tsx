import BottomNav from '@/components/passenger/BottomNav';
import TopHeader from '@/components/passenger/TopHeader';
import { SearchProvider } from '@/contexts/SearchContext';

export default function PassengerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <div className="min-h-screen pb-20 bg-gray-50">
        <TopHeader /> {/* <-- Шапка теперь на всех страницах */}
        {children}
      </div>
      <BottomNav />
    </SearchProvider>
  );
}