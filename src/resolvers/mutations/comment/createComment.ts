import { UserInputError } from "apollo-server-core";
import { mutationField, nonNull, nullable } from "nexus";
import { CommentInput, ToDoWhereUniqueInput } from "../../inputs";
import { Comment } from "../../models";

export const createComment = mutationField("createComment", {
    type: nullable(Comment),
	args: {
        where: nonNull(ToDoWhereUniqueInput),
		input: nonNull(CommentInput),
	},
    resolve: async (_root, args, ctx) => {
        if (!ctx.user?.id) {
            throw new UserInputError("Couldn't find user");
          }
		return ctx.prisma.comment.create({
            data: {
                ...args.input,
                userId: ctx.user?.id,
            },
            
        });
    }
})