import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import '../index.scss';

export const Route = createRootRoute({
   component: RootComponent,
});

function RootComponent() {
   const queryClient = new QueryClient();

   return (
      <QueryClientProvider client={queryClient}>
         <Outlet />
      </QueryClientProvider>
   );
}
