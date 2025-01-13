<template>
  <section class="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 flex flex-col">
    <h2 class="font-bold text-xl mb-4 dark:text-gray-50">{{$t('title.addLocation')}}</h2>
    <form @submit.prevent="setNewCity">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300" for="location">
          {{$t('label.addLocation')}}
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          type="text"
          placeholder="Paris, France"
          v-model="newCity"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
        {{$t('button.add')}}
        </button>
        <button 
          @click="setCurrentToCities"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {{$t('button.addCurrentLocation')}}
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import type { LocationType, WeatherApiResponse } from '@/types/custom-types';

const { locale } = useI18n();
const { $getByLocation } = useNuxtApp();
const current = useStorage<LocationType[]>('current', []);
const cities = useStorage<LocationType[]>('cities', []);

const newCity = ref();

const setNewCity = async () => {
  try {
    const { data : cityData } = await $getByLocation<WeatherApiResponse>(
      newCity.value,
      locale.value
    );
    if (cityData.value){
      const data: LocationType = {
      latitude: cityData.value.city.coord.lat,
      longitude: cityData.value.city.coord.lon,
      city: cityData.value.city.name,
      country: cityData.value.city.country,
      current: false,
      };
      if (!cities.value.some((item : LocationType) => item.city === data.city && item.country === data.country) && data.city != "") {
        cities.value.push(data);
      }
    }
  } catch (error : any) {
    console.error(error.message);
  }
};

const setCurrentToCities = () =>{
  if (!cities.value.some((item : LocationType) => item.city === current.value[0].city && item.country ===  current.value[0].country) && current.value[0].city != "") {
        cities.value.push(current.value[0]);
      }
}
</script>

