import type { WeatherApiResponse } from '@/types/custom-types';

export default defineNuxtPlugin(() => {
  const apiKey = useRuntimeConfig().public.API_KEY;

  const getCurrent = async(latitude: number, longitude: number, lang: string) => {
    const { data } = await useFetch<WeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`
    );
    return { data : data.value };
  };

  const getByCoord = async (latitude: number, longitude: number, lang: string) => {
    const { data } = await useFetch<WeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`
    );
    return { data : data.value };
  };

  const getByLocation = async (country: string, lang: string) => {
    const { data } = await useFetch<WeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&lang=${lang}&units=metric`
    );
    return { data : data.value };
  };

  return {
    provide: {
      getCurrent,
      getByCoord,
      getByLocation,
    },
  };
});
