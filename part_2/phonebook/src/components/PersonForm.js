import React from 'react'

const PersonForm = ({name , nameHandler, number, numberHandler, submitHandler}) =>{
    return(
    <form style={{margin:10,padding:10,border: 'solid black 2px'}}>
        <h2>Add/Update a number</h2>
        <p>Name: <input value={name} onChange = {nameHandler}/></p>
        <p>Number: <input value={number} onChange = {numberHandler}/></p>
        <button type="submit" onClick ={submitHandler}>ADD</button>
    </form>)
}

export default PersonForm