import Togglable from './Togglable'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeButtonHandler, deleteButtonHandler }) => {
    const [blog_state, setBlog] = useState(blog)

    const blogStyle = {
        borderStyle: 'solid',
        borderWidth: '2px',
        padding: '10px',
        margin: '3px'
    }

    const deleteButtonStyle = {
        backgroundColor: 'red',
    }


    const likeHandler = (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog_state,
            likes: blog_state.likes + 1
        }
        likeButtonHandler(updatedBlog)
        setBlog(updatedBlog)
    }

    const deleteHandler = (event) => {
        event.preventDefault()
        deleteButtonHandler(blog)
    }

    return(
        <div style={blogStyle} className="Blog">
            {blog.title} {blog.author}
            <Togglable buttonLabel = "info">
                <em><span>Likes {blog_state.likes}</span> <input type="button" value="Like" onClick={likeHandler}></input></em><br/>
                <em>{blog.url}</em><br/>
                <em>{blog.author}</em><br/>
                {user.username === blog.user.username ? <input type="button" value="Remove" onClick={deleteHandler} style={deleteButtonStyle} id="deleteButton"></input> : <input type="button" value="Remove" disabled={true} id="deleteButton"></input>}
                <br/>
            </Togglable>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    likeButtonHandler: PropTypes.func.isRequired,
    deleteButtonHandler: PropTypes.func.isRequired
}

export default Blog