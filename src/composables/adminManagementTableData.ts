import { ref } from 'vue'

export interface IPaginatedTableData {
    id: bigint
    profile: string
    email: string
    role: string
    created: string
    updated: string
    edit: string
    delete: string
  }

  const paginatedTableData = ref<IPaginatedTableData[]>([
    
  ]);