import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetUserById,
    apiPutSalesProduct,
    apiPutUser,
    apiPostWeek,
    apiDeleteSalesProducts,
} from '@/services/WeekService'

import {
    getUsherGroupByLabelValue,
} from '@/services/UsherService'

import type { TableQueries } from '@/@types/common'

type GalleryFirst = {
    data: GalleryData
}

type GalleryData = {
    id?: string
    name?: string
    description?: string
    updatedAt?: string
    createdAt?: string
    
}

type userGroupList = {
    label: string,
    value: string
}


type UserData = {
    ID?: string
    Name?: string
    UsherGroup?: userGroupList[],
    Phone?: string
    Email?: string
    Description?: string
    tags? :string
}


type ImagesData = {

    id?: string
    key?: string
    gallery?: string
    name?: string
    updatedAt?: string
    createdAt?: string
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

type Tag = {
    id: string
    name: string
    description: string
}

type UsherGroupLV = {
    label: string
    value: string
}

type GetTagsResponse = {
    data: Tag[]
    total: number
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


export type ScheduleNewState = {
    loading: boolean
    userEditData: UserData
    tableData: TableQueries
    usherGroupList: UsherGroupLV[]
}

type GetSalesProductResponse = UserData
type GetSalesTagResponse = UsherGroupLV[]

type GetTagsRequest = TableQueries & { filterData?: FilterQueries }

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'ScheduleNew'

export const getUsherGroupList = createAsyncThunk(
    `${SLICE_NAME} + '/getUsherGroups'`,
    async (data: GetSalesProductsRequest) => {

        const response = await getUsherGroupByLabelValue<
            GetSalesTagResponse,
            GetSalesProductsRequest
        >(data)
 
        const noo = response.data.map((test:any) => {
          return  { label : test.label, value: test.value }
        })

        return noo
    }
)


export const updateProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutSalesProduct<T, U>(data)
    return response.data
}

export const updateUser = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutUser<T, U>(data)
    return response.data
}

export const addWeek = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPostWeek<T, U>(data)
    return response.data
}


export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: ScheduleNewState = {
    loading: true,
    userEditData: {},
    usherGroupList: [],
    tableData: initialTableData,    
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsherGroupList.fulfilled, (state, action) => {
                state.usherGroupList = action.payload
                state.loading = false
            })
            .addCase(getUsherGroupList.pending, (state) => {
                state.loading = true
            })

    },
})

export default productEditSlice.reducer
