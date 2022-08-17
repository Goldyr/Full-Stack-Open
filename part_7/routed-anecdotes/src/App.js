import { useState } from 'react'

import { Routes, Route, useMatch, useNavigate } from "react-router-dom"

import { About } from './components/About'
import { Anecdote } from './components/Anecdote'
import { AnecdoteList } from './components/AnecdoteList'
import { CreateNew } from './components/CreateNew'
import { Footer } from './components/Footer'
import { Menu } from './components/Menu'


const App = () => {

  const navigate = useNavigate()

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')

  const anecdoteById = (id) =>
  anecdotes.find(a => a.id === id)

  const match = useMatch('/anecdote/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`Added a new blog "${anecdote.content}"`)
    setTimeout(()=>{setNotification('')},5000)
  }


  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification}
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/new" element={<CreateNew addNew={addNew}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/anecdote/:id" element={<Anecdote anecdote={anecdote}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
