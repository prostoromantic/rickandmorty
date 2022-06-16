import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface State<T> {
  data?: T;
  isLoading?: boolean;
  error?: Error;
}

export default function useRequest<T>(url: string): State<T> {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const getData = useCallback(async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setIsLoading(true);
    try {
      const response = await axios.get(url, {
        cancelToken: source.token,
      });
      setData(response.data);
    } catch (err) {
      setIsLoading(false);
      if (axios.isCancel(err)) {
        console.log('successfully aborted');
      } else {
        setError(err as Error);
      }
    } finally {
      setIsLoading(false);
    }
    return () => {
      source.cancel();
    };
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading, error };
}
