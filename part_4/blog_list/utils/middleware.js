const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else request.token = null

  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    next()
  }
  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    const user = await User.findById(decodedToken.id)
    if (!user) {
      next({ error: 'no user associated to that token' })
    }
    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { errorHandler, tokenExtractor, userExtractor }
