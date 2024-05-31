import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import {Schedule, FilterQueries, GetSalesProductsResponse, AuthState } from "./SignInType";
import {apiGetUserByToken} from "@/services/UserService";
import {setUser, signInSuccess} from "@/store";
import {REDIRECT_URL_KEY} from "@/constants/app.constant";
import appConfig from "@/configs/app.config";

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'authState'



export const getAuthByToken = createAsyncThunk(
    `${SLICE_NAME}/authByToken`,
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetUserByToken<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

/*

        if (response.data) {
            const { token } = response.data.data
            dispatch(signInSuccess(token))

            if (resp.data.data) {
                const { user} = resp.data.data;
                dispatch(
                    setUser(
                        user || {
                            avatar: '',
                            Name: 'Anonymous',
                            authority: ['USER'],
                            Email: '',
                            ID: ''

                        }
                    )
                )

            }
            const redirectUrl = query.get(REDIRECT_URL_KEY)
            navigate(
                redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
            )
            return {
                status: 'success',
                message: '',
            }
        } */

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

const initialState: AuthState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    authState: {},
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
        updateAuth: (state, action) => {
            state.authState = action.payload.data
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
            .addCase(getAuthByToken.fulfilled, (state, action) => {
                state.authState = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAuthByToken.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateAuth,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,

} = productListSlice.actions

export default productListSlice.reducer
