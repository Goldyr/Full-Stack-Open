const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    return response.json(blogs)
  } catch (error) {
    logger.error(error)
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findOne({ _id: decodedToken.id })

    if (!user) {
      return response.status(401).json({ error: 'token invalid' })
    }
    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'missing title or url' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    return response.status(201).json(result)
  } catch (error) {
    response.status(400).send(error)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blogToDelete = await Blog.findById(request.params.id)
    if (!blogToDelete) {
      return response.status(400).json({ error: 'Blog ID non existing' })
    }
    if (!(request.user._id.toString() === blogToDelete.user.toString())) {
      return response.status(400).json({ error: 'User ID does not match blog user ID' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    return response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})
module.exports = blogsRouter
