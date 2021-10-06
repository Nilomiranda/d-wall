import {GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      test: {
        type: GraphQLString,
        resolve() {
          return 'API online!';
        },
      },
    },
  })
})
