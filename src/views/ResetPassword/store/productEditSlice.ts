import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetUserById,
    apiPutSalesProduct,
    apiPutUser,
    apiPostUser,
    apiDeleteSalesProducts,
    apiGetUserByToken,
    apiResetPassword,
} from '@/services/UserService'

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


export type UserResetPasswordState = {
    loading: boolean
    UserResetPasswordData: UserData
    tableData: TableQueries
    usherGroupList: UsherGroupLV[]
}

type GetSalesProductResponse = UserData
type GetSalesTagResponse = UsherGroupLV[]

type GetTagsRequest = TableQueries & { filterData?: FilterQueries }

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'UserResetPasswordState'

export const resetPassword = createAsyncThunk(
    SLICE_NAME + '/resetPassword',
    async (data:any ) => {
        const response = await apiResetPassword(data)
        console.log('the response')
        console.log(response.data);

        return response.data
    }
)

export const getUserByToken = createAsyncThunk(
    `getTokenUserByToken`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetUserByToken<
            GetSalesProductResponse,
            GetSalesProductsRequest
        >(data)
        console.log('the response token')
        console.log(response);
  
        return response.data
    }
)



export const getUsherGroupList = createAsyncThunk(
    `${SLICE_NAME} + '/getUsherGroups'`,
    async (data: GetSalesProductsRequest) => {

        const response = await getUsherGroupByLabelValue<
            GetSalesTagResponse,
            GetSalesProductsRequest
        >(data)
 
        const noo = response.data.map((test:any) => {
          return  { label : test.Label, value: test.Value }
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

export const addUser = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPostUser<T, U>(data)
    return response.data
}


export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: UserResetPasswordState = {
    loading: true,
    UserResetPasswordData: {},
    usherGroupList: [],
    tableData: initialTableData,    
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserByToken.fulfilled, (state, action) => {
                state.UserResetPasswordData = action.payload
                state.loading = false
            })
            .addCase(getUserByToken.pending, (state) => {
                state.loading = true
            })
    },
})

export default productEditSlice.reducer
