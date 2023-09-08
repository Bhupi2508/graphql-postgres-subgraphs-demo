import { GraphQLFieldResolver } from 'graphql';

// Function to retrieve a specific todo item by ID from the database (dummy implementation).
const getTodo = async (id: string) => {
  // Replace this with actual database retrieval logic if needed
  // For now, we'll return a dummy result
  const dummyTodo = {
    id,
    title: 'Sample Todo',
    completed: false,
  };

  return {
    data: dummyTodo,
    message: 'Successfully fetched Todo',
  };
};

// Function to add a new todo item to the database (dummy implementation).
const addTodo = async (title: string, completed: boolean) => {
  // Replace this with actual database insertion logic if needed
  // For now, we'll return a dummy result
  const dummyTodo = {
    id: '123',
    title,
    completed,
  };

  return {
    data: dummyTodo,
    message: 'Successfully created Todo',
  };
};

const todosResolvers: {
  Query: {
    todo: GraphQLFieldResolver<any, any>;
  };
  Mutation: {
    createTodo: GraphQLFieldResolver<any, any>;
  };
} = {
  Query: {
    todo: async (_: any, { id }: { id: string }) => getTodo(id),
  },
  Mutation: {
    createTodo: async (_: any, { title, completed }: { title: string; completed: boolean }) => {
      try {
        const result = await addTodo(title, completed);
        return result; // Return the result if successful
      } catch (e) {
        console.error("Error:", e);
        throw new Error("Failed to create todo."); // Throw an error if there's an exception
      }
    },
  },
};

export default todosResolvers;
