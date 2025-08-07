import { Doc } from "@/convex/_generated/dataModel";
import { CloudCheck } from "lucide-react";
import React from "react";

const DocumentInput = ({ document }: { document: Doc<"documents"> }) => {
  return (
    <div className="flex justify-items-center items-center">
      <span className="truncate cursor-pointer px-1.5 text-foreground font-medium">
        {document.title ?? "None"}
      </span>
      <CloudCheck />
    </div>
  );
};

export default DocumentInput;
