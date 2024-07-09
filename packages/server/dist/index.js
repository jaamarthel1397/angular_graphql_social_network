import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import schema from './graphql/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({ schema: addMocksToSchema({ schema }) });
await server.start();
app.use('/graphql', cors(), express.json(), expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
}));
await new Promise((resolve) => httpServer.listen({ port: 8080 }, resolve));
console.log(`🚀 Server ready at http://localhost:8080/graphql`);
