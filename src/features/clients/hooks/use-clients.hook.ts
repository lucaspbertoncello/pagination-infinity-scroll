import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientService } from "@features/clients/client.service";
import { usePaginate } from "./use-paginate.hook";
import { useEffect } from "react";
import { QUERY_KEYS } from "../client.constants";

export function useListClients({ perPage = 8 }: useListClients.Params) {
  const pagination = usePaginate({ initialPage: 1 });
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: [QUERY_KEYS.listClients, { currentPage: pagination.currentPage, perPage }],
    queryFn: async () => {
      const response = await ClientService.getAll({ page: pagination.currentPage, perPage });
      pagination.setTotalPages(response.pages);
      return response;
    },
  });

  // aqui estamos realizando um prefetch da proxima pagina, para ter uma sensacao de atualizacao
  // instantanea para o usuario
  useEffect(() => {
    if (pagination.isLastPage) {
      return;
    }

    const nextPage = pagination.currentPage + 1;

    // toda vez que o currentPage muda, ele ja faz executa a query da proxima pagina
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.listClients, { currentPage: nextPage, perPage }],
      queryFn: async () => {
        const response = await ClientService.getAll({ page: pagination.currentPage, perPage });
        pagination.setTotalPages(response.pages);
        return response;
      },
    });
  }, [pagination, perPage, queryClient]);

  return {
    ...result,
    clients: result.data?.data ?? [],
    pagination,
  };
}

export namespace useListClients {
  export type Params = { perPage?: number };
}
