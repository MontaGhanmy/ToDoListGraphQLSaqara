import { inputObjectType } from "nexus";

export const SignUpInput = inputObjectType({
    name: "SignUpInput",
    definition(t) {
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.string("password");
    }
})

export const LoginInput = inputObjectType({
	name: "LoginInput",
	definition(t) {
		t.nonNull.string("email");
		t.nonNull.string("password");
	},
})