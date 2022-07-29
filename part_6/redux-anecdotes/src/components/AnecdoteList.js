import { upVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = () =>{
    const anecdotes = useSelector(state => state)
    anecdotes.sort((a,b)=> {return (b.votes - a.votes)})
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(upVote(id))
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
        )}
      </>
    )
}

export default AnecdoteList