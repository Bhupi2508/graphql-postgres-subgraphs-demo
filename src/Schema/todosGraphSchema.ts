import { GraphQLObjectType, GraphQLSchema } from 'graphql';

// Define a schema for the Todos subgraph
const todosSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            // Define queries for Todos here
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            // Define mutations for Todos here
        },
    }),
});

export default todosSchema;
