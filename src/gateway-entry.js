const { ApolloServer } = require('apollo-server');
const gateway = require('./gateway'); // Import your gateway configuration

// Create an Apollo Server that serves as the gateway
const server = new ApolloServer({
  gateway,
  subscriptions: false, // Disable subscriptions if not needed
});

server.listen().then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});