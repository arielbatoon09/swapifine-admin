<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue'

const open = ref(false)
const data = ref([]);
const dataByID = ref([]);

const fetchData = async () => {
    try {
        const response = await axios.get('/api/checkout/all-list');

        if (response.data != null) {
            data.value = response.data.data;

        }
        console.log(data.value);

    } catch (error) {
        console.error("error fetching data", error);
    }
};

 const getCreditsDetailsByID = async (id) => {
    try{
        const response = await axios.post('/api/checkout/getCreditsByID', {
            id: id,
        });

        dataByID.value = response.data.data;

        console.log(dataByID);
    } catch (error) {
        console.error("error fetching data", error);
    }
 };

onMounted(() => {
    fetchData();
});
</script>
<template>
    <h3 class="text-3xl font-medium text-gray-700">
        Revenue History
    </h3>

    <div class="flex flex-col mt-3 sm:flex-row mt-6">
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
    <div class="flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                product name
                            </th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                reference
                            </th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                amount
                            </th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                status
                            </th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                payment method
                            </th>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                action
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white">
                        <tr v-for="item in data" :key="item.id">
                            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div class="text-sm leading-5 text-gray-900">
                                    Credits - {{ item.purchase_name }}
                                </div>
                            </td>
                            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div class="text-sm leading-5 text-gray-900">
                                    {{ item.ref_key }}
                                </div>
                            </td>
                            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div class="text-sm leading-5 text-gray-900">
                                    ₱{{ item.amount }}
                                </div>
                            </td>

                            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div class="flex items-center">
                                    <span v-show="item.status == 'Paid'"
                                        class="relative inline-block px-4 py-1 text-green-900 bg-green-200 rounded">
                                        {{ item.status }}
                                    </span>
                                    <span v-show="item.status == 'Pending'"
                                        class="relative inline-block px-4 py-1 text-orange-900 bg-orange-200 rounded">
                                        {{ item.status }}
                                    </span>
                                    <span v-show="item.status == 'Cancelled'"
                                        class="relative inline-block px-4 py-1 text-red-900 bg-red-200 rounded">
                                        {{ item.status }}
                                    </span>
                                </div>
                            </td>

                            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                <div class="text-sm leading-5 text-gray-900">
                                    {{ item.payment_method }}
                                </div>
                            </td>

                            <div class="flex items-center">
                                <button
                                    class="px-6 py-3 my-2 font-medium tracking-wide text-white btn-clr-primary rounded-md"
                                    @click="open = true, getCreditsDetailsByID(item.id)">
                                    Details
                                </button>

                                <div :class="`modal ${!open && 'opacity-0 pointer-events-none'
                                    } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
                                    <div class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
                                        @click="open = false" />

                                    <div
                                        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
                                        <div
                                            class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close">
                                            <svg class="text-white fill-current" xmlns="http://www.w3.org/2000/svg"
                                                width="18" height="18" viewBox="0 0 18 18">
                                                <path
                                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                                            </svg>
                                            <span class="text-sm">(Esc)</span>
                                        </div>

                                        <!-- Add margin if you want to see some of the overlay behind the modal -->
                                        <div v-for="dataID in dataByID" class="px-6 py-4 text-left modal-content">
                                            <!-- Title -->
                                            <div class="flex items-center justify-between pb-3">
                                                <p class="text-2xl font-bold">
                                                    Transaction Details
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
                                            <div class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <div class="flex items-center">
                                                    <div>
                                                        <p class="text-gray-900 whitespace-nowrap mb-3">
                                                            Transaction By: 
                                                        </p>
                                                        <p>{{ dataID.user_fullname }}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <div class="flex items-center">
                                                    <div>
                                                        <p class="text-gray-900 whitespace-nowrap mb-3">
                                                            Product Name:
                                                        </p>
                                                        <p>Credits - {{ dataID.product_name }}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <div class="flex items-center">
                                                    <div>
                                                        <p class="text-gray-900 whitespace-nowrap">
                                                            Transaction Date:
                                                        </p>
                                                        <p>{{ dataID.transaction_date }}</p>
                                                    </div>
                                                </div>
                                            </div>



                                            <!-- Footer -->
                                            <div class="flex justify-end pt-2">
                                                <button
                                                class="px-6 py-3 font-medium tracking-wide text-white btn-clr-primary rounded-md"
                                                    @click="open = false">
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                </table>
                <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
                    <span class="text-xs text-gray-900 xs:text-sm">Showing 1 to 4 of 50 Entries</span>

                    <div class="inline-flex mt-2 xs:mt-0">
                        <button
                            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">
                            Prev
                        </button>
                        <button
                            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">
                            Next
                        </button>
                    </div>
                </div>
        </div>
    </div>
</div></template>