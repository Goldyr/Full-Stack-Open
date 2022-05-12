import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  
  const [selected, setSelected] = useState(0)
  const [selectedPoints, setSelectedPoints] = useState(Array(anecdotes.length).fill(0))
  //Array(anecdotes.length).fill(0) //creates an array of the lenght of anecdotes and fills it with 0s
  const [mostVoted, setMostVoted] = useState({index: 0, votes: 0});
  
  const nextAnecHandler = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const voteAnecHandler = () =>{
    const copy = { ...selectedPoints}
    copy[selected] += 1;
    setSelectedPoints(copy)
    console.log(selectedPoints, 'selectedPoints')
    console.log(selectedPoints[selected],'selectedPointsp[selected]')
    console.log(copy,'copy')
    console.log(selected, 'selected')
    console.log(typeof(selectedPoints))
    if(copy[selected] > mostVoted){
      setMostVoted(selected)
    }

    Object.values(copy).forEach(element => {
        if(element > mostVoted.votes){
          const copymv = {...mostVoted ,index:selected,votes:element}
          setMostVoted(copymv)
        }}
      )
  }

  return (
    <div>
      <Title title={'Anecdote of the day'}/>
      <Anecdote anecdote={anecdotes[selected]}/>
      has {selectedPoints[selected]} votes <br></br>

      <br></br>
      <Button handleClick = {nextAnecHandler} text = 'next'/>
      <Button handleClick = {voteAnecHandler} text = 'vote'/>
      <Title title={'Anecdote with the most votes'}/>
      <Anecdote anecdote={anecdotes[mostVoted.index]}/>
    </div>
  )
}

const Button = ({handleClick, text}) =>{
  return(
    <button onClick = {handleClick}>{text}</button>
  )
}
const Title = ({title}) =>{
  return(
    <div>
      <h1>{title}</h1>
    </div>
  )  
}

const Anecdote = ({anecdote}) =>{
  return(
    <p>{anecdote}</p>
  )
}

export default App