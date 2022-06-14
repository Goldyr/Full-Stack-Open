const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username:1 , name:1, id:1, })
    response.json(blogs)
  } catch (error) {
    logger.error(error)
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {

    if(!body.userId){
      response.status(401).json({error: 'userId missing or invalid'})
    }
    const user = await User.findOne({_id: body.userId})
    
    if(!user){
      response.status(401).json({error: 'userId invalid'})
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
    console.log(user)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    logger.error(error)
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    logger.error(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    logger.error(error)
  }
})
module.exports = blogsRouter
