import React from 'react'
const Filter = ({changeHandler}) =>{
    return(
        <div style={{padding:10}}>Filter shown with <input onChange ={changeHandler}/></div>
    )
}

export default Filter