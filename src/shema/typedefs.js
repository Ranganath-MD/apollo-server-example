const { gql } = require ('apollo-server');

const typeDefs = gql`
    type Book {
      id: String
      title: String
      author: String
    }
    type Post {
      userId: ID
      id: ID
      title: String
      body: String
    }
    type UserName {
      title: String
      first: String
      last: String 
    }
    type Picture {
      large: String
    }
   type User {
    gender: String
    name: UserName
    email: String
    phone: String
    picture: Picture
   }
  	type Query{
      posts: [Post]
      books: [Book]
      users: [User!]!
      postById(id: ID!): Post
      postByUserId(userId: ID!): [Post]
      uploads: [File]
    }
    type File {
      filename: String!
      mimetype: String!
      encoding: String!
    }
    input BookInput{
      title: String,
      author: String
    }
    type Subscription {
      bookAdded: Book
    }
    type Mutation {
      addBook(input: BookInput): Book
      updateBook(id: String, input: BookInput): Book
      deleteBook(id: String): Book
      singleUpload(file: Upload!): File!
    }
`;

module.exports = {
  typeDefs
}