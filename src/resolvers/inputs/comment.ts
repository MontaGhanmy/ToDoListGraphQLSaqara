import { inputObjectType } from "nexus";


export const CommentInput = inputObjectType({
	name: "CommentInput",
	definition(t) {
		t.nonNull.id("todoId");
		t.nonNull.string("text");
	},
});
