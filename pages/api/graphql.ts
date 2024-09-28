import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../schema';
import { resolvers } from '../../resolvers';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'; // Import the Playground plugin

// Initialize Apollo Server with GraphQL Playground enabled
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(), // Enable the Playground
  ],
});

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;

  // Create GraphQL handler
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

// Disable body parser for Apollo Server to work correctly
export const config = {
  api: {
    bodyParser: false,
  },
};
