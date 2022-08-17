import { Link } from "react-router-dom"

export const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <>
        <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/new">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>    
      </>
    )
  }