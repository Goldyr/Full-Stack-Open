import React from 'react'

const Persons = ({persons, clickHandler}) =>{
    return(
        <div style={{display:'flex',flexDirection:'column', border:'solid black 2px'}}>
            {
            persons.map(person =>  
                <div style={{display:'grid',border:'solid black 1px',padding:10}} key = {person.id}>  NAME : {person.name} <br/> NUMBER : {person.number} 
                    <button style={{backgroundColor:'darkred'}}value={person.id} onClick={() => clickHandler(person.id)}> DELETE </button>
                </div>)
            }
        </div>
        )
}

export default Persons