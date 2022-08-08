import { createSlice } from '@reduxjs/toolkit'
const anecdotesAtStart = [
  {
    content: 'If it hurts, do it more often',
    id:1,
    votes: 0
  },
  {
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    id:2,
    votes: 0
  },
  {
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    id:3,
    votes: 0
  },
  {
    content: 'Premature optimization is the root of all evil.',
    id:4,
    votes: 0
  },
  {
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    id:5,
    votes: 0
  },
  
  
  
]

const getId = () => (100000 * Math.random()).toFixed(0)

 const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

/* OLD VERSION
export const upVote = (id) =>{
  return { 
    type: 'UP_VOTE', 
    data: { id } 
  }
}
export const addAnecdote = (content) =>{
  return{
    type: 'ADD_ANECDOTE', 
    data: { content: content }
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'UP_VOTE':
      let anecdoteToChange = state.find(anecdote => anecdote.id === action.data.id)
      let anecdoteChanged = {...anecdoteToChange , votes: anecdoteToChange.votes + 1}
      console.log(anecdoteChanged,'anecdotechanged')
      return state.map(anec => anec.id !== action.data.id ? anec : anecdoteChanged)
    case 'ADD_ANECDOTE':
      return [...state, asObject(action.data.content)]
    default:
      return state
  }
  
} */

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : anecdotesAtStart,
  reducers: {
    upVote(state, action) {
      let anecdoteToChange = state.find(anecdote => anecdote.id === action.payload)
      let anecdoteChanged = {...anecdoteToChange , votes: anecdoteToChange.votes + 1}
      return state.map(anec => anec.id !== action.payload ? anec : anecdoteChanged)
    },
    addAnecdote(state, action) {
      state.push(asObject(action.payload))
    }
  }
})

export const { upVote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer