<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('swapifine.zhen@mail.com')
const password = ref('@#!@#asdf1231!_!@#')

function login() {
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex flex-col items-center justify-center gap-3">
        <img src="../assets/img/swapifine-logo.png" width="62" height="62">
        <span class="text-2xl font-semibold text-gray-700">Swapifine Admin Panel</span>
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <input
            v-model="email"
            type="email"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          >
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            v-model="password"
            type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          >
        </label>

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox" class="text-gray-800 border-gray-200 rounded-md focus:border-gray-600 focus:ring focus:ring-opacity-40 focus:ring-gray-500">
              <span class="mx-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>
        </div>

        <div class="mt-2">
          <button
            type="submit"
            class="w-full px-4 py-4 text-sm text-center text-white btn-clr-primary rounded-md"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
