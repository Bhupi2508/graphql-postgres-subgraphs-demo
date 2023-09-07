import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Define a schema for the Greeting subgraph
const greetingSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            // Define queries for Greeting here
        },
    }),
});

export default greetingSchema;
