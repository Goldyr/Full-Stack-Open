const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Query: {
    bookCount: async () => {
      console.log('editAuthor')
      return Book.collection.countDocuments()
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args)
      console.log('allBooks')
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
    allAuthors: async () => {
      console.log('allAuthors')
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      console.log('editAuthor')
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
      console.log('addBook')
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

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      console.log('createUser')
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
      console.log('login')
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
