import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "@services/ApiService";

export const usePaginatedData = <DataType>({
  fetchFn,
  paginationType,
}: {
  fetchFn: (page?: number) => Promise<ApiResponse<DataType[]>>;
  paginationType: "add" | "update";
}) => {
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadData = async (page = 1) => {
    setLoading(true);

    const res = await fetchFn(page);

    if (!res.data || res.error) {
      setError(res.error);
    } else {
      setData((prev) => (paginationType === "update" ? res.data : [...prev, ...res.data]));
      setHasNextPage(res.data.length > 0);
    }

    if (initialLoading) {
      setInitialLoading(false);
    }

    setLoading(false);
  };

  const loadNextPage = useCallback(() => {
    if (hasNextPage && !loading) {
      const nextPage = page + 1;

      loadData(nextPage);

      setPage(nextPage);
    }
  }, [hasNextPage, page, loading]);

  const loadPrevPage = useCallback(() => {
    if (hasPrevPage && !loading) {
      const previousPage = page - 1;

      loadData(previousPage);

      setPage(previousPage);
      setHasPrevPage(previousPage > 0);
    }
  }, [hasPrevPage, page, loading]);

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, initialLoading, error, loadNextPage, loadPrevPage };
};
