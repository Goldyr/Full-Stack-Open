const Blog = require('../models/blog')
const User = require('../models/user')

const logInToken = undefined

const initialBlogs = [
  {
    title: 'Dummy blog #1',
    author: 'Dummy author #1',
    url: 'blog.site',
    likes: 1
  },
  {
    title: 'Dummy blog #2',
    author: 'Dummy author #2',
    url: 'blog.site',
    likes: 2
  },
  {
    title: 'Dummy blog #3',
    author: 'Dummy author #3',
    url: 'blog.site',
    likes: 3
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

// const tokenLogIn()

module.exports = {
  initialBlogs, blogsInDb, usersInDb, logInToken
}
