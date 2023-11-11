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
    <div class="max-w-7xl mx-auto space-y-6">
      <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <form @submit.prevent="register">
          <h3 class="text-gray-700 text-1xl font-medium mb-2">
            Profile Information
          </h3>
          <h6 class="text-xs text-gray-500 font-normal mb-6">
            Updates your account's profile information and email address.
          </h6>
          <div class="profile-container">
            <img
              src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
              alt="">
          </div>
          <div class="mt-4">
            <input type="file" name="" id="">
          </div>
          <div class="grid grid-rows-1 gap-3 mt-4 sm:grid-rows-2">
            <div>
              <label class="text-gray-500 text-sm" for="username">Name</label><br>
              <input
                class="w-6/12 mt-2 border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text">
              <!-- v-model -->
            </div>

            <div>
              <label class="text-gray-500 text-sm" for="emailAddress">Email Address</label><br>
              <input
                class="w-6/12  border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="email">
            </div>

            <div class="flex justify-start">
              <button class="px-6 py-3 font-medium tracking-wide text-white btn-clr-primary rounded-md">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <form @submit.prevent="register">
          <h3 class="text-gray-700 text-1xl font-medium mb-2">
            Update Password
          </h3>
          <h6 class="text-xs text-gray-500 font-normal mb-6">
            Ensure your account is using a long, random password to stay secure.
          </h6>
          <div class="grid grid-rows-1 gap-3 mt-4 sm:grid-rows-2">
            <div>
              <label class="text-gray-500 text-sm" for="password">Current Password</label><br>
              <input
                class="w-6/12 mt-2 border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>
            <div>
              <label class="text-gray-500 text-sm" for="password">Password</label><br>
              <input
                class="w-6/12 mt-2 border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>

            <div>
              <label class="text-gray-500 text-sm" for="passwordConfirmation">Confirm Password</label><br>
              <input
                class="w-6/12 mt-2 border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>
          </div>

          <div class="flex justify-start mt-6">
            <button class="px-6 py-3 font-medium tracking-wide text-white btn-clr-primary rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>

      <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <h3 class="text-gray-700 text-1xl font-medium mb-2">
          Deactivate Account
        </h3>
        <h6 class="text-xs text-gray-500 font-normal mb-6">
          Once your account is deleted, all of its resources and data will be permanently deleted. <br>
          Be reminded that we're not able to restore your account or data once it's deleted.
        </h6>

        <div class="sm:rounded-lg">
          <button class="px-6 py-2 text-white bg-red-600 rounded-md">
            Deactivate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
