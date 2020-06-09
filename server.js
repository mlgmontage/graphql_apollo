const { ApolloServer, gql } = require("apollo-server");
const DataStore = require("nedb-promise");

const todos = DataStore({ filename: "data/todos.json", autoload: true });

const typeDefs = gql`
  type Query {
    todos: [Todo]
    addTodo(name: String): Todo
  }

  type Todo {
    _id: ID!
    name: String
    date: String
  }
`;

const resolvers = {
  Query: {
    todos: async () => await todos.find({}),
    addTodo: async (_, { name }) =>
      await todos.insert({ name: name, date: new Date() }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
