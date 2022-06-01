const mongoose = require('mongoose')


if(process.argv.length < 3){
    console.log(`
    Please input the mongodb password. This are the supported commands: 
    ~ node mongo.js <password>
    ~ node mongo.js <password> <Name> <Number>
    `)
    process.exit()
}


const Params = {
    password: process.argv[2],
    name: process.argv[3],
    number: process.argv[4]
}

const url =
`mongodb+srv://mongodbuser:${Params.password}@cluster0.tmtvn.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(Params.name === undefined){
    Person.find().then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
        process.exit()
    })

}
else if(Params.number === undefined){
    console.log(`To add ${Params.name} to the phonebook you need to add a number too, e.g.:
    node mongo.js <password> ${Params.name} <NUMBER>
    `)
    mongoose.connection.close()
    process.exit()
}
else{
    const person = new Person({
        name: Params.name,
        number: Params.number
    })
    person.save().then(result => {
        console.log(`Added ${Params.name} number ${Params.number} to phonebook`)
        mongoose.connection.close()
        process.exit()
    })
}

