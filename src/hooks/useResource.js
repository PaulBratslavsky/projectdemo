import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useResource(resourceURL) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(resourceURL);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  } , [resourceURL]);

  return { data, loading, error };

}