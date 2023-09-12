// Import necessary GraphQL types from 'graphql' library.
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

// Define a GraphQLObjectType representing a Todo.
const Student = new GraphQLObjectType({
    name: 'Student', // The name of the GraphQL type, used in queries and mutations.
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        class: { type: GraphQLString },
        gender: { type: GraphQLString },
        age: { type: GraphQLInt },
        created: { type: GraphQLString }
    },
});

const StudentList = new GraphQLObjectType({
    name: 'StudentList',
    fields: {
        data: { type: new GraphQLList(Student) }, // Use GraphQLList to represent an array of BookType,
        message: { type: GraphQLString },
    },
});

const SingleStudentList = new GraphQLObjectType({
    name: 'SingleStudentList',
    fields: {
        data: { type: Student }, // Use GraphQLList to represent an array of BookType,
        message: { type: GraphQLString },
    },
});

export { Student, StudentList, SingleStudentList };
