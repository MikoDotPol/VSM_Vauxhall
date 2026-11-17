export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Панель администратора</h1>
        <p className="text-gray-500 mb-6">Это заглушка. Доступ только для тега Admin.</p>
        <a href="/login" className="text-blue-600 hover:underline">Вернуться на страницу входа</a>
      </div>
    </div>
  );
}