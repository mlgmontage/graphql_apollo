const { ApolloServer, gql } = require('apollo-server')
const Mews = require('./db/Mews')

const typeDefs = gql`
  type Mew {
    _id: ID!
    username: String
    mew: String
  }

  type Query {
    mews: [Mew]
    addMew(username: String, mew: String): Mew
  }
`

const resolvers = {
  Query: {
    mews: async () => await Mews.find({}),
    addMew: async (_, { username, mew }) =>
      await Mews.insert({ username, mew }),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`server started at ${url}`))
