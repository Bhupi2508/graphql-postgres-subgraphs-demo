import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLBoolean, GraphQLString } from 'graphql';

// Define the TodoType type
export const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
    },
});

// Define a schema for the Todos subgraph
const todosSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            // Define queries for Todos here
            todos: {
                type: new GraphQLList(TodoType), // Assuming you have defined the TodoType
                resolve: () => {
                    // Replace with actual resolver logic to fetch Todos
                    // For now, a dummy list of Todos is returned
                    return [
                        { id: '1', title: 'Sample Todo 1', completed: false },
                        { id: '2', title: 'Sample Todo 2', completed: true },
                    ];
                },
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            // Define mutations for Todos here
            createTodo: {
                type: TodoType, // Assuming you have defined the TodoType
                args: {
                    title: { type: new GraphQLNonNull(GraphQLString) },
                    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
                },
                resolve: (_root, args) => {
                    // Replace with actual resolver logic to create a Todo
                    // For now, a dummy Todo is returned
                    const newTodo = {
                        id: '3',
                        title: args.title,
                        completed: args.completed,
                    };
                    return newTodo;
                },
            },
        },
    }),
});

export default todosSchema;
