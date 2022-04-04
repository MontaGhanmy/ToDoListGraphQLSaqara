import { objectType } from "nexus"


export const Comment = objectType({
    name: "Comment",
    definition(t) {
        t.id("id");
        t.string("text");
        t.id("userId");
    }
})