<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

const dropdownOpen = ref(false)
const { isOpen } = useSidebar()
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-blue-900">
    <div class="container flex flex-row justify-content-end flex items-end justify-end">
      <svg class="w-[18px] h-[18px] text-gray-900 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 16 16">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
      </svg>
      <router-link to="/" class="block text-sm text-gray-700">
        Log out
      </router-link>
    </div>
  </header>
</template>
