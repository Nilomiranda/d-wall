import {ApplicationContext} from "../globalInterfaces";

export const listMessages = (context: ApplicationContext) => {
  const { prisma } = context
  return prisma?.message?.findMany()
}
