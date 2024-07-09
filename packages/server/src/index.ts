// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import schema from './graphql/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import mocks from './graphql/mocks';

interface MyContext {
  token?: String;
}

async function StartServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer<MyContext>({ schema: addMocksToSchema({schema, mocks})});
    await server.start();
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );
    await new Promise<void>((resolve) => httpServer.listen({ port: 8080 }, resolve));
    console.log(`🚀 Server ready at http://localhost:8080/graphql`);
}

StartServer();
