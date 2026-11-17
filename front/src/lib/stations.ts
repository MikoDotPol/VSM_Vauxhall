export type Station = {
  code: string;
  title: string;
  city: string;
};

export const STATIONS: Station[] = [
  { code: 's2000001', title: 'Ленинградский вокзал', city: 'Москва' },
  { code: 's2000002', title: 'Курский вокзал', city: 'Москва' },
  { code: 's2000003', title: 'Казанский вокзал', city: 'Москва' },
  { code: 's2000004', title: 'Ярославский вокзал', city: 'Москва' },
  { code: 's2000005', title: 'Московский вокзал', city: 'Санкт-Петербург' },
  { code: 's2000006', title: 'Ладожский вокзал', city: 'Санкт-Петербург' },
  { code: 's2000007', title: 'Московский вокзал', city: 'Нижний Новгород' },
  { code: 's2000008', title: 'Казань-Пассажирская', city: 'Казань' },
];