const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to BlogList MongoDB.'))
  .catch(() => logger.error('Error connecting to BlogList MongoDB.'))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

if(process.env.NODE_ENV === 'test'){
  const testsRouter = require('./controllers/tests')
  app.use('/api/testing', testsRouter)
  
}

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)

module.exports = app
