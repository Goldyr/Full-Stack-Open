

const Hello = (props) => {
  return (
    <>
      <p>Hello {props.name} you are {props.age} years old.</p>      
    </>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10;

  return (
    <>
      <h1>Greetings</h1>
      <Hello name = {name} age={age}/>
      <Hello name = 'Daisy' age={10+10} />
    </>
  )
}

export default App