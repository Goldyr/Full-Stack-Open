import { useState } from 'react'


const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Real login happens on App.js loginHandler
    const loginHandler = async(event) => {
        event.preventDefault()
        handleLogin(username,password)
        setUsername('')
        setPassword('')
    }

    return(
        <form onSubmit={loginHandler} id="loginForm">
            <div>
                username
                <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} id="username"/>
            </div>
            <div>
                password
                <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} id="password"/>
            </div>
            <button type="submit">login</button>
        </form>
    )}

export default LoginForm