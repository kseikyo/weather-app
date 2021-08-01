import { useCallback, useEffect, useState } from 'react';
import { api } from '../api';

export const useCityWeather = searchInput => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityWeather, setCityWeather] = useState('');

  const getCityWeather = useCallback(async () => {
    if (!!!searchInput) {
      return;
    }
    try {
      setLoading(true);
      const result = await api.get(`/weather/${searchInput}`);
      const { data } = result.data;

      setCityWeather(data);
    } catch (err) {
      const { error } = err.response.data.data;
      setError(error);
    }
    setLoading(false);
  }, [setCityWeather, searchInput]);

  useEffect(() => {
    try {
      setError(null);
      const delayDebounceFn = setTimeout(async () => {
        await getCityWeather();
      }, 3000);

      const listener = async event => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
          clearTimeout(delayDebounceFn);
          event.preventDefault();
          await getCityWeather();
        }
      };
      document.addEventListener('keydown', listener);
      return () => {
        document.removeEventListener('keydown', listener);
        clearTimeout(delayDebounceFn);
      };
    } catch (_) {}
  }, [searchInput, getCityWeather]);

  return { data: cityWeather, loading, error, setCityWeather, getCityWeather };
};
