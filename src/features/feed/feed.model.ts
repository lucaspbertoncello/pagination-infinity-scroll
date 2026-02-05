import { usePosts } from "./hooks/use-posts.hook";

export function useFeedModel() {
  const listPostsResult = usePosts({ perPage: 50 });

  return { listPostsResult };
}
