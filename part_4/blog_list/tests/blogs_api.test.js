const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// Reset the db before a test takes place
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('Verify that all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  console.log(response)
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
    .send(newBlog)
    .expect(400)
})

test('Specific blog deleted succesfully', async () => {
  const initialBlogs = await helper.blogsInDb()
  await api
    .delete(`/api/blogs/${initialBlogs[0].id}`)
    .expect(204)

  const newBlogs = await helper.blogsInDb()
  expect(newBlogs).toHaveLength(initialBlogs.length - 1)
})

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

afterAll(() => {
  mongoose.connection.close()
})
