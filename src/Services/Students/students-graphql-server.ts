// students-graphql-server.ts
// import { makeExecutableSchema } from 'graphql-tools';
import { Student, StudentList, SingleStudentList } from './studentsTypes'; // Import StudentResultType
import studentsResolvers from './studentsResolvers';
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema'; //
import { buildFederatedSchema } from '@apollo/federation';
import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    getStudents(id: ID, name: String, class: String, gender: String, age: Int): StudentList
  }

  type Mutation {
    addStudent(name: String, class: String, gender: String, age: Int): SingleStudentResultType
  }

  type Student @key(fields: "id") {
    id: ID
    name: String
    class: String
    gender: String
    age: Int
    created: String
  }

type StudentList {
    data: [Student]
    message: String
}

type SingleStudentResultType {
    data: Student
    message: String
}
`;

// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers: studentsResolvers,
// });

// const server = new ApolloServer({ schema });

// server.listen({ port: 4002 }).then(({ url }) => {
//     console.log(`Students service is running at ${url}`);
// });

const schema = buildFederatedSchema({
  typeDefs,
  resolvers: studentsResolvers,
});

const server = new ApolloServer({ schema });

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Books service is running at ${url}`);
});


export { schema as studentSchema };