const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :body'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/' , (req,res)=>{
    res.send(`<h1>Phonebook</h1> 
    <a href="http://localhost:3001/api/persons" target="_blank">REST API for persons</a> 
    <br> </br>
    <a href="http://localhost:3001/info" target="_blank">For more info click here</a>`)
})

app.get('/api/persons', (req,res)=>{
    res.send(persons)
})

app.get('/info', (req,res)=>{
    res.send(
        `
        <p>Phonebook has info for ${persons.length} people </p>
        <p>${new Date()} </p>
        `
    )
})

app.get('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person) 
        res.send(person)
    else 
        res.status(404).end()
})

app.delete('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req,res) =>{
    //Checks name existance
    const personExists = (name) =>{
        personFound = persons.find(p => p.name === name)
        if(personFound) 
            return true
        else 
            return false
    }
    const person = req.body

    if(!person.number)
        return res.status(400).json({error: "Missing number"})
    if(!person.name)
        return res.status(400).json({error: "Missing name"})
    if(personExists(person.name)) 
        return res.status(400).json({error: "Person name must be unique"})

    person.id = Math.floor(Math.random() * 1000)
    persons = persons.concat(person)

    res.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})