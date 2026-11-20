import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/format';

export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    Promise.resolve()
      .then(fetcher)
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) {
          setData(null);
          setError(getErrorMessage(err));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [...deps, tick]);

  const reload = useCallback(() => setTick((value) => value + 1), []);

  return { data, loading, error, reload };
}

export function useMutation(action) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async (...args) => {
    setLoading(true);
    setError('');
    try {
      return await action(...args);
    } catch (err) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { run, loading, error, setError };
}
