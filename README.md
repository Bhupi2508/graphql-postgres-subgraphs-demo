# graphql-postgres-subgraphs-demo
Demo project showcasing a GraphQL API integrated with PostgreSQL, with a focus on subgraph modularization. Learn how to create, manage, and integrate subgraphs for improved GraphQL API organization and scalability


## GraphQL Server (Single Schema) Example:

Single Schema: In the GraphQL Server example, there is a single GraphQL schema defined in the graphql-server.ts file.

Single Set of Resolvers: The resolvers for the entire schema are defined within the same file (todosResolvers).

No Subgraph Concept: This example doesn't employ the concept of subgraphs. It's a simpler setup where everything is combined into a single schema.

## GraphQL Gateway with Subgraphs Example:

Multiple Schemas: In the GraphQL Gateway with Subgraphs example, you have the ability to create multiple GraphQL schemas, each in its own subgraph. In this case, you have separate schemas for "Todos" and "Greeting."

Separate Resolvers: Each subgraph has its own set of resolvers (e.g., todosResolvers and greetingResolvers). These resolvers are organized in a more modular way.

Apollo Federation: This example leverages Apollo Federation to combine multiple schemas into a single gateway schema. The loadAndMergeSchemas function loads individual schemas and merges them using buildFederatedSchema.