const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  //Might need to set the schema to Json later on

  module.exports = mongoose.model('Blog', blogSchema)