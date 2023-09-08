import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

// Define a schema for the Greeting subgraph
const greetingSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      // Define queries for Greeting here
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello, GraphQL!', // Dummy resolver for the hello query
      },
    },
  }),
});

export default greetingSchema;
