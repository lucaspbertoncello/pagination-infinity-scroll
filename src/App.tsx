import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClientViewModel } from "@features/clients/client.view-model";
import { queryClient } from "@shared/lib/query-client";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto w-full px-4 py-10 sm:px-6">
        <ClientViewModel />
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
