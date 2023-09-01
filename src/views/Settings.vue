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
    PROFILE/SETTINGS
  </h3>
  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
      <div class="flex flex-col items-center sm:p-8 bg-white shadow sm:rounded-lg">
        <div class="profile-container">
          <img
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="" class="p-4">
        </div>
        <div class="ml-14 mb-5">
          <input type="file" name="" id="">
        </div>
      </div>

      <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <form @submit.prevent="register">
          <h3 class="text-gray-700 text-1xl font-medium">
          Profile Information
        </h3>
        <h6 class="text-xs text-gray-500 font-normal mb-6">
          Updates your account's profile information and email address
        </h6>
          <div class="grid grid-rows-1 gap-6 mt-4 sm:grid-rows-2">
            <div>
              <label class="text-gray-500 text-sm" for="username">Username</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text">
              <!-- v-model -->
            </div>

            <div>
              <label class="text-gray-500 text-sm" for="emailAddress">Email Address</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="email">
            </div>

            <div>
              <label class="text-gray-500 text-sm" for="password">Password</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>

            <div>
              <label class="text-gray-500 text-sm" for="passwordConfirmation">Password Confirmation</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button
              class="px-6 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- <div class="flex mb-3">
    <div class="w-1/3 h-12">

    </div>
    <div class="w-1/4 h-12">

    </div>
    <div class="w-1/2 h-12">

    </div>
  </div>
  <div class="flex mb-4">
    <div class="w-1/3 h-12">
      <div class="p-6 bg-white rounded-md shadow-mds">
        <div class="p-6">
          <div class="">
            <img src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80" alt="" height="50" width="50" class="rounded-full">
          </div>
          <div>
            <input type="file" name="" id="">
          </div>
        </div>
      </div>
    </div>

    <div class="w-1/6 h-12"></div>

    <div class="w-1/2 h-12">
      <div class="p-6 bg-white rounded-md shadow-md">
        <form @submit.prevent="register">
          <div class="grid grid-rows-1 gap-6 mt-4 sm:grid-rows-2">
            <div>
              <label class="text-gray-700" for="username">Username</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text">
            </div>
            need-V-model

            <div>
              <label class="text-gray-700" for="emailAddress">Email Address</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="email">
            </div>

            <div>
              <label class="text-gray-700" for="password">Password</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>

            <div>
              <label class="text-gray-700" for="passwordConfirmation">Password Confirmation</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button
              class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div> -->
</template>
