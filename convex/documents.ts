import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized user");
    }

    const organizationId =
      ((user.organization_id ?? undefined) as string) || undefined;

    if (args.search && organizationId) {
      return ctx.db
        .query("documents")
        .withSearchIndex("search_title", (query) =>
          query
            .search("title", args.search as string)
            .eq("organizationId", organizationId)
        )
        .paginate(args.paginationOpts);
    }

    if (args.search) {
      return ctx.db
        .query("documents")
        .withSearchIndex("search_title", (query) =>
          query
            .search("title", args.search as string)
            .eq("ownerId", user.subject)
        )
        .paginate(args.paginationOpts);
    }
    if (organizationId) {
      return ctx.db
        .query("documents")
        .withIndex("by_organization_id", (query) =>
          query.eq("organizationId", organizationId)
        )
        .paginate(args.paginationOpts);
    }
    return ctx.db
      .query("documents")
      .withIndex("by_owner_Id", (query) => query.eq("ownerId", user.subject))
      .paginate(args.paginationOpts);
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

    const organizationId =
      ((user.organization_id ?? undefined) as string) || undefined;

    return await ctx.db.insert("documents", {
      title: args.title ? args.title : "Untitled document",
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent,
    });
  },
});

export const deleteDocumentsById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized user");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found in database");
    }

    const organizationId =
      ((user.organization_id ?? undefined) as string) || undefined;

    const isOrgMember = document.organizationId === organizationId;

    if (document.ownerId !== user.subject && !isOrgMember) {
      throw new ConvexError("Unauthorized user");
    }
    return await ctx.db.delete(args.id);
  },
});

export const updateDocumentById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized user");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found in database");
    }

    const organizationId =
      ((user.organization_id ?? undefined) as string) || undefined;

    const isOrgMember = document.organizationId === organizationId;

    if (document.ownerId !== user.subject && !isOrgMember) {
      throw new ConvexError("Unauthorized user");
    }
    return await ctx.db.patch(args.id, { title: args.title });
  },
});
