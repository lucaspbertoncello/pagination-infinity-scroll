import { Button } from "@/shared/components/common/button";

export function Error({ isRetrying, onRetry, isError }: Error.Props) {
  if (!isError) {
    return;
  }

  return (
    <div className="border-border bg-card flex flex-col items-center justify-center gap-4 rounded-xl border p-8 text-center">
      <p className="text-muted-foreground text-sm">Could not load the clients.</p>
      <Button variant="outline" size="sm" onClick={onRetry} isLoading={isRetrying}>
        Try again
      </Button>
    </div>
  );
}

export namespace Error {
  export type Props = {
    onRetry(): void;
    isRetrying: boolean;
    isError: boolean;
  };
}
