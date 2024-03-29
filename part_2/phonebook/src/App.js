import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/persons'
import Notification from './components/Notification'

const App = () => {
  
  useEffect(() =>{
    personsServices
    .getAll()
    .then(personslist => {
      console.log('Got the persons data');
      setPersons(personslist)
      setNewList(personslist)
    })
  } ,[])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [personsToList,setNewList] = useState([])
  const [notificationUpdate, setNotUpdate] = useState(null)

  
  const submitHandler = (event) => {

    event.preventDefault();

    if(persons.find(person => person.name === newName) !== undefined){
      const personToUpdate = persons.find(person => person.name === newName)
      personToUpdate.number = newNumber;
      if(window.confirm(`${personToUpdate.name} is already added on the phonebook, replace the old number with the new one?`)){
        personsServices
        .update(personToUpdate)
        .then( updatedPerson =>{
          setNotUpdate(
            `Person ${updatedPerson.name} was correctly updated` 
          )
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          setNewList(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
          setTimeout(()=>{
            setNotUpdate(null)
          },5000)
        })
        .catch( (error) =>{
          setNotUpdate(
            `ERROR: Information of ${personToUpdate.name} has already been removed from server`
          )
          setPersons(persons.filter(person => person.id !== personToUpdate.id))
          setNewList(persons.filter(person => person.id !== personToUpdate.id))
          setNewName('')
          setNewNumber('')
          setTimeout(()=>{
            setNotUpdate(null)
          },5000)
          return
        })
      }
      return
    }

    let newPerson = {
      name: newName,
      number: newNumber,
    }

    personsServices
    .add(newPerson)
    .then(addedPerson =>{
      setNotUpdate(
        `Added the person ${addedPerson.name} correctly` 
      )
      setPersons(persons.concat(addedPerson))
      setNewList(persons.concat(addedPerson))
      setNewName('')
      setNewNumber('')
      setTimeout(()=>{
        setNotUpdate(null)
      },5000)
    })
    .catch(error => {
      console.log(error.response.data)
      setNotUpdate(
        `ERROR: ${error.response.data.error}`
      )
      setNewName('')
      setNewNumber('')
      setTimeout(()=>{
        setNotUpdate(null)
      },5000)
      return
    })
  }

  const changeNameHandler = (event) => setNewName(event.target.value) 

  const changeNumberHandler = (event) => setNewNumber(event.target.value)
  
  const changeFilterHandler = (event) =>{
    setNewList(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()) ))
    if(event.target.value === ''){
      setNewList(persons)
    }
  }

  const deletePerson = (id) =>{
    if(window.confirm('Are you sure you want to delete this number?')){
      personsServices
      .del(id)
      .then(()=>{
        let updatedList = persons.filter(person => person.id !== id)
        setPersons(updatedList)
        setNewList(updatedList)
        console.log(`La persona con el id:${id} a sido eliminada de la base de datos`)
      })
    }
  }

  return (
    <div style={
      {display:'flex',
      flexDirection:'column',
      alignItems:'center',
      padding:10
      }}>
      <h2 style={{alignSelf:'center',fontSize:'2rem'}}>Phonebook</h2>
      <Notification message = {notificationUpdate}/>
      <Filter changeHandler={changeFilterHandler}/>
      <PersonForm name={newName} nameHandler={changeNameHandler} number={newNumber} numberHandler={changeNumberHandler} submitHandler={submitHandler}/>
      <h2 style={{fontSize:'2rem'}}>Numbers</h2>
      <Persons persons = {personsToList} clickHandler={deletePerson}/>
    </div>
  )
}

export default App