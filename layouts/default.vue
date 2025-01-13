<template>
  <div class="flex flex-row justify-between items-center px-4 py-2 gap-4">
    <div class="flex gap-4">
      <ChangeLang />
      <DarkMode />
    </div>
    <div v-if="showIcon" class="flex items-center pt-2">
      <NuxtLink :to="localePath('index')">
        <Icon name="akar-icons:cross" class="text-black dark:text-white" size="25" />
      </NuxtLink>
    </div>
  </div>
  <slot />
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const route = useRoute()

const showIcon = computed(() => route.path === localePath('favorites'))
</script>
