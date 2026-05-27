export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <h1 className="text-4xl font-heading font-bold text-songdew-text mb-4">404 - Not Found</h1>
      <p className="text-songdew-gray font-body text-lg mb-8">
        We couldn't find the page you're looking for. 
        Current Path: <span className="font-mono bg-black/5 px-2 py-1 rounded">Unknown</span>
      </p>
      <a href="/" className="px-6 py-3 bg-songdew-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
        Return Home
      </a>
    </div>
  );
}
