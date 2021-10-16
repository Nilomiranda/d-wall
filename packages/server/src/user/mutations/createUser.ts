import {User} from "../model";
import {GraphQLNonNull, GraphQLString} from "graphql";
import {ApplicationContext} from "../../globalInterfaces";

export const createUser = {
  type: User,
  args: {
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLNonNull(GraphQLString)
    }
  },
  resolve(parent, args, context: ApplicationContext) {
    const { name, email } = args
    const { prisma } = context

    return prisma.user.create({
      data: {
        name,
        email
      }
    })
  }
}
