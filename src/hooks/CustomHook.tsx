// import { useCallback, useState } from 'react'
// import axiosInstance from '../service/api/axiosConfigue';
// import { AxiosError } from "axios";

// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface UseApiProps<T> {
//   url: string;
//   method: HttpMethod;
//   headers?: object;
// }

// interface UseApiResponse<T> {
//   data: T | null;
//   loading: boolean;
//   apiError: string | null;
//   apiCall: (payload?: unknown) => Promise<T | null>;
// }

// function FetchCall<T>({
//   url,
//   method,
//   headers,
// }: UseApiProps<T>): UseApiResponse<T> {
//   const [responseData, setResponseData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState<string | null>(null);

//   const apiCall = useCallback(async (data?: unknown) => {
//     setLoading(true);
//     setApiError(null);

//     try {
//       const response = await axiosInstance({
//         url,
//         method,
//         data,
//         headers
//       });

//       setResponseData(response.data);
//       return response.data;
//     } catch (error) {
//       alert("in here")
//       let errorMessage = "An unknown error occurred";
//       console.log(error)
//       if (error instanceof AxiosError) {
//         if (error.response) {
//           setApiError(error.response.data.message);
//           errorMessage = error.response.data.message || "Server error";
//         } else if (error.request) {
//           errorMessage = "Network error. Please check your connection.";
//         }
//       }

//       setApiError(errorMessage);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   }, [headers, method, url]);

//   return { data: responseData, loading, apiError, apiCall };
// }

// export default FetchCall;