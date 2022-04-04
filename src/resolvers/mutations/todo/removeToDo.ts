import { UserInputError } from "apollo-server-core";
import { mutationField, nonNull, nullable } from "nexus";
import {
  ToDoWhereUniqueInput,
} from "../../inputs";
import { ToDo } from "../../models";


export const removeToDo = mutationField("removeToDo", {
  type: nullable(ToDo),
  args: {
    where: nonNull(ToDoWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    if (!ctx.user?.id) {
      throw new UserInputError("Couldn't find user");
    }
    const item = await ctx.prisma.toDo.findUnique({
      where: args.where
    });
    if(item?.userId == ctx.user?.id) {
      return ctx.prisma.toDo.delete({
        where: {
          ...args.where,
        },
      });
    } else {
      throw new UserInputError("You don't have the right to remove this item!");
    }
  },
});
