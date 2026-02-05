import { Button } from "@shared/components/common/button";

export function Error({ isRetrying, onRetry, isError }: Error.Props) {
  if (!isError) {
    return;
  }

  return (
    <div className="border-border bg-card mx-auto flex w-full max-w-[468px] flex-col items-center justify-center gap-4 rounded-xl border p-8 text-center shadow-sm">
      <p className="text-muted-foreground text-sm">Não foi possível carregar o feed.</p>
      <Button variant="outline" size="sm" onClick={onRetry} isLoading={isRetrying}>
        Tentar novamente
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
