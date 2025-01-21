<template>
  <section class="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5">
    <h2 class="font-bold dark:text-gray-50 text-xl mb-4">{{$t('title.hourly')}}</h2>
    <div>
      <div class=" bg-white rounded-lg p-1 pr-7 py-4 overflow-x-auto">
        <LineChart
          class="h-72 min-w-[520px] sm:min-w-1/3"
          :data="itemsChart"
          index="dt"
          :categories="['temp']"
          :colors="['#808080']"
          :show-legend="false"
          :show-x-axis="false"
          :show-tooltip="false"
        />
        <div class="flex justify-between ml-6 min-w-[500px] sm:min-w-1/3">
          <div v-for="item in items" :key="item.dt"> 
            <div class="flex content-center justify-center">
              <p class="text-xs  text-black">{{ 
                new Date(item.dt * 1000).toLocaleTimeString(locale, { hour: '2-digit'})
                }}</p>
            </div>
            <div class="bg-blue-300 rounded-lg">
              <NuxtImg
              class="mx-auto" 
              :src="`https://openweathermap.org/img/wn/${item.icon}@4x.png`"
              alt="weather icon"
              :width="40"
              :height="40"
              />
              <div class="flex content-center justify-center px-1">
                <Icon name="ic:twotone-water-drop" class="text-black" size="15" />
                <p class="text-xs pb-2 text-black">{{ item.humidity }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line';
import { useStorage } from '@vueuse/core';
import type { LocationType, WeatherApiResponse, WeatherData, WeatherDataHourly } from '@/types/custom-types';

const { locale } = useI18n();
const { $getByCoord } = useNuxtApp();
const current = useStorage<LocationType[]>('current', []);

const { data } = await $getByCoord<WeatherApiResponse>(
  current.value[1].latitude,
  current.value[1].longitude,
  locale.value
);

const list = data.value?.list as WeatherApiResponse;
const items = ref<WeatherData[]>([]);
const itemsChart = ref<WeatherDataHourly[]>([]);

list.slice(0,10).forEach((item: WeatherApiResponse) => {
  items.value.push({
    dt: item.dt,
    temp_min: Number(item.main.temp_min.toFixed(0)),
    temp_max: Number(item.main.temp_max.toFixed(0)),
    humidity: item.main.humidity.toFixed(0),
    icon: item.weather[0].icon,
  });
  itemsChart.value.push({
    dt : item.dt,
    temp: Number(item.main.temp_max.toFixed(0)),
  });
});

</script>