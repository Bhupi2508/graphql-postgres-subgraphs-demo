// src/graphql-server.ts
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLBoolean } from 'graphql';
import pool from '../src/db'; // Import your PostgreSQL database connection
import todosResolvers from '../src/todosResolvers'; // Import your GraphQL resolvers
import { TodoType, TodoResultType } from '../src/todosTypes'; // Import your GraphQL type definition for Todo

const app = express();

// Define a GraphQL schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            // Query to get a Todo by ID
            todo: {
                type: TodoResultType,
                args: {
                    id: { type: GraphQLString },
                },
                resolve: (_, args) => todosResolvers.Query.todo(_, args),
                // The 'resolve' function calls the corresponding resolver function
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            // Mutation to create a new Todo
            createTodo: {
                type: TodoResultType,
                args: {
                    title: { type: GraphQLString },
                    completed: { type: GraphQLBoolean },
                },
                resolve: (_, args) => todosResolvers.Mutation.createTodo(_, args),
                // The 'resolve' function calls the corresponding resolver function
            },
        },
    }),
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true, // Enable the GraphiQL web interface for testing
    })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`GraphQL server is running on http://localhost:${PORT}/graphql`);
});