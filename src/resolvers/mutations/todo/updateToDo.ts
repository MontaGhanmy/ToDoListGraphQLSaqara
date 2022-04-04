import { UserInputError } from "apollo-server-core";
import { mutationField, nonNull, nullable } from "nexus";
import {
  ToDoContentInput,
  ToDoWhereUniqueInput,
} from "../../inputs";
import { ToDo } from "../../models";


export const updateToDo = mutationField("updateToDo", {
  type: nullable(ToDo),
  args: {
    input: nonNull(ToDoContentInput),
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
      return ctx.prisma.toDo.update({
        where: args.where,
        data: {
          ...args.input,
        },
      });
    } else {
      throw new UserInputError("You don't have the right to update this item!");
    }
  },
});