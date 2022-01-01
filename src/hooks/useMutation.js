import { useState } from "react";

export default function useMutation(queryURL) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData(options = {}) {
    try {
      setLoading(true);
      const response = await fetch(queryURL, options);
      const dataResponse = await response.json();

      if (dataResponse.error || dataResponse.statusText === "Bad Request") {
        setError(dataResponse || dataResponse.error);
      } else {
        setData(dataResponse);
      }
      return dataResponse;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return [getData, { data, loading, error }];
}
