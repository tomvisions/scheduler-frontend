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
    data:  UserData
    total: number
}

export type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type AuthState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    authState: UserAuth
}

type UserAuth = {
    token: string
    user: UserData
}

type UserData = {
    ID?: string
    Name?: string
    Phone?: string
    Email?: string
    Description?: string
    tags? :string
    Week?: string
}

