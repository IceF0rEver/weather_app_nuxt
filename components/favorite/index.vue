    <template>
    <div v-if="data" class="bg-white hover:bg-blue-500 hover:text-white shadow rounded-lg p-1 flex justify-between items-center">
        <NuxtLink to="/" @click="handleClick(city.latitude, city.longitude, city.city, city.country)">
        <div>
            {{ city.city }}, {{ city.country }} - {{ data.main.temp.toFixed(0)}}°C
        </div>
        </NuxtLink>
        <div>
        <button
            @click="removeOneFavorite(city.city, city.country)"
            class="bg-red-500 hover:bg-red-700 text-white p-1 rounded-sm focus:shadow-outline flex items-center justify-center"
        >
            <Icon name="akar-icons:cross" class="text-white" size="25" />
        </button>
        </div>
    </div>
    </template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import type { LocationType } from '@/types/custom-types';

const { locale } = useI18n();
const { $getCurrent } = useNuxtApp();
const current = useStorage<LocationType[]>('current', []);
const cities = useStorage<LocationType[]>('cities', []);


const props = defineProps<{
    city: LocationType;
}>();

const { data } = await $getCurrent(
    props.city.latitude,
    props.city.longitude,
    locale.value
);

const removeOneFavorite = (city : string, country : string) => {
    cities.value.splice(cities.value.findIndex((item) => item.city === city && item.country === country), 1);
};

const handleClick = (latitude : number, longitude : number, city : string, country : string) => {
    const currentData: LocationType = {
        latitude: latitude,
        longitude: longitude,
        city: city,
        country: country,
        current: false,
    };
    current.value.splice(1,1,currentData);
};
</script>
