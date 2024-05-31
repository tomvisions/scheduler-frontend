import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetUsherGroups,
    apiDeleteSalesProducts,
} from '@/services/UsherService'
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

type UsherGroup = {
    ID: string
    Name: string
    Description: string
    Day: string
    Month: number
    Minute: number
}


type Products = Product[]

type GetSalesProductsResponse = {
    data:  UsherGroup[]
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type usherGroupListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    usherGroupList: UsherGroup[]
}


type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'usherGroupList'

export const getUsherGroups = createAsyncThunk(
    `${SLICE_NAME}/usherGroups`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetUsherGroups<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)
        console.log(response.data);
  
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
        order: '',
        key: '',
    },
}

const initialState: usherGroupListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    usherGroupList: [],
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
            state.usherGroupList = action.payload
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
            .addCase(getUsherGroups.fulfilled, (state, action) => {
                state.usherGroupList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getUsherGroups.pending, (state) => {
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
console.log('the slice')
console.log(productListSlice);