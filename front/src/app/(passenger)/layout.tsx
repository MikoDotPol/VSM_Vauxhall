import BottomNav from '@/components/passenger/BottomNav';
import { SearchProvider } from '@/contexts/SearchContext';

export default function PassengerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <div className="min-h-screen pb-20"> {/* отступ, чтобы контент не перекрывался панелью */}
        {children}
      </div>
      <BottomNav />
    </SearchProvider>
  );
}