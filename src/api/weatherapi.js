const fetchWeatherData = async () => {
  const token = import.meta.env.VITE_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${token}&q=phoenix`
  );

  if (!response.ok) {
    throw new Error("Weather data fetch failed");
  }

  return response.json();
};

export const useWeatherData = () => {
  return {
    queryKey: ["weatherData"],
    queryFn: fetchWeatherData,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  };
};
