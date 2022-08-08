import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'




const AnecdoteForm = () =>{
    const dispatch = useDispatch()
    const create = (event) => {
        event.preventDefault()
        if(!event.target.anecdote.value) return
        dispatch(addAnecdote(event.target.anecdote.value))
        event.target.anecdote.value = '' 
      }

    return( 
        <>
            <h2>Create New</h2>
            <form onSubmit={create}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form> 
        </>
    )
}

export default AnecdoteForm