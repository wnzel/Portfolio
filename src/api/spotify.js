import { useQuery } from "@tanstack/react-query";

const fetchSpotifyToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_SPOTIFY_CLIENT}:${
          import.meta.env.VITE_SPOTIFY_SECRET
        }`
      )}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  return data.access_token;
};

const fetchNowPlaying = async (token) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 204 || response.status > 400) {
    return null;
  }
  return response.json();
};

export const useSpotifyNowPlaying = () => {
  const { data: token } = useQuery({
    queryKey: ["spotifyToken"],
    queryFn: fetchSpotifyToken,
    staleTime: 3600 * 1000,
  });

  return useQuery({
    queryKey: ["nowPlaying", token],
    queryFn: () => fetchNowPlaying(token),
    enabled: !!token,
    refetchInterval: 5000,
  });
};
