// books-graphql-server.ts
// import { makeExecutableSchema } from 'graphql-tools';
import { BookType, BookResultType } from './booksTypes'; // Import BookResultType
import booksResolvers from './booksResolvers';
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema'; // Import from the new package

const typeDefs = `
type Book @key(fields: "book_id") {
  book_id: ID
  title: String
  author: String
  published_year: Int
  description: String
  created: String
}

  type Query {
    getBooks(id: String, author: String, published_year: Int): BookResultType
  }

  type Mutation {
    createBook(title: String, author: String, published_year: Int, description: String): SingleBookResultType
  }

  type BookResultType {
    data: [Book]
    message: String
  }

  type SingleBookResultType {
    data: Book
    message: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: booksResolvers,
});

const server = new ApolloServer({ schema });

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Students service is running at ${url}`);
});

export { schema as bookSchema };