    <template>
    <section
        v-if="data"
        class="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 flex flex-col"
    >
        <header class="mb-4">
        <h2 class="font-bold text-xl dark:text-gray-50"> {{$t('title.current')}}</h2>
        </header>
        <article
        class="flex items-center justify-between"
        >
        <div>
            <h3 class="text-sm sm:text-lg font-semibold dark:text-gray-50">{{ data.name }}</h3>
            <time class="text-xs sm:text-sm text-gray-600 dark:text-gray-300" :datetime="data.dt.toString()">
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
        <div class="flex gap-2">
            <div class="text-right my-auto">
            <p class="text-2xl sm:text-5xl dark:text-gray-50">{{ data.main.temp.toFixed(0) }}°C</p>
            <p class="text-sm sm:text-lg text-gray-600 dark:text-gray-300">{{ data.weather[0].description }}</p>
            </div>
            <div class="my-auto w-2/3 sm:w-full">
            <NuxtImg
                class="mx-auto my-auto bg-blue-300 rounded-full"
                :src="
                'https://openweathermap.org/img/wn/' +
                data.weather[0].icon +
                '@2x.png'
                "
                :width="100"
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

const { locale, } = useI18n();
const { $getCurrent } = useNuxtApp();
const current = useStorage<LocationType[]>('current', []);

const data = ref();

const fetchData = async () => {
    const {data : weatherData} = await $getCurrent(
        current.value[1].latitude,
        current.value[1].longitude,
        locale.value
    );

    if (weatherData) {
        data.value = weatherData;
        current.value[1]['city'] = data.value?.name;
        current.value[1]['country'] = data.value.sys.country;

        const currentData: LocationType = {
            latitude: current.value[1].latitude,
            longitude: current.value[1].longitude,
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
};
fetchData();

watch(locale, () => {
    fetchData();
});
</script>
