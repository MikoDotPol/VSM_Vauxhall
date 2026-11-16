'use client';
import { useState, useEffect } from 'react';
import { DebugResponse } from '@/lib/api';

export default function DebugConsole() {
  const [logs, setLogs] = useState<DebugResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setLogs(prev => [e.detail, ...prev].slice(0, 10));
    };
    window.addEventListener('api-debug', handler as EventListener);
    return () => window.removeEventListener('api-debug', handler as EventListener);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-green-400 px-4 py-2 rounded-t-lg font-bold shadow-lg"
      >
         Debug {isOpen ? '' : ''} ({logs.length})
      </button>

      {isOpen && (
        <div className="w-[500px] bg-gray-900 text-green-400 p-4 rounded-b-lg shadow-2xl max-h-[400px] overflow-auto border-t border-gray-700">
          <div className="flex justify-between mb-2">
            <span className="text-white font-bold">API Логи</span>
            <button onClick={() => setLogs([])} className="text-gray-400 hover:text-white">Очистить</button>
          </div>
          {logs.length === 0 && <p className="text-gray-500">Ожидание запросов... Открой /debug для теста</p>}
          {logs.map((log, i) => (
            <div key={i} className="mb-3 border-b border-gray-700 pb-2">
              <div className="flex justify-between">
                <span className={`font-bold ${log.status >= 400 ? 'text-red-400' : 'text-blue-400'}`}>
                  [{log.method}] {log.endpoint}
                </span>
                <span className="text-gray-500">{log.timestamp}</span>
              </div>
              <div className="text-yellow-300 mt-1">Request:</div>
              <pre className="whitespace-pre-wrap break-all">{JSON.stringify(log.requestBody, null, 1)}</pre>
              <div className="text-green-300 mt-1">Response (status {log.status}):</div>
              <pre className="whitespace-pre-wrap break-all">{JSON.stringify(log.responseBody, null, 1)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}