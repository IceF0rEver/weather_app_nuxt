<template>
  <div class="overflow-hidden rounded-lg">
    <div class="relative w-full h-screen max-h-64 mb-[-35px]">
      <div class="relative w-full h-full" ref="mapContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocationType } from '@/types/custom-types';
import { useStorage } from '@vueuse/core';

import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { PrecipitationLayer } from "@maptiler/weather";

const current = useStorage<LocationType[]>('current', []);

const mapContainer = ref<HTMLElement | null>(null);
const map = ref<Map | null>(null);

const runtimeConfig = useRuntimeConfig();
config.apiKey = runtimeConfig.public.API_MAP;
const layer = new PrecipitationLayer();

onMounted(() => {
  if (mapContainer.value && current.value.length > 1) {
    const initialState = {
      lng: current.value[1].longitude,
      lat: current.value[1].latitude,
      zoom: 11,
    };

    const mapInstance = new Map({
      container: mapContainer.value,
      style: MapStyle.DATAVIZ.DEFAULT,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    map.value = mapInstance;

    mapInstance.on('load', () => {
      mapInstance.addLayer(layer);
    });
  }
});

onScopeDispose(() => {
  map.value?.remove();
});
</script>

<style></style>