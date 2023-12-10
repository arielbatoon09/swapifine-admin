<script setup lang="ts">
import { useAuthStore } from '../../src/js/adminAuth.js';
import useCookies from 'vue-cookies'
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { createToaster } from "@meforma/vue-toaster";

const router = useRouter();
const authStore = useAuthStore();

const toaster = createToaster({
  position: 'bottom-right',
  duration: 2000,
  maxToasts: 1,
  pauseOnHover: true,
  closeOnClick: true,
  progressBar: true,
  theme: 'default',
  icon: 'info',
  transition: 'fade',

  success: {
    theme: 'success',
    icon: 'check-circle', // Use a success-specific icon
    transition: 'slide-up', // Use a different transition for success toasts
  },

  error: {
    theme: 'error',
    icon: 'exclamation-triangle', // Use an error-specific icon
    transition: 'slide-down', // Use a different transition for error toasts
  },
});

const form = ref({
  email: '',
  password: '',
});

const handleLogin = async () => {
  try {
    
    // Init Form Value
    const { email, password } = form.value;

    // Pass the data argument to login store function
    const response = await authStore.login(email, password);

    // Cancel loading state if the response is true
    if (response.status == 'success') {
      router.push('/dashboard');
      toaster.success(`Successfully logged in`);
    } else {
      toaster.error("Failed to login");
    }

  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  // checkIfLoggedIn();
});

</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex flex-col items-center justify-center gap-3">
        <img src="../assets/img/swapifine-logo.png" width="62" height="62">
        <span class="text-2xl font-bold text-gray-700">Admin Panel</span>
      </div>

      <form class="mt-4" @submit.prevent="handleLogin">
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <input type="email"
          v-model="form.email" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <label class="block mt-3 mb-6">
          <span class="text-sm text-gray-700">Password</span>
          <input type="password"
          v-model="form.password" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <div class="mt-2">
          <button @click="handleLogin"
            class="w-full px-4 py-4 text-sm text-center text-white btn-clr-primary rounded-md">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
