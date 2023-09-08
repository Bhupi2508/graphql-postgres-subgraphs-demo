graphql-postgres-demo/
├── src/
│   ├── db.ts
│   ├── gateway.ts
│   ├── todos/
│   │   ├── todosTypes.ts
│   │   ├── todosResolvers.ts
│   │   ├── todosSchema.ts
│   ├── greeting/
│   │   ├── greetingTypes.ts
│   │   ├── greetingResolvers.ts
│   │   ├── greetingSchema.ts
├── tsconfig.json
├── package.json
└── ...


## What are Subgraphs?

Subgraphs are a way to modularize and scale your GraphQL API by breaking it down into smaller, independently deployable pieces. Each subgraph represents a self-contained part of your API, which can have its own schema, resolvers, and data sources. This approach offers several benefits, including improved maintainability, scalability, and the ability to develop and deploy subgraphs independently.

# Step 1: Initial GraphQL Schema

## schema.graphql (Initial Schema)

type Todo {
  id: ID!
  title: String!
  completed: Boolean!
}

type Query {
  todos: [Todo!]!
}

type Mutation {
  createTodo(title: String!, completed: Boolean!): Todo!
}


## todosResolvers.ts (Initial Resolvers)

const todos = [
  { id: '1', title: 'Task 1', completed: false },
  { id: '2', title: 'Task 2', completed: true },
];

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createTodo: (_, args) => {
      // Logic to create a new Todo
    },
  },
};

export default resolvers;


## Step 2: Convert to Subgraphs

type Todo {
  id: ID!
  title: String!
  completed: Boolean!
}

type Query {
  todos: [Todo!]!
}

type Mutation {
  createTodo(title: String!, completed: Boolean!): Todo!
}

## Step 3: Create a Gateway

Create a gateway that combines the subgraphs into a single GraphQL API using Apollo Federation.