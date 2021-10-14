import {GraphQLNonNull, GraphQLString} from "graphql";
import {Message} from "../model";
import {ApplicationContext} from "../../globalInterfaces";

export const createMessage = {
  type: Message,
  args: {
    content: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLString,
      defaultValue: 'Anonymous',
    },
  },
  resolve(parent, args, context: ApplicationContext) {
    const { content, name } = args
    const { prisma } = context

    return prisma?.message?.create({
      data: {
        content,
        name
      }
    })
  }
}
