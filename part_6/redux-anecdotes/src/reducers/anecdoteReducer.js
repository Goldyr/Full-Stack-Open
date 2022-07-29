const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
  
}

export default reducer