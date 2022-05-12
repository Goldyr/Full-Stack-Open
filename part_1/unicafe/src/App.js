import {useState} from 'react'


const App = () => {
  //States
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  
  //State change functions
  const goodButtonHandler = () =>{
    setGood(good + 1)
  }
  const badButtonHandler = () =>{
    setBad(bad + 1)
  }
  const neutralButtonHandler = () =>{
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Title title='give feedback'/>
      <Button clickHandler = {goodButtonHandler} text = 'Good'/>
      <Button clickHandler = {neutralButtonHandler} text = 'Neutral'/>
      <Button clickHandler = {badButtonHandler} text = 'Bad'/>
      <Title title='statistics'/>
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>
  );
}
const Title = ({title}) =>{
  return(
    <div>
      <h1>{title}</h1>
    </div>
  )
}
const Button = ({clickHandler , text}) =>{
  return(
    <div>
      <button onClick = {clickHandler}>
        {text}
      </button>
    </div>
  )
}
const Statistics = ({good, bad, neutral}) =>{
  
  let max = good + neutral + bad;
  if(max === 0){
    return(
      <div>
        No feedback given yet. Please use the buttons on top
      </div>
    )
  }
  let avr = max / 3
  let posPercent = good / max * 100
  return(
      <table>
        <tbody>
          <StadisticsLine text = 'good' value = {good}/>
          <StadisticsLine text = 'neutral' value = {neutral}/>
          <StadisticsLine text = 'bad' value = {bad}/>
          <StadisticsLine text = 'all' value = {max}/>
          <StadisticsLine text = 'average' value = {avr}/>
          <StadisticsLine text = 'positive' value = {posPercent.toPrecision(4)}/>
        </tbody>
      </table>
  )
}

const StadisticsLine = ({text , value}) =>{
  return(
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}



export default App;
