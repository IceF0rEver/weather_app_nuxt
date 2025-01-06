<template>
  <div class=" flex flex-col dark:bg-gray-800 bg-gray-300">
    <!-- <div class="absolute w-full h-full dark:bg-black dark:opacity-50"></div> -->
    <div class="flex flex-col px-4 gap-4">
      <!-- Météo instantanée -->
      <Current/>
      
      <!-- Prévisions par tranches de 1 heures -->
      <Hourly/>
      
      <!-- Prévisions pour les jours suivants -->
      <!-- <Daily/> -->

      <div class="mx-auto">
      <!-- <NuxtLink to="/favorites">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white h-16 w-16 leading-3 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl"
        >
        <Icon name="pajamas:file-addition-solid" class="text-gray-100" size="35" />
        </button>
      </NuxtLink> -->
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped></style>
