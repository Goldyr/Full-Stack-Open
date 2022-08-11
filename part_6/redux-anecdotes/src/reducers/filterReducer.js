import { createSlice } from '@reduxjs/toolkit'

const filterReducer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state,action){
            state = action.payload
            return state
        }
    }
})

export const { setFilter } = filterReducer.actions
export default filterReducer.reducer