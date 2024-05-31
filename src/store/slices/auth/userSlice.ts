import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    avatar?: string
    Name?: string
    Email?: string
    ID?: string
    authority?: string[]
}

const initialState: UserState = {
    avatar: '',
    Name: '',
    Email: '',
    authority: [],
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar
            state.Email = action.payload?.Email
            state.Name = action.payload?.Name
            state.ID = action.payload?.ID
            state.authority = action.payload?.authority
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
