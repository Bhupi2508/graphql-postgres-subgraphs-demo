const { ApolloGateway } = require('@apollo/gateway');

// Define the services that will be part of the federated graph
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'todos', url: 'http://localhost:4000/graphql' }, // Replace with your service URL
  ],
});

module.exports = gateway;