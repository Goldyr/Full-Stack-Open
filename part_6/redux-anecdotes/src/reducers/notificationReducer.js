import { createSlice } from '@reduxjs/toolkit'

//Used on handleNot to fix a timeout bug on multiple votes
let timeout_id

const anecdoteSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state,action){
            state = action.payload
            return state
        },
        resetNotification(state,action){
            return ''
        }
    }
})


export const handleNotification = (message,seconds) =>{
    return dispatch => {
        clearTimeout(timeout_id)
        dispatch(setNotification(message))
        timeout_id = setTimeout(() => {
            dispatch(resetNotification())
          }, seconds*1000)
        
    }
}

export const { setNotification, resetNotification } = anecdoteSlice.actions
export default anecdoteSlice.reducer