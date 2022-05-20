import React from 'react'

const Persons = ({persons, clickHandler}) =>{
    return(persons.map(person =>  <div key = {person.id}>  name = {person.name} number = {person.number} <button value={person.id} onClick={() => clickHandler(person.id)}> delete </button></div>))
}

export default Persons