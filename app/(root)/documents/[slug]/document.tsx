"use client";
import Editor from "./editor";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface IDocumentProps {
  preLoadedDocument: Preloaded<typeof api.documents.getDocumentById>;
}

export const Document = ({ preLoadedDocument }: IDocumentProps) => {
  const doc = usePreloadedQuery(preLoadedDocument);
  return (
    <section className="min-h-screen w-screen">
      <Editor doc={doc} initialContent={doc.initialContent} />
    </section>
  );
};
