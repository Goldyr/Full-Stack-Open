const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const config = require('../utils/config')

// Reset the db before a test takes place
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = {
    username: 'test',
    name: 'test',
    password: 'test'
  }
  await api.post('/api/users').send(user)

  const response = await api.post('/api/login').send({ username: user.username, password: user.password })
  helper.logInToken = response.body.token

  for (let i = 0; i <= 3; i++) {
    await api.post('/api/blogs').set({ Authorization: 'bearer ' + helper.logInToken }).send(helper.initialBlogs[i])
  }
})

test('Verify that all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  expect(response.statusCode).toEqual(200)
  expect(response.header['content-type']).toContain('application/json')
})

test('Verify that the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('Verify that a new blog can be correctly added', async () => {
  const newBlog = {
    title: 'Dummy blog #4',
    author: 'Dummy author #4',
    url: 'blog.site',
    likes: 4
  }
  await api
    .post('/api/blogs')
    .set({ Authorization: 'bearer ' + helper.logInToken })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)

  const titles = finalBlogs.map(blog => blog.title)
  expect(titles).toContain('Dummy blog #4')
})

test('New Blog without specified likes defaults to 0', async () => {
  const newBlog = {
    title: 'Dummy blog #4',
    author: 'Dummy author #4',
    url: 'blog.site'
  }
  await api
    .post('/api/blogs')
    .set({ Authorization: 'bearer ' + helper.logInToken })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs[finalBlogs.length - 1].likes).toEqual(0)
})

test('New Blog without specified title or url returns 400', async () => {
  const newBlog = {
    author: 'Dummy author #4',
    likes: 10
  }
  await api
    .post('/api/blogs')
    .set({ Authorization: 'bearer ' + helper.logInToken })
    .send(newBlog)
    .expect(400)
})

test('Specific blog deleted succesfully', async () => {
  const initialBlogs = await helper.blogsInDb()
  const blogToDelete = initialBlogs[0]
  const decodedToken = jwt.verify(helper.logInToken, config.SECRET)

  expect(decodedToken.id.toString()).toEqual(blogToDelete.user.toString())
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: 'bearer ' + helper.logInToken })
    .expect(204)

  const newBlogs = await helper.blogsInDb()
  expect(newBlogs).toHaveLength(initialBlogs.length - 1)
})

// Should not have changed
test('Blog updated correctly', async () => {
  const initialBlogs = await helper.blogsInDb()
  const modifiedBlog = initialBlogs[0]
  modifiedBlog.likes = 50

  await api
    .put(`/api/blogs/${modifiedBlog.id}`)
    .send(modifiedBlog)
    .expect('Content-Type', /application\/json/)

  const newBlogs = await helper.blogsInDb()
  const likes = newBlogs.map(blog => blog.likes)
  expect(likes).toContain(50)
})

test('Verify that a new blog can not be added without a token', async () => {
  const newBlog = {
    title: 'Dummy blog #4',
    author: 'Dummy author #4',
    url: 'blog.site',
    likes: 4
  }
  await api
    .post('/api/blogs')
    .set({ Authorization: 'bearer ' })
    .send(newBlog)
    .expect(401)

  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
