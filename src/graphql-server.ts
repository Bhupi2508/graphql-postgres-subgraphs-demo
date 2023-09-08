import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import pool from '../src/db'; // Import your PostgreSQL database connection
import todosResolvers from './Resolver/todosResolvers'; // Import your GraphQL resolvers
import { BookType, BookResultType } from './Schema/todosTypes'; // Import your GraphQL type definition for Book

const app = express();

// Define a GraphQL schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            // Query to get books based on optional criteria.
            // You can fetch books by specifying one or more of the following arguments:
            //   - book_id: The ID of the book to retrieve (optional).
            //   - author: The author of the book to retrieve (optional).
            //   - published_year: The published year of the book to retrieve (optional).
            // If no arguments are provided, all books will be fetched.
            getBooks: {
                type: BookResultType,
                args: {
                    book_id: { type: GraphQLString },
                    author: { type: GraphQLString },
                    published_year: { type: GraphQLInt },
                },
                resolve: (_, args) => todosResolvers.Query.getBooks(_, args),
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            // Mutation to create a new Book
            createBook: {
                type: BookResultType,
                args: {
                    title: { type: GraphQLString },
                    author: { type: GraphQLString },
                    published_year: { type: GraphQLInt },
                    description: { type: GraphQLString }
                },
                resolve: (_, args) => todosResolvers.Mutation.createBook(_, args),
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
