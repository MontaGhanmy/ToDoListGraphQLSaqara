import { mutationField, nonNull } from "nexus";
import { UserInputError } from "apollo-server-errors";
import { LoginInput } from "../../inputs";
import { createTokens } from "../../../utils/auth";
import { AuthPayload } from "../../payloads";
import bcrypt from "bcryptjs";

export const login = mutationField("login", {
	type: nonNull(AuthPayload),
	args: {
		input: nonNull(LoginInput),
	},
	resolve: async (_root, args, ctx) => {
		const user = await ctx.prisma.user.findFirst({
			where: {
				email: args.input.email,
			},
			rejectOnNotFound: () => new UserInputError("Invalid User"),
		});

		const matches = await bcrypt.compare(args.input.password, user.password);
		if (!matches) {
			throw new UserInputError("Invalid credentials");
		}

		const { accessToken } = await createTokens({ userId: user.id }, ctx);

		return {
			user,
			accessToken,
		};
	},
});