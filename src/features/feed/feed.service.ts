import { httpClient } from "@/shared/lib/http-client";
import type { Post } from "./feed.types";
import type { Paginated } from "@/shared/types/paginated";

export class FeedService {
  static async getAllPosts(params: FeedService.ListAllPostsParams) {
    const { data } = await httpClient.get<FeedService.ListAllPostsResponse>("/posts", {
      params: {
        _page: params.page,
        _per_page: params.perPage,
      },
    });
    return data;
  }
}

export namespace FeedService {
  export type ListAllPostsParams = { page: number; perPage: number };
  export type ListAllPostsResponse = Paginated<Post>;
}
