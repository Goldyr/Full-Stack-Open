const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')




mongoose.connect(config.MONGODB_URI)
.then(() => logger.info('Connected to BlogList MongoDB.'))
.catch(() => logger.error('Error connecting to BlogList MongoDB.'))

app.use(cors())
app.use(express.json())

//should use routes as middleware
app.use('/api/blogs', blogsRouter)

module.exports = app
