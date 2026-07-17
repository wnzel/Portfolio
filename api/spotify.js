import process from "node:process";
import { Buffer } from "node:buffer";

let cachedToken = null;
let tokenExpiresAt = 0;

function getCredentials() {
  return {
    clientId:
      process.env.SPOTIFY_CLIENT || process.env.VITE_SPOTIFY_CLIENT || "",
    clientSecret:
      process.env.SPOTIFY_SECRET || process.env.VITE_SPOTIFY_SECRET || "",
    refreshToken:
      process.env.SPOTIFY_REFRESH_TOKEN ||
      process.env.VITE_SPOTIFY_REFRESH_TOKEN ||
      "",
  };
}

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

  const { clientId, clientSecret, refreshToken } = getCredentials();
  if (!clientId || !clientSecret || !refreshToken) return null;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed with ${response.status}.`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + Math.max((data.expires_in || 3600) - 60, 60) * 1000;
  return cachedToken;
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "private, no-store");

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    const token = await getAccessToken();
    if (!token) return response.status(204).end();

    const spotifyResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (spotifyResponse.status === 204) return response.status(204).end();
    if (!spotifyResponse.ok) {
      throw new Error(`Spotify now-playing request failed with ${spotifyResponse.status}.`);
    }

    const data = await spotifyResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    console.error("Unable to load Spotify now playing:", error);
    return response.status(502).json({ error: "Unable to load Spotify now playing." });
  }
}
