<template>
  <div class="flex flex-row px-4 py-2 gap-4">
    <ChangeLang/>
    <DarkMode/>
  </div>
  <slot />
</template>

<script lang="ts">
import { useGeolocation } from '@vueuse/core'
const { coords } = useGeolocation()
console.log(coords);
// window.addEventListener('beforeunload', function () {
//     localStorage.removeItem('current');
// });
// window.addEventListener('unload', function () {
//     localStorage.removeItem('current');
// });
</script>