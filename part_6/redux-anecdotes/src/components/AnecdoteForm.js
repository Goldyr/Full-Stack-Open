import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) =>{
    const create = async(event) => {
        event.preventDefault()
        if(!event.target.anecdote.value) return
        props.createAnecdote(event.target.anecdote.value)
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

const ConnectedAnecdoteForm = connect(null, {createAnecdote})(AnecdoteForm)
export default ConnectedAnecdoteForm