import { ApiResponse } from "@services/ApiService";
import { useEffect, useState } from "react";

export const useData = <DataType>({
  fetchFn,
}: {
  fetchFn: () => Promise<ApiResponse<DataType>>;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<DataType>();

  const loadData = async () => {
    if (!loading) {
      setLoading(true);
    }

    const res = await fetchFn();

    if (!res.data || res.error) {
      setError(res.error);
    } else {
      setData(res.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, error, loading };
};
