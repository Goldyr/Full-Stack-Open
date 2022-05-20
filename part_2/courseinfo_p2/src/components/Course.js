import React from 'react'

const Course = ({course}) =>{
  return(
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
    )
  }

const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ parts }) => 
{
  let exercises = parts.map(part => part.exercises)
  let sum = exercises.reduce((s,p) => s+p,0) 
  
  return <p>Total of {sum} exercises</p>
}
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {parts.map(part => <Part key = {part.id} part={part} />)}    

export default Course