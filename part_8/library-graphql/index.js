const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const JWT_SECRET = process.env.JWT_SECRET

const MONGODB_URI = process.env.MONGODB_URI
console.log(`connecting to ${MONGODB_URI}`)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    console.log('error connecting', error.message)
  })

/* let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];
let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]; */

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]
    ): Book

    editAuthor(name: String!, born: Int): Author

    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args)
      if (!args.author && !args.genre) {
        return Book.find({})
      }
      if (args.author && !args.genre) {
        try {
          const author = await Author.findOne({ name: args.author })
          return Book.find({ author: author })
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      if (!args.author && args.genre) {
        const books = await Book.find({})
        const filtered_books = books.filter((b) =>
          b.genres.includes(args.genre)
        )
        return filtered_books
      } else {
        try {
          const author = await Author.findOne({ name: args.author })
          const books = await Book.find({ author: author })
          const filtered_books = books.filter((b) =>
            b.genres.includes(args.genre)
          )
          return filtered_books
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated, please log in')
      }
      const authorToUpdate = await Author.findOne({ name: args.name })
      if (!authorToUpdate) {
        throw new UserInputError('Name not found on the database', {
          invalidArgs: args.name,
        })
      }

      /*       const updatedAuthor = { ...authorToUpdate, born: args.born }

      authors = authors.map((a) =>
        a.name !== updatedAuthor.name ? a : updatedAuthor
      ) */
      authorToUpdate.born = args.born

      try {
        await authorToUpdate.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return authorToUpdate
    },
    addBook: async (root, args, context) => {
      const book_same_title = await Book.findOne({ title: args.title })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated, please log in')
      }
      console.log(book_same_title)
      if (book_same_title) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }
      let author = await Author.findOne({ name: args.author })
      //If author does not exist create it
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      try {
        console.log(args)
        const book = new Book({ ...args, author: author })
        console.log(book)
        await book.save()

        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user_check = await User.findOne({ username: args.username })
      if (user_check) {
        throw new UserInputError('Username must be unique', {
          invalidArgs: args.username,
        })
      }

      try {
        const user = new User({
          username: args.username,
          favouriteGenre: args.favouriteGenre,
          password: 'password',
        })
        await user.save()

        return user
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      //username and password
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'password') {
        throw new UserInputError('Invalid username or password', {
          invalidArgs: args,
        })
      }

      const userForToken = {
        username: user.username,
        id: user.id,
        favouriteGenre: user.favouriteGenre,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Author: {
    name: (root) => {
      return root.name
    },
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findOne({ _id: root.author })
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
