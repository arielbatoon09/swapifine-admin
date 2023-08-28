import { ref } from 'vue'

export interface ISimpleTableData {
    city: string
    totalOrders: string
  }

export interface IPaginatedTableData {
    id: string
    profile: string
    name: string
    timestamp: string
    transactionType: string
    amount: string
    status: string
    statusColor: string
}
export function userTransactionTableData(){
    const simpleTableData = ref<ISimpleTableData[]>([
        { city: 'New York', totalOrders: '200,120' },
        { city: 'Manchester', totalOrders: '632,310' },
        { city: 'London', totalOrders: '451,110' },
        { city: 'Madrid', totalOrders: '132,524' },
    ]);

    const paginatedTableData = ref<IPaginatedTableData[]>([
        {
            id: '1',
            profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
            name: 'alvarez',
            timestamp: '28/08/23 PM',
            transactionType: 'For Swap',
            amount: '$200',
            status: 'Received',
            statusColor: 'green'
        },
        {
            id: '2',
            profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
            name: 'balmond',
            timestamp: '28/08/23 PM',
            transactionType: 'For Sale',
            amount: '$200',
            status: 'Received',
            statusColor: 'green'
        },
        {
            id: '1',
            profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
            name: 'javy',
            timestamp: '28/08/23 PM',
            transactionType: 'For Sale and Swap',
            amount: '$200',
            status: 'Received',
            statusColor: 'green'
        },
    ])

    return {
        simpleTableData,
        paginatedTableData
    }
}
