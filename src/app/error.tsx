'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Rendering error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <h2 className="text-2xl font-heading font-bold text-songdew-red mb-4">Something went wrong!</h2>
      <p className="text-songdew-gray font-body mb-8 max-w-md mx-auto">
        {error.message || "An unexpected error occurred during rendering."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-songdew-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
