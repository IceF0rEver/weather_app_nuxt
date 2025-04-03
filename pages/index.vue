<template>
    <div class=" flex flex-col dark:bg-gray-800 bg-gray-300">
        <div class="flex flex-col px-4 gap-4">
            <Current/>
            <Hourly/>
            <Daily/>
            <div class="mx-auto">
                <NuxtLink :to="localePath('favorites')">
                    <button
                    class="bg-blue-500 hover:bg-blue-700 text-white h-16 w-16 leading-3 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl"
                    >
                        <Icon name="pajamas:file-addition-solid" class="text-gray-100" size="35" />
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath()
</script>