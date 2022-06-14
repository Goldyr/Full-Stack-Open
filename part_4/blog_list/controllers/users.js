const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url:1, title:1, author:1, id:1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!(username && password)) {
    return response.status(400).json({
      error: 'username or password is undefined'
    })
  }
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username or password length is less than 3 characters long'
    })
  }
  if (await User.findOne({ username })) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const hash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    hash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
