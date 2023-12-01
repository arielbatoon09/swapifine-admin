<script setup lang="ts">
import axios from 'axios';
import { ref, computed, onMounted, watch } from 'vue';
import { createToaster } from "@meforma/vue-toaster";


const data = ref([]);
const editbtn = ref(false);
const idUpdate = ref(null)
const deletebtn = ref(false);
const idDelete = ref(null);

const searchQuery = ref("");
const itemsPerPage = 10;
const currentPage = ref(0);

const form = ref({
  fullname: '',
  email: ''
});

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
    icon: 'check-circle', // Use a success-specific icon
    transition: 'slide-up', // Use a different transition for success toasts
  },

  error: {
    theme: 'error',
    icon: 'exclamation-triangle', // Use an error-specific icon
    transition: 'slide-down', // Use a different transition for error toasts
  },
});

const updateUser = async (id) => {
  editbtn.value = true;
  idUpdate.value = id;
}

const handUserUpdate = async (id) => {
  try {
    const { fullname, email } = form.value;

    const response = await axios.post('api/user/update', {
      id: id,
      fullname: fullname,
      email: email,
    });

    if (response.data.status === 'success') {
      form.value.fullname = '';
      form.value.email = '';
      editbtn.value = false

      toaster.success(`Successfully updated`);
      console.log(response.data);
      fetchData();
    } else {
      toaster.error(`Failed to update`);
    }

  } catch (error) {
    console.error("Error updating User", error);
  }
}

const fetchData = async () => {
  try {
    const response = await axios.get('/api/user/list');
    data.value = response.data.data;

    if (response.data.source == "UserListNotFound") {
      data.value = null;
    }

  } catch (error) {
    console.error("Error fetching data", error);
  }
}
onMounted(() => {
  fetchData();
});

const deleteId = async (id) => {
  deletebtn.value = true;
  idDelete.value = id;
}

const handleDelete = async (id) => {
  try {
    const response = await axios.post(`/api/user/delete/${id}`);

    if (response.data.status === "success") {
      deletebtn.value = false;

      toaster.success("Successfully deleted");
      console.log(response.data.status);
      fetchData(); // Refresh the data after successful deletion.
    } else {
      toaster.error("Failed to delete");
    }
  } catch (error) {
    console.error("Error deleting data", error);
  }
};

// Compute the filtered data based on the search query
const filteredData = computed(() => {
  const lowerCaseQuery = searchQuery.value.toLowerCase().trim();
  const userArray = Object.values(data.value);

  return lowerCaseQuery
    ? userArray.filter((userManagemenet) =>
      userManagemenet.fullname.toLowerCase().includes(lowerCaseQuery) ||
      userManagemenet.email.toLowerCase().includes(lowerCaseQuery)
    )
    : userArray;
});

// Compute the sliced data based on the current page
const slicedData = computed(() => {
  const startIndex = currentPage.value * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredData.value.slice(startIndex, endIndex);
});

// Compute the total number of pages
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

// Watch for changes in the search query and reset the current page when searching
watch(searchQuery, () => {
  currentPage.value = 0;
});

// Function to handle pagination
const goToPage = (direction) => {
  if (direction === "prev" && currentPage.value > 0) {
    currentPage.value--;
  } else if (direction === "next" && currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
};

const computedData = computed(() => {
  console.log(data.value);
  return data.value;
});
</script>

<template>
  <h3 class="text-gray-700 text-3xl font-medium">
    User Management
  </h3>

  <div class="mt-6">
    <div class="flex flex-col mt-3 sm:flex-row">
      <div class="relative block mt-2 sm:mt-0">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
            <path
              d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
          </svg>
        </span>

        <input v-model="searchQuery" placeholder="Search" class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 
          bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none 
          sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
      </div>
    </div>

    <div class="py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table class="min-w-full leading-normal">
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
                FULLNAME
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                EMAIL
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                total report
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
            <tr v-for="(item, index) in slicedData" :key="index">
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
                      <img :src="item.profile_img" alt="">
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ item.fullname }}
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
                    <p class="text-gray-900 whitespace-nowrap" :class="item.total_report >= 10 ? 'text-red-500' : ''">
                      {{ item.total_report }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ item.created_date }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ item.updated_date }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div>
                    <p class="text-gray-900 whitespace-nowrap">
                    <div>
                      <p class="text-gray-900 whitespace-nowrap">
                        <!-- EDIT BUTTON -->
                        <button
                          class="'absolute inset-0 btn-clr-primary rounded-md p-2 px-5 text-white hover:text-indigo-200"
                          @click="updateUser(item.id)">
                          Edit
                        </button>
                      <div :class="`modal ${!editbtn && 'opacity-0 pointer-events-none'
                        } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
                        <div class="absolute w-full h-full bg-gray-900 opacity-5 modal-overlay"
                          @click="editbtn = false" />

                        <div
                          class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
                          <!-- Add margin if you want to see some of the overlay behind the modal -->
                          <div class="px-6 py-4 text-left modal-content">
                            <!-- Title -->
                            <div class="flex items-center justify-between pb-3">
                              <p class="text-2xl font-bold">
                                Edit User
                              </p>
                              <div class="z-50 cursor-pointer modal-close" @click="editbtn = false">
                                <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18"
                                  height="18" viewBox="0 0 18 18">
                                  <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                                </svg>
                              </div>
                            </div>

                            <!-- Body -->
                            <div>
                              <input
                                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 mb-3"
                                v-model="form.fullname" type="text" name="fullname" placeholder="New Fullname">
                            </div>
                            <div>
                              <input
                                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 mb-3"
                                v-model="form.email" type="text" name="email" placeholder="New Email">
                            </div>

                            <!-- Footer -->
                            <div class="flex justify-end pt-2">
                              <button
                                class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
                                @click="editbtn = false">
                                Close
                              </button>
                              <button class="px-6 py-3 font-medium tracking-wide text-white btn-clr-primary rounded-md"
                                @click="handUserUpdate(idUpdate)">
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- DELETE MODAL -->
                      <button class="'absolute mx-3 inset-0 bg-red-600 rounded-md p-2 px-3 text-white hover:text-red-200"
                        @click="deleteId(item.id)">
                        Delete
                      </button>
                      <div :class="`modal ${!deletebtn && 'opacity-0 pointer-events-none'
                        } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
                        <div class="absolute w-full h-full bg-gray-900 opacity-5 modal-overlay"
                          @click="deletebtn = false" />

                        <div
                          class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
                          <!-- Add margin if you want to see some of the overlay behind the modal -->
                          <div class="px-6 py-4 text-left modal-content">
                            <!-- Title -->
                            <div class="flex items-center justify-between pb-3">
                              <p class="text-2xl font-bold">
                                Delete User
                              </p>
                              <div class="z-50 cursor-pointer modal-close" @click="deletebtn = false">
                                <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18"
                                  height="18" viewBox="0 0 18 18">
                                  <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                                </svg>
                              </div>
                            </div>

                            <!-- Body -->
                            <p class="text-md font-normal tracking-wider text-left text-gray-900 mb-3">Are you sure you
                              want
                              to delete this User?</p>

                            <!-- Footer -->
                            <div class="flex justify-end pt-2">
                              <button
                                class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
                                @click="deletebtn = false">
                                Close
                              </button>
                              <button
                                class="px-4 py-2 mt-1 font-medium tracking-wide text-white bg-red-700 rounded-md hover:bg-red-500 focus:outline-none"
                                @click="handleDelete(idDelete)">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      </p>
                    </div>
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
            <button @click="goToPage('prev')" :disabled="currentPage === 0"
            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">
            Prev
          </button>
          <button @click="goToPage('next')" :disabled="currentPage === totalPages - 1"
            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">
            Next
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>