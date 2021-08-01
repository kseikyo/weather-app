import { useCallback, useEffect, useState } from 'react';
import { api } from '../api';

export const useLatestSearched = ({ maxNumber = 5, searchInput }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [latestSearched, setLatestSearched] = useState([]);

  const getLatestSearched = useCallback(async () => {
    try {
      setLoading(true);
      const result = await api.get('/weather', {
        params: { max: maxNumber },
      });
      const { data } = result.data;

      setLatestSearched(data);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, [setLatestSearched, maxNumber]);

  useEffect(() => {
    try {
      setError(null);
      const delayLatestSearch = setTimeout(async () => {
        await getLatestSearched();
      }, 3000);

      const listener = async event => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
          clearTimeout(delayLatestSearch);
          event.preventDefault();
          await getLatestSearched();
        }
      };
      document.addEventListener('keydown', listener);
      return () => {
        document.removeEventListener('keydown', listener);
        clearTimeout(delayLatestSearch);
      };
    } catch (_) {}
  }, [searchInput, getLatestSearched]);

  return { data: latestSearched, loading, error, getLatestSearched };
};
