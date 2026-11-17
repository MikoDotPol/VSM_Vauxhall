'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { STATIONS } from '@/lib/stations';

interface StationComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function StationCombobox({ value, onChange, placeholder }: StationComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredStations = STATIONS.filter(
    (station) =>
      station.title.toLowerCase().includes(search.toLowerCase()) ||
      station.city.toLowerCase().includes(search.toLowerCase())
  );

  const selectedStation = STATIONS.find((s) => s.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-left font-normal"
        >
          {selectedStation ? (
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              {selectedStation.title} ({selectedStation.city})
            </span>
          ) : (
            <span className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              {placeholder}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white shadow-lg border border-gray-200 z-50" align="start" style={{ width: 'var(--radix-popover-trigger-width)' }}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Поиск станции..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>Станция не найдена.</CommandEmpty>
            <CommandGroup>
              {filteredStations.map((station) => (
                <CommandItem
                  key={station.code}
                  value={station.code}
                  onSelect={() => {
                    onChange(station.code);
                    setOpen(false);
                    setSearch('');
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === station.code ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {station.title} ({station.city})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}