import { useState } from "react";

export default function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async (config) => {
    setIsLoading(true);

    const response = await fetch(url, config);

    setIsLoading(false);
    return await response.json();
  };

  return [makeRequest, isLoading];
}
