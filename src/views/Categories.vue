<script setup lang="ts">
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net'

DataTable.use(DataTablesCore)

const columns = [
  { data: 'name', title: 'Name' },
  { data: 'position', title: 'Position' },
]

const options = {
  responsive: true,
  select: true,
}
</script>

<template>
  <h3 class="text-gray-700 text-3xl font-medium">
    Categories Page
  </h3>
  <DataTable class="display">
    <thead>
      <tr>
        <th>A</th>
        <th>B</th>
      </tr>
    </thead>
  </DataTable>
</template>
