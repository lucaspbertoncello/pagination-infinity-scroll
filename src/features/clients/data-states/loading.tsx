import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/common/table";
import { Pagination, PaginationContent, PaginationItem } from "@shared/components/common/pagination";
import { Skeleton } from "@/shared/components/common/skeleton";

const ROWS = 5;

export function Loading({ isLoading }: Loading.Props) {
  if (!isLoading) {
    return;
  }

  return (
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
        {Array.from({ length: ROWS }).map((_, index) => (
          <TableRow key={index} className="border-border transition-colors">
            <TableCell className="flex items-center gap-3 px-4 py-3.5">
              <Skeleton className="ring-border h-10 w-10 shrink-0 rounded-full ring-2" />
              <div className="min-w-0 space-y-1.5">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3 w-40 rounded-md" />
              </div>
            </TableCell>
            <TableCell className="px-4 py-3.5">
              <Skeleton className="h-4 w-24 rounded-md" />
            </TableCell>
            <TableCell className="px-4 py-3.5">
              <Skeleton className="h-4 w-20 rounded-md" />
            </TableCell>
            <TableCell className="px-4 py-3.5">
              <Skeleton className="h-4 w-24 rounded-md" />
            </TableCell>
            <TableCell className="px-4 py-3.5">
              <Skeleton className="h-4 w-20 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableCaption className="border-border bg-muted/20 mt-0 border-t px-4 py-4">
        <Pagination className="mx-0 w-full">
          <PaginationContent className="gap-1.5">
            <PaginationItem>
              <Skeleton className="h-9 w-24 rounded-md" />
            </PaginationItem>
            {Array.from({ length: 5 }).map((_, index) => (
              <PaginationItem key={index}>
                <Skeleton className="size-9 rounded-md" />
              </PaginationItem>
            ))}
            <PaginationItem>
              <Skeleton className="h-9 w-20 rounded-md" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TableCaption>
    </Table>
  );
}

export namespace Loading {
  export type Props = {
    isLoading: boolean;
  };
}
