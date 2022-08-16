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
        <form onSubmit={loginHandler} id="loginForm" style={ { display: 'flex', flexDirection: 'column', alignSelf:'center' , alignItems: 'center' , justifyContent: 'center' , height: '90vh', width: '90vw', padding: 10, margin: 20, border: 'black solid 1px' } }>
            <div style={ { margin: 2 , fontSize:'2rem' } }>
                username :
                <input style={ { fontSize:'1.5rem', margin: 1 , height: '2rem', width: '15rem' } } type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} id="username"/>
            </div>
            <div style={ { margin: 2 , fontSize:'2rem' } }>
                password :
                <input style={ { fontSize:'1.5rem', margin: 1 , height: '2rem', width: '15rem' } } type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} id="password"/>
            </div>
            <button type="submit" style={ { margin: 2 , fontSize:'1.5rem' } }>LOGIN</button>
        </form>
    )}

export default LoginForm