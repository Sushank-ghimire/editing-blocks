import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return ctx.db.query("documents").paginate(args.paginationOpts);
  },
});

export const createDocuments = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("User is not authenticated");
    }

    return await ctx.db.insert("documents", {
      title: args.title ? args.title : "Untitled document",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});
