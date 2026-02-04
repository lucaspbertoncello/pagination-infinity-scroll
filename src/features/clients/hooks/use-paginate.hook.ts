import { useEffect, useState } from "react";

export function usePaginate({ initialPage = 1 }: usePaginate.Params) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);

  function handleNextPage() {
    setCurrentPage((prev) => prev + 1);
  }

  function handlePrevPage() {
    setCurrentPage((prev) => prev - 1);
  }

  function handleSetPage(page: number) {
    if (typeof page !== "number") {
      return;
    }

    setCurrentPage(page);
  }

  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  useEffect(() => {
    // a melhor abordagem para manipular urls seria com a classe
    // ela ja separa todos as caracteristicas de uma URL automaticamente, como search params (query)
    // origin, host, href, pathName, port, protocol, etc

    // aqui criamos um objeto de URL para termos as devidas trativas
    const url = new URL(window.location.href);
    // definimos os query params
    url.searchParams.set("page", currentPage.toString());

    // criamos uma url nova concatenando tudo
    const newUrl = url.origin + url.pathname + "?" + url.searchParams;

    // setamos ela no navegador em real-time devido ao effect
    window.history.replaceState({}, "", newUrl);
  }, [currentPage]);

  return {
    currentPage,
    isLastPage,
    isFirstPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
    handleSetPage,
    setTotalPages,
  };
}

export namespace usePaginate {
  export type Params = { initialPage: number };
}
