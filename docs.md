1. todosResolvers.ts:

This file defines resolver functions for your GraphQL schema.
Resolver functions are responsible for fetching and manipulating data for the GraphQL queries and mutations.
2. todosTypes.ts:

This file defines GraphQL types using the graphql library.
Types like BookType and Student define the structure of your data.
3. db.ts:

This file establishes a connection to your PostgreSQL database using the pg library.
4. gateway-entry.js:

This file sets up an Apollo Server that serves as the gateway for your federated services.
It imports a configuration from gateway.ts for service composition.
5. gateway.ts:

This file configures the Apollo Gateway, specifying the services that make up the federated graph.
In this case, it mentions the todos service at http://localhost:4000/graphql.
6. graphql-server.ts:

This file sets up an Apollo Server for your specific service, which is part of the federated graph.
It defines your schema and connects it with resolvers from todosResolvers.
7. service-definitions.js:

This file is similar to graphql-server.ts and is meant to define a service that can be independently run.
It also sets up an Apollo Server with schema and resolvers.
8. package.json:

Your project's package.json lists dependencies and scripts for running the server.
Now, to convert a normal GraphQL server into a federated one with subgraphs, here are the key steps:

1. Divide Your Schema:

Identify the different parts of your GraphQL schema that can be divided into separate services (subgraphs). For example, you may have a service for books and another for students.
2. Create Separate Services:

Create separate folders or files for each service. In your case, you have graphql-server.ts and service-definitions.js, which represent different services.
3. Define Federation Types:

In todosTypes.ts, define your GraphQL types as usual. These types will be reused across services.
4. Configure Federation Resolvers:

In todosResolvers.ts, write resolver functions for your types, as you normally would for a single GraphQL server.
5. Set Up Apollo Gateway:

In gateway.ts, configure the Apollo Gateway to list all the services and their respective URLs.
6. Set Up Apollo Server for Each Service:

In separate files like graphql-server.ts and service-definitions.js, set up Apollo Servers for each service. Define the schema and associate it with the resolver functions.
7. Start Your Services:

You can run each service independently using npm start or a similar command.
8. Start the Gateway:

Finally, start the Apollo Gateway, which will combine all the services into a federated graph.