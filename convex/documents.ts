import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getDocuments = query({
  handler: async (ctx) => {
    return ctx.db.query("documents").collect();
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
