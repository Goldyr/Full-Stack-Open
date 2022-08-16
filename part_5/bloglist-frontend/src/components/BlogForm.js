import { useState } from 'react'
const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addNewBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return(
        <form onSubmit={addNewBlog} style={ { display:'flex', padding:5 } }>
            <div style = { { alignSelf:'center' ,margin:2 } }>
                Title:
                <input type="text" value={title} onChange={({ target }) => {setTitle(target.value)}} placeholder="title" id="input-title"></input>
            </div>
            <div style = { { margin:2 } }>
                Author:
                <input type="text" value={author} onChange={({ target }) => {setAuthor(target.value)}} placeholder="author" id="input-author"></input>
            </div>
            <div style = { { margin:2 } }>
                Url:
                <input type="text" value={url} onChange={({ target }) => {setUrl(target.value)}} placeholder="url" id="input-url"></input>
            </div>

            <input style={ { backgroundColor:'#EEF3D2', width:'6rem' } } type="submit" value="create" id="add-blog"></input>
        </form>
    )
}

export default BlogForm