// Establishing a connection to your PostgreSQL database
import pool from '../db';

// Function to retrieve a specific todo item by ID from the database.
const getTodo = async (id: string) => {
    const query = 'SELECT * FROM todos WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    console.log("get result ::::: ", result.rows)
    const todo = result.rows[0];
    return {
        data: todo,
        message: todo ? 'Successfully fetched Todo' : 'Todo not found',
    };
};

// Function to add a new todo item to the database.
const addTodo = async (title: string, completed: boolean) => {
    const query = 'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *';
    const values = [title, completed];
    const result = await pool.query(query, values);
    console.log("post result  ::::: ", result.rows)
    const todo = result.rows[0];
    return {
        data: todo,
        message: 'Successfully created Todo',
    };
};

// This is an object that holds resolver functions for various parts of your GraphQL schema
const todosResolvers = {
    Query: {
        // Resolver for the 'todo' query, which retrieves a todo item by ID.
        // 1. `_`: This is a placeholder for the parent object (in this case, it's not used, so it's named _)
        // 2. { id }: { id: string }: This is an object destructuring, where it extracts the 'id' argument from the incoming GraphQL query
        todo: async (_: any, { id }: { id: string }) => getTodo(id),
    },
    Mutation: {
        // Resolver for the 'createTodo' mutation, which adds a new todo item.
        createTodo: async (_: any, { title, completed }: { title: string; completed: boolean }) => {
            try {
                const result = await addTodo(title, completed);
                return result; // Return the result if successful
            } catch (e) {
                console.log("Error:", e);
                throw new Error("Failed to create todo."); // Throw an error if there's an exception
            }
        }
    },
    Todo: {
        // Resolver functions for Todo fields (if needed)
    },
};

// Export the resolvers for use in your GraphQL server.
export default todosResolvers;
