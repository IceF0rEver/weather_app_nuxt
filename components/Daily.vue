<template>
  <section class="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5">
    <h2 class="font-bold dark:text-gray-50 text-xl mb-4">{{$t('title.daily')}}</h2>
    <div>
      <div class=" bg-white rounded-lg p-1 pr-7 py-4 overflow-x-auto">
        <LineChart
          class="h-72 min-w-[420px] sm:min-w-1/3"
          :data="itemsChart"
          index="dt"
          :categories="['temp_min','temp_max']"
          :colors="['#00BFFF','#FF4500']"
          :show-legend="false"
          :show-x-axis="false"
          :show-tooltip="false"
        />
          <div class="flex justify-between ml-6 min-w-[400px] sm:min-w-1/3">
            <div v-for="item in items":key="item.dt">
            <div class="flex content-center justify-center">
              <time class="text-xs  text-black">
                {{ 
                new Date(Number(item.dt) * 1000).toLocaleDateString(locale, { weekday: 'short' })
                }}
              </time>
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
import type { LocationType, WeatherApiResponse, WeatherData, WeatherDataMinAndMax } from '@/types/custom-types';

const { locale } = useI18n();
const { $getByCoord } = useNuxtApp();
const current = useStorage<LocationType[]>('current', []);


const items = ref<WeatherData[]>([]);
const itemsChart = ref<WeatherDataMinAndMax[]>([]);
const dailyData: Record<number, WeatherData> = {};

const { data } = await $getByCoord<WeatherApiResponse>(
  current.value[1].latitude,
  current.value[1].longitude,
  locale.value
);

const list = data.value?.list as WeatherApiResponse;

list.forEach((item: WeatherApiResponse) => {
  const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0);
  if (!dailyData[date]) {
    dailyData[date] = {
      dt: item.dt,
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
    dt: day.dt,
    temp_min: Number(day.temp_min.toFixed(0)),
    temp_max: Number(day.temp_max.toFixed(0)),
    humidity: day.humidity,
    icon: day.icon,
  });
  itemsChart.value.push({
    dt: day.dt,
    temp_max: Number(day.temp_max.toFixed(0)),
    temp_min: Number(day.temp_min.toFixed(0)),
  });
});
</script>