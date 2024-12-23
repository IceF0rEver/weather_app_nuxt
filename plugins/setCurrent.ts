import { useGeolocation, useStorage } from '@vueuse/core';
import type { LocationType } from '@/types/custom-types';

const { coords, error } = useGeolocation();

export default defineNuxtPlugin((nuxtApp) => {
  let data: LocationType = {
    latitude: 50.8504,
    longitude: 4.3488,
    city: '',
    country: '',
    current: true,
  };

  if (error.value === null && coords.value) {
    data.latitude = coords.value.latitude;
    data.longitude = coords.value.longitude;
    
  }

  const current = useStorage<LocationType[]>('current', []);
  current.value.splice(0,1,data);
});