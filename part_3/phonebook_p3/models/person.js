const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number:{
        type: String,
        validate:{
            validator: function(v){
                return /^(\d{2,3})-(\d{6,})/.test(v)
            },
            message: props => `${props.value} is not a valid phone number. The format has to be "{2 or 3 numbers}-{6 or more numbers}"`
        },
        required: [true, 'Person number required!']
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)