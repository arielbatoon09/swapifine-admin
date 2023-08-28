import { ref } from 'vue'

export interface ISimpleTableData {
    city: string
    totalOrders: string
  }

export interface IPaginatedTableData {
    id: string
    firstname: string
    lastname: string
    email: string
    created: string
    status: string
    statusColor: string
}
export function verificationTableData(){
    const simpleTableData = ref<ISimpleTableData[]>([
        { city: 'New York', totalOrders: '200,120' },
        { city: 'Manchester', totalOrders: '632,310' },
        { city: 'London', totalOrders: '451,110' },
        { city: 'Madrid', totalOrders: '132,524' },
    ]);

    const paginatedTableData = ref<IPaginatedTableData[]>([
        {
            id: '1',
            firstname: 'zhenlly',
            lastname: 'alvarez',
            email: 'test@gmail.com',
            created: 'jan 26, 2023',
            status: 'Active',
            statusColor: 'green'
        },
        {
            id: '2',
            firstname: 'javy',
            lastname: 'Abano',
            email: 'test@gmail.com',
            created: 'jan 27, 2023',
            status: 'Active',
            statusColor: 'green'
        },
        {
            id: '3',
            firstname: 'ariel',
            lastname: 'batoon',
            email: 'test@gmail.com',
            created: 'jan 28, 2023',
            status: 'Active',
            statusColor: 'green'
        },
    ])

    return {
        simpleTableData,
        paginatedTableData
    }
}
