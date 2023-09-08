import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { loadFilesSync } from '@graphql-tools/load-files';
import { join } from 'path';

// Import your subgraph schemas
import todosSchema from './Schema/todosGraphSchema'; // Import the Todos subgraph schema
import greetingSchema from './Schema/greetingGraphSchema'; // Import the Greeting subgraph schema

// Define typeDefs and resolvers explicitly
const typeDefs = loadFilesSync(join(__dirname, 'subgraphs/**/*.graphql'), { recursive: true });
const resolvers = {};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    // { typeDefs, resolvers }, // Use typeDefs and resolvers for loaded schemas
    // { typeDefs: todosSchema, resolvers: {} }, // Add the Todos subgraph schema with empty resolvers
    // { typeDefs: greetingSchema, resolvers: {} }, // Add the Greeting subgraph schema with empty resolvers
  ]),
});

server.listen(4000).then(({ url }) => {
  console.log(`Gateway server ready at ${url}`);
});
