import { upVoteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

import { handleNotification } from '../reducers/notificationReducer'




const AnecdoteList = () =>{
    
    
    let anecdotes = useSelector(state => state.anecdotes)
    let filter = useSelector(state => state.filter)    

    if(filter){
        anecdotes = anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
    }
    anecdotes = anecdotes.slice().sort((a,b)=> {return (b.votes - a.votes)})

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(upVoteAnecdote(anecdote))
        dispatch(handleNotification(`you voted for the anecdote '${anecdote.content}'`, 5))
      }

    return(
    <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )}
    </>
    )
}

export default AnecdoteList