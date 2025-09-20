export default function Loading() {
  return (
    <main className="space-y-8 animate-pulse">
      <div className="h-6 w-1/3 rounded bg-muted" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-80 rounded-lg border p-4">
          <div className="mb-2 h-4 w-1/3 rounded bg-muted" />
          <div className="h-64 rounded bg-muted" />
        </div>
        <div className="h-80 rounded-lg border p-4">
          <div className="mb-2 h-4 w-1/3 rounded bg-muted" />
          <div className="h-64 rounded bg-muted" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg border p-4">
              <div className="h-4 w-1/2 rounded bg-muted" />
              <div className="mt-2 h-3 w-3/4 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md border p-3" />
          ))}
        </div>
      </div>
    </main>
  );
}
