const http = require('http')
const express = require('express')

const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { execute, subscribe } = require('graphql')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const User = require('./models/user')

require('dotenv').config()

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

console.log(`connecting to ${MONGODB_URI}`)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    console.log('error connecting', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)

        return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`server is now running on http://localhost:${PORT}`)
  )
}

//does the setup and starts the server
start()
