const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'test', passwordHash })

    await user.save()
  })

  test('can list users', async () => {
    const response = await api.get('/api/users')
    expect(response.statusCode).toEqual(200)
    expect(response.header['content-type']).toContain('application/json')
  })
  test('can add a new user', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'Name',
      name: 'This was the name actually',
      password: 'password'
    }
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('content-type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('catch repeated username error', async () => {
    const newUser = {
      username: 'test',
      name: 'test',
      password: 'test'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('username must be unique')
  })
  test('catch username/password length error', async () => {
    const newUser = {
      username: 'te',
      name: 'te',
      password: 'test'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('username or password length is less than 3 characters long')
  })
  test('catch empty username/password error', async () => {
    const newUser = {
      username: '',
      name: 'test',
      password: ''
    }

    const response = await api
      .post('/api/users')
      .send(newUser)

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('username or password is undefined')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
