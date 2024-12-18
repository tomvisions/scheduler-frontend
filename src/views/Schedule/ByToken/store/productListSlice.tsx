import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSchedules,
} from '@/services/ScheduleService'
import type { TableQueries } from '@/@types/common'
import {Schedule, FilterQueries, GetSalesProductsResponse, scheduleListState } from "@/views/Schedule/List/components/ScheduleListType";
import {apiUnAvailable} from "@/services/ScheduleService";

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'scheduleList'


export const unAvailable = async (data: { id: string }) => {
    const response = await apiUnAvailable<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}


export const getSchedules = createAsyncThunk(
    `${SLICE_NAME}/schedule`,
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetSchedules<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        console.log('data ')
        console.log(response.data);
        return response.data
    }
)

export const getSchedulesByToken = createAsyncThunk(
    `${SLICE_NAME}/scheduleByToken`,
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetSchedules<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        console.log('data ')
        console.log(response.data);
        return response.data
    }
)

export const initialTableData: TableQueries = {
    userId: '',
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: scheduleListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    scheduleList: [],
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
            state.scheduleList = action.payload
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
            .addCase(getSchedules.fulfilled, (state, action) => {
                state.scheduleList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getSchedules.pending, (state) => {
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
