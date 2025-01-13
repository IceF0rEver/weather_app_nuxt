<template>
  <div class="mx-auto min-h-screen flex flex-col dark:bg-gray-800 bg-gray-300">
      <div class="">
        <NuxtLink to="/">
          <Icon name="akar-icons:cross" class="text-black dark:text-white" size="25" />
        </NuxtLink>
      </div>
    <div class="flex flex-col px-4 gap-4">
      <!-- Formulaire d'ajout de localisation -->
      <AddFrom/>

      <!-- Liste des localisations favorites -->
      <!-- <FavoritesList></FavoritesList> -->
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped></style>
