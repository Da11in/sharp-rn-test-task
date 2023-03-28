import axios, { AxiosError, AxiosRequestConfig } from "axios";

type ServerResponse<T> = {
  message: string;
  data: T;
};

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status?: number;
};

const errorResponse = (err: AxiosError): ApiResponse<null> => ({
  data: null,
  error: err.message,
  status: err.status,
});

export const ApiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const {
        data: { data },
        status,
      } = await axios.get<ServerResponse<T>>(url, config);

      return { data, error: null, status };
    } catch (err) {
      return errorResponse(err);
    }
  },
  post: () => {},
  put: () => {},
  delete: () => {},
};
