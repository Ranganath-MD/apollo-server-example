const { ApolloServer, gql } = require ('apollo-server');
const mongoose = require("mongoose");
const { typeDefs } = require("./shema/typedefs")
const { resolvers } = require("./resolvers/resolvers")
const PostsAPI = require("./datasource/posts")
const UsersAPI = require("./datasource/users")
//create Server with ApolloServer, passing typeDefs, resolvers
const server = new ApolloServer({
  typeDefs, 
  resolvers,
  dataSources: () => ({
    postsAPI: new PostsAPI(),
    usersAPI: new UsersAPI()
  })
});

mongoose.connect(`mongodb+srv://ranganathmd:uOgKDhu9ZAhmOrnv@developeracc.xzfvx.mongodb.net/graphqlcm?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(`connected to Database`);
    // Start the server if the db coonection is active
    server.listen()
      .then(({ port }) => {
        console.log(`apollo-server running on the port ${port}`);
      })
      .catch(err => {
        console.error(err);
      });
  })
  .catch(err => {
    console.error(err);
  })


