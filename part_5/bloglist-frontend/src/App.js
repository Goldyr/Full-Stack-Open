import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    },[])

    const handleLogin = async(username,password) => {
        try{
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('LoggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setNotification(`Logged user ${user.name} correctly!`)
            setTimeout( () => {
                setNotification(null)
            }
            ,5000)
        }
        catch(error){
            console.log(error.response.data)
            setNotification(`ERROR:  ${error.response.data.error}`)
            setTimeout( () => {
                setNotification(null)
            }
            ,5000)
        }
    }

    const handleLogOut = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('LoggedUser')
        setUser(null)
        setNotification('Logged out!')
        setTimeout( () => {
            setNotification(null)
        }
        ,5000)
    }

    const handleCreateBlog = async (blogObject) => {
        try{
            blogFormRef.current.toggleVisibility()
            const response = await blogService.create(blogObject)
            console.log(response)
            setBlogs(blogs.concat(response))
            setNotification(`New blog ${response.title} by ${response.author} added`)
            setTimeout( () => {
                setNotification(null)
            }
            ,5000)
        }
        catch(error){
            console.log(error.response.data)
            setNotification(`ERROR:  ${error.response.data.error}`)
            setTimeout( () => {
                setNotification(null)
            }
            ,5000)
        }

    }

    const blogFormRef = useRef()

    const likeButtonHandler = async(blogObject) => {
        try{
            await blogService.update(blogObject)
            setNotification('Liked!')
            setTimeout( () => {
                setNotification(null)
            }
            ,5000)
        }
        catch(error){
            console.log(error.response.data)
            setNotification(`ERROR:  ${error.response.data.error}`)
            setTimeout( () => {
                setNotification(null)
            }
            ,5000)
        }
    }
    const deleteHandler = async(blogToDelete) => {
        if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)){
            try{
                await blogService.deleteBlog(blogToDelete.id)
                const filteredBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
                setBlogs(filteredBlogs)
                setNotification('Blog deleted')
                setTimeout( () => {
                    setNotification(null)
                }
                ,5000)
            }
            catch(error){
                console.log(error.response.data)
                setNotification(`ERROR:  ${error.response.data.error}`)
                setTimeout( () => {
                    setNotification(null)
                }
                ,5000)
            }
        }

    }

    const loggedForm = () => (
        <div style={ { display: 'flex', flexDirection:'column' } }>
            <h2 style={ { alignSelf:'center', fontSize:'2rem' } }>blogs</h2>
            <div style={ { alignSelf:'center', fontStyle:'italic', margin:5 } }>User {user.name} logged in
                <input style={ { margin: 10 } } type="button" onClick={handleLogOut} value="Log Out" id="logout-button"></input>
            </div>
            <Togglable buttonLabel="create blog" ref={blogFormRef} buttonId="create-button">
                <BlogForm createBlog={handleCreateBlog}/>
            </Togglable>
            {blogs.sort((blog1,blog2) => {if(blog1.likes>blog2.likes){return -1}else{return 1}}).map(blog =>
                <div key={blog.id}>
                    <Blog blog={blog} likeButtonHandler={likeButtonHandler} deleteButtonHandler={deleteHandler} user={user}/>
                </div>
            )}
        </div>
    )

    return (
        <div >
            <Notification message={notification}></Notification>

            <div>
                {user === null
                    ? <LoginForm handleLogin={handleLogin} />
                    : loggedForm()}
            </div>
        </div>
    )
}

export default App
