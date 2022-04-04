import { mutationField, nonNull } from "nexus";
import { User } from "../../models";
import { getRefreshCookie, removeRefreshCookie } from "../../../utils/auth";

export const logout = mutationField("logout", {
	type: nonNull(User),
	resolve: async (_root, _args, ctx) => {

		const refreshCookie = getRefreshCookie(ctx)
		if (!refreshCookie) throw new Error("Invalid cookie");
		
		removeRefreshCookie(ctx)

		return await ctx.prisma.user.findFirst({
			where: {
				id: refreshCookie.userId,
			},
			rejectOnNotFound: true
		})
	},
});
