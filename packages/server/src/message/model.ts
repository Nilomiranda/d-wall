import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export const Message = new GraphQLObjectType({
  name: 'MessagesQuery',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve(parent) {
        return parent?.id
      }
    },
    content: {
      type: GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent?.content
      }
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent?.name
      }
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent?.createdAt
      }
    }
  }
})
