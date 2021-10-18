import Koa from 'koa'
import dotenv from 'dotenv'
import cors from '@koa/cors'
import router from './routes'
import bodyParser from 'koa-bodyparser'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as http from "http";
import {rootSchema} from "./graphql/rootQuery";

const prisma = new PrismaClient()

async function startApolloServer() {
  dotenv.config()

  prisma?.$connect().then(() => {
    console.log("🥳 Successfully connected to prisma client")
  }).catch(err => {
    console.error("🔴 Error trying to connect to prisma client", err)
  })

  const httpServer = http.createServer();
  const server = new ApolloServer({
    schema: rootSchema,
    context: ({ ctx }) => {
      Object.assign(ctx, { prisma })
      return ctx
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const app = new Koa();

  server.applyMiddleware({ app });
  httpServer.on('request', app.callback());
  await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, () => resolve(1)));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);

  app.context.prisma = prisma

  app.use(cors({
    origin: (ctx) => {
      const validDomains = ['https://studio.apollographql.com'];
      console.log('ctx.request.header.origin', ctx.request.header.origin)
      if (validDomains.indexOf(ctx.request.header.origin) !== -1) {
        return ctx.request.header.origin;
      }
      return validDomains[0]; // we can't return void, so let's return one of the valid domains
    },
    allowMethods: ['OPTIONS', 'GET', 'HEAD', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  }))

  app.use(bodyParser())
  app.use(router.routes())
}

console.log('🟢 About to start apollo server...')
startApolloServer().then(() => {
  console.log('✅ Apollo server started')
}).catch((err) => {
  console.error('🔴 Error starting apollo server', err)
})

