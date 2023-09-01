<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)


import { userManagementTableData } from '../composables/userManagementTableData'

const {
  paginatedTableData,
} = userManagementTableData()

</script>

<template>
  <h3 class="text-gray-700 text-3xl font-medium">
    Admin Management
  </h3>
  <div>
    <button
      class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
      @click="open = true">
      +ADD ADMIN
    </button>

    <div :class="`modal ${!open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
      <div class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay" @click="open = false" />

      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
          <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
            viewBox="0 0 18 18">
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-lg text-gray-700 font-medium">
              Send Invite
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                viewBox="0 0 18 18">
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>

          <!-- Body -->
          <input class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 mb-3" type="email" name="email" id="" placeholder="Email">

          <!-- Footer -->
          <div class="flex justify-end pt-2">
            <button
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
              @click="open = false">
              Close
            </button>
            <button
              class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
              @click="open = false">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col mt-3 sm:flex-row">
    <div class="flex">
      <div class="relative">
        <select
          class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>

      <div class="relative">
        <select
          class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>

    <div class="relative block mt-2 sm:mt-0">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
          <path
            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
        </svg>
      </span>

      <input placeholder="Search"
        class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none">
    </div>
  </div>
  <table class="min-w-full leading-normal mt-6">
    <thead>
      <tr>
        <th
          class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
          #
        </th>
        <th
          class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
          PROFILE
        </th>
        <th
          class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
          EMAIL
        </th>
        <th
          class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
          ROLE
        </th>
        <th
          class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
          CREATED DATE
        </th>
        <th
          class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
          UPDATED DATE
        </th>
        <th
          class="px-8 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
          ACTION
        </th>
      </tr>
    </thead>
    <tbody>
            <tr v-for="(u, index) in paginatedTableData" :key="index">
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.id }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <img
                          class="w-8 h-8 rounded-full"
                          :src="u.profile"
                        >
                    <!-- <p class="text-gray-900 whitespace-nowrap">
                      {{ u.profile }}
                    </p> -->
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.role }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.created }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.updated }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      <a href="#" class="'absolute mx-3 inset-0 bg-blue-200 rounded-md p-2 px-5 text-indigo-600 hover:text-indigo-900">Edit</a>
                      <a href="#" class="'absolute inset-0 bg-red-400 rounded-md p-2 px-3">Delete</a>
                      <!-- {{ u.action }} -->
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
  </table>
  <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
    <span class="text-xs text-gray-900 xs:text-sm">Showing 1 to 4 of 50 Entries</span>

    <div class="inline-flex mt-2 xs:mt-0">
      <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">
        Prev
      </button>
      <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">
        Next
      </button>
    </div>
  </div>
</template>
