import React from 'react'

const PersonForm = ({name , nameHandler, number, numberHandler, submitHandler}) =>{
    return(
    <form>
        <div>
            <p>Name: <input value={name} onChange = {nameHandler}/></p>
            <p>Number: <input value={number} onChange = {numberHandler}/></p>
        </div>
        <div>
            <button type="submit" onClick ={submitHandler}>ADD</button>
        </div>
    </form>)
}

export default PersonForm