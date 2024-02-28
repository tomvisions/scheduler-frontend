import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, userListState } from './productListSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: userListState
        }
    }
> = useSelector
console.log(SLICE_NAME);

export * from './productListSlice'
export { useAppDispatch } from '@/store'
export default reducer
