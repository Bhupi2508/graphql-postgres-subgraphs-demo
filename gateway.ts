// gateway.ts
const { ApolloGateway } = require('@apollo/gateway');

// Define the services that will be part of the federated graph
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'books', url: 'http://localhost:4001/graphql' }, // Replace with your books service URL
    { name: 'students', url: 'http://localhost:4002/graphql' }, // Replace with your students service URL
  ],
});

module.exports = gateway;