import { objectType } from "nexus";
import { Comment } from "./comment";

export const ToDo = objectType({
  name: "ToDo",
  definition(t) {
    t.id("id");
    t.string("content");
    t.boolean("isDone");
    t.id("userId");
    t.nullable.list.field("comments", { type: Comment });
  },
});
