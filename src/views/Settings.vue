<script setup lang="ts">
import { ref } from 'vue'

interface User {
  fullname: string
  email: string
  oldPassword: string
  newPassword: string
}

const user = ref<User>({
  fullname: '',
  email: '',
  oldPassword: '',
  newPassword: '',
})

function register() {
  const data = JSON.parse(JSON.stringify(user.value))
  // eslint-disable-next-line no-console
  console.log('Registered: ', data)
}
</script>
<template>
  <h3 class="text-gray-700 text-3xl font-medium">
    Settings
  </h3>
  <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-gray-700 text-3xl font-medium">
            EDIT PROFILE
          </h2>

          <form @submit.prevent="register">
            <div class="row mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="username">Fullname</label>
                <!-- <input
                  v-model="user.username"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                > -->
              </div>

              <div>
                <label class="text-gray-700" for="emailAddress">Email</label>
                <!-- <input
                  v-model="user.email"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="email"
                > -->
              </div>

              <div>
                <label class="text-gray-700" for="password">Old Password</label>
                <!-- <input
                  v-model="user.password"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="password"
                > -->
              </div>

              <div>
                <label class="text-gray-700" for="passwordConfirmation">New Password</label>
                <!-- <input
                  v-model="user.confirm"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="password"
                > -->
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Done
              </button>
            </div>
          </form>
        </div>
</template>
