const { ApolloServer, gql } = require("apollo-server");
const DataStore = require("nedb-promise");

const todos = DataStore({ filename: "data/todos.json", autoload: true });

const typeDefs = gql`
  type Query {
    hello: String!
    todos: [Todo]
  }

  type Todo {
    _id: ID!
    name: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "hello world",
    todos: async () => await todos.find({}),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
