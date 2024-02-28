import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetGallleryById,
    apiGetImageById,
    apiPutSalesProduct,
    apiPutImage,
    apiDeleteSalesProducts,
} from '@/services/SalesService'

import type { TableQueries } from '@/@types/common'

type ImagaeFirst = {
    data: ImageData
}

type ImageData = {
    id?: string
    name?: string
    description?: string
    updatedAt?: string
    createdAt?: string
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
    description: string
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



export type ImageEditState = {
    loading: boolean
    imageData: ImageData
    tableData: TableQueries
    tagList: Tag[]
}

type GetSalesProductResponse = ImageData
type GetTagsRequest = TableQueries & { filterData?: FilterQueries }


export const SLICE_NAME = 'ImageEdit'

export const getGallery = createAsyncThunk(
    SLICE_NAME + '/getGallery',
    async (data: { id: string }) => {
        const response = await apiGetGallleryById<
            GetSalesProductResponse,
            { id: string }
        >(data)

        return response.data
    }
)

export const getImage = createAsyncThunk(
    SLICE_NAME + '/getImage',
    async (data: { id: string }) => {
        const response = await apiGetImageById<
            GetSalesProductResponse,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutSalesProduct<T, U>(data)
    return response.data
}

export const updateImage = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutImage<T, U>(data)

    return response.data
}

export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: ImageEditState = {
    loading: true,
    imageData: {},
    tagList: [],
    tableData: initialTableData,    
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getImage.fulfilled, (state, action) => {
                state.imageData = action.payload
                state.loading = false
            })
            .addCase(getImage.pending, (state) => {
                state.loading = true
            })
    },
})

export default productEditSlice.reducer
