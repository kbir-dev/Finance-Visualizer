export function DebugPanel({ transactions }) {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-dark-card rounded-lg shadow-lg max-w-md">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Debug Info</h3>
      <pre className="text-xs text-gray-500 overflow-auto max-h-40">
        {JSON.stringify(transactions, null, 2)}
      </pre>
    </div>
  );
} 