export default defineNuxtPlugin(() => {
  const apiKey = useRuntimeConfig().public.API_KEY;

  const getCurrent = <T>(latitude: number, longitude: number, lang: string) => {
    return useFetch<T>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`
    );
  };

  const getByCoord = <T>(latitude: number, longitude: number, lang: string) => {
    return useFetch<T>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`
    );
  };

  const getByLocation = <T>(country: string, lang: string) => {
    return useFetch<T>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&lang=${lang}&units=metric`
    );
  };

  return {
    provide: {
      getCurrent,
      getByCoord,
      getByLocation,
    },
  };
});
