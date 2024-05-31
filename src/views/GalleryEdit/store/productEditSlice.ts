import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetGallleryById,
    apiGetTagsList,
    apiPutSalesProduct,
    apiPutGallery,
    apiDeleteSalesProducts,
} from '@/services/ScheduleService'

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

type tagList = {
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


export type GalleryEditState = {
    loading: boolean
    galleryData: GalleryData
    tableData: TableQueries
    tagList: tagList[]
}

type GetSalesProductResponse = GalleryData
type GetSalesTagResponse = tagList[]

type GetTagsRequest = TableQueries & { filterData?: FilterQueries }

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'GalleryEdit'

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

export const getTagsList = createAsyncThunk(
    `${SLICE_NAME}/media/tag/list`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetTagsList<
            GetSalesTagResponse,
            GetSalesProductsRequest
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

export const updateGallery = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutGallery<T, U>(data)
    return response.data
}


export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: GalleryEditState = {
    loading: true,
    galleryData: {},
    tagList: [],
    tableData: initialTableData,    
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGallery.fulfilled, (state, action) => {
                state.galleryData = action.payload
                state.loading = false
            })
            .addCase(getGallery.pending, (state) => {
                state.loading = true
            })
            .addCase(getTagsList.fulfilled, (state, action) => {
                state.tagList = action.payload
                state.loading = false
            })
            .addCase(getTagsList.pending, (state) => {
                state.loading = true
            })

    },
})

export default productEditSlice.reducer
