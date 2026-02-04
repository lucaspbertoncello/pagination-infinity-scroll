type GenerateEllipsisPaginationParams = {
  currentPage: number;
  totalPages: number;
  // numero para exibir paginas de tras e da frente
  // se sorrounding = 2: [1, 2, [3], 4, 5]
  sorroundingPages: number;
};

export function generateEllipsisPagination(params: GenerateEllipsisPaginationParams): Array<string | number> {
  const { totalPages, currentPage, sorroundingPages } = params;
  const pages: Array<string | number> = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;

    const shouldBeInLeft = i >= currentPage - sorroundingPages;
    const shouldBeInRight = i <= currentPage + sorroundingPages;

    const isEllipsisPosition =
      i === currentPage - sorroundingPages - 1 || i === currentPage + sorroundingPages + 1;

    if (isFirstPage || isLastPage || (shouldBeInLeft && shouldBeInRight)) {
      pages.push(i);
    }

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push("...");
    }
  }

  return pages;
}
