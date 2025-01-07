<template>
  <section class="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5">
    <h2 class="font-bold dark:text-gray-50 text-xl mb-4">{{t('title.daily')}}</h2>
    <div>
      <div class=" bg-white rounded-lg p-1 pr-7 py-4">
        <LineChart
          class="h-72"
          :data="itemsChart"
          index="dt"
          :categories="['TempératureMin','TempératureMax']"
          :colors="['#00BFFF','#FF4500']"
          :show-legend="false"
          :show-x-axis="false"
        />
          <div class="flex justify-between ml-6">
            <div v-for="item in items":key="item.dt">
            <div class="flex content-center justify-center">
              <p class="text-xs  text-black">{{ item.dt }}</p>
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
import type { LocationType, WeatherApiResponse, WeatherData, WeatherDataDailyChart } from '@/types/custom-types';

const { t, locale } = useI18n();
const { $getByCoord } = useNuxtApp();
const current = useStorage<LocationType[]>('current', []);

const { data } = await $getByCoord<WeatherApiResponse>(
  current.value[0].latitude,
  current.value[0].longitude,
  locale.value
);

const list = data.value?.list as WeatherApiResponse;
const items = ref<WeatherData[]>([]);
const itemsChart = ref<WeatherDataDailyChart[]>([]);
const dailyData: Record<number, WeatherData> = {};

list.forEach((item: WeatherApiResponse) => {
  const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0);
  if (!dailyData[date]) {
    dailyData[date] = {
      dt: item.dt.toString(),
      temp_min: Number(item.main.temp_min.toFixed(0)),
      temp_max: Number(item.main.temp_max.toFixed(0)),
      humidity: item.main.humidity.toFixed(0),
      icon: item.weather[0].icon,
    };
  } else {
    dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min);
    dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
  }
});

Object.values(dailyData).forEach((day) => {
  items.value.push({
    dt: new Date(Number(day.dt) * 1000).toLocaleDateString(locale.value, { weekday: 'short' }),
    temp_min: Number(day.temp_min.toFixed(0)),
    temp_max: Number(day.temp_max.toFixed(0)),
    humidity: day.humidity,
    icon: day.icon,
  });
  itemsChart.value.push({
    dt: new Date(Number(day.dt) * 1000).toLocaleDateString(locale.value, { weekday: 'long' }),
    TempératureMax: Number(day.temp_max.toFixed(0)),
    TempératureMin: Number(day.temp_min.toFixed(0)),
  });
});
</script>