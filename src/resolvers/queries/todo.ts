import { list, nonNull, nullable, queryField } from "nexus";
import { ToDo } from "..";
import { ToDoWhereUniqueInput } from "../inputs";

export const toDos = queryField("todos", {
  type: list(ToDo),
  resolve: async (_root, _args, ctx) => {
    return ctx.prisma.toDo.findMany({
      where: {
        userId: ctx.user?.id,
      },
      include: {
        comments: true,
      },
    });
  },
});

export const toDo = queryField("todo", {
  type: nullable(ToDo),
  args: {
    where: nonNull(ToDoWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    return ctx.prisma.toDo.findUnique({
      where: {
        id: args.where.id,
      },
    });
  },
});
