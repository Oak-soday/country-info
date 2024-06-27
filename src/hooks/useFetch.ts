import {useState, useEffect} from "react";
import axios, {AxiosRequestConfig} from "axios";

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T>(
  url: string,
  options?: AxiosRequestConfig
): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(url, options);
        setData(response?.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {data, loading, error};
};

export default useFetch;
