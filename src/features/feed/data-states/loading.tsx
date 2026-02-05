import { Skeleton } from "@shared/components/common/skeleton";

const POSTS = 3;

export function Loading({ isLoading }: Loading.Props) {
  if (!isLoading) {
    return;
  }

  return (
    <div className="mx-auto flex w-full max-w-[468px] flex-col gap-6 py-6">
      {Array.from({ length: POSTS }).map((_, index) => (
        <article
          key={index}
          className="border-border bg-card flex h-[640px] flex-col overflow-hidden rounded-xl border shadow-sm"
        >
          <header className="border-border flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <Skeleton className="ring-border h-9 w-9 shrink-0 rounded-full ring-2" />
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="ml-auto h-3 w-8 rounded-md" />
          </header>
          <div className="bg-muted relative aspect-square w-full shrink-0">
            <Skeleton className="h-full w-full rounded-none" />
          </div>
          <div className="border-border flex shrink-0 items-center gap-1 border-t px-2 py-2">
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="size-9 rounded-md" />
          </div>
          <div className="border-border flex min-h-[72px] shrink-0 flex-col justify-center gap-2 border-t px-4 py-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </article>
      ))}
    </div>
  );
}

export namespace Loading {
  export type Props = {
    isLoading: boolean;
  };
}
