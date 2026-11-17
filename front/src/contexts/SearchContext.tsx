'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface SearchState {
  fromStation: string;
  toStation: string;
  date: string;
  time: string;
  station: string;
  waitTime: string;
}

interface SearchContextType {
  search: SearchState;
  updateSearch: (updates: Partial<SearchState>) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<SearchState>({
    fromStation: '',
    toStation: '',
    date: '',
    time: '',
    station: '',
    waitTime: '',
  });

  const updateSearch = useCallback((updates: Partial<SearchState>) => {
    setSearch((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <SearchContext.Provider value={{ search, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
}