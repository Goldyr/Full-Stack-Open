import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'notification',
    initialState: 'initialState',
    reducers: {
        setNotification(state,action){
            state = action.payload
            return state
        },
        resetNotification(state){
            return ''
        }
    }
})


export const { setNotification, resetNotification } = anecdoteSlice.actions
export default anecdoteSlice.reducer