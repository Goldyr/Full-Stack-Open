import { upVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

import { setNotification, resetNotification } from '../reducers/notificationReducer'



const AnecdoteList = () =>{
    
    let anecdotes = useSelector(state => state.anecdotes)
    console.log(anecdotes)
    anecdotes = anecdotes.slice().sort((a,b)=> {return (b.votes - a.votes)})

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(upVote(anecdote.id))
        dispatch(setNotification(`You voted for the anecdote "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(resetNotification())
            console.log('reseting notification')
        } , 2000)
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