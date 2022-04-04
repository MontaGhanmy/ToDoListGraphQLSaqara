import { inputObjectType } from "nexus";


export const ToDoContentInput = inputObjectType({
	name: "ToDoContentInput",
	definition(t) {
		t.nonNull.string("content");
		t.nonNull.boolean("isDone");
	},
});


export const ToDoShareInput = inputObjectType({
	name: "ToDoShareInput",
	definition(t) {
		t.nonNull.id("userId");
	},
});


export const ToDoWhereUniqueInput = inputObjectType({
    name: "ToDoWhereUniqueInput",
    definition(t) {
        t.nonNull.id("id");
    }
})