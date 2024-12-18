import type {TableQueries} from "@/@types/common";

export type Schedule = {
    ID: string
    Mass: string,
    Week: string,
    User: string
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}


export type GetSalesProductsResponse = {
    data:  Schedule[]
    total: number
}

export type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type scheduleListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    scheduleList: Schedule[]
}
