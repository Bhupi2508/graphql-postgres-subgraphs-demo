// Import necessary GraphQL types from 'graphql' library.
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } from 'graphql';

// Define a GraphQLObjectType representing a Todo.
const TodoType = new GraphQLObjectType({
    name: 'Todo', // The name of the GraphQL type, used in queries and mutations.
    fields: {
        id: { type: GraphQLID }, // Field for 'id' with type GraphQLID (typically a unique identifier).
        title: { type: GraphQLString }, // Field for 'title' with type GraphQLString (text description).
        completed: { type: GraphQLBoolean }, // Field for 'completed' with type GraphQLBoolean (true/false).
    },
});

const TodoResultType = new GraphQLObjectType({
    name: 'TodoResult',
    fields: {
        data: { type: TodoType },
        message: { type: GraphQLString },
    },
});

export { TodoType, TodoResultType };

// Export the 'TodoType' for use in your GraphQL schema and resolvers.
export default TodoType;
