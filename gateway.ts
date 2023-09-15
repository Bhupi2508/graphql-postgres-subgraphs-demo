// gateway.ts
const { ApolloGateway } = require('@apollo/gateway');
const { ApolloServer } = require('apollo-server');

// Define the services that will be part of the federated graph
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'books', url: 'http://localhost:4001/graphql' }, // Replace with your books service URL
    { name: 'students', url: 'http://localhost:4002/graphql' }, // Replace with your students service URL
  ],
});


// const server = new ApolloServer({
//   gateway,
//   subscriptions: false, // Disable subscriptions if not needed
// });

// server.listen({ port: 4000 }).then(({ url: any }) => {
//   console.log(`Gateway is running at ${url}`);
// });

module.exports = gateway;