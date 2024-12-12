import { useCallback, useState } from 'react'
import axiosInstance from '../service/api/axiosConfigue';
import { AxiosError } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface UseApiProps<T> {
  url: string;
  method: HttpMethod;
  data?: object;
  headers?: object; // More specific type
}

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  apiCall: (payload?: unknown) => Promise<void>;
}

function FetchCall<T>({
  url,
  method = "GET",
  data = {},
  headers = {},
}: UseApiProps<T>): UseApiResponse<T> {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance({ url, method, data, headers })
      setResponseData(response.data)
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      setError(errorMessage);
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [url, method, data, headers])
  return { data: responseData, loading, error, apiCall }
}

export default FetchCall
