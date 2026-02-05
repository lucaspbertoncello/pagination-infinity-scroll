import { Button } from "@shared/components/common/button";
import type { useFeedModel } from "./feed.model";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Loading } from "./data-states/loading";
import { Error } from "./data-states/error";
import { useEffect, useRef } from "react";

type FeedViewProps = ReturnType<typeof useFeedModel>;

export function FeedView(props: FeedViewProps) {
  const { refetch, isRefetching, isFetching, isError, posts, fetchNextPage, hasNextPage } =
    props.listPostsResult;

  // essa ref ira servir para o nosso intersectionObserver observar
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) {
      return;
    }

    // aqui essa funcao sera executada toda vez que a sentinelRef entrar na view do usuario
    const observer = new IntersectionObserver((entries) => {
      // acessamos o [0] pois estamos observando apenas um elemento
      const isIntersecting = entries[0].isIntersecting;

      // quando o usuario chegar no elemento, ele faz o fetch de novas paginas
      if (isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, {});

    // observamos a sentinelRef
    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [isFetching, fetchNextPage, hasNextPage]);

  const contentReady = !isError && !isFetching;

  return (
    <div className="mx-auto flex w-full max-w-[468px] flex-col gap-6 py-6">
      {contentReady && (
        <>
          {posts.map((post) => (
            <article
              key={post.id}
              className="border-border bg-card flex h-[640px] flex-col overflow-hidden rounded-xl border shadow-sm"
            >
              <header className="border-border flex h-14 shrink-0 items-center gap-3 border-b px-4">
                <img
                  src={post.avatar}
                  alt=""
                  className="ring-border h-9 w-9 shrink-0 rounded-full object-cover ring-2"
                />

                <span className="text-foreground truncate text-sm font-semibold">{post.authorName}</span>

                <time className="text-muted-foreground ml-auto text-xs">{post.createdAt}</time>
              </header>

              <div className="bg-muted relative aspect-square w-full shrink-0">
                <img src={post.image} alt="" className="h-full w-full object-cover" />
              </div>

              <div className="border-border flex shrink-0 items-center gap-1 border-t px-2 py-2">
                <Button variant="ghost" size="icon" className="size-9" isLoading={false} aria-label="Curtir">
                  <Heart className="size-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  isLoading={false}
                  aria-label="Comentar"
                >
                  <MessageCircle className="size-5" />
                </Button>

                <Button variant="ghost" size="icon" className="size-9" isLoading={false} aria-label="Enviar">
                  <Send className="size-5" />
                </Button>
              </div>

              <div className="border-border flex min-h-[72px] shrink-0 flex-col justify-center border-t px-4 py-3">
                <p className="text-foreground line-clamp-2 text-sm leading-snug">{post.caption}</p>
              </div>
            </article>
          ))}
          <div ref={sentinelRef} />
        </>
      )}

      <Loading isLoading={isFetching && !isError} />
      <Error isError={isError} isRetrying={isRefetching} onRetry={refetch} />
    </div>
  );
}
