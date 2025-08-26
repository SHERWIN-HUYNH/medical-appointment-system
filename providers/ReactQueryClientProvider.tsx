'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
