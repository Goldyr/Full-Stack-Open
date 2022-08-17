import { useField } from '../hooks'

export const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }

    const resetInputs = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' { ...content.inputValues() } />
          </div>
          <div>
            author
            <input name='author' { ...author.inputValues() } />
          </div>
          <div>
            url for more info
            <input name='info' { ...info.inputValues() } />
          </div>
          <button>create</button>
          <button onClick={ (e) => resetInputs(e) }>reset</button>
        </form>
      </div>
    )
  
  }