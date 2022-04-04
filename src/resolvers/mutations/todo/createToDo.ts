import { UserInputError } from "apollo-server-core";
import { mutationField, nonNull, nullable } from "nexus";
import {
  ToDoContentInput,
} from "../../inputs";
import { ToDo } from "../../models";

export const createToDo = mutationField("createToDo", {
  type: nullable(ToDo),
  args: {
    input: nonNull(ToDoContentInput),
  },
  resolve: async (_root, args, ctx) => {
    if (!ctx.user?.id) {
      throw new UserInputError("Couldn't find user");
    }
    return ctx.prisma.toDo.create({
      data: {
        ...args.input,
        isDone: false,
        userId: ctx.user?.id,
      },
    });
  },
});