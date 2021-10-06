import Koa from 'koa'
import dotenv from 'dotenv'
import cors from '@koa/cors'
import router from './routes'
import bodyParser from 'koa-bodyparser'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as http from "http";

const prisma = new PrismaClient()

async function startApolloServer() {
  dotenv.config()

  const httpServer = http.createServer();
  const server = new ApolloServer({
    typeDefs: [],
    resolvers: [],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const app = new Koa();

  server.applyMiddleware({ app });
  httpServer.on('request', app.callback());
  await new Promise(() => httpServer.listen({ port: 4000 }, () => null));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  app.listen(process.env.PORT, () => {
    console.log(`Application running on port ${process.env.PORT}`)
  })

  prisma?.$connect().then(() => {
    console.log("Successfully connected to prisma client")
  }).catch(err => {
    console.error("Error trying to connect to prisma client", err)
  })

  app.context.prisma = prisma

  app.use(cors({
    allowMethods: ['OPTIONS', 'GET', 'HEAD', 'POST', 'DELETE', 'PATCH'],
  }))

  app.use(bodyParser())
  app.use(router.routes())
}

startApolloServer()
