import { useState } from 'react';

export default function useMutation(queryURL) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function getData(options = {}) {
    console.log(queryURL, options, "FROM HOOK DATA");
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { response } = await fetch(queryURL, options);
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }

  return [ getData, { data, loading, error }];
}
/**
 * 
 *  const { response } = await fetch(queryURL, { 
          method: type,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
         });
 */