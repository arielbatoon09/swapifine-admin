<script setup lang="ts">
import { verificationTableData } from '../composables/verificationTableData'

const {
  paginatedTableData,
} = verificationTableData()
</script>

<template>
  <h3 class="text-gray-700 text-3xl font-medium">
    Verification Request
  </h3>
  <div class="mt-6">
    <div class="flex flex-col mt-3 sm:flex-row">
      <div class="flex">
        <div class="relative">
          <select
            class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>

        <div class="relative">
          <select
            class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
          >
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
              d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
            />
          </svg>
        </span>

        <input
          placeholder="Search"
          class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
        >
      </div>
    </div>

    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                #
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                FIRST NAME
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                LAST NAME
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                EMAIL
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                DATE OF REQUEST
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                STATUS
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
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
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.firstname }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.lastname }}
                    </p>
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
                      {{ u.created }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white">
                <div class="flex items-center">
                  <span :class="`relative inline-block px-3 py-1 text-green-900 leading-tight`">
                  <span aria-hidden :class="`absolute inset-0 bg-green-400 opacity-50 rounded-full`" />
                  <span class="relative text-green-700">{{ u.status }}</span>
                </span>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="whitespace-nowrap">
                      <a href="#" class="`absolute inset-0 text-white bg-gray-500 rounded-md p-2 px-3">Details</a>
                      <!-- {{ u.action }} -->
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <table class="min-w-full leading-normal">
          <tbody>
            <tr v-for="(u, index) in paginatedTableData" :key="index">
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img class="w-full h-full rounded-full" :src="u.picture" alt="profile pic">
                  </div>

                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ u.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-nowrap">
                  {{ u.role }}
                </p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-nowrap">
                  {{ u.created }}
                </p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <span class="relative inline-block px-3 py-1 text-red-900 leading-tight">
                  <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full" />
                  <span class="relative">{{ u.status }}</span>
                </span>
                <span :class="`relative inline-block px-3 py-1 text-green-900 leading-tight`">
                  <span aria-hidden :class="`absolute inset-0 bg-green-200 opacity-50 rounded-full`" />
                  <span class="relative">{{ u.status }}</span>
                </span>                
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                <a href="#" class=" ml-3 text-red-400 hover:text-red-600">Delete</a>
              </td>
            </tr>
          </tbody>
        </table> -->
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
      </div>
    </div>
  </div>
</template>
