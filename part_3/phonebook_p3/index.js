require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', function (req) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :body'))



app.get('/' , (req,res) => {
    res.send(`<h1>Phonebook</h1> 
    <a href="http://localhost:3001/api/persons" target="_blank">REST API for persons</a> 
    <br> </br>
    <a href="http://localhost:3001/info" target="_blank">For more info click here</a>`)
})

app.get('/api/persons', (req,res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
})

app.get('/api/persons/:id', (req,res,next) => {
    Person.findById(req.params.id).then(person => {
        if(person){res.json(person)}
        else{res.status(404).end()}

    })
        .catch(error => {next(error)})
})

app.get('/info', (req,res) => {
    Person.find({}).then(person => {
        res.send(
            `
            <p>Phonebook has info for ${person.length} people </p>
            <p>${new Date()} </p>
            `
        )
    })

})

app.put('/api/persons/:id', (req,res,next) => {
    const { number } = req.body.number

    Person.findOneAndUpdate(req.params.id, { number }, { new: true, runValidators:true,context:'query' })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req,res,next) => {

    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })


    if(!person.number)
        return res.status(400).json({ error: 'Missing number' })
    if(!person.name)
        return res.status(400).json({ error: 'Missing name' })
    /* if(personExists(person.name))
        return res.status(400).json({error: "Person name must be unique"}) */
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {return response.status(400).send({ error: 'malformatted id' })}
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})