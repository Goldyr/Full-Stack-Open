const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  password: {
    type: String,
  },
  favouriteGenre: {
    type: String,
  },
})

module.exports = mongoose.model('User', schema)
