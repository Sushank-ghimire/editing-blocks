import { Id } from "@/convex/_generated/dataModel";
import { preloadQuery } from "convex/nextjs";
import { Document } from "./document";
import { auth } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";

interface IDocumentIdPageProps {
  params: Promise<{ slug: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: IDocumentIdPageProps) => {
  const { slug } = await params;

  const { getToken } = await auth();

  const token = (await getToken({ template: "convex" })) ?? undefined;

  const preload = await preloadQuery(
    api.documents.getDocumentById,
    { id: slug },
    { token }
  );

  return <Document preLoadedDocument={preload} />;
};

export default DocumentIdPage;
