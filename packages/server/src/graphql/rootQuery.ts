import {GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {Message} from "../message/model";
import {listMessages} from "../message/resolvers";
import {createMessage} from "../message/mutations/createMessageMutation";
import {createUser} from "../user/mutations/createUser";

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      test: {
        type: GraphQLString,
        resolve(){
          return 'API Online!'
        }
      },
      messages: {
        type: new GraphQLList(Message),
        resolve(parent, args, context) {
          return listMessages(context)
        }
      },

    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RooMutation',
    fields: {
      createMessage,
      createUser,
    }
  })
})
