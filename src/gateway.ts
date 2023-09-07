import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { loadFilesSync } from '@graphql-tools/load-files'; // Updated import
import { join } from 'path';
import todosResolvers from './Resolver/todosGraphResolvers';
import greetingResolvers from './Resolver/greetingGraphResolvers';
import { DocumentNode } from 'graphql';

const loadAndMergeSchemas = () => {
  const schemas: DocumentNode[] = loadFilesSync<DocumentNode>(join(__dirname, '**/*.graphql'), {
    recursive: true,
  });
  return buildFederatedSchema([{ typeDefs: schemas, resolvers: [todosResolvers, greetingResolvers] }]);
};

const server = new ApolloServer({
  schema: loadAndMergeSchemas(),
});

server.listen(4000).then(({ url }) => {
  console.log(`Gateway server ready at ${url}`);
});