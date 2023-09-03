import { ref } from 'vue'

export interface ISimpleTableData {
  city: string
  totalOrders: string
}

export interface IPaginatedTableData {
  id: string
  name: string
  role: string
  created: string
  updated: string
  status: string
  totalPost: string
  statusColor: string
}

export interface IWideTableData {
  name: string
  email: string
  title: string
  title2: string
  status: string
  role: string
}

export function useTableData() {
  const simpleTableData = ref<ISimpleTableData[]>([
    { city: 'New York', totalOrders: '200,120' },
    { city: 'Manchester', totalOrders: '632,310' },
    { city: 'London', totalOrders: '451,110' },
    { city: 'Madrid', totalOrders: '132,524' },
  ])

  const paginatedTableData = ref<IPaginatedTableData[]>([
    {
      id: '1',
      name: 'Vera Carpenter',
      role: 'Admin',
      created: 'Jan 21, 2020',
      updated: 'Jan 21, 2020',
      status: 'Active',
      totalPost: '20',
      statusColor: 'green',
    },
    {
      id: '2',
      name: 'Blake Bowman',
      role: 'Editor',
      created: 'Jan 01, 2020',
      updated: 'Jan 21, 2020',
      status: 'Active',
      totalPost: '20',
      statusColor: 'green',
    },
    {
      id: '3',
      name: 'Dana Moore',
      role: 'Editor',
      created: 'Jan 10, 2020',
      updated: 'Jan 21, 2020',
      status: 'Suspended',
      totalPost: '20',
      statusColor: 'orange',
    },
    {
      id: '4',
      name: 'Alonzo Cox',
      role: 'Admin',
      created: 'Jan 18, 2020',
      updated: 'Jan 21, 2020',
      status: 'Inactive',
      totalPost: '20',
      statusColor: 'red',
    },
  ])

  const wideTableData = ref<IWideTableData[]>(
    [...Array(10).keys()].map(() => ({
      name: 'John Doe',
      email: 'john@example.com',
      title: 'Software Engineer',
      title2: 'Web dev',
      status: 'Active',
      role: 'Owner',
    })),
  )

  return {
    simpleTableData,
    paginatedTableData,
    wideTableData,
  }
}
