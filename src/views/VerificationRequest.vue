<script setup lang="ts">
import { verificationTableData } from '../composables/verificationTableData'
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

const data = ref([]);
const deletebtn = ref(false);

const fetchData = async () => {
  try {
    const response = await axios.get('/api/userVerification/list');
    data.value = response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}
onMounted(() => {
  fetchData();
});

const computedData = computed(() => {
  console.log(data.value);
  return data.value;
});
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
                USER ID
              </th>
              <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                LEGAL NAME
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
            <tr v-for="item in computedData" :key="item.id">
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ item.id }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ item.user_id }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ item.legalname }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ item.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ item.created }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white">
                <div class="flex items-center">
                  <span :class="`relative inline-block px-3 py-1 text-green-900 leading-tight`">
                  <span aria-hidden :class="`absolute inset-0 bg-green-400 opacity-50 rounded-full`" />
                  <span class="relative text-green-700">{{ item.status }}</span>
                </span>
                </div>
              </td>
              <td class=" py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div class="flex">
                    <button
                    class="'absolute mx-3 inset-0 bg-gray-500 rounded-md p-2 px-3 text-white hover:text-gray-200"
                    @click="deletebtn = true">
                    Details
                  </button>
                    <select name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option selected disabled>Action</option>
                      <option value="1">Approve</option>
                      <option value="0">Decline</option>
                      <option value="delete">Delete</option>
                    </select>
                    <!-- <p class="whitespace-nowrap">
                      <a href="#" class="`absolute inset-0 text-white bg-gray-500 rounded-md p-2 px-3">Details</a>
                      {{ u.action }}
                    </p>
                    <button
                    class="'absolute mx-3 inset-0 bg-gray-500 rounded-md p-2 px-3 text-white hover:text-gray-200"
                    @click="deletebtn = true">
                    Details
                  </button>
                    <button
                    class="'absolute mx-3 inset-0 bg-red-600 rounded-md p-2 px-3 text-white hover:text-red-200"
                    @click="deletebtn = true">
                    Delete
                  </button>
                  <div :class="`modal ${!deletebtn && 'opacity-0 pointer-events-none'
                    } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
                    <div class="absolute w-full h-full bg-gray-900 opacity-20 modal-overlay" @click="deletebtn = false" />

                    <div
                      class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
                      <div
                        class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
                        <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                          viewBox="0 0 18 18">
                          <path
                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                        </svg>
                        <span class="text-sm">(Esc)</span>
                      </div>

                      <div class="px-6 py-4 text-left modal-content">

                        <div class="flex items-center justify-between pb-3">
                          <p class="text-2xl font-bold">
                            Delete Category Name
                          </p>
                          <div class="z-50 cursor-pointer modal-close" @click="deletebtn = false">
                            <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                              viewBox="0 0 18 18">
                              <path
                                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                            </svg>
                          </div>
                        </div>

                        <p class="text-md font-normal tracking-wider text-left text-gray-900 mb-3">Are you sure you want to delete this Category?</p>

                        <div class="flex justify-end pt-2">
                          <button
                            class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
                            @click="deletebtn = false">
                            Close
                          </button>
                          <button
                            class="px-4 py-2 mt-1 font-medium tracking-wide text-white bg-red-700 rounded-md hover:bg-red-500 focus:outline-none"
                            @click="deletebtn = false">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> -->
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
      </div>
    </div>
  </div>
</template>
