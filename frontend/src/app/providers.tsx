'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { PinnedVideosProvider } from '@/lib/context/PinnedVideosContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PinnedVideosProvider>
        {children}
      </PinnedVideosProvider>
    </QueryClientProvider>
  );
} 