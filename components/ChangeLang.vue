<template>
    <div class="flex flex-row items-center">
      <form>
            <select v-model="locale" class="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>  
      </form>
    </div>
  </template>
  
  <script setup>  
  const { locale } = useI18n();
  </script>
  