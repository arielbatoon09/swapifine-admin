<script setup lang="ts">
import axios from 'axios';
import { ref, computed, onMounted, watch } from 'vue';

const data = ref([]);
const open = ref(false);
const dataByID = ref([]);

const searchQuery = ref("");
const itemsPerPage = 10;
const currentPage = ref(0);


const fetchData = async () => {
    try {
        const response = await axios.get('api/withdrawal/list');

        if (response.data != null) {
            data.value = response.data.data;
        }
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

const getWithdrawalByID = async (id) => {
    try {
        const response = await axios.post('api/withdrawal/getWithdrawalByID', {
            id: id,
        });

        dataByID.value = response.data.data;
    } catch (error) {
        console.error("Erro fetching data", error);
    }
}

const updateWithdrawalStatus = async (id, status) => {
    try {
        console.log(id, status);
        const response = await axios.post('api/withdrawal/updateWithdrawalStatus', {
            id: id,
            status: status,
        });

        dataByID.value = response.data.data;
        fetchData();
    } catch (error) {
        console.error("error fetching data", error);
    }
}

const filteredData = computed(() => {
    const lowerCaseQuery = searchQuery.value.toLowerCase().trim();
    const withdrawalRequestArr = Object.values(data.value);

    return lowerCaseQuery
        ? withdrawalRequestArr.filter((withdrawalRequest) =>
            withdrawalRequest.fullname.toLowerCase().includes(lowerCaseQuery) ||
            withdrawalRequest.transfer_to.toLowerCase().includes(lowerCaseQuery)
        )
        : withdrawalRequestArr;
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

onMounted(() => {
    fetchData();
});

const computedData = computed(() => {
    return data.value;
});

</script>

<template>
    <h3 class="text-gray-700 text-3xl font-medium">
        Withdrawal Request
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

        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                #
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                fullname
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                transfer to
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                amount
                            </th>
                            <!-- <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Approved by
                            </th> -->
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                status
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                requested date
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in slicedData" :key="index">
                            <!-- v-for="(item, index) in slicedData" :key="index"-->
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
                                            {{ item.fullname }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div class="flex items-center">
                                    <div>
                                        <p class="text-gray-900 whitespace-nowrap">
                                            {{ item.transfer_to }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div class="flex items-center">
                                    <div>
                                        <p class="text-gray-900 whitespace-nowrap">
                                            {{ item.amount }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <!-- <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div class="flex items-center">
                                    <div>
                                        <p class="text-gray-900 whitespace-nowrap">
                                            asd
                                        </p>
                                    </div>
                                </div>
                            </td> -->
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div class="flex items-center">
                                    <!-- v-show="item.status === 'Approved'" -->
                                    <span v-show="item.status === 'Completed'"
                                        class="relative inline-block px-4 py-1 text-green-900 bg-green-200 rounded">
                                        {{ item.status }}
                                    </span>
                                    <!-- v-show="item.status === 'Pending'" -->
                                    <span v-show="item.status === 'Pending'"
                                        class="relative inline-block px-4 py-1 text-orange-900 bg-orange-200 rounded">
                                        {{ item.status }}
                                    </span>
                                    <!-- v-show="item.status === 'Cancelled'" -->
                                    <span v-show="item.status === 'Cancelled'"
                                        class="relative inline-block px-4 py-1 text-red-900 bg-red-200 rounded">
                                        {{ item.status }}
                                    </span>
                                    <!-- v-show="item.status === 'Rejected'" -->
                                    <span v-show="item.status === 'Rejected'"
                                        class="relative inline-block px-4 py-1 text-red-900 bg-red-200 rounded">
                                        {{ item.status }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div class="flex items-center">
                                    <div>
                                        <p class="text-gray-900 whitespace-nowrap">
                                            {{ item.date_of_request }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-5 text-sm bg-white border-b border-gray-200">
                                <button
                                    class="px-6 py-3 mr-3 lg:mr-0 font-medium tracking-wide text-white btn-clr-primary rounded-md"
                                    @click="open = true, getWithdrawalByID(item.id)">
                                    <!-- @click="open = true, getVerificationDetailsByID(item.id)" -->
                                    Details
                                </button>

                                <!-- Details Modal -->
                                <div :class="`modal ${!open && 'opacity-0 pointer-events-none'
                                    } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
                                    <div class="absolute w-full h-full bg-gray-900 opacity-5 modal-overlay"
                                        @click="open = false" />

                                    <div
                                        class="z-50 w-11/12 h-[500px] mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
                                        <div
                                            class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
                                        </div>

                                        <!-- Add margin if you want to see some of the overlay behind the modal -->
                                        <!-- v-for="dataID in dataByID" -->
                                        <div v-for="dataID in dataByID" class="px-6 py-4 text-left modal-content">
                                            <!-- Title -->
                                            <div class="flex items-center justify-between pb-3">
                                                <p class="text-2xl font-bold">
                                                    Withdrawal Details
                                                </p>
                                                <div class="z-50 cursor-pointer modal-close" @click="open = false">
                                                    <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg"
                                                        width="18" height="18" viewBox="0 0 18 18">
                                                        <path
                                                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <!-- Body -->
                                            <div class="container">
                                                <div class="user-details">
                                                    <div class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div class="flex items-center">
                                                            <div>
                                                                <p class="text-gray-900 whitespace-nowrap mb-3">
                                                                    Account name:
                                                                </p>
                                                                <p>
                                                                    {{ dataID.account_name }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="container">
                                                <div class="user-details">
                                                    <div class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div class="flex items-center">
                                                            <div>
                                                                <p class="text-gray-900 whitespace-nowrap mb-3">
                                                                    Bank/E-wallet Number:
                                                                </p>
                                                                <p>
                                                                    {{ dataID.account_number }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div class="flex items-center">
                                                            <div>
                                                                <p class="text-gray-900 whitespace-nowrap mb-3">
                                                                    Amount:
                                                                </p>
                                                                <p>
                                                                    {{ dataID.amount }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div class="flex items-center">
                                                            <div>
                                                                <p class="text-gray-900 whitespace-nowrap mb-3">
                                                                    Requested Date:
                                                                </p>
                                                                <p>
                                                                    {{ dataID.date_of_request }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Footer -->
                                            <div class="flex justify-end pt-2 mt-4">
                                                <button
                                                    v-if="dataID.status != 'Completed' && dataID.status != 'Rejected' && dataID.status != 'Cancelled'"
                                                    class="px-6 py-3 font-medium tracking-wi`de text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none mx-2"
                                                    @click="open = false, updateWithdrawalStatus(dataID.id, 'Rejected')">
                                                    Reject
                                                </button>
                                                <button
                                                    v-if="dataID.status != 'Completed' && dataID.status != 'Rejected' && dataID.status != 'Cancelled'"
                                                    class="px-6 py-3 font-medium tracking-wide text-white btn-clr-primary rounded-md"
                                                    @click="open = false, updateWithdrawalStatus(dataID.id, 'Completed')">
                                                    Approve
                                                </button>
                                                <button
                                                    v-if="dataID.status == 'Completed' || dataID.status == 'Rejected' || dataID.status == 'Cancelled'"
                                                    class="px-6 py-3 font-medium tracking-wide text-white btn-clr-primary rounded-md"
                                                    @click="open = false">
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
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