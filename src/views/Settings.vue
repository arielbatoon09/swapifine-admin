<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../js/adminAuth.js';
import { useRouter } from 'vue-router';
import { createToaster } from "@meforma/vue-toaster";
import { restElement } from '@babel/types';

const authStore = useAuthStore();
const data = ref([]);
const router = useRouter();
const isRequest = ref(false);
const fullnameUpdate = ref(false);
const delRequest = ref(false);

const form = ref({
  fullname: null,
  current_password: null,
  new_password: null,
  confirm_password: null,
});

const reloadAndRedirect = () => {
  // Reload the current page
  location.reload();

  // Redirect to the login page after reloading
  window.location.href = '/login'; // Replace '/login' with the actual URL of your login page
};

const toaster = createToaster({
  position: 'bottom-right',
  duration: 3000,
  maxToasts: 1,
  pauseOnHover: true,
  closeOnClick: true,
  progressBar: true,
  theme: 'default',
  icon: 'info',
  transition: 'fade',

  success: {
    theme: 'success',
    icon: 'check-circle',
    transition: 'slide-up',
  },

  error: {
    theme: 'error',
    icon: 'exclamation-triangle',
    transition: 'slide-down',
  },
});

const fetchData = async () => {
  try {
    const response = await axios.get('api/admin/getDetails');
    form.value.fullname = response.data.fullname;

  } catch (error) {
    console.error("Error fetching data", error);
  }
}

const handleProfileInfoUpdate = async () => {
  try {
    fullnameUpdate.value = true;
    const response = await axios.post('api/admin/updateBasic', {
      fullname: form.value.fullname,
    });

    fullnameUpdate.value = false;

    if (response.data.status === 'success') {
      toaster.success(`Successfully updated Profile Information`);
    } else {
      toaster.error(`Error updating Profile Information`);
    }

  } catch (error) {
    toaster.error(`Error updating Profile Information`);
    console.error('Error updating data', error);
  }
}


const updatePassword = async () => {
  try {
    isRequest.value = true;

    const { current_password, new_password, confirm_password } = form.value;

    const response = await axios.post('api/admin/changePassword', {
      current_password: current_password,
      new_password: new_password,
      confirm_password: confirm_password,
    });

    isRequest.value = false;

    if (response.data.status === 'success') {
      authStore.logout();
      router.push('/login');
      toaster.success(`Successfully updated Password`);
      location.reload();
    } else {
      toaster.error(`Failed to update Password`);
    }

    
  } catch (error) {
    toaster.error(`Failed to update Password`);
    console.error('Error updating data', error)
  }
}


const handleDeleteAccount = async () => {
  try {
    delRequest.value = true;

    const response = await axios.post('api/admin/deleteAdmin', authStore.logout());

    delRequest.value = false;

    if (response.data.status === "success") {
      router.push('/login');
      toaster.success(`Successfully deleted account`);
    } else {
      toaster.error(`Error delete account`);
    }
  } catch (error) {
    toaster.error(`Error delete account`);
    console.error("Erro deleting data", error);
  }
}

onMounted(() => {
  fetchData();
});



// function register() {
//   const data = JSON.parse(JSON.stringify(user.value))
//   // eslint-disable-next-line no-console
//   console.log('Registered: ', data)
// }
</script>
<template>
  <h3 class="text-gray-700 text-3xl font-medium">
    PROFILE/SETTINGS
  </h3>
  <div class="py-7">
    <div class="max-w-7xl mx-auto space-y-6">
      <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <div>
          <h3 class="text-gray-700 text-1xl font-medium mb-2">
            Profile Information
          </h3>
          <h6 class="text-xs text-gray-500 font-normal mb-6">
            Updates your account's profile information and email address.
          </h6>
          <div class="grid grid-rows-1 gap-3 mt-4 sm:grid-rows-2">
            <div>
              <label class="text-gray-500 text-sm">Fullname</label><br>
              <input v-model="form.fullname"
                class="w-full lg:w-6/12 mt-2 border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text">
            </div>
            <div>
              <button v-if="!fullnameUpdate" @click="handleProfileInfoUpdate"
                class="py-4 px-6 font-medium tracking-wide text-white btn-clr-primary rounded-md">
                Save
              </button>
              <button v-else disabled @click="handleProfileInfoUpdate"
                class="py-4 px-6 font-medium tracking-wide text-white btn-clr-primary rounded-md">
                Saving
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <div>
          <h3 class="text-gray-700 text-1xl font-medium mb-2">
            Update Password
          </h3>
          <h6 class="text-xs text-gray-500 font-normal mb-6">
            Ensure your account is using a long, random password to stay secure.
          </h6>
          <div class="grid grid-rows-1 gap-3 mt-4 sm:grid-rows-2">
            <div>
              <label class="text-gray-500 text-sm" for="password">Current Password</label><br>
              <input v-model="form.current_password"
                class="w-full lg:w-6/12 mt-2 border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>
            <div>
              <label class="text-gray-500 text-sm" for="password">Password</label><br>
              <input v-model="form.new_password"
                class="w-full lg:w-6/12 mt-2 border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>

            <div>
              <label class="text-gray-500 text-sm" for="passwordConfirmation">Confirm Password</label><br>
              <input v-model="form.confirm_password"
                class="w-full lg:w-6/12 m5 mt-2 border-gray-700 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password">
            </div>
          </div>

          <div class="flex justify-start mt-6">
            <button v-if="!isRequest" @click="updatePassword"
              class="px-6 py-3 font-medium tracking-wide text-white btn-clr-primary rounded-md">
              Save
            </button>
            <button v-else disabled @click="updatePassword"
              class="px-6 py-3 font-medium tracking-wide text-white btn-clr-primary rounded-md">
              Saving
            </button>
          </div>
        </div>
      </div>

      <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <h3 class="text-gray-700 text-1xl font-medium mb-2">
          Delete Account
        </h3>
        <h6 class="text-xs text-gray-500 font-normal mb-6">
          Once your account is deleted, all of its resources and data will be permanently deleted. <br>
          Be reminded that we're not able to restore your account or data once it's deleted.
        </h6>

        <div class="sm:rounded-lg">
          <button v-if="!delRequest" @click="handleDeleteAccount" class="px-6 py-2 text-white bg-red-600 rounded-md">
            Delete
          </button>
          <button v-else disabled @click="handleDeleteAccount" class="px-6 py-2 text-white bg-red-600 rounded-md">
            Deleting Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
