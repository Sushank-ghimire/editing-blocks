import { CloudCheck } from "lucide-react";
import React from "react";

const DocumentInput = () => {
  return (
    <div className="flex justify-items-center items-center">
      <span className="truncate cursor-pointer px-1.5 text-foreground font-medium">
        Untitled document
      </span>
      <CloudCheck />
    </div>
  );
};

export default DocumentInput;
