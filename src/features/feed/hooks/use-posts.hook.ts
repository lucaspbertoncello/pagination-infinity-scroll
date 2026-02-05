import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../feed.constants";
import { FeedService } from "../feed.service";

export function usePosts({ perPage }: usePosts.Params) {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEYS.listPosts],
    queryFn: ({ pageParam }) => FeedService.getAllPosts({ page: pageParam, perPage }),
    initialPageParam: 1,
    // funcao que vai ser executada toda vez apos a queryFn
    // ele basicamente vai guardar o valor do proximo parametro da query
    // esse valor sera usado quando fetchNextPage for chamado
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = Math.ceil(lastPage.items / perPage);
      const isLastPage = allPages.length >= totalPages;

      if (isLastPage) {
        return null;
      }

      return lastPageParam + 1;
    },
  });

  return {
    posts: result.data?.pages.flatMap((page) => page.data) ?? [],
    ...result,
  };
}

export namespace usePosts {
  export type Params = {
    perPage: number;
  };
}
