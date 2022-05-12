const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

const Header = (course) =>{
  console.log(course);
  return(
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = (props) =>
{
  console.log(props);
  return(
    <div>
      <Part name={props.parts[0].name} number={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} number={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} number={props.parts[2].exercises}/>
    </div>
  )
}
const Part = (props) => {
  console.log(props)
  return (
    <p>
      Part: {props.name} <br></br>
      Exercises: {props.number}
    </p>
  )
}

const Total = (props) => {
  let total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  console.log(props);
  return(
    <div>
      <p>Number of exercises = {total}</p>
    </div>
  )
}

export default App