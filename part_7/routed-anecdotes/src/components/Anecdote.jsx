export const Anecdote = ({anecdote}) => {
    return(
      <>
        <h3>{anecdote.content}</h3>
        has {anecdote.votes} votes
      </>
    )
  }
