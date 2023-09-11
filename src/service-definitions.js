const { buildFederatedSchema } = require('@apollo/federation');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { BookType, Student, StudentList, SingleStudentList, SingleBookResultType } = require('./todosTypes'); // Import your schema types
const todosResolvers = require('./todosResolvers'); // Import your resolvers

const app = express();

// Define the schema for the service
const schema = buildFederatedSchema([
    new GraphQLObjectType({
        name: 'Query',
        fields: {
            getBooks: {
                type: BookResultType,
                resolve: (_, args) => todosResolvers.Query.getBooks(_, args),
            },
            getStudents: {
                type: StudentList,
                resolve: (_, args) => todosResolvers.Query.getStudents(_, args),
            },
        },
    }),
    new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createBook: {
                type: SingleBookResultType,
                resolve: (_, args) => todosResolvers.Mutation.createBook(_, args),
            },
            addStudent: {
                type: SingleStudentList,
                resolve: (_, args) => todosResolvers.Mutation.addStudent(_, args),
            },
        },
    }),
]);

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        // You can add context here if needed
    },
});

server.applyMiddleware({ app });

module.exports = app;