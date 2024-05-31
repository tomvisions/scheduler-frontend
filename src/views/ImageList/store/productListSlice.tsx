import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetGalleries,
    apiGetImages,
    apiDeleteSalesProducts,
} from '@/services/ScheduleService'
import type { TableQueries } from '@/@types/common'

type Product = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
}

type Gallery = {
    id: string
    name: string
    description: string;
    createdAt: string
    updatedAt: string
}

type Image = {
    id: string
    name: string
    key: string;
    gallery: string;
    createdAt: string
    updatedAt: string
}


type Products = Product[]

type Galleries = Gallery[]
type Images = Image[]

type GetSalesProductsResponse = {
    data: Images
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type ImagesListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    imagesList: Image[]
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'imagesList'

export const getGalleries = createAsyncThunk(
    `${SLICE_NAME}/media`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetGalleries<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)
        return response.data
    }
)

export const getImages = createAsyncThunk(
    `${SLICE_NAME}/media/images`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetImages<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        return response.data
    }
)


export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSalesProducts<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: 'asc',
        key: 'key',
    },
}

const initialState: ImagesListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    imagesList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const productListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.imagesList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getImages.fulfilled, (state, action) => {
                state.imagesList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getImages.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
} = productListSlice.actions

export default productListSlice.reducer
