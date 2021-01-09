const { Books } = require("../models/books");
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const BOOK_ADDED = "Book_added"
const resolvers = {
  Query: {
    uploads: (_, args) => {
      console.log(args)
    },
    books: async () => {
      try {
        const books = await Books.find().sort({ title: 'asc' })
        return books
      }catch (err) {
        return err
      }
    },
    posts: async (_, __, { dataSources }) => {
      return dataSources.postsAPI.getallPosts()
    },
    users: async (_, __, { dataSources }) => {
      return dataSources.usersAPI.getUsers()
    },
    postById: async(_, { id }, { dataSources }) => {
      return dataSources.postsAPI.getPostsById(id)
    },
    postByUserId: async(_, { userId }, { dataSources }) => {
      return dataSources.postsAPI.getPostsByuserId(userId)
    }
    
  },
  Mutation: {
    addBook: async (_, args) => {
      const book_obj = {
        title: args.input.title,
        author: args.input.author
      }
      const books = new Books(book_obj)
      try {
        const book = await books.save();
        pubsub.publish(BOOK_ADDED, { bookAdded: book });
        return book;
      } catch (err) {
        return err;
      }
    },
    updateBook: async (_, args) => {
      const body = {
        title: args.input.title,
        author: args.input.author
      }
      try {
        const book = await Books.findByIdAndUpdate(args.id, { $set: body }, { new: true, runValidators: true })
        return book
      } catch (err) {
        return err
      }
    },
    deleteBook: async (_, args) => {
      try {
        const deletedBook = await Books.findByIdAndDelete(args.id)
        return deletedBook
      }catch (err) {
        return err
      }
    },
    singleUpload: (_, args) => {
      return args.file
      .then(file => {
        return file;
      });
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
    },
  },
}

module.exports = {
  resolvers
}