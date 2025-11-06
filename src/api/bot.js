const fetchServerStatus = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_RAMEN_GAMES_URL}/servers`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch servers");
  }

  return response.json();
};

export const useServers = () => {
  return {
    queryKey: ["servers"],
    queryFn: fetchServerStatus,
    staleTime: 60 * 1000 * 30,
    refetchInterval: 60 * 1000 * 30,
    retry: 1,
  };
};
