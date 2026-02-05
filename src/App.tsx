import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@shared/lib/query-client";
import { FeedViewModel } from "./features/feed/feed.view-model";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto w-full px-4 py-10 sm:px-6">
        <FeedViewModel />
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
