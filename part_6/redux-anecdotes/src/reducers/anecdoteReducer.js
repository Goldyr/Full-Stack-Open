import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    addAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    setAnecdotes(state,action){
      const anecdotesArray = action.payload
      return anecdotesArray
    },
    updateAnecdote(state,action){
      const anecdoteToUpdate = action.payload
      return state.map(a => a.id !== anecdoteToUpdate.id ? a : anecdoteToUpdate)
    }
  }
})


// Asynchronous action creators
export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const upVoteAnecdote = (anecdote) => {
  return async (dispatch,state) => {
    let anecdoteChanged = {...anecdote , votes: anecdote.votes + 1}
    let updatedAnecdote = await anecdoteService.update(anecdoteChanged)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}


export const { addAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export default anecdoteSlice.reducer