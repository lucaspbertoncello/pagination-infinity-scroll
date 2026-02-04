import { useListClients } from "@features/clients/hooks/use-clients.hook";
import { generateEllipsisPagination } from "./client.utils";

export function useClientModel() {
  const listClientsResult = useListClients({ perPage: 5 });

  const pages = generateEllipsisPagination({
    currentPage: listClientsResult.pagination.currentPage,
    sorroundingPages: 1,
    totalPages: listClientsResult.pagination.totalPages,
  });

  return { listClientsResult, pages };
}
