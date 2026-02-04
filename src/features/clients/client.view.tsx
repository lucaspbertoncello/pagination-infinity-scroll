import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/common/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@shared/components/common/pagination";
import { Button } from "@shared/components/common/button";
import { cn } from "@shared/lib/utils";
import type { useClientModel } from "@features/clients/client.model";
import { Error } from "./data-states/error";
import { Loading } from "./data-states/loading";

type ClientViewProps = ReturnType<typeof useClientModel>;

export function ClientView(props: ClientViewProps) {
  const { clients, isFetching, isError, refetch, isRefetching } = props.listClientsResult;
  const { handleNextPage, handlePrevPage, totalPages, currentPage, handleSetPage } =
    props.listClientsResult.pagination;

  const contentReady = !isFetching && !isError;

  return (
    <div className="mx-auto w-full max-w-6xl py-8">
      {contentReady && (
        <Table className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
          <TableHeader className="bg-muted/40">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground h-12 px-4 text-xs font-semibold tracking-wider uppercase">
                User
              </TableHead>
              <TableHead className="text-muted-foreground h-12 px-4 text-xs font-semibold tracking-wider uppercase">
                Entry date
              </TableHead>
              <TableHead className="text-muted-foreground h-12 px-4 text-xs font-semibold tracking-wider uppercase">
                Vehicle type
              </TableHead>
              <TableHead className="text-muted-foreground h-12 px-4 text-xs font-semibold tracking-wider uppercase">
                Brand
              </TableHead>
              <TableHead className="text-muted-foreground h-12 px-4 text-xs font-semibold tracking-wider uppercase">
                Model
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="border-border transition-colors">
                <TableCell className="flex items-center gap-3 px-4 py-3.5">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="ring-border h-10 w-10 shrink-0 rounded-full object-cover ring-2"
                  />
                  <div className="min-w-0">
                    <strong className="text-foreground block truncate font-medium">{client.name}</strong>
                    <small className="text-muted-foreground block truncate text-sm">{client.email}</small>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground px-4 py-3.5">{client.createdAt}</TableCell>

                <TableCell className="px-4 py-3.5">{client.vehicleType}</TableCell>

                <TableCell className="px-4 py-3.5">{client.vehicleManufacturer}</TableCell>

                <TableCell className="px-4 py-3.5">{client.vehicleModel}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableCaption className="border-border bg-muted/20 mt-0 border-t px-4 py-4">
            <Pagination className="mx-0 w-full">
              <PaginationContent className="gap-1.5">
                <PaginationItem>
                  <PaginationPrevious
                    className={cn(
                      "border-border cursor-pointer border shadow-xs",
                      currentPage <= 1 && "pointer-events-none opacity-50",
                    )}
                    aria-disabled={currentPage <= 1}
                    onClick={currentPage <= 1 ? undefined : handlePrevPage}
                  />
                </PaginationItem>

                {props.pages.map((page, index) => (
                  <PaginationItem key={index}>
                    <Button
                      variant={currentPage === page ? "default" : "ghost"}
                      size="icon"
                      className="size-9 font-medium"
                      disabled={typeof page === "string"}
                      isLoading={false}
                      onClick={() => handleSetPage(page as number)}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    className={cn(
                      "border-border cursor-pointer border shadow-xs",
                      currentPage >= totalPages && "pointer-events-none opacity-50",
                    )}
                    aria-disabled={currentPage >= totalPages}
                    onClick={currentPage >= totalPages ? undefined : handleNextPage}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCaption>
        </Table>
      )}

      <Loading isLoading={isFetching && !isError} />
      <Error isRetrying={isRefetching} onRetry={refetch} isError={isError} />
    </div>
  );
}
