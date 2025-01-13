<template>
    <section v-if="cities" class="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 flex flex-col">
        <h2 class="font-bold text-xl mb-4 dark:text-gray-50">{{$t('title.favorites')}}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Favorite v-for="city in cities" :key="city.city && city.country" :city="city"></Favorite>
        </div>
      </section>
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import type { LocationType } from '@/types/custom-types';

const cities = useStorage<LocationType[]>('cities', []);
</script>