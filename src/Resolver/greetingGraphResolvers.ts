import { GraphQLFieldResolver } from 'graphql';

const greetingResolvers: {
    Query: {
        hello: GraphQLFieldResolver<any, any>;
    };
} = {
    Query: {
        hello: async () => {
            // Replace this with actual greeting logic if needed
            // For now, we'll return a dummy greeting message
            return 'Hello, GraphQL!';
        },
    },
};

export default greetingResolvers;
