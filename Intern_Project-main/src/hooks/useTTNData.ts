import { useEffect, useState } from 'react';

export function useTTNData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchLatest = async () => {
      const res = await fetch('/api/ttn/latest');
      const json = await res.json();
      setData(json);
    };
    fetchLatest();
    const interval = setInterval(fetchLatest, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  return data;
}