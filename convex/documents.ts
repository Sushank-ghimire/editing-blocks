import { query } from "./_generated/server";

export const getDocuments = query({
  handler: async (ctx) => {
    return ctx.db.query("documents").collect();
  },
});
