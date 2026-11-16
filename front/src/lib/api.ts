export const USE_MOCK = true;
const API_BASE_URL = 'http://localhost:8000/api';

export interface Zone {
  id: number;
  name: string;
  type: string;
  capacity: number;
  current_count: number;
}

export interface Train {
  id: number;
  number: string;
  destination: string;
  departure_time: string;
  platform: string;
  status: 'boarding' | 'waiting' | 'departed';
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  zone: string;
}

export interface DebugResponse {
  endpoint: string;
  method: string;
  requestBody: any;
  responseBody: any;
  status: number;
  timestamp: string;
}

const MOCK_TRAINS: Train[] = [
  { id: 1, number: '802', destination: 'Санкт-Петербург', departure_time: '14:30', platform: '3', status: 'boarding' },
  { id: 2, number: '756', destination: 'Нижний Новгород', departure_time: '15:10', platform: '5', status: 'waiting' },
  { id: 3, number: '710', destination: 'Казань', departure_time: '16:00', platform: '7', status: 'waiting' },
];

const MOCK_SERVICES: Service[] = [
  { id: 1, name: 'Кофе с собой', description: 'Шоколадница, 2 этаж', icon: 'coffee', zone: 'Главный вестибюль' },
  { id: 2, name: 'Продукты в дорогу', description: 'Перекрёсток, 1 этаж', icon: 'shopping', zone: 'Главный вестибюль' },
  { id: 3, name: 'Бизнес-зал', description: 'Зона Комфорт, 2 этаж', icon: 'briefcase', zone: 'Зал ожидания' },
  { id: 4, name: 'Аптека', description: 'Рядом с платформой 3', icon: 'pill', zone: 'Платформа №3' },
];

let MOCK_ZONES: Zone[] = [
  { id: 1, name: 'Главный вестибюль', type: 'зал', capacity: 500, current_count: 320 },
  { id: 2, name: 'Зал ожидания Комфорт', type: 'зал', capacity: 200, current_count: 45 },
  { id: 3, name: 'Платформа №3', type: 'платформа', capacity: 300, current_count: 210 },
];

export async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' = 'GET',
  body?: any
): Promise<{ data: T; debug: DebugResponse }> {
  const debugInfo: DebugResponse = {
    endpoint, method, requestBody: body || null, responseBody: null, status: 200,
    timestamp: new Date().toLocaleTimeString(),
  };

  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 300));
    let data: any = null;

    if (endpoint === '/zones/' && method === 'GET') data = MOCK_ZONES;
    else if (endpoint === '/trains/' && method === 'GET') data = MOCK_TRAINS;
    else if (endpoint === '/services/' && method === 'GET') data = MOCK_SERVICES;
    else if (endpoint.startsWith('/trains/') && method === 'GET') {
      const id = parseInt(endpoint.split('/')[2]);
      data = MOCK_TRAINS.find(t => t.id === id) || null;
    }
    else if (endpoint === '/zones/' && method === 'POST') {
      data = { ...body, id: Date.now(), current_count: 0 };
      MOCK_ZONES.push(data);
      debugInfo.status = 201;
    }

    debugInfo.responseBody = data;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-debug', { detail: debugInfo }));
    }
    return { data: data as T, debug: debugInfo };
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    debugInfo.responseBody = data;
    debugInfo.status = res.status;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-debug', { detail: debugInfo }));
    }
    return { data, debug: debugInfo };
  } catch (error) {
    debugInfo.responseBody = { error: String(error) };
    debugInfo.status = 500;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api-debug', { detail: debugInfo }));
    }
    return { data: null as unknown as T, debug: debugInfo };
  }
}