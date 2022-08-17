import { Link } from "react-router-dom"

export const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <Link key={anecdote.id} to={`/anecdote/${anecdote.id}`}>{anecdote.content} <br></br></Link>)}
      </ul>
    </div>
  )