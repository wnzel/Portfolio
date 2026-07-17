import { useQuery } from "@tanstack/react-query";

async function fetchNowPlaying() {
  const response = await fetch("/api/spotify", {
    headers: { Accept: "application/json" },
  });

  if (response.status === 204 || !response.ok) return null;

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;

  return response.json();
}

export const useSpotifyNowPlaying = () =>
  useQuery({
    queryKey: ["nowPlaying"],
    queryFn: fetchNowPlaying,
    refetchInterval: 10_000,
  });
