import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME } from './productListSlice'
import {scheduleListState} from "../components/ScheduleListType"
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: scheduleListState
        }
    }
> = useSelector

export * from './productListSlice'
export { useAppDispatch } from '@/store'
export default reducer
