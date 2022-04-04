import { mutationField, nonNull } from "nexus";
import { UserInputError } from "apollo-server-errors";
import { createTokens, getRefreshCookie } from "../../../utils/auth";
import { AuthPayload } from "../../payloads";

export const refreshAuth = mutationField("refreshAuth", {
	type: nonNull(AuthPayload),
	resolve: async (_root, _args, ctx) => {

		const refreshCookie = getRefreshCookie(ctx)
		if (!refreshCookie) throw new Error("Invalid cookie");

		const user = await ctx.prisma.user.findFirst({
			where: {
				id: refreshCookie.userId,
			}
		})
		if (!user) throw new UserInputError("Invalid user");

		const { accessToken } = await createTokens(
			{ userId: user.id },
			ctx
		);

		return {
			user: user,
			accessToken,
		};
	},
});