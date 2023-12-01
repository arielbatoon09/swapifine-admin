<script setup lang="ts">
import { useAuthStore } from '../../src/js/adminAuth.js';
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const dropdownOpen = ref(false)
const { isOpen } = useSidebar()

const handleLogout = async () => {
  try {
    const response = await authStore.logout();
    router.push('/login');
  } catch (error) {
    console.error("error logout", error);
  }
};

</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-blue-900">
    <button class="text-gray-500 focus:outline-none lg:hidden" @click="isOpen = true">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </button>
    <div class="container flex flex-row justify-content-end flex items-end justify-end">
      <div @click="handleLogout" class="cursor-pointer flex block text-sm text-gray-700">
        <svg class="w-[18px] h-[18px] mt-1 text-gray-900 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 16 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
        </svg>

        Log out
      </div>
    </div>
  </header>
</template>
