// Import necessary GraphQL types from 'graphql' library.
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

// Define a GraphQLObjectType representing a Todo.
const BookType = new GraphQLObjectType({
    name: 'Book', // The name of the GraphQL type, used in queries and mutations.
    fields: {
        book_id: { type: GraphQLID },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        published_year: { type: GraphQLInt },
        description: { type: GraphQLString },
        created: { type: GraphQLString }
    },
});

const BookResultType = new GraphQLObjectType({
    name: 'BookResultType',
    fields: {
        data: { type: new GraphQLList(BookType) }, // Use GraphQLList to represent an array of BookType,
        message: { type: GraphQLString },
    },
});

const SingleBookResultType = new GraphQLObjectType({
    name: 'SingleBookResultType',
    fields: {
        data: { type: BookType }, // Use GraphQLList to represent an array of BookType,
        message: { type: GraphQLString },
    },
});

export { BookType, BookResultType, SingleBookResultType };