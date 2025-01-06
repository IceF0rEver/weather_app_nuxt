<template>
  <section
    v-if="data"
    class="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 flex flex-col"
  >
    <header class="mb-4">
      <h2 class="font-bold text-xl dark:text-gray-50"> {{t('title.current')}}</h2>
    </header>
    <article
      class="flex items-center justify-between"
    >
      <div>
        <h3 class="text-lg font-semibold dark:text-gray-50">{{ data.name }}</h3>
        <time class="text-sm text-gray-600 dark:text-gray-300" :datetime="data.dt.toString()">
          {{
            new Date(data.dt * 1000).toLocaleTimeString(locale, {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}<br />
          {{
            new Date(data.dt * 1000).toLocaleDateString(locale, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          }}
        </time>
      </div>
      <div class="flex">
        <div class="text-right">
          <p class="text-5xl dark:text-gray-50">{{ data.main.temp.toFixed(0) }}°C</p>
          <p class="text-lg text-gray-600 dark:text-gray-300">{{ data.weather[0].description }}</p>
        </div>
        <div class="ml-2 w-20 h-20 bg-blue-300 rounded-full">
          <img
            :src="
              'https://openweathermap.org/img/wn/' +
              data.weather[0].icon +
              '@2x.png'
            "
          />
        </div>
      </div>
    </article>
    <article class="pt-4">
      <Map />
    </article>
  </section>
</template>
<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import type { LocationType, WeatherApiResponse } from '@/types/custom-types';

const { t, locale } = useI18n();
const { $getCurrent } = useNuxtApp();
const current = useStorage<LocationType[]>('current', []);

const { data } = await $getCurrent<WeatherApiResponse>(
  current.value[0].latitude,
  current.value[0].longitude,
  locale.value
);

if (data.value) {
  current.value[0]['city'] = data.value.name;
  current.value[0]['country'] = data.value.sys.country;

  const currentData: LocationType = {
    latitude: current.value[0].latitude,
    longitude: current.value[0].longitude,
    city: data.value.name,
    country: data.value.sys.country,
    current: false,
  };
  if (current.value.length === 1) {
    current.value.push(currentData);
  } else {
    current.value.splice(1,1,currentData);
  };
};
</script>
