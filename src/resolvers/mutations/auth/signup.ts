import { mutationField, nonNull } from "nexus";
import { SignUpInput } from "../../inputs";
import { createTokens } from "../../../utils/auth";
import { AuthPayload } from "../../payloads";
import bcrypt from "bcryptjs";


export const signup = mutationField("signup", {
	type: nonNull(AuthPayload),
	args: {
		input: nonNull(SignUpInput),
	},
	resolve: async (_root, args, ctx) => {
		const user = await ctx.prisma.user.create({
			data: {
				...args.input,
				email: args.input.email.toLowerCase(),
				password: await bcrypt.hash(args.input.password, 10),
			},
		});

		const { accessToken } = await createTokens({ userId: user.id }, ctx);

		return {
			user,
			accessToken,
		};
	},
});